// Arduino Adventure - Rewards System
// Handles badges, certificates, and achievement management

class RewardsManager {
    constructor() {
        this.badges = new Map();
        this.achievements = new Map();
        this.certificates = new Map();
        
        this.init();
    }

    init() {
        this.initializeBadges();
        this.initializeAchievements();
    }

    // Initialize all available badges
    initializeBadges() {
        const badgeDefinitions = [
            {
                id: 'explorer',
                name: 'Explorer Badge',
                icon: 'fas fa-compass',
                description: "You've started your Arduino journey!",
                color: '#4A90E2',
                rarity: 'common'
            },
            {
                id: 'light-beginner',
                name: 'Light Beginner',
                icon: 'fas fa-lightbulb',
                description: 'You made your first LED blink!',
                color: '#F5A623',
                rarity: 'common'
            },
            {
                id: 'sound-scout',
                name: 'Sound Scout',
                icon: 'fas fa-volume-up',
                description: 'You mastered the art of Arduino sounds!',
                color: '#7ED321',
                rarity: 'common'
            },
            {
                id: 'disco-maker',
                name: 'Disco Maker',
                icon: 'fas fa-palette',
                description: 'You created an amazing light show!',
                color: '#E91E63',
                rarity: 'uncommon'
            },
            {
                id: 'code-wizard',
                name: 'Code Wizard',
                icon: 'fas fa-magic',
                description: 'You mastered the power of loops!',
                color: '#9013FE',
                rarity: 'uncommon'
            },
            {
                id: 'button-master',
                name: 'Button Master',
                icon: 'fas fa-hand-pointer',
                description: 'You learned to control with buttons!',
                color: '#4A90E2',
                rarity: 'common'
            },
            {
                id: 'musician',
                name: 'Musician',
                icon: 'fas fa-music',
                description: 'You created your own Arduino piano!',
                color: '#FF6B35',
                rarity: 'uncommon'
            },
            {
                id: 'control-captain',
                name: 'Control Captain',
                icon: 'fas fa-sliders-h',
                description: 'You mastered analog input controls!',
                color: '#4ECDC4',
                rarity: 'uncommon'
            },
            {
                id: 'light-engineer',
                name: 'Light Engineer',
                icon: 'fas fa-adjust',
                description: 'You learned to control light intensity!',
                color: '#F5A623',
                rarity: 'uncommon'
            },
            {
                id: 'weather-watcher',
                name: 'Weather Watcher',
                icon: 'fas fa-cloud-sun',
                description: 'You created a temperature-reactive system!',
                color: '#45B7D1',
                rarity: 'rare'
            },
            {
                id: 'number-genius',
                name: 'Number Genius',
                icon: 'fas fa-calculator',
                description: 'You mastered digital number displays!',
                color: '#96CEB4',
                rarity: 'uncommon'
            },
            {
                id: 'counter-pro',
                name: 'Counter Pro',
                icon: 'fas fa-plus-circle',
                description: 'You became an expert at counting!',
                color: '#FFEAA7',
                rarity: 'uncommon'
            },
            {
                id: 'game-coder',
                name: 'Game Coder',
                icon: 'fas fa-gamepad',
                description: 'You built your own memory game!',
                color: '#A29BFE',
                rarity: 'rare'
            },
            {
                id: 'detective',
                name: 'Detective',
                icon: 'fas fa-search',
                description: 'You caught the thief with touch control!',
                color: '#6C5CE7',
                rarity: 'rare'
            },
            {
                id: 'creative-coder',
                name: 'Creative Coder',
                icon: 'fas fa-paint-brush',
                description: 'You created art with code!',
                color: '#FD79A8',
                rarity: 'rare'
            },
            {
                id: 'game-designer',
                name: 'Game Designer',
                icon: 'fas fa-trophy',
                description: 'You built your own video game!',
                color: '#FDCB6E',
                rarity: 'epic'
            },
            {
                id: 'smart-builder',
                name: 'Smart Builder',
                icon: 'fas fa-home',
                description: 'You built a smart home system!',
                color: '#00B894',
                rarity: 'rare'
            },
            {
                id: 'eco-hero',
                name: 'Eco Hero',
                icon: 'fas fa-leaf',
                description: 'You built an automated greenhouse!',
                color: '#00CEC9',
                rarity: 'epic'
            },
            {
                id: 'ai-explorer',
                name: 'AI Explorer',
                icon: 'fas fa-brain',
                description: 'You built a voice-controlled system!',
                color: '#E17055',
                rarity: 'legendary'
            },
            {
                id: 'science-seeker',
                name: 'Science Seeker',
                icon: 'fas fa-flask',
                description: 'You conducted amazing sensor experiments!',
                color: '#81ECEC',
                rarity: 'epic'
            },
            {
                id: 'sound-magician',
                name: 'Sound Magician',
                icon: 'fas fa-magic',
                description: 'You mastered the magical theremin!',
                color: '#A29BFE',
                rarity: 'legendary'
            }
        ];

        badgeDefinitions.forEach(badge => {
            this.badges.set(badge.id, badge);
        });
    }

