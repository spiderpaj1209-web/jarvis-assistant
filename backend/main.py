import os
import time
from collections import defaultdict, deque

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
GROQ_MODEL = os.getenv('GROQ_MODEL', 'llama-3.3-70b-versatile')
RATE_LIMIT = int(os.getenv('RATE_LIMIT_PER_MINUTE', '20'))
ORIGINS = [x.strip() for x in os.getenv('CORS_ORIGINS', 'https://spiderpaj1209-web.github.io').split(',') if x.strip()]
BUCKETS = defaultdict(deque)

app = FastAPI(title='Nova Cloud API', version='0.1.0')
app.add_middleware(CORSMiddleware, allow_origins=ORIGINS, allow_credentials=False, allow_methods=['GET', 'POST'], allow_headers=['Content-Type'])

class ChatRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=12000)

def allowed(ip: str) -> bool:
    now = time.monotonic()
    bucket = BUCKETS[ip]
    while bucket and now - bucket[0] > 60:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT:
        return False
    bucket.append(now)
    return True

def quota(headers):
    remaining = headers.get('x-ratelimit-remaining-requests')
    return {'known': remaining is not None, 'remaining': remaining, 'reset': headers.get('x-ratelimit-reset-requests'), 'label': 'Quota fournisseur communiqué' if remaining is not None else 'Quota fournisseur non communiqué'}

@app.get('/api/health')
async def health():
    configured = bool(os.getenv('GROQ_API_KEY'))
    return {'ok': True, 'cloudConfigured': configured, 'provider': 'groq' if configured else None, 'model': GROQ_MODEL if configured else None}

@app.post('/api/chat')
async def chat(payload: ChatRequest, request: Request):
    ip = request.client.host if request.client else 'unknown'
    if not allowed(ip):
        raise HTTPException(429, detail={'code': 'nova_rate_limit', 'message': 'Limite Nova atteinte. Réessaie dans une minute ou utilise le mode local.'})
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        raise HTTPException(503, detail={'code': 'cloud_not_configured', 'message': 'Cloud Groq non configuré. Nova peut basculer vers le local ou la démo.'})
    body = {'model': GROQ_MODEL, 'messages': [{'role': 'system', 'content': 'Tu es Nova. Réponds utilement en français sauf demande contraire. Pour le code, fournis des fichiers complets.'}, {'role': 'user', 'content': payload.prompt}], 'temperature': 0.5, 'max_tokens': 2048}
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
            response = await client.post(GROQ_URL, headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}, json=body)
    except httpx.TimeoutException as error:
        raise HTTPException(504, detail={'code': 'cloud_timeout', 'message': 'Le fournisseur cloud a expiré. Nova peut basculer vers le local.'}) from error
    except httpx.HTTPError as error:
        raise HTTPException(502, detail={'code': 'cloud_network_error', 'message': 'Erreur réseau vers le cloud. Nova peut basculer vers le local.'}) from error
    if response.status_code == 429:
        raise HTTPException(429, detail={'code': 'provider_quota', 'message': 'Quota cloud atteint. Nova peut basculer vers le local.', 'quota': quota(response.headers)})
    if response.status_code >= 400:
        raise HTTPException(502, detail={'code': 'provider_error', 'message': 'Le fournisseur cloud a renvoyé une erreur.'})
    data = response.json()
    text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
    if not text:
        raise HTTPException(502, detail={'code': 'empty_provider_response', 'message': 'Réponse cloud vide.'})
    return {'text': text, 'provider': 'groq', 'model': data.get('model', GROQ_MODEL), 'quota': quota(response.headers)}
