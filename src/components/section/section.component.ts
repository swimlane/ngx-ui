import { Component, Input, ContentChild } from '@angular/core';
import { SectionHeaderComponent } from './section-header.component';

@Component({
  selector: 'swui-section',
  template: `
    <section>
      <header
        [class.swui-section-collapsible]="sectionCollapsible"
        class="swui-section-header"
        *ngIf="headerComp || sectionTitle">
        <button
          *ngIf="sectionCollapsible"
          class="swui-section-toggle"
          (click)="onSectionClicked()"
          type="button"
          title="Toggle Content Visibility">
          <span
            [class.icon-arrow-down]="!sectionCollapsed"
            [class.icon-arrow-right]="sectionCollapsed">
          </span>
        </button>
        <ng-content select="swui-section-header"></ng-content>
        <h1 *ngIf="sectionTitle" [innerHTML]="sectionTitle"></h1>
      </header>
      <div class="swui-section-content" *ngIf="!sectionCollapsed">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  host: {
    class: 'swui-section'
  }
})
export class SectionComponent {

  @Input() sectionCollapsed: boolean = false;
  @Input() sectionCollapsible: boolean = true;
  @Input() sectionTitle: string;

  @ContentChild(SectionHeaderComponent) headerComp: SectionHeaderComponent;

  onSectionClicked() {
    this.sectionCollapsed = !this.sectionCollapsed;
  }

}
