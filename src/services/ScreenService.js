class ScreenService {
  constructor() { this.stream=null; }
  async start() { if (!navigator.mediaDevices?.getDisplayMedia) throw new Error('Partage d’écran non disponible.'); this.stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:false}); this.stream.getVideoTracks()[0].addEventListener('ended',()=>this.stop()); return this.stream; }
  stop() { if (this.stream) this.stream.getTracks().forEach(track=>track.stop()); this.stream=null; }
  active() { return Boolean(this.stream); }
}
window.ScreenService = ScreenService;
