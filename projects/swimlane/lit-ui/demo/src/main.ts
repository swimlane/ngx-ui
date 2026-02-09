/**
 * Demo application for @swimlane/lit-ui
 */

import { ICON_NAMES } from '../icon-names';

// Import components
import '../../src/components/button/button.component';
import '../../src/components/button-group/button-group.component';
import '../../src/components/icon/icon.component';
import '../../src/components/input/input.component';
import '../../src/components/select/select.component';
import '../../src/components/tabs/tab.component';
import '../../src/components/tabs/tabs.component';
import '../../src/components/button-toggle/button-toggle.component';
import '../../src/components/button-toggle/button-toggle-group.component';
import '../../src/components/card/card.component';
import '../../src/components/card/card-header.component';
import '../../src/components/card/card-footer.component';
import '../../src/components/card/card-avatar.component';
import '../../src/components/card/card-placeholder.component';
import '../../src/components/card/card-body.component';
import '../../src/components/checkbox/checkbox.component';
import '../../src/components/radio/radio.component';
import '../../src/components/radio/radio-group.component';
import '../../src/components/toggle/toggle.component';
import '../../src/components/section/section.component';
import '../../src/components/section/section-header.component';
import '../../src/components/slider/slider.component';
import '../../src/components/progress-spinner/progress-spinner.component';

// Helper function to create a promise that resolves after a delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to create a promise that rejects after a delay
function delayReject(ms: number): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), ms));
}

const SECTION_FILES = [
  'buttons',
  'input',
  'select',
  'checkbox',
  'radio',
  'toggle',
  'slider',
  'tabs',
  'button-group',
  'button-toggle',
  'card',
  'progress-spinner',
  'section',
  'icons'
];

async function loadSections(): Promise<void> {
  const container = document.getElementById('page-sections');
  if (!container) return;
  const parts: string[] = [];
  for (const name of SECTION_FILES) {
    const res = await fetch(`/sections/${name}.html`);
    if (res.ok) parts.push(await res.text());
  }
  container.innerHTML = parts.join('');
}

