// Simplified Arduino Adventure - Just for modal testing
console.log('Simple main.js loading...');

// Simple test function
function testModal() {
    console.log('testModal called');
    const modal = document.getElementById('reward-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal) {
        console.error('Modal not found!');
        alert('Modal not found in DOM!');
        return;
    }
    
    console.log('Modal found, setting content...');
    
    modalTitle.textContent = 'TEST - Mission Complete!';
    modalContent.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h3>🎉 Test Modal Working! 🎉</h3>
            <p>If you can see this and click buttons, the modal system works!</p>
            <div style="margin-top: 20px;">
                <button id="test-download" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 0 5px;">
                    📋 Download Test
                </button>
                <button id="test-next" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 0 5px;">
                    ➡️ Next Test
                </button>
                <button id="test-close" style="background: #f44336; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 0 5px;">
                    ❌ Close
                </button>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    modal.style.pointerEvents = 'all';
    console.log('Modal should be visible now');
    
    // Add button event listeners
    setTimeout(() => {
        const downloadBtn = document.getElementById('test-download');
        const nextBtn = document.getElementById('test-next');
        const closeBtn = document.getElementById('test-close');
        
        console.log('Adding button listeners...', { downloadBtn, nextBtn, closeBtn });
        
        if (downloadBtn) {
            downloadBtn.onclick = function() {
                console.log('Download clicked');
                alert('✅ Download button works!');
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                console.log('Next clicked');
                alert('✅ Next button works!');
            };
        }
        
        if (closeBtn) {
            closeBtn.onclick = function() {
                console.log('Close clicked');
                closeModal();
            };
        }
    }, 100);
    
    // Backdrop click
    modal.onclick = function(e) {
        if (e.target === modal) {
            console.log('Backdrop clicked');
            closeModal();
        }
    };
}

function closeModal() {
    console.log('Closing modal...');
    const modal = document.getElementById('reward-modal');
    modal.classList.remove('active');
    modal.style.pointerEvents = 'none';
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - setting up test button');
    
    const testBtn = document.getElementById('test-modal-btn');
    if (testBtn) {
        console.log('Test button found, adding click handler');
        testBtn.onclick = function() {
            console.log('Test button clicked!');
            testModal();
        };
        testBtn.style.pointerEvents = 'all';
        testBtn.style.zIndex = '9999';
    } else {
        console.error('Test button not found!');
    }
    
    // Also test level completion
    setTimeout(() => {
        const completeBtn = document.querySelector('.complete-btn');
        if (completeBtn) {
            console.log('Complete button found, adding handler');
            completeBtn.onclick = function() {
                console.log('Complete button clicked!');
                testModal(); // Use test modal instead of real one
            };
        }
    }, 2000);
});

// Global access
window.testModal = testModal;
window.closeModal = closeModal;

console.log('Simple main.js loaded');