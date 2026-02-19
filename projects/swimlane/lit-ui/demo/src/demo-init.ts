/// <reference types="vite/client" />
/**
 * Demo initialization: load section HTML and wire up all interactive demos.
 * Invoked from main.ts after DOMContentLoaded.
 */

import { ICON_NAMES } from './icon-names';
import { openDrawer } from '../../src/components/drawer/drawer-controller';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function delayReject(ms: number): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), ms));
}

// List demo data (matches ngx-ui list-page)
const LIST_DATA: Array<Record<string, unknown>> = [
  { type: 'Malware', date: '1/1/2025', origin: 'China' },
  { type: 'DDOS', date: '1/5/2025', origin: 'China' },
  { type: 'DDOS', date: '1/5/2025', origin: 'Russia' },
  { type: 'XSS', date: '1/6/2025', origin: 'North Korea' },
  { type: 'DDOS', date: '1/6/2025', origin: 'North Korea' },
  { type: 'Ransomware', date: '1/8/2025', origin: 'China' },
  { type: 'DDOS', date: '1/9/2025', origin: 'China' },
  { type: 'SQL injection', date: '1/10/2025', origin: 'North Korea' },
  { type: 'Malware', date: '1/11/2025', origin: 'Russia' },
  { type: 'DDOS', date: '1/11/2025', origin: 'Russia' }
];

const LIST_HEADERS = ['Attack Type', 'Date of Attack', 'Origin of Attack'];
const LIST_COLUMNS = ['type', 'date', 'origin'];

const LIST_DATA_WITH_STATUS: Array<Record<string, unknown>> = [
  { type: 'Malware', date: '1/1/2025', origin: 'China', status: 'error' },
  { type: 'DDOS', date: '1/5/2025', origin: 'China', status: 'warning' },
  { type: 'DDOS', date: '1/5/2025', origin: 'Russia', status: 'warning' },
  { type: 'XSS', date: '1/6/2025', origin: 'North Korea', status: 'success' },
  { type: 'DDOS', date: '1/6/2025', origin: 'North Korea', status: 'warning' },
  { type: 'Ransomware', date: '1/8/2025', origin: 'China', status: 'error' },
  { type: 'DDOS', date: '1/9/2025', origin: 'China', status: 'warning' },
  { type: 'SQL injection', date: '1/10/2025', origin: 'North Korea', status: 'success' },
  { type: 'Malware', date: '1/11/2025', origin: 'Russia', status: 'error' },
  { type: 'XSS', date: '1/11/2025', origin: 'Russia', status: 'success' }
];

const LIST_LARGE_DATA = [
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA,
  ...LIST_DATA
];

const SECTION_FILES = [
  'buttons',
  'input',
  'select',
  'datetime',
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
  'split',
  'navbar',
  'tooltip',
  'list',
  'dialog',
  'drawer',
  'scrollbars',
  'icons'
];

const SECTION_SET = new Set([...SECTION_FILES, 'datetime', 'drawer']);
const DEFAULT_SECTION = SECTION_FILES[0];

const sectionCache = new Map<string, string>();

async function loadSection(sectionId: string): Promise<string> {
  const cached = sectionCache.get(sectionId);
  if (cached) return cached;
  const res = await fetch(`${import.meta.env.BASE_URL}sections/${sectionId}.html`);
  if (!res.ok) throw new Error(`Failed to load section: ${sectionId}`);
  const html = await res.text();
  sectionCache.set(sectionId, html);
  return html;
}

function getSectionIdFromHash(): string {
  const hash = window.location.hash.slice(1).toLowerCase();
  return SECTION_SET.has(hash) ? hash : DEFAULT_SECTION;
}

async function showSection(sectionId: string): Promise<void> {
  const container = document.getElementById('page-sections');
  if (!container) return;
  try {
    const html = await loadSection(sectionId);
    container.innerHTML = html;
    setupDemos();
  } catch (err) {
    console.error('Failed to load section:', sectionId, err);
    container.innerHTML = `<p class="section-desc">Failed to load section: ${sectionId}</p>`;
  }
}

