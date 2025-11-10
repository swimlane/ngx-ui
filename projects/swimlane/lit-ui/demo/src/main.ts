/**
 * Demo application for @swimlane/lit-ui
 */

// Import the button component
import '../../src/components/button/button.component';

// Helper function to create a promise that resolves after a delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to create a promise that rejects after a delay
function delayReject(ms: number): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), ms));
}

// Set up interactive demo buttons
document.addEventListener('DOMContentLoaded', () => {
  // Success button demo
  const successBtn = document.getElementById('successBtn');
  if (successBtn) {
    successBtn.addEventListener('click', () => {
      const btn = successBtn as any;
      btn.promise = delay(1000);
    });
  }

  // Fail button demo
  const failBtn = document.getElementById('failBtn');
  if (failBtn) {
    failBtn.addEventListener('click', () => {
      const btn = failBtn as any;
      btn.promise = delayReject(1000);
    });
  }

  // Slow operation button demo
  const slowBtn = document.getElementById('slowBtn');
  if (slowBtn) {
    slowBtn.addEventListener('click', () => {
      const btn = slowBtn as any;
      btn.promise = delay(5000);
    });
  }

  console.log('✨ @swimlane/lit-ui demo loaded successfully!');
  console.log('Button component is ready to use');
});

