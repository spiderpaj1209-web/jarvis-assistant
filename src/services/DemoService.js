class DemoService {
  async respond(prompt) {
    const normalized = prompt.toLowerCase();
    if (/(jeu|game|pong)/.test(normalized)) return this.game();
    if (/(html|site|page web|landing)/.test(normalized)) return this.webPage(prompt);
    if (/(css|style)/.test(normalized)) return this.css();
    return { text: 'Mode démo : je peux créer une page HTML, un mini-jeu JavaScript ou une feuille CSS. Exemple : « crée un jeu Pong ».', files: [] };
  }
  webPage(prompt) {
    const safeTitle = (prompt.match(/["“]([^"”]{1,60})["”]/)?.[1] || 'Page créée avec Nova').replace(/[<>]/g,'');
    const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeTitle}</title><style>body{margin:0;font-family:system-ui;background:#101827;color:#eef2ff;display:grid;min-height:100vh;place-items:center}.card{max-width:620px;padding:48px;border:1px solid #3b4b74;border-radius:20px;background:#18233d}h1{font-size:42px;margin:0 0 12px}button{border:0;border-radius:9px;padding:12px 18px;background:#7c8cff;color:white;font-weight:700}</style><main class="card"><h1>${safeTitle}</h1><p>Page HTML générée en mode démo local. Modifie ce fichier librement.</p><button onclick="this.textContent='Merci !'">Tester</button></main></html>`;
    return { text:'J’ai créé une page HTML testable dans l’aperçu isolé.', files:[{path:'index.html',language:'html',content:html}], entrypoint:'index.html' };
  }
  css() { const css=':root { --accent: #7c8cff; }\nbody { font-family: system-ui; margin: 0; }\n.button { background: var(--accent); color: white; border: 0; border-radius: 8px; padding: 12px 16px; }\n'; return {text:'Voici une feuille CSS de départ.',files:[{path:'styles.css',language:'css',content:css}]}; }
  game() {
    const html='<!doctype html><meta charset="utf-8"><title>Mini jeu</title><style>body{margin:0;background:#101827;color:#fff;font-family:system-ui;display:grid;place-items:center;height:100vh}canvas{border:2px solid #7c8cff;border-radius:10px;background:#17213a}p{position:fixed;top:4px}</style><p>Clique dans le jeu puis utilise ← et →. Score : <span id="s">0</span></p><canvas width="420" height="320"></canvas><script>const c=document.querySelector("canvas"),x=c.getContext("2d");let p=180,b={x:210,y:80,dx:3,dy:3},score=0;onkeydown=e=>{if(e.key==="ArrowLeft")p=Math.max(0,p-25);if(e.key==="ArrowRight")p=Math.min(350,p+25)};function loop(){b.x+=b.dx;b.y+=b.dy;if(b.x<8||b.x>412)b.dx*=-1;if(b.y<8)b.dy*=-1;if(b.y>285&&b.x>p&&b.x<p+70){b.dy=-Math.abs(b.dy);score++;document.querySelector("#s").textContent=score}if(b.y>330){b={x:210,y:80,dx:3,dy:3};score=0;document.querySelector("#s").textContent=0}x.clearRect(0,0,420,320);x.fillStyle="#7c8cff";x.fillRect(p,300,70,9);x.beginPath();x.arc(b.x,b.y,8,0,7);x.fillStyle="#39d7bf";x.fill();requestAnimationFrame(loop)}loop()</script>';
    return {text:'Mini-jeu créé. Lance l’aperçu et utilise les flèches gauche/droite.',files:[{path:'game.html',language:'html',content:html}],entrypoint:'game.html'};
  }
}
window.DemoService = DemoService;