function setupDrawerDemos(): void {
  type DrawerEl = HTMLElement & { show(): void; hide(): void; open: boolean };
  const getDrawer = (id: string) => document.getElementById(id) as DrawerEl | null;

  const drawerOpenLeft = document.getElementById('drawerOpenLeft');
  const drawerOpenBottom = document.getElementById('drawerOpenBottom');
  if (drawerOpenLeft && getDrawer('drawerDefaultLeft')) {
    drawerOpenLeft.addEventListener('click', () => getDrawer('drawerDefaultLeft')!.show());
  }
  if (drawerOpenBottom && getDrawer('drawerDefaultBottom')) {
    drawerOpenBottom.addEventListener('click', () => getDrawer('drawerDefaultBottom')!.show());
  }
  getDrawer('drawerDefaultLeft')?.addEventListener('close', () => {
    const d = getDrawer('drawerDefaultLeft');
    if (d) d.open = false;
  });
  getDrawer('drawerDefaultBottom')?.addEventListener('close', () => {
    const d = getDrawer('drawerDefaultBottom');
    if (d) d.open = false;
  });

  const drawerOpenDetails = document.getElementById('drawerOpenDetails');
  const drawerOpenDetailsBottom = document.getElementById('drawerOpenDetailsBottom');
  if (drawerOpenDetails || drawerOpenDetailsBottom) {
    const openDetailsContent = `
      <div class="drawer-demo-toolbar">Details</div>
      <div class="drawer-demo-section">
        <h1>Nested Drawer Content</h1>
        <p>This drawer was opened programmatically via openDrawer().</p>
      </div>
    `;
    drawerOpenDetails?.addEventListener('click', () =>
      openDrawer({ direction: 'left', size: 50, content: openDetailsContent })
    );
    drawerOpenDetailsBottom?.addEventListener('click', () =>
      openDrawer({ direction: 'bottom', size: 40, content: openDetailsContent })
    );
  }

  const drawerNoCloseLeft = document.getElementById('drawerNoCloseLeft');
  const drawerNoCloseBottom = document.getElementById('drawerNoCloseBottom');
  if (drawerNoCloseLeft && getDrawer('drawerNoCloseLeft')) {
    drawerNoCloseLeft.addEventListener('click', () => getDrawer('drawerNoCloseLeft')!.show());
  }
  if (drawerNoCloseBottom && getDrawer('drawerNoCloseBottom')) {
    drawerNoCloseBottom.addEventListener('click', () => getDrawer('drawerNoCloseBottom')!.show());
  }
  document
    .getElementById('drawerNoCloseBtnLeft')
    ?.addEventListener('click', () => getDrawer('drawerNoCloseLeft')?.hide());
  document
    .getElementById('drawerNoCloseBtnBottom')
    ?.addEventListener('click', () => getDrawer('drawerNoCloseBottom')?.hide());
  getDrawer('drawerNoCloseLeft')?.addEventListener('close', () => {
    const d = getDrawer('drawerNoCloseLeft');
    if (d) d.open = false;
  });
  getDrawer('drawerNoCloseBottom')?.addEventListener('close', () => {
    const d = getDrawer('drawerNoCloseBottom');
    if (d) d.open = false;
  });

  const drawerContainerOpenLeft = document.getElementById('drawerContainerOpenLeft');
  const drawerContainerOpenBottom = document.getElementById('drawerContainerOpenBottom');
  if (drawerContainerOpenLeft && getDrawer('drawerContainerLeft')) {
    drawerContainerOpenLeft.addEventListener('click', () => getDrawer('drawerContainerLeft')!.show());
  }
  if (drawerContainerOpenBottom && getDrawer('drawerContainerBottom')) {
    drawerContainerOpenBottom.addEventListener('click', () => getDrawer('drawerContainerBottom')!.show());
  }
  getDrawer('drawerContainerLeft')?.addEventListener('close', () => {
    const d = getDrawer('drawerContainerLeft');
    if (d) d.open = false;
  });
  getDrawer('drawerContainerBottom')?.addEventListener('close', () => {
    const d = getDrawer('drawerContainerBottom');
    if (d) d.open = false;
  });

  const drawerImperativeLeft = document.getElementById('drawerImperativeLeft');
  const drawerImperativeBottom = document.getElementById('drawerImperativeBottom');
  if (drawerImperativeLeft || drawerImperativeBottom) {
    const imperativeContent = `
      <div class="drawer-demo-toolbar">Alert Everyone!</div>
      <div class="drawer-demo-section">
        <h1>Attack Type: Malware</h1>
        <p>Opened via openDrawer().</p>
      </div>
    `;
    drawerImperativeLeft?.addEventListener('click', () =>
      openDrawer({ direction: 'left', size: 70, content: imperativeContent })
    );
    drawerImperativeBottom?.addEventListener('click', () =>
      openDrawer({ direction: 'bottom', content: imperativeContent })
    );
  }
}

