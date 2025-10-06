// Arduino Adventure - Animation Controllers
// Handles complex animations and visual effects

class AnimationController {
    constructor() {
        this.activeAnimations = new Map();
        this.animationSpeed = 'normal';
        this.reducedMotion = this.checkReducedMotion();
        
        this.init();
    }

    init() {
        // Listen for reduced motion preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            mediaQuery.addListener(() => {
                this.reducedMotion = mediaQuery.matches;
            });
        }

        // Setup intersection observer for scroll animations
        this.setupScrollAnimations();
    }

    checkReducedMotion() {
        if (window.matchMedia) {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
    }

    // Level completion celebration
    celebrateCompletion(element) {
        if (this.reducedMotion) return;

        element.classList.add('level-complete-animation');
        
        // Create confetti effect
        this.createConfetti();
        
        // Play success animation
        setTimeout(() => {
            element.classList.remove('level-complete-animation');
        }, 800);
    }

    // Badge unlock animation
    animateBadgeUnlock(badgeElement) {
        if (this.reducedMotion) return;

        badgeElement.classList.add('badge-unlock-animation');
        
        // Sparkle effect
        this.addSparkles(badgeElement);
        
        setTimeout(() => {
            badgeElement.classList.remove('badge-unlock-animation');
        }, 2000);
    }

    // XP gain animation
    animateXPGain(xpElement, gainAmount) {
        if (this.reducedMotion) return;

        // Counter animation
        this.animateCounter(xpElement, gainAmount);
        
        xpElement.classList.add('xp-gain-animation');
        
        setTimeout(() => {
            xpElement.classList.remove('xp-gain-animation');
        }, 1000);
    }

    // Progress bar animation
    animateProgressBar(progressBar, targetWidth, duration = 1000) {
        if (this.reducedMotion) {
            progressBar.style.width = targetWidth;
            return;
        }

        const startWidth = parseInt(progressBar.style.width) || 0;
        const endWidth = parseInt(targetWidth);
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            const currentWidth = startWidth + (endWidth - startWidth) * easeOutCubic;
            progressBar.style.width = `${currentWidth}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Counter animation
    animateCounter(element, targetValue, duration = 1000) {
        const startValue = parseInt(element.textContent) || 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Level unlock animation
    animateLevelUnlock(levelElement) {
        if (this.reducedMotion) {
            levelElement.classList.remove('locked');
            return;
        }

        levelElement.classList.add('animate-unlock');
        levelElement.classList.remove('locked');
        
        setTimeout(() => {
            levelElement.classList.remove('animate-unlock');
        }, 800);
    }

    // Confetti creation
    createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti';
        
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDelay = Math.random() * 3 + 's';
            piece.style.backgroundColor = this.getRandomColor();
            confettiContainer.appendChild(piece);
        }
        
        document.body.appendChild(confettiContainer);
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }

    // Add sparkle effects
    addSparkles(element) {
        element.classList.add('sparkle-effect');
        
        setTimeout(() => {
            element.classList.remove('sparkle-effect');
        }, 2000);
    }

    // Random color for confetti
    getRandomColor() {
        const colors = ['#F5A623', '#7ED321', '#4A90E2', '#9013FE', '#E91E63', '#D0021B'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Scroll animations
    setupScrollAnimations() {
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Pulse animation for interactive elements
    pulse(element) {
        if (this.reducedMotion) return;
        
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 1000);
    }

    // Bounce animation
    bounce(element) {
        if (this.reducedMotion) return;
        
        element.classList.add('animate-bounce');
        setTimeout(() => {
            element.classList.remove('animate-bounce');
        }, 600);
    }

    // Wiggle animation for errors or attention
    wiggle(element) {
        if (this.reducedMotion) return;
        
        element.classList.add('animate-wiggle');
        setTimeout(() => {
            element.classList.remove('animate-wiggle');
        }, 500);
    }

    // Set animation speed
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
        document.body.classList.remove('animate-slow', 'animate-normal', 'animate-fast');
        document.body.classList.add(`animate-${speed}`);
    }

    // Stop all animations
    stopAllAnimations() {
        this.activeAnimations.forEach((animation, id) => {
            if (animation.cancel) {
                animation.cancel();
            }
        });
        this.activeAnimations.clear();
    }
}

// Create global animation controller
const Animations = new AnimationController();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.Animations = Animations;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
}