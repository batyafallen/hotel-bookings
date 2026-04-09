function openHelp() {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.5); z-index:1000;
        display: flex; align-items: center; justify-content: center;
    `;
    modal.innerHTML = `
        <div style="background: white; border-radius: 28px; max-width: 450px; width: 90%; padding: 25px;">
            <h2 style="margin-bottom: 20px;"><i class="fas fa-life-ring"></i> Справочная система</h2>
            
            <div style="margin-bottom: 20px;">
                <strong>❓ Как забронировать?</strong>
                <p style="margin-top: 5px;">Нажмите кнопку "Забронировать" на карточке жилья.</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <strong>⌨️ Горячие клавиши</strong>
                <p style="margin-top: 5px;"><kbd>F1</kbd> - открыть справку<br><kbd>/</kbd> - фокус на поиск</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <strong>👥 Возрастная аудитория</strong>
                <p style="margin-top: 5px;">18–55 лет<br>Основная группа: 25–40 лет</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <strong>🎯 Целевая аудитория</strong>
                <p style="margin-top: 5px;">Путешественники, командировочные, семьи с детьми</p>
            </div>
            
            <button onclick="this.closest('div').parentElement.remove()" style="background:#2563eb; color:white; border:none; padding:12px; border-radius:40px; width:100%; font-size:16px; cursor:pointer;">
                Закрыть
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

document.getElementById("helpBtn")?.addEventListener("click", openHelp);

document.addEventListener("keydown", (e) => {
    if (e.key === "F1") {
        e.preventDefault();
        openHelp();
    }
    if (e.key === "/") {
        e.preventDefault();
        document.getElementById("searchInput")?.focus();
    }
});