function setupIconsDemo(): void {
  const container = document.getElementById('iconsPreview');
  if (!container) return;
  for (const name of ICON_NAMES) {
    const li = document.createElement('li');
    li.dataset.iconName = name;
    const icon = document.createElement('swim-icon');
    icon.setAttribute('font-icon', name);
    const label = document.createElement('span');
    label.className = 'icon-name';
    label.textContent = name;
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

function setupSelectDemos(): void {
  const attackTypeOptions = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' }
  ];

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

  const basicSelect = document.getElementById('basicSelect') as any;
  if (basicSelect) basicSelect.options = attackTypeOptions;

  const requiredSelect = document.getElementById('requiredSelect') as any;
  if (requiredSelect) requiredSelect.options = attackTypeOptions;

  const legacySelect = document.getElementById('legacySelect') as any;
  if (legacySelect) legacySelect.options = fruits;

  const fillSelect = document.getElementById('fillSelect') as any;
  if (fillSelect) fillSelect.options = fruits;

  const smallSelect = document.getElementById('smallSelect') as any;
  if (smallSelect) smallSelect.options = fruits;

  const mediumSelect = document.getElementById('mediumSelect') as any;
  if (mediumSelect) mediumSelect.options = fruits;

  const largeSelect = document.getElementById('largeSelect') as any;
  if (largeSelect) largeSelect.options = fruits;

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

function setupDateTimeDemos(): void {
  type DtEl = HTMLElement & { value: Date | string | null };
  const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';
  const MOON_LANDING = '1969-07-20T20:17:43Z';
  const appDate = new Date('10/10/2016 2:35 PM');

  // --- Date Input section ---
  const dateInput1 = document.getElementById('dateInput1') as DtEl | null;
  const dateInput1Value = document.getElementById('dateInput1Value');
  if (dateInput1) {
    dateInput1.value = new Date('10/10/2016');
    dateInput1.addEventListener('change', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (dateInput1Value) dateInput1Value.textContent = JSON.stringify(detail);
    });
  }

  const dateInput2 = document.getElementById('dateInput2') as DtEl | null;
  if (dateInput2) dateInput2.value = new Date('10/10/2016');

  const dateInput3 = document.getElementById('dateInput3') as DtEl | null;
  const dateInput3Value = document.getElementById('dateInput3Value');
  if (dateInput3) {
    dateInput3.value = new Date('10/10/2016');
    dateInput3.addEventListener('change', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (dateInput3Value) dateInput3Value.textContent = JSON.stringify(detail);
    });
  }

  const dateInput4 = document.getElementById('dateInput4') as DtEl | null;
  if (dateInput4) dateInput4.value = new Date('10/10/2016');

  // --- Date/Time Input ---
  const dateTimeInput = document.getElementById('dateTimeInput') as DtEl | null;
  const dateTimeInputValue = document.getElementById('dateTimeInputValue');
  if (dateTimeInput) {
    dateTimeInput.value = new Date(MOON_LANDING);
    dateTimeInput.addEventListener('change', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (dateTimeInputValue) dateTimeInputValue.textContent = JSON.stringify(detail);
    });
  }

  // --- Timezones ---
  const tzDate = new Date(TOHOKU_EARTHQUAKE);
  const tzValue = document.getElementById('tzValue');
  ['tzLocal', 'tzUtc', 'tzJst'].forEach(id => {
    const el = document.getElementById(id) as DtEl | null;
    if (el) {
      el.value = tzDate;
      el.addEventListener('change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (tzValue) tzValue.textContent = JSON.stringify(detail);
      });
    }
  });

  // --- Time Input ---
  const moonDate = new Date(MOON_LANDING);
  const timeInputValue = document.getElementById('timeInputValue');
  ['timeInput1', 'timeInputTz', 'timeInputUtc', 'timeInputJst'].forEach(id => {
    const el = document.getElementById(id) as DtEl | null;
    if (el) {
      el.value = moonDate;
      el.addEventListener('change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (timeInputValue) timeInputValue.textContent = JSON.stringify(detail);
      });
    }
  });

  // --- Precision ---
  const precisionValue = document.getElementById('precisionValue');
  ['precisionYear', 'precisionMonth', 'precisionHour', 'precisionMinute'].forEach(id => {
    const el = document.getElementById(id) as DtEl | null;
    if (el) {
      el.value = moonDate;
      el.addEventListener('change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (precisionValue) precisionValue.textContent = JSON.stringify(detail);
      });
    }
  });

  // --- Autosize ---
  const autosizeValue = document.getElementById('autosizeValue');
  ['autosizeYear', 'autosizeMonth', 'autosizeHour', 'autosizeMinute', 'autosizeNoMargin'].forEach(id => {
    const el = document.getElementById(id) as DtEl | null;
    if (el) {
      el.value = appDate;
      el.addEventListener('change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (autosizeValue) autosizeValue.textContent = JSON.stringify(detail);
      });
    }
  });

  // --- Appearances table (set values on components that need one) ---
  const appIds = [
    'appFilled',
    'appFilledFill',
    'appRequired',
    'appRequiredFill',
    'appTime',
    'appTimeFill',
    'appDateTime',
    'appDateTimeFill',
    'appDisabled',
    'appDisabledFill'
  ];
  appIds.forEach(id => {
    const el = document.getElementById(id) as DtEl | null;
    if (el) el.value = appDate;
  });
}

