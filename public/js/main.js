// Arduino Adventure - Main Application Logic
// Kid-friendly gamified learning platform

class ArduinoAdventure {
    constructor() {
        this.currentScreen = 'start';
        this.currentLevel = 0;
        this.playerData = {
            name: '',
            totalXP: 0,
            levelsCompleted: 0,
            badges: [],
            settings: {
                sound: true,
                voice: true,
                animationSpeed: 'normal'
            }
        };
        
        this.init();
    }

    async init() {
        // Show loading screen
        this.showLoadingScreen();
        
        // Load saved data
        await this.loadPlayerData();
        
        // Initialize components
        this.setupEventListeners();
        this.setupRubi();
        this.setupLevels();
        this.updateUI();
        
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.remove('hidden');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    async loadPlayerData() {
        // Try to load from localStorage
        const savedData = localStorage.getItem('arduino-adventure-data');
        if (savedData) {
            try {
                this.playerData = { ...this.playerData, ...JSON.parse(savedData) };
            } catch (e) {
                console.warn('Could not parse saved data');
            }
        }
    }

    savePlayerData() {
        localStorage.setItem('arduino-adventure-data', JSON.stringify(this.playerData));
    }

    setupEventListeners() {
        // Start screen buttons
        document.getElementById('start-adventure-btn').addEventListener('click', () => {
            this.showScreen('level');
            Rubi.say("Great! Let's explore all the amazing missions we have for you!");
        });

        document.getElementById('download-booklet-btn').addEventListener('click', () => {
            this.downloadActivityBooklet();
        });

        // Level screen navigation
        document.getElementById('back-to-start').addEventListener('click', () => {
            this.showScreen('start');
            Rubi.say("Welcome back! Ready to start your adventure?");
        });

        // Settings
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.toggleSettings();
        });
        
        // Settings close button
        document.getElementById('close-settings').addEventListener('click', () => {
            this.closeSettings();
        });

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Click outside modal to close
        document.getElementById('reward-modal').addEventListener('click', (e) => {
            if (e.target.id === 'reward-modal') {
                this.closeModal();
            }
        });

        // Settings toggles
        document.getElementById('sound-toggle').addEventListener('change', (e) => {
            this.playerData.settings.sound = e.target.checked;
            this.savePlayerData();
        });

        document.getElementById('voice-toggle').addEventListener('change', (e) => {
            this.playerData.settings.voice = e.target.checked;
            this.savePlayerData();
        });

        document.getElementById('animation-speed').addEventListener('change', (e) => {
            this.playerData.settings.animationSpeed = e.target.value;
            this.updateAnimationSpeed();
            this.savePlayerData();
        });
        
