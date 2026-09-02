class FileService {
  preview(frame, file) { if (!file || file.language !== 'html') { frame.srcdoc = '<p style="font-family:system-ui;padding:16px">Aperçu disponible pour les fichiers HTML uniquement.</p>'; return; } frame.srcdoc = file.content; }
  stop(frame) { frame.src = 'about:blank'; }
  download(file) { const blob=new Blob([file.content],{type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=file.path; a.click(); URL.revokeObjectURL(url); }
}
window.FileService = FileService;
