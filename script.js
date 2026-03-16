// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 500);
});

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Отправка заявки в Telegram через Bot API
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const button = this.querySelector('button[type="submit"]');
            button.textContent = 'Отправляем...';
            button.disabled = true;

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const car = document.getElementById('car').value.trim();
            const message = document.getElementById('message').value.trim() || 'Нет дополнительного сообщения';

            const text = `🚗 Новая заявка с сайта!\n\n👤 Имя: ${name}\n📱 Телефон: ${phone}\n🚘 Авто: ${car}\n💬 Сообщение: ${message}`;

            const token = '8218212432:AAGx_38UIaef1QM36qJDpEh_bKsWjnGvgWo';     // Проверь, что здесь правильный токен
            const chatId = '-5044513353';                  // Вот твой правильный chat_id
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('Спасибо! Заявка отправлена. Свяжемся с вами в ближайшие 30 минут 🚀');
                        this.reset();
                    } else {
                        alert('Ошибка: ' + data.description);
                    }
                })
                .catch(error => {
                    alert('Ошибка сети. Проверьте интернет.');
                })
                .finally(() => {
                    button.textContent = 'Получить бесплатную консультацию';
                    button.disabled = false;
                });
        });
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.3)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 212, 255, 0.1)';
        }
    }
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

