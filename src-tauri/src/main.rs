#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;

#[tauri::command]
fn open_preview(app: tauri::AppHandle, html: String) -> Result<(), String> {
    let url = format!("data:text/html;charset=utf-8,{}", urlencoding::encode(&html));
    tauri::WebviewWindowBuilder::new(&app, "preview", tauri::WebviewUrl::External(url.parse().map_err(|e| format!("{e}"))?))
        .title("Aperçu du projet")
        .inner_size(1000.0, 700.0)
        .build().map_err(|e| e.to_string())?;
    Ok(())
}
fn main() { tauri::Builder::default().invoke_handler(tauri::generate_handler![open_preview]).run(tauri::generate_context!()).expect("error while running Jarvis"); }
