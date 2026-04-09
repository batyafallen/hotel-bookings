let currentType = "all";
let currentRating = 0;
let currentPrice = 15000;
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let currentSearchQuery = "";

function renderCards() {
    const container = document.getElementById("cardsContainer");
    if (!container) return;

    // Применяем все фильтры И поиск
    let filtered = rooms.filter(room => {
        // Фильтр по типу
        if (currentType !== "all" && room.type !== currentType) return false;
        // Фильтр по цене
        if (room.price > currentPrice) return false;
        // Фильтр по рейтингу
        if (currentRating > 0 && room.rating < currentRating) return false;
        // Поиск по названию или локации
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            const matchesSearch = room.name.toLowerCase().includes(query) || room.location.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }
        return true;
    });

    // Сортировка
    const sortBy = document.getElementById("sortSelect")?.value;
    if (sortBy === "price-asc") filtered.sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") filtered.sort((a,b) => b.price - a.price);
    if (sortBy === "rating") filtered.sort((a,b) => b.rating - a.rating);

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px;">😕 Ничего не найдено. Попробуйте изменить фильтры или поиск.</div>`;
        return;
    }

    container.innerHTML = filtered.map(room => `
        <div class="card" onclick="viewRoom(${room.id})">
            <div class="card-img">
                <img src="${room.img}" alt="${room.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27300%27 viewBox=%270 0 400 300%27%3E%3Crect width=%27400%27 height=%27300%27 fill=%27%232563eb%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27 fill=%27white%27 font-size=%2724%27%3E🏨%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="card-info">
                <div class="card-title">${room.name}</div>
                <div class="card-rating">
                    <span class="stars">${"★".repeat(Math.floor(room.rating))}${"☆".repeat(5-Math.floor(room.rating))}</span>
                    <span>${room.rating}</span>
                </div>
                <div class="card-price">${room.price.toLocaleString()} ₽ / ночь</div>
                <div class="card-location"><i class="fas fa-map-marker-alt"></i> ${room.location}</div>
                <button class="book-btn" onclick="event.stopPropagation(); bookRoom(${room.id})">
                    ${bookings.some(b => b.id === room.id) ? '✅ Забронировано' : '📅 Забронировать'}
                </button>
            </div>
        </div>
    `).join("");
}

function viewRoom(id) {
    window.location.href = `room.html?id=${id}`;
}

let pendingBookingId = null;

function bookRoom(id) {
    if (bookings.some(b => b.id === id)) {
        alert("❌ Этот отель уже забронирован!");
        return;
    }
    pendingBookingId = id;
    const modal = document.getElementById("dateModal");
    if (modal) {
        document.getElementById("modalCheckin").value = "";
        document.getElementById("modalCheckout").value = "";
        modal.style.display = "flex";
    }
}

function confirmBooking() {
    const checkin = document.getElementById("modalCheckin").value;
    const checkout = document.getElementById("modalCheckout").value;
    
    if (!checkin || !checkout) {
        alert("❌ Выберите даты заезда и выезда!");
        return;
    }
    
    if (new Date(checkin) >= new Date(checkout)) {
        alert("❌ Дата выезда должна быть позже даты заезда!");
        return;
    }
    
    const room = rooms.find(r => r.id === pendingBookingId);
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    
    if (bookings.some(b => b.id === pendingBookingId)) {
        alert(`❌ ${room.name} уже в ваших бронированиях!`);
    } else {
        bookings.push({
            ...room,
            checkin: checkin,
            checkout: checkout,
            bookedAt: new Date().toISOString()
        });
        localStorage.setItem("bookings", JSON.stringify(bookings));
        alert(`✅ ${room.name} забронирован!\n📅 Заезд: ${checkin}\n📅 Выезд: ${checkout}`);
    }
    
    document.getElementById("dateModal").style.display = "none";
    pendingBookingId = null;
    renderCards();
}

function cancelBookingModal() {
    document.getElementById("dateModal").style.display = "none";
    pendingBookingId = null;
}

function searchRooms() {
    const input = document.getElementById("searchInput");
    currentSearchQuery = input ? input.value : "";
    renderCards();
}

// Фильтры
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentType = this.getAttribute("data-type");
        renderCards();
    });
});

document.querySelectorAll(".rating-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentRating = parseFloat(this.getAttribute("data-rating"));
        renderCards();
    });
});

const priceSlider = document.getElementById("priceRange");
if (priceSlider) {
    priceSlider.addEventListener("input", function(e) {
        currentPrice = parseInt(e.target.value);
        document.getElementById("priceValue").innerText = currentPrice.toLocaleString();
        renderCards();
    });
}

const sortSelect = document.getElementById("sortSelect");
if (sortSelect) sortSelect.addEventListener("change", () => renderCards());

document.getElementById("searchBtn")?.addEventListener("click", searchRooms);
document.getElementById("homeBtn")?.addEventListener("click", () => location.reload());
document.getElementById("bookingsBtn")?.addEventListener("click", () => {
    window.location.href = "bookings.html";
});

// Обработчики для модального окна
document.addEventListener("DOMContentLoaded", function() {
    const confirmBtn = document.getElementById("confirmBooking");
    const cancelBtn = document.getElementById("cancelBookingModal");
    if (confirmBtn) confirmBtn.addEventListener("click", confirmBooking);
    if (cancelBtn) cancelBtn.addEventListener("click", cancelBookingModal);
    
    const modal = document.getElementById("dateModal");
    if (modal) {
        modal.addEventListener("click", function(e) {
            if (e.target === modal) cancelBookingModal();
        });
    }
    
    renderCards();
});