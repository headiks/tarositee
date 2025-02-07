const cardImages = ["card1.jpg", "card2.jpg", "card3.jpg", "card4.jpg", "card5.jpg"];
let shuffledImages = [...cardImages].sort(() => 0.5 - Math.random());
let selectedCards = [];

function revealCard(index) {
    const card = document.getElementById(`card-${index}`);
    const cardContainer = card.parentElement;

    if (shuffledImages.length > 0 && selectedCards.length < 3) {
        card.classList.add("hidden"); // Исчезновение

        setTimeout(() => {
            const newImage = shuffledImages.shift(); // Берем случайную картинку
            card.src = `images/${newImage}`;
            card.classList.remove("hidden");
            card.classList.add("visible"); // Плавное появление

            // Показать название карты
            let cardName = newImage.replace(".jpg", ""); // Убираем .jpg
            cardContainer.querySelector(".card-title").innerText = cardName;
            cardContainer.classList.add("revealed");

            // Добавляем карту в список выбранных
            selectedCards.push(cardName);

            // Если выбраны 3 карты, формируем JSON и отправляем в Telegram WebApp
            if (selectedCards.length === 3) {
                sendSelectedCards();
            }

            cardContainer.onclick = null; // Отключаем повторный клик
        }, 500);
    }
}

// Функция отправки данных в Telegram Mini App
function sendSelectedCards() {
    const jsonData = JSON.stringify({ selectedCards });

    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.sendData(jsonData); // Отправляем JSON в Telegram WebApp
        Telegram.WebApp.close(); // Закрываем Mini App после отправки
    } else {
        console.log("Выбранные карты:", jsonData); // Отладка в браузере
    }
}
