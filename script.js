document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const mainContainer = document.getElementById('mainContainer');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const wishBtn = document.getElementById('wishBtn');
    const confettiContainer = document.getElementById('confettiContainer');
    const particlesContainer = document.getElementById('particles');
    const typedTextElement = document.getElementById('typedText');
    const timelineContainer = document.querySelector('.timeline');
    const galleryContainer = document.getElementById('galleryContainer');
    const messageScroll = document.getElementById('messageScroll');
    const seal = document.getElementById('seal');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const currentDateElement = document.getElementById('currentDate');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.getElementById('closeModal');
    const namePlaceholder = document.getElementById('namePlaceholder');

    // Data
    const memories = [
        {
            title: "When We First Met",
            content: "I'll never forget how the room lit up when you walked in. Your smile was the most beautiful thing I'd ever seen.",
            date: "June 12, 2022",
            icon: "fas fa-heart"
        },
        {
            title: "Our First Conversation",
            content: "We talked for hours like we'd known each other forever. I knew then you were someone special.",
            date: "June 15, 2022",
            icon: "fas fa-comments"
        },
        {
            title: "That Time You Made Me Laugh",
            content: "Your sense of humor is one of my favorite things about you. That day we couldn't stop laughing was magical.",
            date: "July 3, 2022",
            icon: "fas fa-laugh-squint"
        }
    ];

    const additionalMemories = [
        {
            title: "Your Thoughtful Gesture",
            content: "When you did that sweet thing just because you knew it would make me happy.",
            date: "August 10, 2022",
            icon: "fas fa-gift"
        },
        {
            title: "Our Shared Moment",
            content: "That time we both noticed the same little detail and smiled at each other without saying a word.",
            date: "September 5, 2022",
            icon: "fas fa-eye"
        },
        {
            title: "When You Inspired Me",
            content: "You have this amazing way of seeing the world that makes me want to be better.",
            date: "October 18, 2022",
            icon: "fas fa-lightbulb"
        }
    ];

    const galleryItems = [
        {
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            caption: "That beautiful smile I adore",
            date: "Summer 2022"
        },
        {
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            caption: "Your sparkling eyes that light up my world",
            date: "Fall 2022"
        },
        {
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            caption: "Pure joy when you're happy",
            date: "Winter 2022"
        },
        {
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            caption: "Your radiant energy",
            date: "Spring 2023"
        }
    ];

    const messageContent = [
        "My Dearest,",
        "On your special day, I want you to know how incredibly amazing you are. Your kindness, your laughter, and the way you see the world - all of it makes my life brighter.",
        "I cherish every moment we've shared and look forward to creating many more beautiful memories together.",
        "You have this magical ability to make ordinary moments feel extraordinary. Whether we're talking for hours or sitting in comfortable silence, every second with you is precious.",
        "May this year bring you all the happiness, success, and love you deserve. You're the most wonderful person I know, and I'm so grateful to have you in my life.",
        "Always remember how special you are to me and to everyone who knows you. The world is better with you in it.",
        "With all my heart,",
        "<span class='signature'>[Your Name]</span>"
    ];

    const typedMessages = [
        "You make every day brighter...",
        "Your smile is my favorite sight...",
        "I'm so lucky to know you...",
        "Wishing you the happiest of birthdays!",
        "May all your dreams come true!",
        "You deserve the world and more..."
    ];

    // Initialize
    initApp();

    function initApp() {
        simulateLoading();
        personalizeFromURL();
        setupEventListeners();
    }

    function simulateLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        mainContainer.style.opacity = '1';
                        initAnimations();
                        loadContent();
                    }, 800);
                }, 300);
            }
        }, 200);
    }

    function initAnimations() {
        createParticles();
        initTypedJS();
        startCountdown();
        updateCurrentDate();
    }

    function loadContent() {
        loadMemories();
        loadGallery();
        loadMessage();
    }

    function setupEventListeners() {
        // Music control
        musicBtn.addEventListener('click', toggleMusic);
        
        // Wish button
        wishBtn.addEventListener('click', handleWish);
        
        // View more memories
        viewMoreBtn.addEventListener('click', toggleAdditionalMemories);
        
        // Seal to reveal message
        seal.addEventListener('click', revealMessage);
        
        // Share button
        if (navigator.share) {
            shareBtn.addEventListener('click', sharePage);
        } else {
            shareBtn.addEventListener('click', copyLink);
        }
        
        // Gallery modal
        setupGalleryModal();
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                showToast('Music playing');
            }).catch(e => {
                console.log("Autoplay prevented:", e);
                showToast('Click to play music');
            });
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            showToast('Music paused');
        }
    }

    function handleWish() {
        createConfetti();
        animateCake();
        wishBtn.textContent = "Your wish will come true!";
        wishBtn.style.backgroundColor = '#4CAF50';
        showToast('Your wish has been sent! ✨');
        
        setTimeout(() => {
            wishBtn.textContent = "Blow Out Candles!";
            wishBtn.style.backgroundColor = '';
        }, 3000);
    }

    function createConfetti() {
        confettiContainer.style.display = 'block';
        confettiContainer.innerHTML = '';
        
        const confettiCount = window.innerWidth < 768 ? 80 : 150;
        const colors = ['#ff6b6b', '#ff8e8e', '#ff4757', '#ff7675', '#ff9ff3', '#feca57', '#ff9f43'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotation = Math.random() * 360;
            
            Object.assign(confetti.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                backgroundColor: color,
                transform: `rotate(${rotation}deg)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0'
            });
            
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.style.display = 'none';
        }, 5000);
    }

    function animateCake() {
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.style.animation = 'flicker 0.3s infinite alternate';
            flame.style.height = '30px';
            flame.style.width = '18px';
        });
        
        setTimeout(() => {
            flames.forEach(flame => {
                flame.style.animation = '';
                flame.style.height = '';
                flame.style.width = '';
            });
        }, 3000);
    }

    function initTypedJS() {
        new Typed(typedTextElement, {
            strings: typedMessages,
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            shuffle: true,
            smartBackspace: false
        });
    }

    function loadMemories() {
        memories.forEach((memory, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="memory-header">
                        <i class="${memory.icon}"></i>
                        <h3>${memory.title}</h3>
                    </div>
                    <p>${memory.content}</p>
                    <div class="memory-date">${memory.date}</div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });
    }

    let memoriesLoaded = false;
    function toggleAdditionalMemories() {
        if (!memoriesLoaded) {
            loadAdditionalMemories();
            viewMoreBtn.textContent = "Collapse Memories";
            memoriesLoaded = true;
        } else {
            const additionalItems = document.querySelectorAll('.timeline-item.additional');
            additionalItems.forEach(item => {
                item.style.maxHeight = '0';
                item.style.opacity = '0';
                item.style.marginBottom = '0';
                setTimeout(() => item.remove(), 500);
            });
            viewMoreBtn.textContent = "View More Memories";
            memoriesLoaded = false;
        }
    }

    function loadAdditionalMemories() {
        additionalMemories.forEach((memory, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item additional ${memories.length + index % 2 === 0 ? 'left' : 'right'}`;
            timelineItem.style.maxHeight = '0';
            timelineItem.style.opacity = '0';
            timelineItem.style.overflow = 'hidden';
            timelineItem.style.transition = 'all 0.5s ease';
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="memory-header">
                        <i class="${memory.icon}"></i>
                        <h3>${memory.title}</h3>
                    </div>
                    <p>${memory.content}</p>
                    <div class="memory-date">${memory.date}</div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
            
            setTimeout(() => {
                timelineItem.style.maxHeight = '500px';
                timelineItem.style.opacity = '1';
                timelineItem.style.marginBottom = '25px';
            }, index * 100);
        });
    }

    function loadGallery() {
        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="Special moment" loading="lazy">
                <div class="overlay">
                    <div class="overlay-caption">${item.caption}</div>
                    <div class="overlay-date">${item.date}</div>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    function setupGalleryModal() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('.overlay-caption').textContent;
                const date = this.querySelector('.overlay-date').textContent;
                
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalCaption.innerHTML = `
                    <div class="modal-caption">${caption}</div>
                    <div class="modal-date">${date}</div>
                `;
                
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', closeGalleryModal);
        
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    function closeGalleryModal() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function loadMessage() {
        messageContent.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerHTML = paragraph;
            messageScroll.appendChild(p);
        });
    }

    function revealMessage() {
        seal.style.transform = 'translate(-50%, -50%) scale(0)';
        seal.style.opacity = '0';
        setTimeout(() => {
            seal.style.display = 'none';
            messageScroll.style.opacity = '1';
            messageScroll.style.transform = 'translateY(0)';
        }, 300);
    }

    function startCountdown() {
        // Set to next month's 1st as example
        const countDownDate = new Date();
        countDownDate.setMonth(countDownDate.getMonth() + 1);
        countDownDate.setDate(1);
        countDownDate.setHours(12, 0, 0, 0);
        
        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.querySelector('.countdown-container').innerHTML = `
                    <p class="countdown-ended">We're together now! <i class="fas fa-heart"></i></p>
                `;
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    function updateCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString(undefined, options);
    }

    function sharePage() {
        navigator.share({
            title: 'Birthday Wishes',
            text: 'Check out this special birthday wish I created!',
            url: window.location.href
        }).catch(err => {
            showToast('Sharing cancelled');
        });
    }

    function copyLink() {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showToast('Link copied to clipboard!');
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function personalizeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        if (name) {
            namePlaceholder.textContent = name;
            
            // Update the page title too
            document.title = `Happy Birthday, ${name}!`;
            
            // Update the first message
            if (messageContent.length > 0) {
                messageContent[0] = `My Dearest ${name},`;
            }
        }
    }

    // Prevent rubber banding on iOS when modal is open
    document.body.addEventListener('touchmove', function(e) {
        if (galleryModal.style.display === 'block') {
            e.preventDefault();
        }
    }, { passive: false });

    // Add animation to gallery items when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
});