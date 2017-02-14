import { Component, Input, ContentChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { SectionHeaderComponent } from './section-header.component';

@Component({
  selector: 'ngx-section',
  template: `
    <section>
      <header
        [class.ngx-section-collapsible]="sectionCollapsible"
        class="ngx-section-header"
        *ngIf="headerComp || sectionTitle">
        <button
          *ngIf="sectionCollapsible"
          class="ngx-section-toggle"
          (click)="onSectionClicked()"
          type="button"
          title="Toggle Content Visibility">
          <span
            [class.icon-arrow-down]="!sectionCollapsed"
            [class.icon-arrow-right]="sectionCollapsed">
          </span>
        </button>
        <ng-content select="ngx-section-header"></ng-content>
        <h1 *ngIf="sectionTitle" [innerHTML]="sectionTitle"></h1>
      </header>
      <div class="ngx-section-content" [style.padding]="padding" *ngIf="!sectionCollapsed">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  host: {
    class: 'ngx-section'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {

  @Input() sectionCollapsed: boolean = false;
  @Input() sectionCollapsible: boolean = true;
  @Input() sectionTitle: string;
  @Input() padding: any = '1.8em';

  @Output() toggle = new EventEmitter();

  @ContentChild(SectionHeaderComponent) headerComp: SectionHeaderComponent;

  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit(this.sectionCollapsed);
  }

}
