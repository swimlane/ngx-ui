import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Column } from '@swimlane/ngx-ui';
import { ColumnScrollableTestContentComponent } from './column-scrollable-test.component';

export interface ColumnDataResponse {
  id: string;
  title: string;
  children?: ColumnDataResponse[];
  hasContent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ColumnDataService {
  private requestCounter = 0;

  /**
   * Mock HTTP request to fetch column data
   * Simulates network delay and returns different data on each request
   */
  fetchColumnData(columnId: string): Observable<ColumnDataResponse> {
    this.requestCounter++;
    
    // Simulate network delay (200-500ms)
    const delayMs = 200 + Math.random() * 300;
    
    // Return different data based on request counter to simulate data changes
    const mockData: ColumnDataResponse = this.generateMockColumnData(columnId, this.requestCounter);
    
    return of(mockData).pipe(delay(delayMs));
  }

  /**
   * Fetch all columns data for the entire tree
   * This makes a single request that generates the entire tree
   */
  fetchAllColumnsData(rootId: string = '1a'): Observable<Column> {
    this.requestCounter++;
    const delayMs = 300 + Math.random() * 400;
    const mockColumn = this.generateMockColumnTree(rootId, this.requestCounter);
    
    return of(mockColumn).pipe(delay(delayMs));
  }

  /**
   * Fetch data for a single column (simulates per-column API endpoint)
   * This would be called for each column individually in a real lazy-loading scenario
   */
  fetchColumnWithChildren(columnId: string, depth: number = 0): Observable<Column> {
    this.requestCounter++;
    const delayMs = 200 + Math.random() * 300;
    const requestNumber = this.requestCounter;
    
    const column: Column = {
      id: columnId,
      active: depth === 0,
      title: `Column ${columnId} (Request #${requestNumber})`,
      children: []
    };

    // Generate children for this column (25 items to ensure scrolling)
    const childCount = depth === 0 ? 25 : depth === 1 ? 20 : depth === 2 ? 15 : 10;
    
    for (let i = 0; i < childCount; i++) {
      const childId = this.generateChildId(columnId, i);
      const isActive = depth === 0 && i === 0;
      
      if (depth >= 3) {
        // Leaf nodes have content
        column.children!.push({
          id: childId,
          active: isActive,
          title: `Column ${childId} (Request #${requestNumber})`,
          content: {
            component: ColumnScrollableTestContentComponent,
            options: {}
          }
        });
      } else {
        // Non-leaf nodes - children would be fetched separately in real scenario
        column.children!.push({
          id: childId,
          active: isActive,
          title: `Column ${childId} (Request #${requestNumber})`,
          children: [] // Children would be loaded on-demand
        });
      }
    }
    
    return of(column).pipe(delay(delayMs));
  }

  /**
   * Generate mock column data that changes based on request counter
   * Generates many children to ensure scrolling is needed
   */
  private generateMockColumnData(columnId: string, requestNumber: number): ColumnDataResponse {
    const baseData: ColumnDataResponse = {
      id: columnId,
      title: `Column ${columnId} (Request #${requestNumber})`,
      hasContent: false
    };

    // Add many children to ensure scrolling is needed (20+ items)
    // Each item is 40px, viewport is ~300-500px, so 20+ items will require scrolling
    baseData.children = [];
    const childCount = 25;
    
    for (let i = 0; i < childCount; i++) {
      const childId = this.generateChildId(columnId, i);
      baseData.children.push({
        id: childId,
        title: `Column ${childId} (Request #${requestNumber})`,
        hasContent: i >= childCount - 5 // Last 5 items have content
      });
    }

    return baseData;
  }

  /**
   * Generate a complete mock column tree
   * Creates columns with many children to ensure scrolling is needed
   */
  private generateMockColumnTree(rootId: string, requestNumber: number): Column {
    const createColumn = (id: string, depth: number, isActive: boolean = false): Column => {
      const column: Column = {
        id,
        active: isActive,
        title: `Column ${id} (Request #${requestNumber})`,
        children: []
      };

      // Create nested structure up to 4 levels deep
      if (depth < 4) {
        // Generate many children to ensure scrolling is needed
        // Each item is 40px tall, viewport is ~300-500px, so we need 15-25+ items
        const childCount = depth === 0 ? 25 : depth === 1 ? 20 : depth === 2 ? 15 : 10;
        
        for (let i = 0; i < childCount; i++) {
          // Generate IDs: 1a, 1b, 1c, ... 1z, then 1aa, 1ab, etc.
          const childId = this.generateChildId(id, i);
          const childActive = depth === 0 && i === 0 ? true : false;
          
          if (depth === 3) {
            // Leaf nodes have scrollable content for testing
            column.children!.push({
              id: childId,
              active: childActive,
              title: `Column ${childId} (Request #${requestNumber})`,
              content: {
                component: ColumnScrollableTestContentComponent,
                options: {}
              }
            });
          } else {
            column.children!.push(createColumn(childId, depth + 1, childActive));
          }
        }
      } else {
        // Deep nested leaf
        column.content = {
          component: ColumnScrollableTestContentComponent,
          options: {}
        };
      }

      return column;
    };

    return createColumn(rootId, 0, true);
  }

  /**
   * Generate a child ID based on parent ID and index
   * Handles IDs beyond 'z' by using double letters (aa, ab, ac, etc.)
   */
  private generateChildId(parentId: string, index: number): string {
    if (index < 26) {
      // Single letter suffix: a-z
      return `${parentId}${String.fromCharCode(97 + index)}`;
    } else {
      // Double letter suffix: aa, ab, ac, etc.
      const firstLetter = String.fromCharCode(97 + Math.floor((index - 26) / 26));
      const secondLetter = String.fromCharCode(97 + ((index - 26) % 26));
      return `${parentId}${firstLetter}${secondLetter}`;
    }
  }
}
