document.addEventListener('DOMContentLoaded', function() {
    // Set specific date for March 10, 2026
    const eventDateElement = document.getElementById('event-date');
    const eventDate = new Date(2026, 2, 10); // March 10, 2026 (month is 0-indexed)
    
    const kyrgyzMonths = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    
    const kyrgyzDays = [
        'жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби',
        'бейшемби', 'жума', 'ишемби'
    ];
    
    const day = eventDate.getDate();
    const month = kyrgyzMonths[eventDate.getMonth()];
    const year = eventDate.getFullYear();
    const dayName = kyrgyzDays[eventDate.getDay()];
    
    eventDateElement.textContent = `${day}-${month}, ${dayName}`;

    // Add interactive animations
    const invitationCard = document.querySelector('.invitation-card');
    const detailItems = document.querySelectorAll('.detail-item');
    const contactBtns = document.querySelectorAll('.contact-btn');

    // Stagger animation for detail items
    detailItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'slideUp 0.6s ease-out forwards';
    });

    // Add hover effects
    contactBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to contact buttons
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add confetti effect on page load
    setTimeout(() => {
        createConfetti();
    }, 1000);

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Add typing effect to the greeting
    const greeting = document.querySelector('.greeting');
    const originalText = greeting.textContent;
    greeting.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            greeting.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);

    // Add parallax effect to floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed * 20;
            const yOffset = (y - 0.5) * speed * 20;
            
            element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Add countdown timer (optional)
    function updateCountdown() {
        const eventDate = new Date(2026, 2, 10); // March 10, 2026
        const now = new Date();
        const timeLeft = eventDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            // You can add a countdown display element if needed
            console.log(`Кечке ${days} күн, ${hours} саат калды`);
        }
    }

    // Update countdown every hour
    setInterval(updateCountdown, 3600000);
    updateCountdown();
});

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#ffecd2', '#fcb69f', '#25d366'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 0.8;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall 3s ease-out forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
