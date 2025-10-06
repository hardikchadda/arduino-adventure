// Arduino Adventure - Storage Management
// Handles player data persistence and synchronization

class StorageManager {
    constructor() {
        this.storageKey = 'arduino-adventure-data';
        this.backupKey = 'arduino-adventure-backup';
        this.defaultPlayerData = {
            name: '',
            totalXP: 0,
            levelsCompleted: 0,
            badges: [],
            achievements: [],
            settings: {
                sound: true,
                voice: true,
                animationSpeed: 'normal',
                language: 'en',
                difficulty: 'normal'
            },
            progress: {
                currentLevel: 0,
                timeSpent: 0,
                lastPlayed: null,
                streakDays: 0,
                totalSessions: 0
            },
            statistics: {
                hintsUsed: 0,
                errorsCount: 0,
                averageTime: 0,
                favoriteLevel: null,
                completionRate: 0
            },
            preferences: {
                rubiEnabled: true,
                showAnimations: true,
                autoSave: true,
                saveToCloud: false
            }
        };
        
        this.init();
    }

    init() {
        // Check for localStorage support
        if (!this.isLocalStorageAvailable()) {
            console.warn('localStorage not available, using memory storage');
            this.memoryStorage = {};
        }
        
        // Initialize data structure
        this.ensureDataStructure();
        
        // Setup auto-save
        this.setupAutoSave();
        
        // Setup backup system
        this.setupBackups();
    }

    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Load player data from storage
    loadPlayerData() {
        try {
            let data = null;
            
            if (this.isLocalStorageAvailable()) {
                const stored = localStorage.getItem(this.storageKey);
                if (stored) {
                    data = JSON.parse(stored);
                }
            } else if (this.memoryStorage[this.storageKey]) {
                data = this.memoryStorage[this.storageKey];
            }
            
            if (!data) {
                return { ...this.defaultPlayerData };
            }
            
            // Merge with defaults to handle version updates
            return this.mergeWithDefaults(data);
            
        } catch (error) {
            console.error('Failed to load player data:', error);
            return this.loadBackup() || { ...this.defaultPlayerData };
        }
    }

    // Save player data to storage
    savePlayerData(data) {
        try {
            // Validate data structure
            const validatedData = this.validateData(data);
            
            // Update timestamps
            validatedData.progress.lastPlayed = new Date().toISOString();
            validatedData.progress.totalSessions = (validatedData.progress.totalSessions || 0) + 1;
            
            // Save to primary storage
            if (this.isLocalStorageAvailable()) {
                localStorage.setItem(this.storageKey, JSON.stringify(validatedData));
            } else {
                this.memoryStorage[this.storageKey] = validatedData;
            }
            
            // Create backup
            this.createBackup(validatedData);
            
            return true;
        } catch (error) {
            console.error('Failed to save player data:', error);
            return false;
        }
    }

    // Merge loaded data with defaults (for version compatibility)
    mergeWithDefaults(loadedData) {
        const merged = { ...this.defaultPlayerData };
        
        // Deep merge loaded data
        Object.keys(loadedData).forEach(key => {
            if (typeof loadedData[key] === 'object' && !Array.isArray(loadedData[key])) {
                merged[key] = { ...merged[key], ...loadedData[key] };
            } else {
                merged[key] = loadedData[key];
            }
        });
        
        return merged;
    }

    // Validate data structure
    validateData(data) {
        const validated = { ...data };
        
        // Ensure required fields exist
        if (!validated.badges) validated.badges = [];
        if (!validated.achievements) validated.achievements = [];
        if (!validated.settings) validated.settings = { ...this.defaultPlayerData.settings };
        if (!validated.progress) validated.progress = { ...this.defaultPlayerData.progress };
        
        // Validate number fields
        validated.totalXP = Math.max(0, parseInt(validated.totalXP) || 0);
        validated.levelsCompleted = Math.max(0, Math.min(20, parseInt(validated.levelsCompleted) || 0));
        
        // Validate arrays
        if (!Array.isArray(validated.badges)) validated.badges = [];
        if (!Array.isArray(validated.achievements)) validated.achievements = [];
        
        return validated;
    }

    // Backup system
    createBackup(data) {
        try {
            const backup = {
                data: data,
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };
            
            if (this.isLocalStorageAvailable()) {
                localStorage.setItem(this.backupKey, JSON.stringify(backup));
            } else if (this.memoryStorage) {
                this.memoryStorage[this.backupKey] = backup;
            }
        } catch (error) {
            console.warn('Failed to create backup:', error);
        }
    }

    loadBackup() {
        try {
            let backup = null;
            
            if (this.isLocalStorageAvailable()) {
                const stored = localStorage.getItem(this.backupKey);
                if (stored) {
                    backup = JSON.parse(stored);
                }
            } else if (this.memoryStorage[this.backupKey]) {
                backup = this.memoryStorage[this.backupKey];
            }
            
            if (backup && backup.data) {
                console.info('Restored from backup:', backup.timestamp);
                return backup.data;
            }
        } catch (error) {
            console.error('Failed to load backup:', error);
        }
        
        return null;
    }

    // Auto-save functionality
    setupAutoSave() {
        this.autoSaveEnabled = true;
        this.autoSaveInterval = null;
        this.pendingSave = null;
    }

