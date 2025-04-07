const heroes = [
    'Описание героя 1',
    'Описание героя 2',
    'Описание героя 3',
    'Описание героя 4',
    'Описание героя 5',
    'Описание героя 6',
    'Описание героя 7',
    'Описание героя 8',
    'Описание героя 9',
    'Описание героя 10',
    'Описание героя 11',
    'Описание героя 12'
];

const heroesCircle = document.getElementById('heroes-circle');

// Получаем элементы для модального окна
const registrationModal = document.getElementById('registration-modal');
const openRegistrationBtn = document.querySelector('.open-registration');
const closeRegistrationBtn = document.querySelector('.close-btn');

// Функция для открытия модального окна
openRegistrationBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    registrationModal.style.display = 'flex'; // Показываем окно
});

// Функция для закрытия модального окна
function closeRegistration() {
    registrationModal.style.display = 'none'; // Скрываем окно
}

// Закрытие модального окна при клике вне окна
window.addEventListener('click', function(event) {
    if (event.target === registrationModal) {
        closeRegistration();
    }
});

// Создаем круг с героями
heroes.forEach((hero, index) => {
    const heroDiv = document.createElement('div');
    heroDiv.className = 'hero';

    // Позиционирование вокруг часов
    const angle = (index * (360 / heroes.length)); // Угол в градусах
    const radius = 125; // Радиус, на котором будут размещены персонажи

    // Преобразуем угол в радианы
    const radians = angle * (Math.PI / 180);

    // Вычисляем координаты
    const top = 50 + (radius * Math.sin(radians)); // Y-координата
    const left = 50 + (radius * Math.cos(radians)); // X-координата

    heroDiv.style.position = 'absolute';
    heroDiv.style.top = `${top}%`;
    heroDiv.style.left = `${left}%`;
    
    // Если есть изображение, добавляем его
    const img = document.createElement('img');
    img.src = `img/${index + 1}.jpg`; // Укажите путь к изображению
    img.alt = `Герой ${index + 1}`;
    
    heroDiv.appendChild(img);
    heroDiv.onclick = () => showDescription(hero);
    
    heroesCircle.appendChild(heroDiv);
});

// Функция для отображения описания героя
function showDescription(description) {
    const descriptionBox = document.querySelector('.description');
    descriptionBox.innerText = description; // Заменяем на ваше описание
    descriptionBox.style.display = 'block'; // Отображаем описание
}

// Функция для скрытия описания
function hideDescription() {
    const descriptionBox = document.querySelector('.description');
    descriptionBox.style.display = 'none';
}

// Добавим обработчик клика вне описания, чтобы скрыть его
document.addEventListener('click', (event) => {
    const descriptionBox = document.querySelector('.description');
    if (!descriptionBox.contains(event.target) && event.target.className !== 'hero') {
        hideDescription();
    }
});

// Функция для отсчета времени
function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown-timer").innerHTML = "Время вышло!";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown-timer").innerHTML =
            `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
}

// Укажи свою дату (ГОД, МЕСЯЦ (0-11), ДЕНЬ, ЧАСЫ, МИНУТЫ, СЕКУНДЫ)
const countdownDate = new Date(2025, 5, 26, 12, 0, 0).getTime(); // 1 июня 2025, 12:00
startCountdown(countdownDate);

// Функция для анимации обновления цифры таймера
function updateCountdown(digitElement, newValue) {
    if (digitElement.textContent !== newValue) {
        digitElement.setAttribute("data-next", newValue);
        digitElement.classList.add("animating");

        setTimeout(() => {
            digitElement.textContent = newValue;
            digitElement.classList.remove("animating");
        }, 500);
    }
}

// Пример обновления секунд
setInterval(() => {
    let seconds = new Date().getSeconds();
    let digits = document.querySelectorAll(".countdown-digit");
    let sec1 = Math.floor(seconds / 10);
    let sec2 = seconds % 10;

    updateCountdown(digits[3], sec1);
    updateCountdown(digits[4], sec2);
}, 1000);

// Функция для отправки формы регистрации
async function submitRegistration(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    // Проверка минимальной длины пароля
    if (password.length < 6) {
        alert('Пароль должен содержать минимум 6 символов');
        return;
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Регистрация успешна!');
            closeRegistration();
            // Очищаем форму
            document.getElementById('registration-form').reset();
        } else {
            alert(data.error || 'Ошибка при регистрации');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
            alert('Сервер не отвечает. Пожалуйста, проверьте, запущен ли сервер.');
        } else {
            alert('Ошибка при отправке данных: ' + error.message);
        }
    }
}
