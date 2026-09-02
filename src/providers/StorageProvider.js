class StorageProvider {
  constructor() { this.key='nova-cloud-state-v1'; }
  load() { try { return JSON.parse(localStorage.getItem(this.key)) || null; } catch { return null; } }
  save(state) { localStorage.setItem(this.key, JSON.stringify(state)); }
  export(state) { return JSON.stringify({version:1, exportedAt:new Date().toISOString(), ...state}, null, 2); }
  import(text) { const data=JSON.parse(text); if (!data || !Array.isArray(data.conversations)) throw new Error('Fichier Nova invalide.'); return data; }
}
window.StorageProvider = StorageProvider;
