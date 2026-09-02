class SpeechProvider {
  constructor() { this.recognition = null; this.listening = false; }
  isSupported() { return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition); }
  async listen(onText) {
    if (!this.isSupported()) throw new Error('Reconnaissance vocale non disponible dans ce navigateur.');
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new Recognition(); this.recognition.lang = 'fr-FR'; this.recognition.interimResults = true; this.recognition.continuous = false; this.listening = true;
    return new Promise((resolve, reject) => {
      this.recognition.onresult = event => onText(Array.from(event.results).map(r => r[0].transcript).join(''));
      this.recognition.onerror = event => reject(new Error(event.error));
      this.recognition.onend = () => { this.listening = false; resolve(); };
      this.recognition.start();
    });
  }
  stop() { if (this.recognition) this.recognition.stop(); }
  speak(text) { if (!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang='fr-FR'; speechSynthesis.speak(utterance); }
}
window.SpeechProvider = SpeechProvider;