// Set up interactive demo buttons and run after sections are loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadSections();

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
  const demoForm = document.getElementById('demoForm') as HTMLFormElement | null;
  if (demoForm) {
    // swim-button wraps a native button in Shadow DOM, so the form never receives
    // a native submit/reset. Wire Submit and Reset buttons to the form explicitly.
    const submitBtn = demoForm.querySelector('swim-button[type="submit"]');
    const resetBtn = demoForm.querySelector('swim-button[type="reset"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', e => {
        e.preventDefault();
        demoForm.requestSubmit();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', e => {
        e.preventDefault();
        demoForm.reset();
      });
    }

    demoForm.addEventListener('submit', e => {
      e.preventDefault();

      const nameInput = document.getElementById('nameInput') as (HTMLInputElement & { value: string }) | null;
      const emailInput = document.getElementById('emailInput') as (HTMLInputElement & { value: string }) | null;
      const ageInput = document.getElementById('ageInput') as (HTMLInputElement & { value: string }) | null;

      const name = nameInput?.value ?? '';
      const email = emailInput?.value ?? '';
      const age = ageInput?.value ?? '';

      console.log('Form submitted!', { name, email, age });
      alert(`Form submitted!\nName: ${name}\nEmail: ${email}\nAge: ${age}`);
    });
  }

  // Select component demos
  setupSelectDemos();

  // Card demos
  const selectableCardDemo = document.getElementById('selectableCardDemo') as any;
  const cardSelectedValue = document.getElementById('cardSelectedValue');
  if (selectableCardDemo && cardSelectedValue) {
    selectableCardDemo.addEventListener('select', (e: CustomEvent<boolean>) => {
      cardSelectedValue.textContent = String(e.detail ?? false);
    });
  }
  const outlineCardDemo = document.getElementById('outlineCardDemo');
  if (outlineCardDemo) {
    outlineCardDemo.addEventListener('outline-click', () => {
      console.log('Outline clicked');
    });
  }

  // Checkbox demos
  const checkboxDemoEvent = document.getElementById('checkboxDemoEvent') as any;
  const checkboxDemoChecked = document.getElementById('checkboxDemoChecked');
  const checkboxDemoEventName = document.getElementById('checkboxDemoEventName');
  if (checkboxDemoEvent && checkboxDemoChecked && checkboxDemoEventName) {
    const updateCheckboxDemo = () => {
      checkboxDemoChecked!.textContent = String(checkboxDemoEvent.checked);
    };
    checkboxDemoEvent.addEventListener('checked-change', (e: CustomEvent<boolean>) => {
      checkboxDemoChecked!.textContent = String(e.detail);
      checkboxDemoEventName!.textContent = 'checked-change';
    });
    checkboxDemoEvent.addEventListener('change', () => {
      checkboxDemoEventName!.textContent = 'change';
    });
    checkboxDemoEvent.addEventListener('focus', () => {
      checkboxDemoEventName!.textContent = 'focus';
    });
    checkboxDemoEvent.addEventListener('blur', () => {
      checkboxDemoEventName!.textContent = 'blur';
    });
    updateCheckboxDemo(); // initial state
  }

  // Radio demos: single radios (sync checked state and update display)
  const radioSingleValue = document.getElementById('radioSingleValue');
  const radioIds = ['radioSeasonSpring', 'radioSeasonSummer', 'radioSeasonFall', 'radioSeasonWinter'];
  radioIds.forEach(id => {
    const el = document.getElementById(id) as any;
    if (el && radioSingleValue) {
      el.addEventListener('change', (e: CustomEvent<unknown>) => {
        const value = e.detail;
        radioIds.forEach(oid => {
          const o = document.getElementById(oid) as any;
          if (o) o.checked = o.value === value;
        });
        radioSingleValue.textContent = String(value ?? '');
      });
    }
  });
  // Radio group value display
  const radioGroupDemo = document.getElementById('radioGroupDemo') as any;
  const radioGroupValue = document.getElementById('radioGroupValue');
  if (radioGroupDemo && radioGroupValue) {
    radioGroupValue.textContent = String(radioGroupDemo.value ?? '—');
    radioGroupDemo.addEventListener('change', (e: CustomEvent<unknown>) => {
      radioGroupValue.textContent = String(e.detail ?? '—');
    });
  }

  // Progress spinner with label (set spinnerLabel object via JS)
  const progressSpinnerWithLabel = document.getElementById('progressSpinnerWithLabel') as any;
  if (progressSpinnerWithLabel) {
    progressSpinnerWithLabel.spinnerLabel = {
      inProgressLabel: 'Loading...',
      completeLabel: 'Complete!',
      failLabel: 'Failed'
    };
  }

  // Slider demos
  const sliderDemoEvent = document.getElementById('sliderDemoEvent') as any;
  const sliderDemoValue = document.getElementById('sliderDemoValue');
  const sliderDemoPercent = document.getElementById('sliderDemoPercent');
  if (sliderDemoEvent && sliderDemoValue && sliderDemoPercent) {
    sliderDemoEvent.addEventListener('change', (e: CustomEvent<{ value: number | string; percent: string }>) => {
      const d = e.detail;
      sliderDemoValue!.textContent = String(d?.value ?? '');
      sliderDemoPercent!.textContent = String(d?.percent ?? '');
    });
  }

  // Toggle demos
  const toggleDemoEvent = document.getElementById('toggleDemoEvent') as any;
  const toggleDemoChecked = document.getElementById('toggleDemoChecked');
  const toggleDemoEventName = document.getElementById('toggleDemoEventName');
  if (toggleDemoEvent && toggleDemoChecked && toggleDemoEventName) {
    const updateToggleDemo = () => {
      toggleDemoChecked!.textContent = String(toggleDemoEvent.checked);
    };
    toggleDemoEvent.addEventListener('change', () => {
      toggleDemoChecked!.textContent = String(toggleDemoEvent.checked);
      toggleDemoEventName!.textContent = 'change';
    });
    toggleDemoEvent.addEventListener('focus', () => {
      toggleDemoEventName!.textContent = 'focus';
    });
    toggleDemoEvent.addEventListener('blur', () => {
      toggleDemoEventName!.textContent = 'blur';
    });
    updateToggleDemo(); // initial state
  }

  // Button toggle demos
  const seasonToggleGroup = document.getElementById('seasonToggleGroup') as any;
  const seasonValueEl = document.getElementById('seasonValue');
  if (seasonToggleGroup && seasonValueEl) {
    seasonToggleGroup.addEventListener('value-change', (e: CustomEvent<unknown>) => {
      seasonValueEl.textContent = String(e.detail ?? '');
    });
  }
  const disabledGroupDemo = document.getElementById('disabledGroupDemo') as any;
  const toggleGroupDisabledBtn = document.getElementById('toggleGroupDisabledBtn');
  if (disabledGroupDemo && toggleGroupDisabledBtn) {
    toggleGroupDisabledBtn.addEventListener('click', () => {
      disabledGroupDemo.disabled = !disabledGroupDemo.disabled;
      toggleGroupDisabledBtn.textContent = disabledGroupDemo.disabled ? 'Enable group' : 'Disable group';
    });
  }

  // Icons demo: populate full icon grid (like src/app/icons-page)
  setupIconsDemo();

  // Select form demo
  const selectForm = document.getElementById('selectForm');
  if (selectForm) {
    selectForm.addEventListener('submit', e => {
      e.preventDefault();

      const categorySelect = document.getElementById('formSelect1') as any;
      const tagsSelect = document.getElementById('formSelect2') as any;

      console.log('Select Form submitted!');
      console.log('Category:', categorySelect.value);
      console.log('Tags:', tagsSelect.value);

      alert(`Form submitted!\nCategory: ${categorySelect.value}\nTags: ${JSON.stringify(tagsSelect.value)}`);
    });
  }

  // Section ids that have nav links (in document order for scroll spy)
  const SECTION_IDS = [
    'buttons',
    'input',
    'select',
    'checkbox',
    'radio',
    'toggle',
    'slider',
    'tabs',
    'button-group',
    'button-toggle',
    'card',
    'progress-spinner',
    'section',
    'icons'
  ];

  // Sync sidebar active state with section id (hash or scroll)
  function setActiveNav(sectionId?: string) {
    const id = sectionId ?? (window.location.hash.slice(1) || 'icons');
    document.querySelectorAll('.sub-nav-item.active, .nav-item.active').forEach(el => el.classList.remove('active'));
    document
      .querySelectorAll(`.sub-nav-item[href="#${id}"], .nav-item[href="#${id}"]`)
      .forEach(el => el.classList.add('active'));
  }

  setActiveNav();
  window.addEventListener('hashchange', () => setActiveNav());

  // Search: filter nav by link/label text
  const searchInput = document.getElementById('navSearch') as HTMLInputElement | null;
  const containers = document.querySelectorAll<HTMLElement>('.nav-item-container');
  const subNavItems = document.querySelectorAll<HTMLAnchorElement>('.sub-nav-item');

  function filterNav() {
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();
    subNavItems.forEach(link => {
      const text = link.textContent?.trim().toLowerCase() ?? '';
      link.classList.toggle('nav-search-hidden', query.length > 0 && !text.includes(query));
    });
    containers.forEach(container => {
      const label = container.querySelector('.nav-item-label');
      const labelText = label?.textContent?.trim().toLowerCase() ?? '';
      const visibleChildren = container.querySelectorAll('.sub-nav-item:not(.nav-search-hidden)').length;
      const labelMatches = query.length === 0 || labelText.includes(query);
      const hasVisibleChild = visibleChildren > 0;
      container.classList.toggle('nav-search-hidden', query.length > 0 && !labelMatches && !hasVisibleChild);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterNav);
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterNav();
        searchInput.blur();
      }
    });
  }

  // Scroll spy: highlight nav item for the section currently in view
  function updateActiveFromScroll() {
    const toolbarHeight = 50;
    const viewTop = toolbarHeight + 80;
    let current: string | null = null;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewTop) current = id;
    }
    if (current) {
      setActiveNav(current);
      if (window.location.hash !== `#${current}`) {
        history.replaceState(null, '', `#${current}`);
      }
    }
  }

  const mainEl = document.querySelector('.main');
  if (mainEl) {
    let ticking = false;
    mainEl.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    });
    // Run once after load so highlight matches initial scroll position (e.g. after hash scroll)
    requestAnimationFrame(() => {
      requestAnimationFrame(updateActiveFromScroll);
    });
  }

  console.log('✨ @swimlane/lit-ui demo loaded successfully!');
  console.log('Button, Input, Select, and Tabs components are ready to use');
});