function setupListDemos(): void {
  type ListEl = HTMLElement & {
    dataSource: Array<Record<string, unknown>>;
    headerLabels: string[];
    columns: string[];
    columnLayout?: string;
    defaultRowStatus?: string;
    height?: number;
    paginationConfig?: { pageSize: number; index?: number };
  };

  const listBasic = document.getElementById('listBasic') as ListEl | null;
  if (listBasic) {
    listBasic.dataSource = LIST_DATA;
    listBasic.headerLabels = LIST_HEADERS;
    listBasic.columns = LIST_COLUMNS;
    listBasic.defaultRowStatus = 'error';
  }

  const listColumnLayout = document.getElementById('listColumnLayout') as ListEl | null;
  if (listColumnLayout) {
    listColumnLayout.dataSource = LIST_DATA;
    listColumnLayout.headerLabels = LIST_HEADERS;
    listColumnLayout.columns = LIST_COLUMNS;
    listColumnLayout.columnLayout = '3fr 2fr 1fr';
    listColumnLayout.defaultRowStatus = 'error';
  }

  const listPagination = document.getElementById('listPagination') as ListEl | null;
  const listPaginationPage = document.getElementById('listPaginationPage');
  if (listPagination) {
    listPagination.dataSource = LIST_LARGE_DATA;
    listPagination.headerLabels = LIST_HEADERS;
    listPagination.columns = LIST_COLUMNS;
    listPagination.columnLayout = '1fr 1fr 1fr';
    listPagination.height = 400;
    listPagination.paginationConfig = { pageSize: 10 };
    listPagination.defaultRowStatus = 'error';
    listPagination.addEventListener('page-change', (e: CustomEvent<number>) => {
      if (listPaginationPage) listPaginationPage.textContent = String(e.detail ?? 1);
    });
    if (listPaginationPage) listPaginationPage.textContent = '1';
  }

  const listPaginationPage5 = document.getElementById('listPaginationPage5') as ListEl | null;
  const listPaginationPage5Value = document.getElementById('listPaginationPage5Value');
  if (listPaginationPage5) {
    listPaginationPage5.dataSource = LIST_LARGE_DATA;
    listPaginationPage5.headerLabels = ['No.', 'Attack Type', 'Date of Attack', 'Origin of Attack'];
    listPaginationPage5.columns = ['$index', 'type', 'date', 'origin'];
    listPaginationPage5.columnLayout = '5rem 1fr 1fr 1fr';
    listPaginationPage5.height = 400;
    listPaginationPage5.paginationConfig = { index: 5, pageSize: 10 };
    listPaginationPage5.defaultRowStatus = 'error';
    listPaginationPage5.addEventListener('page-change', (e: CustomEvent<number>) => {
      if (listPaginationPage5Value) listPaginationPage5Value.textContent = String(e.detail ?? 5);
    });
    if (listPaginationPage5Value) listPaginationPage5Value.textContent = '5';
  }

  const listWithStatus = document.getElementById('listWithStatus') as ListEl | null;
  if (listWithStatus) {
    listWithStatus.dataSource = LIST_DATA_WITH_STATUS;
    listWithStatus.headerLabels = LIST_HEADERS;
    listWithStatus.columns = LIST_COLUMNS;
  }

  const listNoStatus = document.getElementById('listNoStatus') as ListEl | null;
  if (listNoStatus) {
    listNoStatus.dataSource = LIST_DATA;
    listNoStatus.headerLabels = LIST_HEADERS;
    listNoStatus.columns = LIST_COLUMNS;
    listNoStatus.defaultRowStatus = 'error';
  }
}