        // Test modal button (temporary for debugging) - guard in case it's removed
        const testBtn = document.getElementById('test-modal-btn');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                console.log('Test modal button clicked');
                this.testModal();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const panel = document.getElementById('settings-panel');
                if (panel.classList.contains('open')) {
                    this.closeSettings();
                }
            }
        });
    }

    setupRubi() {
        // Initialize Rubi assistant
        window.Rubi = new RubiAssistant();
        Rubi.say("Hi! I'm Rubi, your Arduino guide. Ready to start learning?");
    }

    setupLevels() {
        const levelMap = document.getElementById('level-map');
        levelMap.innerHTML = '';

        // Generate all 21 levels (0-20)
        for (let i = 0; i <= 20; i++) {
            const levelData = LEVEL_DATA[i];
            const levelElement = this.createLevelElement(i, levelData);
            levelMap.appendChild(levelElement);
        }
    }

    createLevelElement(levelIndex, levelData) {
        const levelItem = document.createElement('div');
        levelItem.className = 'level-item';
        levelItem.dataset.level = levelIndex;

        // Determine level state
        const isCompleted = this.playerData.levelsCompleted > levelIndex;
        const isUnlocked = levelIndex === 0 || this.playerData.levelsCompleted >= levelIndex;
        const isLocked = !isUnlocked;

        if (isCompleted) {
            levelItem.classList.add('completed');
        } else if (isLocked) {
            levelItem.classList.add('locked');
        }

        levelItem.innerHTML = `
            <div class="level-icon">
                <i class="${levelData.icon}"></i>
            </div>
            <div class="level-title">${levelData.title}</div>
            <div class="level-time">${levelData.estimatedTime}</div>
        `;

        // Add click event
        if (!isLocked) {
            levelItem.addEventListener('click', () => {
                this.startLevel(levelIndex);
            });
        } else {
            levelItem.addEventListener('click', () => {
                Rubi.say("Oops! You need to complete the previous levels first!");
                AudioManager.playSound('error');
            });
        }

        return levelItem;
    }

    startLevel(levelIndex) {
        this.currentLevel = levelIndex;
        const levelData = LEVEL_DATA[levelIndex];
        
        // Show activity screen
        this.showScreen('activity');
        this.loadLevelContent(levelIndex);
        
        // Rubi introduction
        Rubi.say(levelData.rubiIntro);
        AudioManager.playSound('level-start');
    }

    async loadLevelContent(levelIndex) {
        const activityContainer = document.querySelector('.activity-container');
        const levelData = LEVEL_DATA[levelIndex];
        
        // Show loading state
        activityContainer.innerHTML = `
            <div class="activity-loading">
                <div class="rubi-loading">
                    <i class="fas fa-robot"></i>
                </div>
                <p class="loading-dots">Loading your mission</p>
            </div>
        `;

        // Simulate loading (in real implementation, this would load actual level content)
        setTimeout(() => {
            activityContainer.innerHTML = this.generateLevelHTML(levelData);
            this.setupLevelInteractions(levelIndex);
        }, 1500);
    }

    generateLevelHTML(levelData) {
        const currentStep = levelData.steps[0];
        const hasRichContent = currentStep && (currentStep.interactiveElements || currentStep.didYouKnow || currentStep.funFacts);
        
        return `
            <div class="activity-header">
                <button class="back-btn" onclick="app.showScreen('level')">
                    <i class="fas fa-arrow-left"></i> Back to Missions
                </button>
                <h2 class="activity-title">${levelData.title}</h2>
                <div class="activity-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <span class="progress-text">Let's get started!</span>
                </div>
            </div>

            <div class="activity-content">
                <div class="story-panel">
                    <div class="story-header">
                        <i class="fas fa-book-open"></i>
                        <h3>Mission Brief</h3>
                    </div>
                    <div class="story-content">
                        <div class="story-text">${this.formatRichText(levelData.story)}</div>
                        <div class="rubi-intro">
                            <div class="rubi-avatar-mini">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="rubi-message">${this.formatRichText(levelData.rubiIntro)}</div>
                        </div>
                    </div>
                </div>

                <div class="activity-panels">
                    <div class="panel walkthrough-panel">
                        <h3><i class="fas fa-list-ol"></i> Step-by-Step Guide</h3>
                        <div class="walkthrough-content">
                            <div class="step-indicator">Step 1 of ${levelData.steps.length}</div>
                            <div class="current-step">
                                <h4>${currentStep.title}</h4>
                                <div class="step-description">${this.formatRichText(currentStep.description)}</div>
                                <div class="step-visual">
                                    <img src="${currentStep.image}" alt="Step illustration" />
                                </div>
                                ${this.generateRichStepContent(currentStep)}
                            </div>
                            <div class="step-navigation">
                                <button class="prev-step-btn btn-secondary">
                                    <i class="fas fa-arrow-left"></i> Previous
                                </button>
                                <button class="next-step-btn btn-primary">
                                    <i class="fas fa-arrow-right"></i> Next Step
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="panel simulation-panel">
                        <h3><i class="fas fa-play-circle"></i> Try It Out</h3>
                        <div class="simulation-content">
                            <div class="arduino-simulator">
                                <div class="simulator-board">
                                    <img src="/assets/images/arduino-uno-r4.png" alt="Arduino UNO R4" />
                                    <div class="led-indicators">
                                        <div class="led led-red" id="led-red"></div>
                                        <div class="led led-green" id="led-green"></div>
                                        <div class="led led-blue" id="led-blue"></div>
                                    </div>
                                </div>
                                <div class="simulator-controls">
                                    <button class="run-code-btn btn-primary">
                                        <i class="fas fa-play"></i> Run Code
                                    </button>
                                    <button class="stop-code-btn btn-secondary">
                                        <i class="fas fa-stop"></i> Stop
                                    </button>
                                </div>
                            </div>
                            <div class="simulation-help">
                                <p><i class="fas fa-info-circle"></i> Use the simulator to test your ideas before uploading to the real Arduino!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="activity-actions">
                    <button class="hint-btn btn-ghost">
                        <i class="fas fa-lightbulb"></i> Need a Hint?
                    </button>
                    <button class="complete-btn btn-primary" ${levelData.steps.length <= 1 ? '' : 'disabled'}>
                        <i class="fas fa-check"></i> Mission Complete
                    </button>
                </div>
            </div>
        `;
    }

    setupLevelInteractions(levelIndex) {
        const levelData = LEVEL_DATA[levelIndex];
        let currentStep = 0;

        // Previous step button
        document.querySelector('.prev-step-btn').addEventListener('click', () => {
            currentStep = Math.max(currentStep - 1, 0);
            this.updateStepContent(levelData, currentStep);
        });

        // Next step button
        document.querySelector('.next-step-btn').addEventListener('click', () => {
            currentStep = Math.min(currentStep + 1, levelData.steps.length - 1);
            this.updateStepContent(levelData, currentStep);
        });

        // Run code button
        document.querySelector('.run-code-btn').addEventListener('click', () => {
            this.runSimulation(levelData);
        });

        // Stop code button
        document.querySelector('.stop-code-btn').addEventListener('click', () => {
            this.stopSimulation();
        });

        // Hint button
        document.querySelector('.hint-btn').addEventListener('click', () => {
            this.showHint(levelData.hint);
        });

        // Complete button
        document.querySelector('.complete-btn').addEventListener('click', () => {
            this.completeLevel(levelIndex);
        });
    }

    updateStepContent(levelData, stepIndex) {
        const stepIndicator = document.querySelector('.step-indicator');
        const currentStepDiv = document.querySelector('.current-step');
        const nextBtn = document.querySelector('.next-step-btn');
        const completeBtn = document.querySelector('.complete-btn');

        stepIndicator.textContent = `Step ${stepIndex + 1} of ${levelData.steps.length}`;
        
        const step = levelData.steps[stepIndex];
        let stepContent = `
            <h4>${step.title}</h4>
            <div class="step-description rich-text">${this.formatRichText(step.description)}</div>
        `;
        
        // Add visual if present
        if (step.image) {
            stepContent += `
                <div class="step-visual">
                    <img src="${step.image}" alt="Step illustration" />
                </div>
            `;
        }
        
        // Add rich content elements
        stepContent += this.generateRichStepContent(step);
        
        // Add interactive elements
        if (step.interactive) {
            stepContent += `
                <div class="enhanced-interactive-element" data-type="${step.interactive.type}">
                    <h5><i class="fas fa-hand-pointer"></i> Interactive Element</h5>
                    <div>${step.interactive.content}</div>
                </div>
            `;
        }
        
        // Add challenge
        if (step.challenge) {
            stepContent += `
                <div class="step-challenge">
                    <h5><i class="fas fa-trophy"></i> Challenge</h5>
                    <p class="rich-text">${this.formatRichText(step.challenge)}</p>
                </div>
            `;
        }
        
        // Add tip
        if (step.tip) {
            stepContent += `
                <div class="step-tip">
                    <h5><i class="fas fa-lightbulb"></i> Pro Tip</h5>
                    <p class="rich-text">${this.formatRichText(step.tip)}</p>
                </div>
            `;
        }
        
        // Add code block if present
        if (step.code) {
            stepContent += `
                <div class="code-block">
                    <h5><i class="fas fa-code"></i> Code Example</h5>
                    <pre><code class="arduino">${step.code}</code></pre>
                </div>
            `;
        }
        
        currentStepDiv.innerHTML = stepContent;
        
        // Set up interactive element handlers
        this.setupInteractiveElements(step);

        // Update progress
        const progress = ((stepIndex + 1) / levelData.steps.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent = 
            `Step ${stepIndex + 1} of ${levelData.steps.length} - ${step.title}`;

        // Update navigation button visibility
        const prevBtn = document.querySelector('.prev-step-btn');
        
        // Show/hide previous button
        if (stepIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-flex';
        }
        
        // Show complete button on last step
        if (stepIndex === levelData.steps.length - 1) {
            nextBtn.style.display = 'none';
            completeBtn.disabled = false;
        } else {
            nextBtn.style.display = 'inline-flex';
            completeBtn.disabled = true;
        }

        AudioManager.playSound('step-complete');
    }
    
    setupInteractiveElements(step) {
        // Handle interactive elements
        const interactiveElements = document.querySelectorAll('.enhanced-interactive-element');
        interactiveElements.forEach(element => {
            element.addEventListener('click', () => {
                const type = element.dataset.type;
                this.handleInteractiveElement(type, element);
            });
        });
    }
    
    handleInteractiveElement(type, element) {
        switch (type) {
            case 'click':
                element.classList.add('clicked');
                AudioManager.playSound('click');
                Rubi.say('Great job! You found the interactive element!');
                setTimeout(() => element.classList.remove('clicked'), 1000);
                break;
            case 'quiz':
                // Handle quiz interactions
                this.showQuiz(element);
                break;
            case 'drag':
                // Handle drag and drop
                this.initializeDragDrop(element);
                break;
            default:
                AudioManager.playSound('interaction');
                element.style.background = 'linear-gradient(135deg, #E8F5E8, #C8E6C9)';
                setTimeout(() => {
                    element.style.background = '';
                }, 500);
        }
    }

    runSimulation(levelData) {
        // Simple LED simulation for demo
        const leds = document.querySelectorAll('.led');
        let ledIndex = 0;

        const interval = setInterval(() => {
            leds.forEach(led => led.classList.remove('active'));
            leds[ledIndex].classList.add('active');
            ledIndex = (ledIndex + 1) % leds.length;
        }, 500);

        // Store interval for stopping
        this.simulationInterval = interval;
        AudioManager.playSound('code-running');
    }

    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        
        document.querySelectorAll('.led').forEach(led => 
            led.classList.remove('active')
        );
    }

    showHint(hint) {
        Rubi.say(hint);
        AudioManager.playSound('hint');
    }

    completeLevel(levelIndex) {
        // Update player progress
        if (levelIndex >= this.playerData.levelsCompleted) {
            this.playerData.levelsCompleted = levelIndex + 1;
            this.playerData.totalXP += 100;
            
            // Award badge through rewards system
            const badge = LEVEL_DATA[levelIndex].badge;
            if (window.Rewards) {
                window.Rewards.awardBadge(badge.id, this.playerData);
            } else if (!this.playerData.badges.includes(badge.id)) {
                this.playerData.badges.push(badge.id);
            }
            
            // Check for achievements
            if (window.Rewards) {
                window.Rewards.checkAchievements(this.playerData);
            }
        }

        this.savePlayerData();
        this.showRewardModal(levelIndex);
        this.updateUI();
        
        // Update level map with animations
        this.setupLevels();
        
        // Animate progress updates
        this.animateProgressUpdates();
    }

    showRewardModal(levelIndex) {
        console.log('Showing reward modal for level:', levelIndex);
        const modal = document.getElementById('reward-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.error('Modal elements not found!');
            return;
        }
        
        const levelData = LEVEL_DATA[levelIndex];
        const badge = levelData.badge;

        modalTitle.textContent = 'Mission Complete! 🎉';
        
        console.log('Setting modal content...');
        modalContent.innerHTML = `
            <div class="reward-content">
                <div class="confetti"></div>
                <div class="badge-showcase badge-unlock-animation">
                    <div class="badge-icon">
                        <i class="${badge.icon}"></i>
                    </div>
                    <h3>${badge.name}</h3>
                    <p>${badge.description}</p>
                </div>
                <div class="xp-gain xp-gain-animation">
                    <i class="fas fa-star"></i>
                    <span>+100 XP Earned!</span>
                </div>
                <div class="reward-actions">
                    <button id="download-cert-btn" class="download-certificate-btn btn-primary" type="button">
                        <i class="fas fa-download"></i> Download Certificate
                    </button>
                    <button id="next-level-btn" class="next-level-btn btn-secondary" type="button">
                        <i class="fas fa-arrow-right"></i> Next Mission
                    </button>
                </div>
            </div>
        `;
        
        console.log('Modal content set. Adding event listeners...');

        // Add confetti
        this.showConfetti();

        // Add event listeners with delay to ensure DOM is ready
        setTimeout(() => {
            const downloadBtn = document.getElementById('download-cert-btn');
            const nextBtn = document.getElementById('next-level-btn');
            const closeBtn = modal.querySelector('.close-modal');
            
            console.log('Found buttons:', {
                downloadBtn: !!downloadBtn,
                nextBtn: !!nextBtn, 
                closeBtn: !!closeBtn
            });
            
            if (downloadBtn) {
                downloadBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Download certificate clicked');
                    this.showStudentInfoModal(levelIndex);
                };
                downloadBtn.style.pointerEvents = 'all';
                downloadBtn.style.cursor = 'pointer';
            }
            
            if (nextBtn) {
                nextBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Next level clicked');
                    this.closeModal();
                    if (levelIndex < 20) {
                        this.startLevel(levelIndex + 1);
                    } else {
                        this.showScreen('level');
                        Rubi.say("Congratulations! You've completed all missions! You're an Arduino Hero!");
                    }
                };
                nextBtn.style.pointerEvents = 'all';
                nextBtn.style.cursor = 'pointer';
            }
            
            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close modal clicked');
                    this.closeModal();
                };
            }
        }, 100);

        // Add backdrop click handler
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        };
        
        // Show modal (ensure inline display overrides CSS)
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        modal.style.pointerEvents = 'all';
        
        AudioManager.playSound('level-complete');
        Rubi.say(`Amazing work! You've unlocked the ${badge.name} badge!`);
    }

    showConfetti() {
        const confetti = document.querySelector('.confetti');
        confetti.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            confetti.appendChild(piece);
        }
    }

    closeModal() {
        const modal = document.getElementById('reward-modal');
        modal.classList.remove('active');
        modal.style.pointerEvents = 'none';
        // Hide from layout after transition
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    testModal() {
        console.log('Testing modal functionality...');
        const modal = document.getElementById('reward-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        modalTitle.textContent = 'Test Modal - Mission Complete!';
        modalContent.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h3>This is a test modal</h3>
                <p>If you can see this and click the buttons, the modal is working!</p>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
                    <button id="test-download" style="background: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Download Test</button>
                    <button id="test-next" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Next Test</button>
                    <button id="test-close" style="background: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        
        // Show modal (ensure inline display overrides CSS)
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        modal.style.pointerEvents = 'all';
        
        // Add event listeners immediately
        document.getElementById('test-download').onclick = () => {
            alert('Download button works!');
        };
        
        document.getElementById('test-next').onclick = () => {
            alert('Next button works!');
        };
        
        document.getElementById('test-close').onclick = () => {
            this.closeModal();
        };
        
        // Add backdrop click
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        };
    }

    showStudentInfoModal(levelIndex) {
        this.currentCertificateLevel = levelIndex;
        const modal = document.getElementById('student-info-modal');
        const form = document.getElementById('student-info-form');
        
        // Clear previous data
        form.reset();
        
        // Add backdrop click handler
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeStudentInfoModal();
            }
        };
        
        // Show modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            document.getElementById('student-name').focus();
        }, 10);
        
        // Setup form submission
        form.onsubmit = (e) => {
            e.preventDefault();
            this.generateCustomCertificate();
        };
    }
    
    closeStudentInfoModal() {
        const modal = document.getElementById('student-info-modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    async generateCustomCertificate() {
        const name = document.getElementById('student-name').value.trim();
        const className = document.getElementById('student-class').value.trim();
        const school = document.getElementById('student-school').value.trim();
        
        if (!name) {
            alert('Please enter your full name.');
            document.getElementById('student-name').focus();
            return;
        }
        
        const studentInfo = {
            name: name,
            className: className || null,
            school: school || null
        };
        
        const levelData = LEVEL_DATA[this.currentCertificateLevel];
        
        // Show loading state
        const submitBtn = document.querySelector('#student-info-form button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : null;
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            submitBtn.disabled = true;
        }
        
        // Phase 1: Generate + download (only this can show an error)
        try {
            const certificateGenerator = new CertificateGenerator();
            const certificateDataURL = await certificateGenerator.generateCertificate(levelData, studentInfo);
            certificateGenerator.downloadCertificate(certificateDataURL, levelData, studentInfo);
        } catch (error) {
            console.error('Certificate generation failed:', error);
            alert('Sorry, there was an error generating your certificate. Please try again.');
            if (submitBtn && originalText !== null) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            return;
        }
        
        // Phase 2: UI feedback (should never block success)
        this.closeStudentInfoModal();
        try { AudioManager.playSound('download'); } catch (e) { /* no-op */ }
        try { Rubi.say(`Congratulations ${name}! Your certificate has been downloaded. Great work on completing ${levelData.title}!`); } catch (e) { /* no-op */ }
        
        if (submitBtn && originalText !== null) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    downloadActivityBooklet() {
        // In a real implementation, this would download a PDF
        // For now, we'll show a message
        Rubi.say("The activity booklet will be available soon! For now, follow along with the on-screen instructions.");
        AudioManager.playSound('download');
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

        // Update URL without page reload
        if (history.pushState) {
            history.pushState(null, null, `#${screenName}`);
        }
    }

    updateUI() {
        // Update header stats
        document.getElementById('total-xp').textContent = `${this.playerData.totalXP} XP`;
        document.getElementById('levels-completed').textContent = `${this.playerData.levelsCompleted}/20`;

        // Update progress on start screen
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const progressPercent = (this.playerData.levelsCompleted / 20) * 100;
            progressFill.style.width = `${progressPercent}%`;
            
            if (this.playerData.levelsCompleted === 0) {
                progressText.textContent = 'Ready to begin!';
            } else if (this.playerData.levelsCompleted === 20) {
                progressText.textContent = 'Adventure Complete! 🎉';
            } else {
                progressText.textContent = `${this.playerData.levelsCompleted} of 20 missions completed`;
            }
        }

        // Update settings
        document.getElementById('sound-toggle').checked = this.playerData.settings.sound;
        document.getElementById('voice-toggle').checked = this.playerData.settings.voice;
        document.getElementById('animation-speed').value = this.playerData.settings.animationSpeed;
    }

    toggleSettings() {
        const panel = document.getElementById('settings-panel');
        const isOpen = panel.classList.contains('open');
        
        if (isOpen) {
            this.closeSettings();
        } else {
            this.openSettings();
        }
    }
    
    openSettings() {
        const panel = document.getElementById('settings-panel');
        const settingsBtn = document.getElementById('settings-btn');
        
        panel.classList.add('open');
        settingsBtn.style.transform = 'rotate(45deg)';
        
        // Add backdrop click to close
        this.addSettingsBackdrop();
    }
    
    closeSettings() {
        const panel = document.getElementById('settings-panel');
        const settingsBtn = document.getElementById('settings-btn');
        
        panel.classList.remove('open');
        settingsBtn.style.transform = 'rotate(0deg)';
        
        // Remove backdrop
        this.removeSettingsBackdrop();
    }
    
    addSettingsBackdrop() {
        // Remove existing backdrop
        this.removeSettingsBackdrop();
        
        const backdrop = document.createElement('div');
        backdrop.className = 'settings-backdrop';
        backdrop.addEventListener('click', () => {
            this.closeSettings();
        });
        
        document.body.appendChild(backdrop);
    }
    
    removeSettingsBackdrop() {
        const backdrop = document.querySelector('.settings-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    updateAnimationSpeed() {
        const speed = this.playerData.settings.animationSpeed;
        document.body.className = document.body.className.replace(/animate-\w+/g, '');
        document.body.classList.add(`animate-${speed}`);
    }
    
    formatRichText(text) {
        if (!text) return '';
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    generateRichStepContent(step) {
        let content = '';
        
        if (step.didYouKnow) {
            content += `<div class="did-you-know">
                <h5><i class="fas fa-lightbulb"></i> Did You Know?</h5>
                <ul>${step.didYouKnow.map(fact => `<li>${fact}</li>`).join('')}</ul>
            </div>`;
        }
        
        if (step.funFacts) {
            content += `<div class="fun-facts">
                <h5><i class="fas fa-star"></i> Fun Facts</h5>
                <ul>${step.funFacts.map(fact => `<li>${fact}</li>`).join('')}</ul>
            </div>`;
        }
        
        return content;
    }
    
    animateProgressUpdates() {
        // Animate XP counter
        const xpElement = document.getElementById('total-xp');
        if (xpElement && window.Animations) {
            window.Animations.animateXPGain(xpElement, this.playerData.totalXP);
        }
        
        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const targetWidth = (this.playerData.levelsCompleted / 20) * 100;
            if (window.Animations) {
                window.Animations.animateProgressBar(bar, `${targetWidth}%`);
            } else {
                bar.style.width = `${targetWidth}%`;
            }
        });
        
        // Animate level counters
        const levelCounter = document.getElementById('levels-completed');
        if (levelCounter && window.Animations) {
            const counterText = levelCounter.textContent.split('/')[0];
            window.Animations.animateCounter(levelCounter, parseInt(counterText));
        }
    }
}

// App will be initialized from HTML

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '') || 'start';
    if (window.app) {
        window.app.showScreen(hash);
    }
});

// Add CSS for LED simulation
const simulatorStyles = `
<style>
.led {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    transition: all 0.3s ease;
}

.led.active {
    box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
}

.led-red.active { background: #D0021B; }
.led-green.active { background: #7ED321; }
.led-blue.active { background: #4A90E2; }

.activity-loading {
    text-align: center;
    padding: 4rem 2rem;
}

.activity-loading .rubi-loading {
    font-size: 3rem;
    color: #F5A623;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
}

.arduino-simulator {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
}

.simulator-board {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
}

.led-indicators {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', simulatorStyles);

// Add error handling for the app
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    console.error('Stack:', e.error.stack);
});

// Ensure the app is available globally
if (typeof window.app === 'undefined') {
    console.warn('App not initialized properly');
}
