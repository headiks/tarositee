const cardImages = [
    "Башня.jpg",
    "Влюбленные.jpg",
    "Дурак.jpg",
    "Дьявол.jpg",
    "Жрец.jpg",
    "Звезда.jpg",
    "Император.jpg",
    "Императрица.jpg",
    "Клесница.jpg",
    "Колесо Фортуны.jpg",
    "Луна.jpg",
    "Маг.jpg",
    "Мир.jpg",
    "Отшельник.jpg",
    "Повешенный.jpg",
    "Сила.jpg",
    "Смерть.jpg",
    "Солнце.jpg",
    "Справедливость.jpg",
    "Страшный суд.jpg",
    "Умеренность.jpg"
];


let shuffledImages = [...cardImages].sort(() => 0.5 - Math.random());
let selectedCards = [];

function revealCard(index) {
    const card = document.getElementById(`card-${index}`);
    const cardContainer = card.parentElement;

    if (shuffledImages.length > 0 && selectedCards.length < 1) {
        card.classList.add("hidden");

        setTimeout(() => {
            const newImage = shuffledImages.shift(); 
            card.src = `images/${newImage}`;
            card.classList.remove("hidden");
            card.classList.add("visible");

            let cardName = newImage.replace(".jpg", "");
            cardContainer.querySelector(".card-title").innerText = cardName;
            cardContainer.classList.add("revealed");

            selectedCards.push(cardName);

            if (selectedCards.length === 1) {
                // Ждем 500 мс перед отправкой данных, чтобы завершилась анимация
                setTimeout(sendSelectedCards, 500);
            }

            cardContainer.onclick = null;
        }, 500); // Время на скрытие и отображение карты
    }
}

function sendSelectedCards() {
    const jsonData = JSON.stringify({ selectedCards });

    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.sendData(jsonData);
        Telegram.WebApp.close();
    } else {
        console.log("Выбранные карты:", jsonData);
    }
}
