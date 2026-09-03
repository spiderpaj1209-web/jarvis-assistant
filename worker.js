const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

function normalize(text) { return String(text || '').trim().toLowerCase(); }

function replyFor(message) {
  const text = normalize(message);
  if (!text) return 'Je suis Nova. Écris-moi une question ou une commande.';
  if (/(bonjour|salut|bonsoir)/.test(text)) return 'Bonjour. Je suis Nova, disponible en ligne même quand ton PC est éteint.';
  if (/(heure|quelle heure)/.test(text)) return `Il est ${new Intl.DateTimeFormat('fr-FR', { timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date())}.`;
  if (/(date|quel jour)/.test(text)) return `Nous sommes le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeZone: 'Europe/Paris' }).format(new Date())}.`;
  if (/(aide|commandes|que peux-tu)/.test(text)) return 'Je peux répondre aux salutations, donner la date et l’heure, et garder notre conversation dans ton navigateur. Une IA cloud illimitée ne peut pas être fournie gratuitement, mais l’interface Nova reste accessible sans payer.';
  return `J’ai reçu : « ${String(message).trim()} ». Le mode gratuit en ligne est actif. Pour une réponse IA complète, il faudrait connecter un fournisseur IA ayant ses propres quotas.`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') return json({ ok: true, service: 'nova', mode: 'free-static' });
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch {}
      const message = typeof body.message === 'string' ? body.message.slice(0, 1000) : '';
      return json({ reply: replyFor(message), mode: 'free-static' });
    }
    return env.ASSETS.fetch(request);
  }
};
