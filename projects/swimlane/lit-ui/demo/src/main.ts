/**
 * Demo application for @swimlane/lit-ui
 */

// Import components
import '../../src/components/button/button.component';
import '../../src/components/input/input.component';

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

  // Form validation demo
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('nameInput') as any;
      const emailInput = document.getElementById('emailInput') as any;
      const ageInput = document.getElementById('ageInput') as any;

      console.log('Form submitted!');
      console.log('Name:', nameInput.value);
      console.log('Email:', emailInput.value);
      console.log('Age:', ageInput.value);

      alert(`Form submitted!\nName: ${nameInput.value}\nEmail: ${emailInput.value}\nAge: ${ageInput.value}`);
    });
  }

  console.log('✨ @swimlane/lit-ui demo loaded successfully!');
  console.log('Button and Input components are ready to use');
});