/**
 * Attach demo event handlers and setup for the currently rendered section.
 * Called after each section is injected into #page-sections.
 */
function setupDemos(): void {
  // Button demos (promise handling)
  const successBtn = document.getElementById('successBtn');
  if (successBtn) {
    successBtn.addEventListener('click', () => {
      (successBtn as any).promise = delay(1000);
    });
  }
  const failBtn = document.getElementById('failBtn');
  if (failBtn) {
    failBtn.addEventListener('click', () => {
      (failBtn as any).promise = delayReject(1000);
    });
  }
  const slowBtn = document.getElementById('slowBtn');
  if (slowBtn) {
    slowBtn.addEventListener('click', () => {
      (slowBtn as any).promise = delay(5000);
    });
  }

  // Form validation demo
  const demoForm = document.getElementById('demoForm') as HTMLFormElement | null;
  if (demoForm) {
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

  setupSelectDemos();
  setupDateTimeDemos();

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
    outlineCardDemo.addEventListener('outline-click', () => console.log('Outline clicked'));
  }

  // Checkbox demos
  const checkboxDemoEvent = document.getElementById('checkboxDemoEvent') as any;
  const checkboxDemoChecked = document.getElementById('checkboxDemoChecked');
  const checkboxDemoEventName = document.getElementById('checkboxDemoEventName');
  if (checkboxDemoEvent && checkboxDemoChecked && checkboxDemoEventName) {
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
    checkboxDemoChecked.textContent = String(checkboxDemoEvent.checked);
  }

  // Radio demos
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
  const radioGroupDemo = document.getElementById('radioGroupDemo') as any;
  const radioGroupValue = document.getElementById('radioGroupValue');
  if (radioGroupDemo && radioGroupValue) {
    radioGroupValue.textContent = String(radioGroupDemo.value ?? '—');
    radioGroupDemo.addEventListener('change', (e: CustomEvent<unknown>) => {
      radioGroupValue.textContent = String(e.detail ?? '—');
    });
  }

  // Progress spinner with label
  const progressSpinnerWithLabel = document.getElementById('progressSpinnerWithLabel') as any;
  if (progressSpinnerWithLabel) {
    progressSpinnerWithLabel.spinnerLabel = {
      inProgressLabel: 'Loading...',
      completeLabel: 'Complete!',
      failLabel: 'Failed'
    };
  }

  // Progress spinner configurable (live controls)
  const progressSpinnerConfigurable = document.getElementById('progressSpinnerConfigurable') as any;
  const progressSpinnerCodeEl = document.getElementById('progressSpinnerConfigurableCode');
  const configurableIds = [
    'progressSpinnerValue',
    'progressSpinnerTotal',
    'progressSpinnerDiameter',
    'progressSpinnerStrokeWidth',
    'progressSpinnerColor',
    'progressSpinnerMode',
    'progressSpinnerCompleteStatus',
    'progressSpinnerShowIcon'
  ] as const;

  function updateProgressSpinnerConfigurable(): void {
    if (!progressSpinnerConfigurable) return;
    const valueEl = document.getElementById('progressSpinnerValue') as HTMLInputElement | null;
    const totalEl = document.getElementById('progressSpinnerTotal') as HTMLInputElement | null;
    const diameterEl = document.getElementById('progressSpinnerDiameter') as HTMLInputElement | null;
    const strokeWidthEl = document.getElementById('progressSpinnerStrokeWidth') as HTMLInputElement | null;
    const colorEl = document.getElementById('progressSpinnerColor') as HTMLInputElement | null;
    const modeEl = document.getElementById('progressSpinnerMode') as HTMLSelectElement | null;
    const completeStatusEl = document.getElementById('progressSpinnerCompleteStatus') as HTMLSelectElement | null;
    const showIconEl = document.getElementById('progressSpinnerShowIcon') as any;

    const value = valueEl?.value ?? '35';
    const total = totalEl?.value ?? '100';
    const diameter = diameterEl?.value ?? '100';
    const strokeWidth = strokeWidthEl?.value ?? '5';
    const color = colorEl?.value ?? 'lime';
    const mode = modeEl?.value ?? 'indeterminate';
    const completeStatus = completeStatusEl?.value ?? 'success';
    const showIcon = showIconEl?.checked !== false;
    const effectiveValue = completeStatus === 'fail' || completeStatus === 'success' ? total : value;

    progressSpinnerConfigurable.value = Number(effectiveValue);
    progressSpinnerConfigurable.total = Number(total);
    progressSpinnerConfigurable.diameter = Number(diameter);
    progressSpinnerConfigurable.strokeWidth = Number(strokeWidth);
    progressSpinnerConfigurable.color = color;
    progressSpinnerConfigurable.setAttribute('mode', mode);
    progressSpinnerConfigurable.isFailure = completeStatus === 'fail';
    progressSpinnerConfigurable.appearance = showIcon ? 'icon' : 'default';
    progressSpinnerConfigurable.requestUpdate?.();

    if (progressSpinnerCodeEl) {
      const failAttr = completeStatus === 'fail' ? '\n  is-failure' : '';
      progressSpinnerCodeEl.textContent = `<swim-progress-spinner\n  mode="${mode}"\n  value="${effectiveValue}"\n  total="${total}"\n  diameter="${diameter}"\n  stroke-width="${strokeWidth}"\n  color="${color}"\n  appearance="${
        showIcon ? 'icon' : 'default'
      }"${failAttr}\n  aria-label="...">\n</swim-progress-spinner>`;
    }
  }

  if (progressSpinnerConfigurable) {
    const modeSelect = document.getElementById('progressSpinnerMode');
    if (modeSelect) {
      modeSelect.addEventListener('change', () => setTimeout(updateProgressSpinnerConfigurable, 0));
    }
    configurableIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el !== modeSelect) {
        el.addEventListener('input', updateProgressSpinnerConfigurable);
        el.addEventListener('change', updateProgressSpinnerConfigurable);
      }
    });
    if (modeSelect) {
      modeSelect.addEventListener('input', updateProgressSpinnerConfigurable);
    }
    const showIconToggle = document.getElementById('progressSpinnerShowIcon');
    if (showIconToggle) {
      showIconToggle.addEventListener('change', updateProgressSpinnerConfigurable);
    }
    updateProgressSpinnerConfigurable();
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
    toggleDemoChecked.textContent = String(toggleDemoEvent.checked);
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

  setupIconsDemo();
  setupListDemos();

  // Dialog demos
  const dialogContentOpen = document.getElementById('dialogContentOpen');
  const dialogContentDemo = document.getElementById('dialogContentDemo') as any;
  if (dialogContentOpen && dialogContentDemo) {
    dialogContentOpen.addEventListener('click', () => {
      dialogContentDemo.visible = true;
    });
    dialogContentDemo.addEventListener('close', () => {
      dialogContentDemo.visible = false;
    });
  }

  const dialogComponentToggle = document.getElementById('dialogComponentToggle');
  const dialogComponentDemo = document.getElementById('dialogComponentDemo') as any;
  if (dialogComponentToggle && dialogComponentDemo) {
    dialogComponentToggle.addEventListener('click', () => {
      dialogComponentDemo.visible = !dialogComponentDemo.visible;
    });
    dialogComponentDemo.addEventListener('close', () => {
      dialogComponentDemo.visible = false;
    });
  }

  const dialogWizardOpen = document.getElementById('dialogWizardOpen');
  const dialogWizardDemo = document.getElementById('dialogWizardDemo') as any;
  if (dialogWizardOpen && dialogWizardDemo) {
    dialogWizardOpen.addEventListener('click', () => {
      dialogWizardDemo.visible = true;
    });
    dialogWizardDemo.addEventListener('close', () => {
      dialogWizardDemo.visible = false;
    });
  }
  const dialogWizardTabs = document.getElementById('dialogWizardTabs') as {
    prev?: () => void;
    next?: () => void;
  } | null;
  const dialogWizardPrev = document.getElementById('dialogWizardPrev');
  const dialogWizardNext = document.getElementById('dialogWizardNext');
  if (dialogWizardPrev && dialogWizardTabs?.prev) {
    dialogWizardPrev.addEventListener('click', () => dialogWizardTabs.prev!());
  }
  if (dialogWizardNext && dialogWizardTabs?.next) {
    dialogWizardNext.addEventListener('click', () => dialogWizardTabs.next!());
  }

  const dialogFullScreenOpen = document.getElementById('dialogFullScreenOpen');
  const dialogFullScreenDemo = document.getElementById('dialogFullScreenDemo') as any;
  if (dialogFullScreenOpen && dialogFullScreenDemo) {
    dialogFullScreenOpen.addEventListener('click', () => {
      dialogFullScreenDemo.visible = true;
    });
    dialogFullScreenDemo.addEventListener('close', () => {
      dialogFullScreenDemo.visible = false;
    });
  }

  const dialogLargeFormatOpen = document.getElementById('dialogLargeFormatOpen');
  const dialogLargeFormatDemo = document.getElementById('dialogLargeFormatDemo') as any;
  if (dialogLargeFormatOpen && dialogLargeFormatDemo) {
    dialogLargeFormatOpen.addEventListener('click', () => {
      dialogLargeFormatDemo.visible = true;
    });
    dialogLargeFormatDemo.addEventListener('close-or-cancel', () => {
      dialogLargeFormatDemo.visible = false;
    });
  }

  const dialogMediumFormatOpen = document.getElementById('dialogMediumFormatOpen');
  const dialogMediumFormatDemo = document.getElementById('dialogMediumFormatDemo') as any;
  if (dialogMediumFormatOpen && dialogMediumFormatDemo) {
    dialogMediumFormatOpen.addEventListener('click', () => {
      dialogMediumFormatDemo.visible = true;
    });
    dialogMediumFormatDemo.addEventListener('close-or-cancel', () => {
      dialogMediumFormatDemo.visible = false;
    });
  }

  const dialogMediumContentOpen = document.getElementById('dialogMediumContentOpen');
  const dialogMediumContentDemo = document.getElementById('dialogMediumContentDemo') as any;
  if (dialogMediumContentOpen && dialogMediumContentDemo) {
    dialogMediumContentOpen.addEventListener('click', () => {
      dialogMediumContentDemo.visible = true;
    });
    dialogMediumContentDemo.addEventListener('close-or-cancel', () => {
      dialogMediumContentDemo.visible = false;
    });
  }

  const dialogMediumFooterOpen = document.getElementById('dialogMediumFooterOpen');
  const dialogMediumFooterDemo = document.getElementById('dialogMediumFooterDemo') as any;
  if (dialogMediumFooterOpen && dialogMediumFooterDemo) {
    dialogMediumFooterOpen.addEventListener('click', () => {
      dialogMediumFooterDemo.visible = true;
    });
    dialogMediumFooterDemo.addEventListener('close-or-cancel', () => {
      dialogMediumFooterDemo.visible = false;
    });
  }

  const dialogMediumFooterContentOpen = document.getElementById('dialogMediumFooterContentOpen');
  const dialogMediumFooterContentDemo = document.getElementById('dialogMediumFooterContentDemo') as any;
  if (dialogMediumFooterContentOpen && dialogMediumFooterContentDemo) {
    dialogMediumFooterContentOpen.addEventListener('click', () => {
      dialogMediumFooterContentDemo.visible = true;
    });
    dialogMediumFooterContentDemo.addEventListener('close-or-cancel', () => {
      dialogMediumFooterContentDemo.visible = false;
    });
  }

  // Drawer demos
  setupDrawerDemos();

  // Navbar demo: programmatic goTo
  const navbarGoToFourthBtn = document.getElementById('navbarGoToFourthBtn');
  const navbarTopDemo = document.getElementById('navbarTopDemo');
  if (navbarGoToFourthBtn && navbarTopDemo && 'goTo' in navbarTopDemo) {
    navbarGoToFourthBtn.addEventListener('click', () => (navbarTopDemo as { goTo(index: number): void }).goTo(3));
  }

  // Select form demo
  const selectForm = document.getElementById('selectForm');
  if (selectForm) {
    selectForm.addEventListener('submit', e => {
      e.preventDefault();
      const categorySelect = document.getElementById('formSelect1') as any;
      const tagsSelect = document.getElementById('formSelect2') as any;
      console.log('Select Form submitted!');
      alert(`Form submitted!\nCategory: ${categorySelect.value}\nTags: ${JSON.stringify(tagsSelect.value)}`);
    });
  }
}

