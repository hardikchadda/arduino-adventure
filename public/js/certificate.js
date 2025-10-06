// Arduino Adventure - Custom Certificate Generator
// Generates personalized completion certificates with user details

class CertificateGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1200;
        this.canvas.height = 848; // A4 landscape ratio
    }

    async generateCertificate(levelData, studentInfo) {
        const { name, className, school } = studentInfo;
        
        // Create gradient background
        this.createBackground();
        
        // Add border and decorative elements
        this.addBorder();
        this.addDecorations();
        
        // Add title
        this.addTitle();
        
        // Add main text
        this.addMainText(name, levelData);
        
        // Add level details
        this.addLevelDetails(levelData);
        
        // Add school information
        this.addSchoolInfo(className, school);
        
        // Add date
        this.addDate();
        
        // Add badge/icon
        this.addBadge(levelData.badge);
        
        // Convert to downloadable PDF-like image
        return this.canvas.toDataURL('image/png', 1.0);
    }

    createBackground() {
        // Create gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#e3f2fd');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addBorder() {
        // Outer border
        this.ctx.strokeStyle = '#2196F3';
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
        
        // Inner decorative border
        this.ctx.strokeStyle = '#4CAF50';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(60, 60, this.canvas.width - 120, this.canvas.height - 120);
        
        // Corner decorations
        this.addCornerDecorations();
    }

    addCornerDecorations() {
        const corners = [
            {x: 80, y: 80},
            {x: this.canvas.width - 80, y: 80},
            {x: 80, y: this.canvas.height - 80},
            {x: this.canvas.width - 80, y: this.canvas.height - 80}
        ];

        this.ctx.fillStyle = '#FF9800';
        corners.forEach(corner => {
            this.ctx.beginPath();
            this.ctx.arc(corner.x, corner.y, 12, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    addDecorations() {
        // Add some decorative elements
        this.ctx.fillStyle = '#E3F2FD';
        this.ctx.globalAlpha = 0.3;
        
        // Left decoration
        this.ctx.beginPath();
        this.ctx.arc(150, 200, 60, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Right decoration
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width - 150, this.canvas.height - 200, 60, 0, 2 * Math.PI);
        this.ctx.fill();
        
        this.ctx.globalAlpha = 1.0;
    }

    addTitle() {
        this.ctx.fillStyle = '#1565C0';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Certificate of Completion', this.canvas.width / 2, 150);
        
        // Subtitle
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillText('Arduino Adventure', this.canvas.width / 2, 200);
    }

    addMainText(name, levelData) {
        this.ctx.fillStyle = '#333333';
        this.ctx.font = '28px Arial';
        this.ctx.textAlign = 'center';
        
        // Main certificate text
        const y = 300;
        this.ctx.fillText('This is to certify that', this.canvas.width / 2, y);
        
        // Student name (larger and colored)
        this.ctx.fillStyle = '#2196F3';
        this.ctx.font = 'bold 42px Arial';
        this.ctx.fillText(name, this.canvas.width / 2, y + 60);
        
        // Achievement text
        this.ctx.fillStyle = '#333333';
        this.ctx.font = '28px Arial';
        this.ctx.fillText('has successfully completed', this.canvas.width / 2, y + 120);
        
        // Level name
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.font = 'bold 36px Arial';
        const levelTitle = levelData.id !== undefined ? `Level ${levelData.id}: ${levelData.title}` : levelData.title;
        this.ctx.fillText(levelTitle, this.canvas.width / 2, y + 180);
    }

    addLevelDetails(levelData) {
        this.ctx.fillStyle = '#666666';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        
        const y = 540;
        this.ctx.fillText(`Theme: ${levelData.theme}`, this.canvas.width / 2, y);
        this.ctx.fillText(`Estimated Time: ${levelData.estimatedTime}`, this.canvas.width / 2, y + 30);
        
        if (levelData.badge) {
            this.ctx.fillText(`Badge Earned: ${levelData.badge.name}`, this.canvas.width / 2, y + 60);
        }
    }

    addSchoolInfo(className, school) {
        this.ctx.fillStyle = '#2196F3';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'left';
        
        const x = 120;
        const y = 680;
        
        if (className) {
            this.ctx.fillText(`Class: ${className}`, x, y);
        }
        
        if (school) {
            this.ctx.fillText(`School: ${school}`, x, y + 35);
        }
    }

    addDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        this.ctx.fillStyle = '#666666';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Date: ${dateString}`, this.canvas.width - 120, 680);
        
        // Add signature line
        this.ctx.fillText('Arduino Adventure Platform', this.canvas.width - 120, 715);
    }

    addBadge(badge) {
        if (!badge) return;
        
        // Simple badge representation (could be enhanced with actual icons)
        const centerX = this.canvas.width - 200;
        const centerY = 300;
        const radius = 40;
        
        // Badge circle
        this.ctx.fillStyle = '#FF9800';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Badge border
        this.ctx.strokeStyle = '#F57C00';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        
        // Badge text (simplified - could use actual FontAwesome icons)
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('★', centerX, centerY + 6);
        
        // Badge name below
        this.ctx.fillStyle = '#666666';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(badge.name, centerX, centerY + 65);
    }

    downloadCertificate(dataURL, levelData, studentInfo) {
        // Create download link
        const link = document.createElement('a');
        const fileName = `Arduino_Adventure_Certificate_${levelData.title.replace(/\s+/g, '_')}_${studentInfo.name.replace(/\s+/g, '_')}.png`;
        
        link.download = fileName;
        link.href = dataURL;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Export for use in other modules
window.CertificateGenerator = CertificateGenerator;