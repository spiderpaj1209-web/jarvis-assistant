class CloudProvider {
  constructor() { this.endpoint = window.NOVA_CLOUD_API_URL || null; }
  configured() { return Boolean(this.endpoint); }
  async chat(prompt, options = {}) {
    if (!this.endpoint) throw new Error('Backend cloud non configuré');
    const response = await fetch(`${this.endpoint.replace(/\/$/, '')}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, mode: 'chat' }), signal: AbortSignal.timeout(options.timeout || 60000) });
    if (!response.ok) throw new Error(`Cloud indisponible (${response.status})`);
    const data = await response.json();
    return { text: data.text, provider: data.provider || 'cloud', model: data.model || 'inconnu', quota: data.quota || { known:false, remaining:null, label:'Quota non communiqué par le fournisseur' } };
  }
}
window.CloudProvider = CloudProvider;