function setupIconsDemo() {
  const container = document.getElementById('iconsPreview');
  if (!container) return;
  for (const name of ICON_NAMES) {
    const li = document.createElement('li');
    li.dataset.iconName = name;
    const icon = document.createElement('swim-icon');
    icon.setAttribute('font-icon', name);
    const label = document.createElement('span');
    label.className = 'icon-name';
    label.textContent = `ngx-icon ngx-${name}`;
    li.appendChild(icon);
    li.appendChild(label);
    container.appendChild(li);
  }
  const searchInput = document.getElementById('iconSearch') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      container.querySelectorAll<HTMLElement>('li').forEach(li => {
        const name = (li.dataset.iconName ?? '').toLowerCase();
        li.classList.toggle('icon-search-hidden', query.length > 0 && !name.includes(query));
      });
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        container.querySelectorAll('li').forEach(li => li.classList.remove('icon-search-hidden'));
        searchInput.blur();
      }
    });
  }
}

function setupSelectDemos() {
  // Attack Type options (match ngx-ui selects-page / controls-page)
  const attackTypeOptions = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' }
  ];

  // Fruit options for other selects
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

  // Basic / Required selects (mirror ngx-ui Single Select)
  const basicSelect = document.getElementById('basicSelect') as any;
  if (basicSelect) basicSelect.options = attackTypeOptions;

  const requiredSelect = document.getElementById('requiredSelect') as any;
  if (requiredSelect) requiredSelect.options = attackTypeOptions;

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
