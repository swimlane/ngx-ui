/**
 * Demo application for @swimlane/lit-ui
 */

// Import components
import '../../src/components/button/button.component';
import '../../src/components/input/input.component';
import '../../src/components/select/select.component';

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

  // Select component demos
  setupSelectDemos();

  // Select form demo
  const selectForm = document.getElementById('selectForm');
  if (selectForm) {
    selectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const categorySelect = document.getElementById('formSelect1') as any;
      const tagsSelect = document.getElementById('formSelect2') as any;

      console.log('Select Form submitted!');
      console.log('Category:', categorySelect.value);
      console.log('Tags:', tagsSelect.value);

      alert(`Form submitted!\nCategory: ${categorySelect.value}\nTags: ${JSON.stringify(tagsSelect.value)}`);
    });
  }

  console.log('✨ @swimlane/lit-ui demo loaded successfully!');
  console.log('Button, Input, and Select components are ready to use');
});

function setupSelectDemos() {
  // Fruit options for basic select
  const fruits = [
    { name: 'Apple', value: 'apple' },
    { name: 'Banana', value: 'banana' },
    { name: 'Orange', value: 'orange' },
    { name: 'Grape', value: 'grape' },
    { name: 'Mango', value: 'mango' },
    { name: 'Pineapple', value: 'pineapple' },
    { name: 'Strawberry', value: 'strawberry' },
    { name: 'Watermelon', value: 'watermelon' }
  ];

  // Basic selects
  const basicSelect = document.getElementById('basicSelect') as any;
  if (basicSelect) basicSelect.options = fruits;

  const requiredSelect = document.getElementById('requiredSelect') as any;
  if (requiredSelect) requiredSelect.options = fruits;

  // Appearance selects
  const legacySelect = document.getElementById('legacySelect') as any;
  if (legacySelect) legacySelect.options = fruits;

  const fillSelect = document.getElementById('fillSelect') as any;
  if (fillSelect) fillSelect.options = fruits;

  // Size selects
  const smallSelect = document.getElementById('smallSelect') as any;
  if (smallSelect) smallSelect.options = fruits;

  const mediumSelect = document.getElementById('mediumSelect') as any;
  if (mediumSelect) mediumSelect.options = fruits;

  const largeSelect = document.getElementById('largeSelect') as any;
  if (largeSelect) largeSelect.options = fruits;

  // Multi-select with colors
  const colors = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
    { name: 'Brown', value: 'brown' }
  ];

  const multiSelect = document.getElementById('multiSelect') as any;
  if (multiSelect) multiSelect.options = colors;

  // Filterable select with countries
  const countries = [
    { name: 'United States', value: 'us' },
    { name: 'United Kingdom', value: 'uk' },
    { name: 'Canada', value: 'ca' },
    { name: 'Australia', value: 'au' },
    { name: 'Germany', value: 'de' },
    { name: 'France', value: 'fr' },
    { name: 'Italy', value: 'it' },
    { name: 'Spain', value: 'es' },
    { name: 'Japan', value: 'jp' },
    { name: 'China', value: 'cn' },
    { name: 'India', value: 'in' },
    { name: 'Brazil', value: 'br' },
    { name: 'Mexico', value: 'mx' },
    { name: 'Argentina', value: 'ar' },
    { name: 'South Africa', value: 'za' }
  ];

  const filterableSelect = document.getElementById('filterableSelect') as any;
  if (filterableSelect) filterableSelect.options = countries;

  const noFilterSelect = document.getElementById('noFilterSelect') as any;
  if (noFilterSelect) noFilterSelect.options = fruits;

  // State selects
  const normalSelect = document.getElementById('normalSelect') as any;
  if (normalSelect) normalSelect.options = fruits;

  const withValueSelect = document.getElementById('withValueSelect') as any;
  if (withValueSelect) {
    withValueSelect.options = [
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' },
      { name: 'Option 3', value: 'option3' }
    ];
  }

  const disabledSelect = document.getElementById('disabledSelect') as any;
  if (disabledSelect) {
    disabledSelect.options = fruits;
    disabledSelect.value = 'apple';
  }

  const noClearSelect = document.getElementById('noClearSelect') as any;
  if (noClearSelect) noClearSelect.options = fruits;

  // Form selects
  const categories = [
    { name: 'Technology', value: 'tech' },
    { name: 'Business', value: 'business' },
    { name: 'Science', value: 'science' },
    { name: 'Arts', value: 'arts' },
    { name: 'Sports', value: 'sports' }
  ];

  const formSelect1 = document.getElementById('formSelect1') as any;
  if (formSelect1) formSelect1.options = categories;

  const tags = [
    { name: 'Important', value: 'important' },
    { name: 'Urgent', value: 'urgent' },
    { name: 'Featured', value: 'featured' },
    { name: 'Archive', value: 'archive' },
    { name: 'Review', value: 'review' }
  ];

  const formSelect2 = document.getElementById('formSelect2') as any;
  if (formSelect2) formSelect2.options = tags;
}

