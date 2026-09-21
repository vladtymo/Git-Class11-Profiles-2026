
        // 1. Покращена кнопка копіювання посилання
        const copyBtn = document.getElementById('copyLink');
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(location.href);
                const old = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.style.borderColor = 'var(--brand)';
                setTimeout(() => {
                    copyBtn.textContent = old;
                    copyBtn.style.borderColor = '';
                }, 1500);
            } catch { }
        });

        // 2. Збереження контрастної теми в localStorage
        const toggleBtn = document.getElementById('toggleContrast');
        let high = localStorage.getItem('highContrast') === 'true';

        function applyTheme(isHigh) {
            document.documentElement.style.setProperty('--bg', isHigh ? '#05070f' : '');
            document.documentElement.style.setProperty('--card', isHigh ? '#0a0f22' : '');
            document.documentElement.style.setProperty('--card-2', isHigh ? '#0b1020' : '');
            document.documentElement.style.setProperty('--text', isHigh ? '#f2f6ff' : '');
            document.documentElement.style.setProperty('--border', isHigh ? '#243463' : '');
        }
        
        // Застосовуємо тему при завантаженні
        applyTheme(high);

        toggleBtn.addEventListener('click', () => {
            high = !high;
            localStorage.setItem('highContrast', high);
            applyTheme(high);
        });

        // 3. Інтерактивні вкладки (Tabs)
        const tabsRoot = document.getElementById('profileTabs');
        const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
        const panels = Array.from(tabsRoot.querySelectorAll('.tabpanel'));
        
        function activate(id) {
            tabs.forEach(t => t.dataset.active = (t.dataset.tab === id));
            panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
        }
        tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
        activate('edu');

        // 4. Покращена карусель (з автопрокруткою та управлінням з клавіатури)
        const carousel = document.getElementById('photoCarousel');
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const dotsContainer = document.getElementById('carouselDots');
        let currentIndex = 0;
        let slideInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        function updateDots(index) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function moveToSlide(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots(currentIndex);
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
            resetInterval();
        });

        // Керування стрілками клавіатури, якщо карусель у фокусі або наведені
        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                moveToSlide(currentIndex + 1);
                resetInterval();
            } else if (e.key === 'ArrowLeft') {
                moveToSlide(currentIndex - 1);
                resetInterval();
            }
        });

        // Автопрокрутка кожні 4 секунди
        function startInterval() {
            slideInterval = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 4000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Зупинка автопрокрутки при наведенні миші
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => startInterval());

        startInterval();

        // 5. Ефект плавного ظهور (fade-in) карток при прокручуванні
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });