class ModelProvider {
  constructor() {
    this.providers = { demo: new DemoModelProvider() };
    this.currentProvider = 'demo';
  }

  getCurrentProvider() {
    return this.currentProvider;
  }

  getAvailableProviders() {
    return Object.keys(this.providers);
  }

  setProvider(name) {
    if (!this.providers[name]) throw new Error(`Fournisseur indisponible : ${name}`);
    this.currentProvider = name;
  }

  async generateResponse(prompt, options = {}) {
    const active = this.providers[this.currentProvider];
    try {
      return await active.generateResponse(prompt, options);
    } catch (error) {
      if (this.currentProvider !== 'demo') {
        this.currentProvider = 'demo';
        return this.providers.demo.generateResponse(prompt, options);
      }
      throw error;
    }
  }
}

class DemoModelProvider {
  async generateResponse(prompt) {
    return {
      provider: 'demo',
      quota: { known: false, remaining: null, label: 'Sans clé — mode démo local' },
      text: `Mode démo actif. Requête reçue : ${prompt}`,
      warnings: ['Réponse simulée : aucun modèle distant n’est utilisé.']
    };
  }
}

window.ModelProvider = ModelProvider;