    enableAutoSave(interval = 30000) { // 30 seconds default
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        this.autoSaveInterval = setInterval(() => {
            if (this.pendingSave && this.autoSaveEnabled) {
                this.savePlayerData(this.pendingSave);
                this.pendingSave = null;
            }
        }, interval);
    }

    scheduleAutoSave(data) {
        if (this.autoSaveEnabled) {
            this.pendingSave = data;
        }
    }

    disableAutoSave() {
        this.autoSaveEnabled = false;
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    // Data structure updates
    ensureDataStructure() {
        const currentData = this.loadPlayerData();
        const updatedData = this.mergeWithDefaults(currentData);
        
        // Check if update is needed
        if (JSON.stringify(currentData) !== JSON.stringify(updatedData)) {
            this.savePlayerData(updatedData);
        }
    }

    // Backup management
    setupBackups() {
        // Clean old backups periodically
        this.cleanupOldBackups();
    }

    cleanupOldBackups() {
        // Implementation for cleaning up old backups
        // This would be more complex in a real system with multiple backups
        try {
            const backup = this.loadBackup();
            if (backup && backup.timestamp) {
                const backupDate = new Date(backup.timestamp);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                
                // Keep backups for a week
                if (backupDate < weekAgo) {
                    console.info('Cleaning up old backup');
                }
            }
        } catch (error) {
            console.warn('Error during backup cleanup:', error);
        }
    }

    // Export/Import functionality
    exportData() {
        const data = this.loadPlayerData();
        const exportData = {
            ...data,
            exportDate: new Date().toISOString(),
            version: '1.0.0',
            appName: 'Arduino Adventure'
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            
            // Validate imported data
            if (importedData.appName !== 'Arduino Adventure') {
                throw new Error('Invalid data format');
            }
            
            // Validate and save
            const validatedData = this.validateData(importedData);
            return this.savePlayerData(validatedData);
            
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }

    // Reset functionality
    resetPlayerData() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            try {
                const resetData = { ...this.defaultPlayerData };
                this.savePlayerData(resetData);
                
                // Clear any cached data
                if (window.app) {
                    window.app.playerData = resetData;
                    window.app.updateUI();
                }
                
                return true;
            } catch (error) {
                console.error('Failed to reset player data:', error);
                return false;
            }
        }
        return false;
    }

    // Achievement management
    unlockAchievement(achievementId) {
        const data = this.loadPlayerData();
        if (!data.achievements.includes(achievementId)) {
            data.achievements.push(achievementId);
            this.savePlayerData(data);
            return true;
        }
        return false;
    }

    unlockBadge(badgeId) {
        const data = this.loadPlayerData();
        if (!data.badges.includes(badgeId)) {
            data.badges.push(badgeId);
            this.savePlayerData(data);
            return true;
        }
        return false;
    }

    // Statistics tracking
    updateStatistics(stats) {
        const data = this.loadPlayerData();
        data.statistics = { ...data.statistics, ...stats };
        this.savePlayerData(data);
    }

    incrementHintsUsed() {
        const data = this.loadPlayerData();
        data.statistics.hintsUsed = (data.statistics.hintsUsed || 0) + 1;
        this.savePlayerData(data);
    }

    incrementErrors() {
        const data = this.loadPlayerData();
        data.statistics.errorsCount = (data.statistics.errorsCount || 0) + 1;
        this.savePlayerData(data);
    }

    // Settings management
    updateSettings(newSettings) {
        const data = this.loadPlayerData();
        data.settings = { ...data.settings, ...newSettings };
        this.savePlayerData(data);
        return data.settings;
    }

    getSetting(key) {
        const data = this.loadPlayerData();
        return data.settings[key];
    }

    // Progress tracking
    updateProgress(levelIndex) {
        const data = this.loadPlayerData();
        
        if (levelIndex >= data.levelsCompleted) {
            data.levelsCompleted = levelIndex + 1;
            data.totalXP += 100; // 100 XP per level
        }
        
        data.progress.currentLevel = levelIndex;
        
        this.savePlayerData(data);
        return data;
    }

    // Cloud sync (placeholder for future implementation)
    async syncToCloud() {
        // Placeholder for cloud sync functionality
        console.info('Cloud sync not implemented yet');
        return false;
    }

    async syncFromCloud() {
        // Placeholder for cloud sync functionality
        console.info('Cloud sync not implemented yet');
        return false;
    }

    // Utility methods
    getStorageInfo() {
        const data = this.loadPlayerData();
        const dataSize = JSON.stringify(data).length;
        
        return {
            storageType: this.isLocalStorageAvailable() ? 'localStorage' : 'memory',
            dataSize: dataSize,
            lastSaved: data.progress.lastPlayed,
            totalSessions: data.progress.totalSessions,
            levelsCompleted: data.levelsCompleted,
            totalXP: data.totalXP
        };
    }

    isDataAvailable() {
        try {
            const data = this.loadPlayerData();
            return data.levelsCompleted > 0 || data.totalXP > 0;
        } catch (error) {
            return false;
        }
    }

    // Cleanup
    destroy() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        this.pendingSave = null;
    }
}

// Create global storage manager
const StorageManager = new StorageManager();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.StorageManager = StorageManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (StorageManager.pendingSave) {
        StorageManager.savePlayerData(StorageManager.pendingSave);
    }
});