// Генератор случайных отелей с УНИКАЛЬНЫМИ ID и названиями
function generateRandomHotels() {
    const cities = [
        { name: "Москва", districts: ["центр", "Тверская", "Арбат", "Павелецкая", "Китай-город"] },
        { name: "Санкт-Петербург", districts: ["центр", "Невский пр.", "Васильевский", "Петроградская"] },
        { name: "Сочи", districts: ["центр", "Адлер", "Хоста", "Лазаревское"] },
        { name: "Казань", districts: ["центр", "Кремль", "Баумана"] },
        { name: "Екатеринбург", districts: ["центр", "ВИЗ", "Уралмаш"] },
        { name: "Новосибирск", districts: ["центр", "Академгородок"] },
        { name: "Краснодар", districts: ["центр", "Фестивальный"] },
        { name: "Нижний Новгород", districts: ["центр", "Верхневолжская"] },
        { name: "Красная Поляна", districts: ["Роза Хутор", "Эсто-Садок"] },
        { name: "Калининград", districts: ["центр", "Марауненхоф"] },
        { name: "Владивосток", districts: ["центр", "Океанский"] },
        { name: "Ялта", districts: ["центр", "Массандра"] },
        { name: "Суздаль", districts: ["центр"] },
        { name: "Волгоград", districts: ["центр", "Мамаев Курган"] },
        { name: "Ростов-на-Дону", districts: ["центр", "Западный"] }
    ];
    
    const hotelNames = [
        "Гранд", "Royal", "Palace", "Park", "City", "Престиж", "Империал", "Астория", 
        "Метрополь", "Националь", "Золотой", "Европейский", "Балчуг", "Ритц", "Шератон"
    ];
    
    const apartmentNames = [
        "Уютный", "Современный", "Просторный", "Дизайнерский", "Loft", "Студия", 
        "Люкс", "Премиум", "Комфорт", "Элитный", "Центральный"
    ];
    
    const hostelNames = [
        "City", "Travel", "Backpacker", "Друзья", "Компас", "Вояж", "Турист", 
        "Молодёжный", "Пилигрим", "Чемодан"
    ];
    
    const villaNames = [
        "Вилла", "Коттедж", "Загородный", "Дача", "Усадьба", "Montana", 
        "Sunset", "Paradise", "Лесная", "Озёрная"
    ];
    
    const hotels = [];
    let id = 1;
    
    for (const city of cities) {
        for (const district of city.districts) {
            // Отели (3-5 штук на район)
            for (let i = 0; i < 5; i++) {
                const nameIndex = Math.floor(Math.random() * hotelNames.length);
                const name = `${hotelNames[nameIndex]} Отель ${city.name}`;
                const price = Math.floor(Math.random() * 15000) + 4000;
                const rating = (Math.random() * 1 + 4).toFixed(1);
                
                hotels.push({
                    id: id++,
                    name: name,
                    type: "hotel",
                    price: price,
                    location: `${city.name}, ${district}`,
                    img: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-family='Arial'%3E🏨 Отель%3C/text%3E%3C/svg%3E`,
                    rating: parseFloat(rating),
                    description: `Отель в районе ${district} города ${city.name}. Отличный вариант для проживания.`
                });
            }
            
            // Апартаменты (3-5 штук на район)
            for (let i = 0; i < 5; i++) {
                const nameIndex = Math.floor(Math.random() * apartmentNames.length);
                const name = `${apartmentNames[nameIndex]} Апартаменты ${city.name}`;
                const price = Math.floor(Math.random() * 8000) + 2000;
                const rating = (Math.random() * 1 + 3.8).toFixed(1);
                
                hotels.push({
                    id: id++,
                    name: name,
                    type: "apartment",
                    price: price,
                    location: `${city.name}, ${district}`,
                    img: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2310b981'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-family='Arial'%3E🏢 Апартаменты%3C/text%3E%3C/svg%3E`,
                    rating: parseFloat(rating),
                    description: `Современные апартаменты в районе ${district} города ${city.name}.`
                });
            }
            
            // Хостелы (1-2 штуки на район)
            for (let i = 0; i < 2; i++) {
                const nameIndex = Math.floor(Math.random() * hostelNames.length);
                const name = `${hostelNames[nameIndex]} Хостел ${city.name}`;
                const price = Math.floor(Math.random() * 2000) + 500;
                const rating = (Math.random() * 1.2 + 3.5).toFixed(1);
                
                hotels.push({
                    id: id++,
                    name: name,
                    type: "hostel",
                    price: price,
                    location: `${city.name}, ${district}`,
                    img: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ef4444'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-family='Arial'%3E🛌 Хостел%3C/text%3E%3C/svg%3E`,
                    rating: parseFloat(rating),
                    description: `Уютный хостел в районе ${district} города ${city.name}.`
                });
            }
            
            // Виллы (1 штука на район)
            for (let i = 0; i < 1; i++) {
                const nameIndex = Math.floor(Math.random() * villaNames.length);
                const name = `${villaNames[nameIndex]} ${city.name}`;
                const price = Math.floor(Math.random() * 25000) + 10000;
                const rating = (Math.random() * 1 + 4.2).toFixed(1);
                
                hotels.push({
                    id: id++,
                    name: name,
                    type: "villa",
                    price: price,
                    location: `${city.name}, ${district}`,
                    img: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%238b5cf6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-family='Arial'%3E🏡 Вилла%3C/text%3E%3C/svg%3E`,
                    rating: parseFloat(rating),
                    description: `Роскошная вилла в районе ${district} города ${city.name}.`
                });
            }
        }
    }
    
    return hotels;
}

const rooms = generateRandomHotels();

console.log(`✅ Сгенерировано ${rooms.length} отелей!`);