/**
 * Initialize demo app: load section from URL hash (or first section), wire nav, and listen for hash changes.
 */
export async function initDemos(): Promise<void> {
  // Nav click: use delegation so every section link works (load section first, then update URL)
  const nav = document.querySelector('.navigation');
  if (nav) {
    nav.addEventListener('click', async (e: Event) => {
      const link = (e.target as HTMLElement)?.closest?.('a.sub-nav-item[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const sectionId = href.slice(1).toLowerCase();
      if (!SECTION_SET.has(sectionId)) return;
      e.preventDefault();
      e.stopPropagation();
      const currentId = window.location.hash.slice(1).toLowerCase();
      if (currentId !== sectionId) {
        await showSection(sectionId);
        history.replaceState(null, '', '#' + sectionId);
        setActiveNav(sectionId);
      } else {
        showSection(sectionId);
      }
    });
  }

  window.addEventListener('hashchange', () => {
    const sectionId = getSectionIdFromHash();
    setActiveNav(sectionId);
    showSection(sectionId);
  });

  function setActiveNav(sectionId?: string): void {
    const id = sectionId ?? getSectionIdFromHash();
    document.querySelectorAll('.sub-nav-item.active, .nav-item.active').forEach(el => el.classList.remove('active'));
    document
      .querySelectorAll(`.sub-nav-item[href="#${id}"], .nav-item[href="#${id}"]`)
      .forEach(el => el.classList.add('active'));
  }

  const initialSection = getSectionIdFromHash();
  if (window.location.hash.slice(1).toLowerCase() !== initialSection) {
    history.replaceState(null, '', `#${initialSection}`);
  }
  setActiveNav(initialSection);
  await showSection(initialSection);

  // Search: filter nav by link/label text (once, nav is outside section content)
  const searchInput = document.getElementById('navSearch') as HTMLInputElement | null;
  const containers = document.querySelectorAll<HTMLElement>('.nav-item-container');
  const subNavItems = document.querySelectorAll<HTMLAnchorElement>('.sub-nav-item');

  function filterNav(): void {
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

  console.log('✨ @swimlane/lit-ui demo loaded successfully!');
}
