// Arduino Adventure - Rubi Assistant
// The friendly robot guide that helps kids through their journey

class RubiAssistant {
    constructor() {
        this.currentMessage = '';
        this.messageQueue = [];
        this.isVisible = true;
        this.voiceEnabled = true;
        this.messageTimeout = null;
        
        this.init();
    }

    init() {
        this.messageElement = document.getElementById('rubi-message');
        this.avatarElement = document.querySelector('.rubi-avatar');
        this.speechBubble = document.querySelector('.rubi-speech-bubble');
        
        // Set initial visibility
        this.show();
        
        // Add click handler for Rubi avatar
        this.avatarElement.addEventListener('click', () => {
            this.toggle();
        });
    }

    say(message, duration = 5000) {
        // Add message to queue
        this.messageQueue.push({ message, duration });
        
        // Process queue if not already processing
        if (this.messageQueue.length === 1) {
            this.processMessageQueue();
        }
    }

    async processMessageQueue() {
        while (this.messageQueue.length > 0) {
            const { message, duration } = this.messageQueue.shift();
            await this.displayMessage(message, duration);
        }
    }

    displayMessage(message, duration) {
        return new Promise((resolve) => {
            this.currentMessage = message;
            this.messageElement.textContent = message;
            
            // Show speech bubble if hidden
            this.show();
            
            // Add talking animation to avatar
            this.avatarElement.classList.add('animate-wiggle');
            
            // Play text-to-speech if enabled
            if (this.voiceEnabled && window.app && window.app.playerData.settings.voice) {
                this.speak(message);
            }
            
            // Clear timeout if exists
            if (this.messageTimeout) {
                clearTimeout(this.messageTimeout);
            }
            
            // Auto-hide after duration
            this.messageTimeout = setTimeout(() => {
                this.avatarElement.classList.remove('animate-wiggle');
                resolve();
            }, duration);
        });
    }

