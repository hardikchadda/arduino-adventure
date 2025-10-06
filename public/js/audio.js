// Arduino Adventure - Audio Manager
// Handles all sound effects, music, and audio feedback

class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.enabled = true;
        this.volume = 0.7;
        this.audioContext = null;
        
        this.init();
    }

    init() {
        // Initialize Web Audio API if available
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }

        // Load sound effects
        this.loadSounds();
    }

    loadSounds() {
        // Define sound effects with their URLs
        const soundData = {
            'level-start': {
                url: '/assets/sounds/level-start.mp3',
                fallback: () => this.generateTone(800, 0.3, 'sine')
            },
            'level-complete': {
                url: '/assets/sounds/level-complete.mp3',
                fallback: () => this.playSuccess()
            },
            'step-complete': {
                url: '/assets/sounds/step-complete.mp3',
                fallback: () => this.generateTone(1200, 0.2, 'triangle')
            },
            'button-click': {
                url: '/assets/sounds/button-click.mp3',
                fallback: () => this.generateTone(600, 0.1, 'square')
            },
            'error': {
                url: '/assets/sounds/error.mp3',
                fallback: () => this.playError()
            },
            'hint': {
                url: '/assets/sounds/hint.mp3',
                fallback: () => this.generateTone(400, 0.4, 'sine')
            },
            'badge-unlock': {
                url: '/assets/sounds/badge-unlock.mp3',
                fallback: () => this.playBadgeUnlock()
            },
            'code-running': {
                url: '/assets/sounds/code-running.mp3',
                fallback: () => this.playCodeRunning()
            },
            'download': {
                url: '/assets/sounds/download.mp3',
                fallback: () => this.generateTone(1000, 0.3, 'triangle')
            },
            'xp-gain': {
                url: '/assets/sounds/xp-gain.mp3',
                fallback: () => this.playXPGain()
            }
        };

        // Load or create each sound
        Object.entries(soundData).forEach(([key, data]) => {
            this.loadSound(key, data.url, data.fallback);
        });
    }

    async loadSound(key, url, fallback) {
        try {
            const audio = new Audio(url);
            audio.volume = this.volume;
            
            // Test if audio loads successfully
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', resolve);
                audio.addEventListener('error', reject);
                audio.load();
            });
            
            this.sounds.set(key, audio);
        } catch (error) {
            // If loading fails, use fallback (generated sound)
            console.warn(`Failed to load sound: ${key}, using fallback`);
            this.sounds.set(key, { fallback: true, generator: fallback });
        }
    }

    playSound(soundKey) {
        if (!this.enabled || !window.app?.playerData?.settings?.sound) {
            return;
        }

        const sound = this.sounds.get(soundKey);
        if (!sound) {
            console.warn(`Sound not found: ${soundKey}`);
            return;
        }

        try {
            if (sound.fallback) {
                // Use generated sound
                sound.generator();
            } else {
                // Use loaded audio file
                sound.currentTime = 0; // Reset to beginning
                sound.play();
            }
        } catch (error) {
            console.warn(`Error playing sound: ${soundKey}`, error);
        }
    }

    // Generated sound effects using Web Audio API
    generateTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = waveType;

        // Create envelope for smooth sound
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playSuccess() {
        if (!this.audioContext) return;

        // Play a happy chord progression
        const frequencies = [523, 659, 784]; // C, E, G
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, 0.3, 'triangle');
            }, index * 100);
        });
    }

    playError() {
        if (!this.audioContext) return;

        // Play a descending error sound
        const frequencies = [400, 350, 300];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, 0.2, 'square');
            }, index * 100);
        });
    }

    playBadgeUnlock() {
        if (!this.audioContext) return;

        // Play a triumphant ascending sound
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C'
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, 0.4, 'triangle');
            }, index * 150);
        });
    }

    playCodeRunning() {
        if (!this.audioContext) return;

        // Play a series of quick beeps
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.generateTone(800 + i * 100, 0.1, 'square');
            }, i * 200);
        }
    }

    playXPGain() {
        if (!this.audioContext) return;

        // Play a sparkling sound effect
        const frequencies = [1000, 1200, 1500, 1800];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, 0.15, 'sine');
            }, index * 50);
        });
    }

    // Background music management
    playBackgroundMusic(musicKey) {
        // TODO: Implement background music
        // For now, we'll keep it simple with sound effects only
        console.log(`Background music: ${musicKey}`);
    }

    stopBackgroundMusic() {
        // TODO: Stop background music
    }

    // Volume control
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // Update volume for all loaded sounds
        this.sounds.forEach(sound => {
            if (!sound.fallback) {
                sound.volume = this.volume;
            }
        });
    }

    getVolume() {
        return this.volume;
    }

    // Enable/disable audio
    setEnabled(enabled) {
        this.enabled = enabled;
        
        if (!enabled) {
            // Stop all currently playing sounds
            this.sounds.forEach(sound => {
                if (!sound.fallback && !sound.paused) {
                    sound.pause();
                    sound.currentTime = 0;
                }
            });
        }
    }

    isEnabled() {
        return this.enabled;
    }

    // Musical notes for piano level
    playNote(note, duration = 0.5) {
        const noteFrequencies = {
            'C4': 261.63,
            'C#4': 277.18,
            'D4': 293.66,
            'D#4': 311.13,
            'E4': 329.63,
            'F4': 349.23,
            'F#4': 369.99,
            'G4': 392.00,
            'G#4': 415.30,
            'A4': 440.00,
            'A#4': 466.16,
            'B4': 493.88,
            'C5': 523.25
        };

        const frequency = noteFrequencies[note];
        if (frequency && this.enabled) {
            this.generateTone(frequency, duration, 'triangle');
        }
    }

    // Theremin-like continuous tone for Level 20
    startContinuousTone(frequency) {
        if (!this.audioContext || !this.enabled) return null;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);

        oscillator.start();

        return {
            oscillator,
            gainNode,
            setFrequency: (freq) => oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime),
            setVolume: (vol) => gainNode.gain.setValueAtTime(vol * this.volume, this.audioContext.currentTime),
            stop: () => {
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
                oscillator.stop(this.audioContext.currentTime + 0.1);
            }
        };
    }

    // Utility methods
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Test sound functionality
    testSound() {
        this.playSound('button-click');
    }
}

// Create global audio manager instance
const audioManagerInstance = new AudioManager();

// Handle user interaction requirement for audio
document.addEventListener('click', () => {
    audioManagerInstance.resumeAudioContext();
}, { once: true });

document.addEventListener('keydown', () => {
    audioManagerInstance.resumeAudioContext();
}, { once: true });

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AudioManager = audioManagerInstance;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = audioManagerInstance;
}
