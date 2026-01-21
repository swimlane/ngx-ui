import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Scrollable test content component to reproduce scroll position issues
 * This component displays a long list of items that can be scrolled
 */
@Component({
  selector: 'app-column-scrollable-test-content',
  template: `
    <div class="scrollable-content">
      <h2>Scrollable Column Content</h2>
      <p class="info">This is a scrollable content area. Scroll down to test scroll position preservation.</p>
      <p class="timestamp">Loaded at: {{ loadTime | date:'medium' }}</p>
      <p class="request-info">Request #{{ requestNumber }}</p>
      
      <div class="items-container">
        <div 
          *ngFor="let item of items; trackBy: trackByItemId" 
          class="item"
          [attr.data-item-id]="item.id">
          <h3>Item {{ item.id }}</h3>
          <p>{{ item.content }}</p>
          <div class="meta">
            <span>Request #{{ requestNumber }}</span>
            <span>•</span>
            <span>{{ item.timestamp | date:'HH:mm:ss.SSS' }}</span>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>Total items: {{ items.length }}</p>
        <p>Scroll position should be preserved when data refreshes</p>
      </div>
    </div>
  `,
  styles: [
    `
      .scrollable-content {
        padding: 24px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
      }

      h2 {
        margin-top: 0;
        color: var(--grey-100);
      }

      .info,
      .timestamp,
      .request-info {
        color: var(--grey-300);
        font-size: 14px;
        margin: 8px 0;
      }

      .request-info {
        font-weight: bold;
        color: var(--blue-400);
      }

      .items-container {
        margin-top: 24px;
      }

      .item {
        background: var(--grey-750);
        border: 1px solid var(--grey-700);
        border-radius: 4px;
        padding: 16px;
        margin-bottom: 12px;
        transition: background 0.2s;
      }

      .item:hover {
        background: var(--grey-700);
      }

      .item h3 {
        margin: 0 0 8px 0;
        color: var(--grey-100);
        font-size: 18px;
      }

      .item p {
        margin: 0 0 8px 0;
        color: var(--grey-200);
        line-height: 1.5;
      }

      .meta {
        display: flex;
        gap: 8px;
        font-size: 12px;
        color: var(--grey-400);
      }

      .footer {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid var(--grey-700);
        color: var(--grey-300);
        font-size: 14px;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule]
})
export class ColumnScrollableTestContentComponent implements OnInit, OnDestroy {
  items: Array<{ id: number; content: string; timestamp: Date }> = [];
  loadTime: Date = new Date();
  requestNumber: number = 1;
  private itemIdCounter = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.generateItems(50); // Generate 50 items for scrolling
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Generate items for the scrollable list
   */
  generateItems(count: number, requestNumber: number = 1): void {
    this.requestNumber = requestNumber;
    this.loadTime = new Date();
    
    const newItems: Array<{ id: number; content: string; timestamp: Date }> = [];
    
    for (let i = 0; i < count; i++) {
      const id = this.itemIdCounter++;
      newItems.push({
        id,
        content: `This is item ${id} loaded during request #${requestNumber}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        timestamp: new Date()
      });
    }
    
    this.items = newItems;
    this.cdr.markForCheck();
  }

  /**
   * Refresh items with new data (simulates data refresh)
   */
  refreshItems(requestNumber: number): void {
    this.generateItems(50, requestNumber);
  }

  trackByItemId(_index: number, item: { id: number; content: string; timestamp: Date }): number {
    return item.id;
  }
}
