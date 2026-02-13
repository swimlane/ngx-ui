import { css } from 'lit';

/**
 * Calendar component styles matching @swimlane/ngx-ui calendar design.
 * Uses BEM naming: swim-calendar__element--modifier.
 */
export const calendarStyles = css`
  :host {
    position: relative;
    font-size: var(--font-size-m, 0.875rem);
    background: var(--grey-800, #1a202e);
    display: inline-block;
    border: 1px solid var(--grey-700, #2d3544);
    width: 270px;
    padding: 0.5rem 0;
    border-radius: var(--radius-6, 6px);
    box-sizing: border-box;
    color: var(--grey-050, #f0f3f8);
  }

  :host(:focus) {
    outline: none;
  }

  /* ------------------------------------------------------------------ */
  /* Title row (navigation)                                              */
  /* ------------------------------------------------------------------ */

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--grey-800, #1a202e);
    color: var(--grey-050, #f0f3f8);
    padding: 0.69rem 0;
    font-weight: var(--font-weight-semibold, 600);
    line-height: 1;
  }

  .title-row .title {
    color: var(--blue-400, #1483ff);
    min-width: 100px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: var(--radius-4, 4px);
    background: none;
    border: none;
    font: inherit;
    font-weight: var(--font-weight-semibold, 600);
    font-size: inherit;
  }

  .title-row .title:hover {
    background: var(--grey-750, #232a38);
  }

  .title-row .prev-month,
  .title-row .next-month {
    color: var(--grey-350, #72819f);
    font-size: var(--font-size-xxs, 0.65rem);
    border-radius: var(--radius-4, 4px);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    line-height: 1;
  }

  .title-row .prev-month:hover,
  .title-row .next-month:hover {
    color: var(--grey-050, #f0f3f8);
  }

  .title-row .prev-month:disabled,
  .title-row .next-month:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  button {
    outline: 0px var(--blue-200, #97c4ff);
  }

  button:focus-visible {
    outline: 2px solid var(--blue-200, #97c4ff);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Day names row                                                       */
  /* ------------------------------------------------------------------ */

  .day-name-row {
    color: var(--grey-350, #72819f);
    font-weight: var(--font-weight-semibold, 600);
    display: flex;
  }

  .day-name {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
  }

  /* ------------------------------------------------------------------ */
  /* Day grid                                                            */
  /* ------------------------------------------------------------------ */

  .day-container {
    margin-top: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .day-row {
    display: flex;
  }

  .day-cell {
    flex: 1 0 30px;
    margin: 0.1rem 0.2rem;
    line-height: 1.8rem;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
  }

  .day {
    color: var(--grey-050, #f0f3f8);
    height: 100%;
    width: 100%;
    max-height: 30px;
    max-width: 30px;
    line-height: 1.8rem;
    border-radius: 50%;
    text-align: center;
    transition: background 200ms;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    font-size: inherit;
  }

  .day.prev-month,
  .day.next-month {
    color: var(--grey-350, #72819f);
    opacity: 0.2;
  }

  .day.today {
    background: var(--grey-750, #232a38);
  }

  .day.active {
    background: var(--blue-400, #1483ff);
    color: var(--grey-050, #f0f3f8);
  }

  .day:hover:not(.active):not([disabled]) {
    background: var(--blue-400, #1483ff);
    color: var(--grey-050, #f0f3f8);
    opacity: 1;
  }

  .day:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .day.focus:not([disabled]) {
    outline: 2px solid var(--blue-200, #97c4ff);
    outline-offset: 1px;
  }

  /* ------------------------------------------------------------------ */
  /* Month grid                                                          */
  /* ------------------------------------------------------------------ */

  .months-container {
    margin: 0.5rem;
    color: var(--grey-050, #f0f3f8);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .months-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--grey-700, #2d3544);
  }

  .month-cell {
    padding: 0;
    border: 1px solid var(--grey-700, #2d3544);
  }

  .month {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s, 0.8rem);
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s, 0.8rem);
    text-transform: uppercase;
  }

  .month.active {
    background-color: var(--blue-400, #1483ff);
  }

  .month.current:not(.active) {
    background-color: var(--grey-750, #232a38);
  }

  .month:hover:not(.active):not([disabled]) {
    background: var(--blue-400, #1483ff);
    color: var(--grey-050, #f0f3f8);
    opacity: 1;
  }

  .month:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ------------------------------------------------------------------ */
  /* Year grid                                                           */
  /* ------------------------------------------------------------------ */

  .years-container {
    margin: 0.5rem;
    color: var(--grey-050, #f0f3f8);
    width: calc(100% - 1rem);
    border-collapse: collapse;
  }

  .years-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--grey-700, #2d3544);
  }

  .year-cell {
    padding: 0;
    border: 1px solid var(--grey-700, #2d3544);
  }

  .year {
    grid-auto-rows: auto;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-s, 0.8rem);
    width: 100%;
    padding: 0.475rem;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: var(--font-size-s, 0.8rem);
  }

  .year.active {
    background-color: var(--blue-400, #1483ff);
  }

  .year.current:not(.active) {
    background-color: var(--grey-750, #232a38);
  }

  .year:hover:not(.active):not([disabled]) {
    background: var(--blue-400, #1483ff);
    color: var(--grey-050, #f0f3f8);
    opacity: 1;
  }

  .year:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
