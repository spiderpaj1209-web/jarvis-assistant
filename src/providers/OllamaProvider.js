class OllamaProvider {
  constructor(baseUrl = 'http://localhost:11434') { this.baseUrl = baseUrl; this.defaultModel = 'llama3.2:3b'; this.models = []; }
  async health() { const response = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(2500) }); if (!response.ok) throw new Error('Ollama indisponible'); const data = await response.json(); this.models = data.models || []; return data; }
  async available() { try { await this.health(); return true; } catch { return false; } }
  chooseModel() { return this.models.find(item => item.name.startsWith(this.defaultModel))?.name || this.models[0]?.name || this.defaultModel; }
  async chat(prompt, options = {}) { const model = options.model || this.chooseModel(); const response = await fetch(`${this.baseUrl}/api/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({model,prompt,stream:false}), signal:AbortSignal.timeout(options.timeout || 120000) }); if (!response.ok) throw new Error(`Ollama a retourné ${response.status}`); const data = await response.json(); return { text:data.response, provider:'ollama-local', model, quota:{known:true,remaining:null,label:'Local — aucune API cloud utilisée'} }; }
}
window.OllamaProvider = OllamaProvider;