    // Initialize achievements
    initializeAchievements() {
        const achievementDefinitions = [
            {
                id: 'first-steps',
                name: 'First Steps',
                description: 'Complete your first level',
                condition: (playerData) => playerData.levelsCompleted >= 1,
                points: 50
            },
            {
                id: 'fast-learner',
                name: 'Fast Learner',
                description: 'Complete 5 levels in one session',
                condition: (playerData) => playerData.levelsCompleted >= 5,
                points: 100
            },
            {
                id: 'perfectionist',
                name: 'Perfectionist',
                description: 'Complete a level without using hints',
                condition: (playerData) => playerData.statistics.hintsUsed === 0 && playerData.levelsCompleted > 0,
                points: 75
            },
            {
                id: 'collector',
                name: 'Badge Collector',
                description: 'Earn 10 different badges',
                condition: (playerData) => playerData.badges.length >= 10,
                points: 150
            },
            {
                id: 'arduino-hero',
                name: 'Arduino Hero',
                description: 'Complete all 20 levels',
                condition: (playerData) => playerData.levelsCompleted >= 20,
                points: 500
            }
        ];

        achievementDefinitions.forEach(achievement => {
            this.achievements.set(achievement.id, achievement);
        });
    }

    // Award badge to player
    awardBadge(badgeId, playerData) {
        const badge = this.badges.get(badgeId);
        if (!badge) {
            console.warn(`Badge not found: ${badgeId}`);
            return false;
        }

        if (playerData.badges.includes(badgeId)) {
            return false; // Already earned
        }

        playerData.badges.push(badgeId);
        
        // Show badge notification
        this.showBadgeNotification(badge);
        
        // Trigger animation
        if (window.Animations) {
            const badgeElement = document.querySelector('.badge-showcase');
            if (badgeElement) {
                window.Animations.animateBadgeUnlock(badgeElement);
            }
        }

        return true;
    }

    // Check and award achievements
    checkAchievements(playerData) {
        const newAchievements = [];

        this.achievements.forEach((achievement, id) => {
            if (!playerData.achievements.includes(id) && achievement.condition(playerData)) {
                playerData.achievements.push(id);
                newAchievements.push(achievement);
                
                // Award achievement points
                playerData.totalXP += achievement.points;
            }
        });

        // Show achievement notifications
        newAchievements.forEach(achievement => {
            this.showAchievementNotification(achievement);
        });

        return newAchievements;
    }

    // Generate certificate
    generateCertificate(levelIndex, playerData) {
        const levelData = LEVEL_DATA[levelIndex];
        const badge = this.badges.get(levelData.badge.id);
        
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1200;
            canvas.height = 800;

            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // White certificate area
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillRect(100, 100, canvas.width - 200, canvas.height - 200);

            // Border
            ctx.strokeStyle = badge ? badge.color : '#4A90E2';
            ctx.lineWidth = 8;
            ctx.strokeRect(120, 120, canvas.width - 240, canvas.height - 240);

            // Title
            ctx.fillStyle = '#2C3E50';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Certificate of Achievement', canvas.width / 2, 220);

            // Subtitle
            ctx.font = '36px Arial';
            ctx.fillStyle = '#666';
            ctx.fillText('Arduino Adventure', canvas.width / 2, 280);

            // Main content
            ctx.font = '32px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText('This certifies that', canvas.width / 2, 360);

            // Player name
            ctx.font = 'bold 48px Arial';
            ctx.fillStyle = badge ? badge.color : '#4A90E2';
            const playerName = playerData.name || 'Arduino Explorer';
            ctx.fillText(playerName, canvas.width / 2, 430);

            // Achievement
            ctx.font = '32px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText('has successfully completed', canvas.width / 2, 490);

            // Level title
            ctx.font = 'bold 36px Arial';
            ctx.fillStyle = '#7ED321';
            ctx.fillText(levelData.title, canvas.width / 2, 550);

            // Date
            ctx.font = '24px Arial';
            ctx.fillStyle = '#888';
            const date = new Date().toLocaleDateString();
            ctx.fillText(`Completed on ${date}`, canvas.width / 2, 620);

            // Badge icon area
            if (badge) {
                ctx.font = '64px Arial';
                ctx.fillStyle = badge.color;
                ctx.fillText('🏆', canvas.width / 2, 700);
            }

            // Convert to blob and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `arduino-adventure-${levelData.title.toLowerCase().replace(/\s+/g, '-')}-certificate.png`;
                link.click();
                URL.revokeObjectURL(url);
                resolve(true);
            });
        });
    }

    // Show badge notification
    showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="badge-icon" style="color: ${badge.color}">
                    <i class="${badge.icon}"></i>
                </div>
                <div class="notification-text">
                    <h4>Badge Unlocked!</h4>
                    <p>${badge.name}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="achievement-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="notification-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.name}</p>
                    <small>+${achievement.points} XP</small>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Get badge by ID
    getBadge(badgeId) {
        return this.badges.get(badgeId);
    }

    // Get all badges
    getAllBadges() {
        return Array.from(this.badges.values());
    }

    // Get earned badges for player
    getEarnedBadges(playerData) {
        return playerData.badges.map(badgeId => this.badges.get(badgeId)).filter(Boolean);
    }

    // Get completion rate
    getCompletionRate(playerData) {
        return Math.round((playerData.levelsCompleted / 21) * 100);
    }

    // Get next badge preview
    getNextBadge(playerData) {
        const nextLevel = playerData.levelsCompleted;
        if (nextLevel < 21 && LEVEL_DATA[nextLevel]) {
            const nextBadgeId = LEVEL_DATA[nextLevel].badge.id;
            return this.badges.get(nextBadgeId);
        }
        return null;
    }
}

// Create global rewards manager
const Rewards = new RewardsManager();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.Rewards = Rewards;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Rewards;
}