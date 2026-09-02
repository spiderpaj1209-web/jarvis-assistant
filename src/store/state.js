class NovaState {
  constructor() { this.conversations=[]; this.currentId=null; this.files=[]; }
  newConversation() { const id=`c_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; const item={id,title:'Nouvelle discussion',messages:[],createdAt:new Date().toISOString()}; this.conversations.unshift(item); this.currentId=id; return item; }
  current() { return this.conversations.find(c=>c.id===this.currentId) || this.newConversation(); }
}
window.NovaState = NovaState;
