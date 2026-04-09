// ========== УПРАВЛЕНИЕ АВАТАРКОЙ НА ВСЕХ СТРАНИЦАХ ==========

// Загрузка аватарки в шапку
function loadAvatarToHeader() {
    const savedAvatar = localStorage.getItem("userAvatar");
    const profileSpan = document.querySelector(".profile span");
    const profileIcon = document.querySelector(".profile i");
    
    if (!profileIcon) return;
    
    if (savedAvatar && savedAvatar.startsWith('data:image')) {
        // Если есть загруженное фото — показываем миниатюру
        profileIcon.style.backgroundImage = `url(${savedAvatar})`;
        profileIcon.style.backgroundSize = "cover";
        profileIcon.style.backgroundPosition = "center";
        profileIcon.style.borderRadius = "50%";
        profileIcon.style.width = "24px";
        profileIcon.style.height = "24px";
        profileIcon.style.display = "inline-flex";
        profileIcon.style.alignItems = "center";
        profileIcon.style.justifyContent = "center";
        profileIcon.innerHTML = ""; // убираем стандартную иконку
        // Добавляем маленькое изображение
        const img = document.createElement("img");
        img.src = savedAvatar;
        img.style.width = "24px";
        img.style.height = "24px";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        profileIcon.innerHTML = "";
        profileIcon.appendChild(img);
    } else if (savedAvatar && savedAvatar !== 'null') {
        // Если сохранена иконка-эмодзи
        profileIcon.innerHTML = `<i class="fas ${savedAvatar}"></i>`;
        profileIcon.style.backgroundImage = "";
    } else {
        // Аватар по умолчанию
        profileIcon.innerHTML = `<i class="fas fa-user-circle"></i>`;
        profileIcon.style.backgroundImage = "";
    }
}

// Функция для обновления аватарки на всех страницах (вызывается после смены)
window.updateAvatarGlobally = function() {
    loadAvatarToHeader();
    // Если есть событие storage — другие вкладки тоже обновятся
    localStorage.setItem("avatarUpdated", Date.now());
};

// Слушаем изменения в localStorage (для синхронизации между вкладками)
window.addEventListener("storage", function(e) {
    if (e.key === "userAvatar" || e.key === "avatarUpdated") {
        loadAvatarToHeader();
    }
});

// Загружаем аватарку при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    loadAvatarToHeader();
});