    speak(text) {
        // Check if browser supports speech synthesis
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Create utterance
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configure voice settings for kids
            utterance.rate = 0.9;  // Slightly slower for clarity
            utterance.pitch = 1.1; // Slightly higher pitch for friendliness
            utterance.volume = 0.8;
            
            // Try to use a friendly voice
            const voices = speechSynthesis.getVoices();
            const kidsVoice = voices.find(voice => 
                voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('woman') ||
                voice.name.toLowerCase().includes('child')
            );
            
            if (kidsVoice) {
                utterance.voice = kidsVoice;
            }
            
            // Speak the text
            speechSynthesis.speak(utterance);
        }
    }

    show() {
        document.getElementById('rubi-assistant').style.display = 'flex';
        this.isVisible = true;
    }

    hide() {
        document.getElementById('rubi-assistant').style.display = 'none';
        this.isVisible = false;
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    // Predefined encouraging messages
    encourage() {
        const encouragements = [
            "You're doing amazing! Keep going!",
            "Great job! You're learning so fast!",
            "Wow, you're becoming a real Arduino expert!",
            "I'm so proud of your progress!",
            "You're on fire! Keep up the excellent work!",
            "Amazing! You're getting better with each level!",
            "Fantastic work! You're a natural at this!",
            "Incredible! You're becoming a coding superstar!"
        ];
        
        const randomMessage = encouragements[Math.floor(Math.random() * encouragements.length)];
        this.say(randomMessage);
    }

    // Level-specific helper messages
    giveHint(levelIndex) {
        const hintMessages = {
            0: "Don't worry if this seems new - we'll learn together step by step!",
            1: "Remember, an LED is like a tiny light bulb that only works in one direction!",
            2: "Different frequencies make different pitched sounds - high numbers = high pitch!",
            3: "RGB means Red, Green, Blue - mix different amounts to create any color!",
            4: "A loop is like saying 'do this 10 times' instead of writing it 10 times!",
            5: "When a button is pressed, it sends a signal - use 'if' blocks to check!",
            6: "Different frequencies make musical notes - C is 262 Hz, D is 294 Hz!",
            7: "Analog inputs give us numbers instead of just true/false - perfect for control!",
            8: "PWM values go from 0 (off) to 255 (bright) - try different values!",
            9: "Temperature sensors give numbers - use 'if' blocks to react to hot/cold!",
            10: "Each segment can be turned on or off to form different numbers!",
            11: "Rotary encoders count up or down depending on rotation direction!",
            12: "Use arrays to store sequences and loops to play them back!",
            13: "Touch sensors detect when your finger gets close - like magic buttons!",
            14: "Joysticks give X and Y coordinates - perfect for controlling position!",
            15: "Games need input, moving objects, collision detection, and scoring!",
            16: "LDR sensors give lower values in darkness, higher in bright light!",
            17: "Real systems use multiple sensors together - combine them smartly!",
            18: "Voice recognition works best with clear, short commands!",
            19: "Ultrasonic sensors work like bat sonar - bouncing sound waves!",
            20: "Use distance sensors to control pitch - closer = higher pitch!"
        };
        
        const hint = hintMessages[levelIndex] || "Think about what each component does and how they work together!";
        this.say(hint);
    }

    // Celebration messages for level completion
    celebrate(levelIndex) {
        const celebrations = [
            "🎉 Outstanding! You completed the mission!",
            "🏆 Incredible work! You're becoming an Arduino hero!",
            "🌟 Amazing! You solved it perfectly!",
            "🚀 Fantastic! You're ready for the next challenge!",
            "💫 Brilliant! You're mastering Arduino programming!",
            "🎊 Excellent! You're on your way to becoming an inventor!",
            "⭐ Superb! You're learning so much!",
            "🎈 Wonderful! You completed another level!"
        ];
        
        const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
        this.say(randomCelebration);
    }

    // Welcome messages for different screens
    welcomeToScreen(screenName) {
        const welcomeMessages = {
            start: "Hi! I'm Rubi, your Arduino guide. Ready to start learning?",
            level: "Great! Let's explore all the amazing missions we have for you!",
            activity: "Let's dive into this exciting mission together!"
        };
        
        const message = welcomeMessages[screenName] || "Let's continue our Arduino adventure!";
        this.say(message);
    }

    // Error messages
    showError(errorType) {
        const errorMessages = {
            locked: "Oops! You need to complete the previous levels first!",
            connection: "Hmm, let's check the Arduino connection and try again!",
            code: "No worries! Let's look at the code blocks and fix this together!",
            sensor: "The sensor might need a moment - let's try again!",
            general: "That's okay! Learning means making mistakes - let's try again!"
        };
        
        const message = errorMessages[errorType] || errorMessages.general;
        this.say(message);
    }

    // Tutorial guidance
    provideTutorial(step) {
        const tutorials = {
            navigation: "Click on levels to start them, use the back button to return!",
            blocks: "Drag blocks from the toolbox and snap them together like puzzle pieces!",
            upload: "Click the upload button to send your code to the Arduino!",
            simulation: "Try the simulation first to see if your code works!",
            debugging: "If something doesn't work, check the connections and code blocks!"
        };
        
        const message = tutorials[step] || "Let me know if you need help with anything!";
        this.say(message);
    }

    // Motivational messages for struggling learners
    motivate() {
        const motivations = [
            "Remember, every expert was once a beginner - you're doing great!",
            "It's okay to take your time - learning is not a race!",
            "Every mistake is a step closer to getting it right!",
            "You're braver than you think and more capable than you imagine!",
            "The best inventors never give up - and neither do you!",
            "Curiosity is your superpower - keep asking questions!",
            "You're building amazing things with code - that's incredible!"
        ];
        
        const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
        this.say(randomMotivation, 6000);
    }

    // Fun facts about Arduino and electronics
    shareFunFact() {
        const funFacts = [
            "Did you know? Arduino was named after a bar in Italy where the founders met!",
            "Fun fact: LEDs can last for over 25,000 hours - that's almost 3 years!",
            "Cool! Your Arduino has the same processing power as computers from the 1980s!",
            "Amazing: The first computer bug was actually a real bug - a moth in 1947!",
            "Wow! Your smartphone has more computing power than NASA's Apollo 11!",
            "Incredible: The Internet of Things connects over 30 billion devices worldwide!",
            "Did you know? The first robot was built in 1954 and was named Unimate!"
        ];
        
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        this.say(randomFact, 7000);
    }

    // Adaptive responses based on user progress
    adaptiveResponse(playerData) {
        const { levelsCompleted, totalXP } = playerData;
        
        if (levelsCompleted === 0) {
            this.say("Welcome to your first Arduino adventure! I'm here to help you every step of the way!");
        } else if (levelsCompleted < 5) {
            this.say("You're getting the hang of this! Arduino programming is becoming second nature to you!");
        } else if (levelsCompleted < 10) {
            this.say("Look at you go! You're mastering sensors and controls like a pro!");
        } else if (levelsCompleted < 15) {
            this.say("Incredible progress! You're building complex projects now!");
        } else if (levelsCompleted < 20) {
            this.say("You're almost an Arduino expert! These advanced projects are impressive!");
        } else {
            this.say("Congratulations! You've completed all missions - you're officially an Arduino Hero!");
        }
    }

    // Settings and preferences
    setVoiceEnabled(enabled) {
        this.voiceEnabled = enabled;
        if (!enabled) {
            // Cancel any ongoing speech
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        }
    }

    // Get current state
    getCurrentMessage() {
        return this.currentMessage;
    }

    isCurrentlyVisible() {
        return this.isVisible;
    }

    // Clear message queue (useful for urgent messages)
    clearQueue() {
        this.messageQueue = [];
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
    }
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.RubiAssistant = RubiAssistant;
        });
    } else {
        window.RubiAssistant = RubiAssistant;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RubiAssistant;
}