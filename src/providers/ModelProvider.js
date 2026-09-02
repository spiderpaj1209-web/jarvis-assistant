class ModelProvider {
  constructor() { this.mode='auto'; this.cloud=new CloudProvider(); this.local=new OllamaProvider(); this.demo=new DemoModelProvider(); }
  setMode(mode) { this.mode=mode; localStorage.setItem('nova-route-mode', mode); }
  getMode() { return this.mode; }
  async getAvailability() { return { cloud:this.cloud.configured(), local:await this.local.available() }; }
  async generateResponse(prompt, options={}) { const errors=[]; if (this.mode==='auto' || this.mode==='cloud') { try { if (!this.cloud.configured()) throw new Error('Backend cloud non configuré'); return await this.cloud.chat(prompt,options); } catch(error) { errors.push(`Cloud : ${error.message}`); } } if (this.mode==='cloud') throw new Error(errors[0]); if (this.mode==='auto' || this.mode==='local') { try { return await this.local.chat(prompt,options); } catch(error) { errors.push(`Local : ${error.message}`); } } if (this.mode==='local') throw new Error(errors[0]); const result=await this.demo.generateResponse(prompt,options); result.fallbackReason=errors.length ? errors.join(' | ') : null; return result; }
}
class DemoModelProvider { async generateResponse(prompt) { return { provider:'demo',model:'règles locales',quota:{known:true,remaining:null,label:'Démo — aucune IA réelle utilisée'},text:`Mode démo actif. Requête reçue : ${prompt}`,warnings:['Réponse simulée : aucun modèle distant ou local disponible.']}; } }
window.ModelProvider=ModelProvider;
