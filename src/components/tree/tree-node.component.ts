import { Component, Input, EventEmitter, Output, ViewEncapsulation, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'ngx-tree-node',
  template: `
    <li 
      class="ngx-tree-node" 
      (click)="onClick()" 
      (focus)="activate.emit(this.data)" 
      (blur)="deactivate.emit(this.data)" 
      tabindex="-1">
      <span 
        *ngIf="expandable"
        class="ngx-expander"       
        (click)="onExpandClick()"
        [ngClass]="{ 
          'icon-tree-collapse': expanded, 
          'icon-tree-expand': !expanded,
          'disabled': disabled
        }">
      </span>
      <span 
        *ngIf="!template" 
        [innerHTML]="label" 
        class="ngx-node-label">
      </span>
      <template
        *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngOutletContext]="data">
      </template>
      <ng-content *ngIf="expanded"></ng-content>
      <ngx-tree 
        *ngIf="children?.length && expandable && expanded"
        class="ngx-sub-tree"
        [nodes]="children"
        [template]="template">
      </ngx-tree>
    </li>
  `
})
export class TreeNodeComponent {

  @Input() label: string;
  @Input() model: any;
  @Input() children: any[];
  @Input() disabled: boolean;
  @Input() expandable: boolean;
  @Input() expanded: boolean;
  @Input() selectable: boolean;
  @Input() template: TemplateRef<any>;

  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();

  get data(): any {
    return { 
      label: this.label, 
      children: this.children,
      model: this.model
    };
  }

  onExpandClick(): void {
    if(this.disabled) return;

    this.expanded = !this.expanded;

    if(this.expanded) {
      this.expand.emit(this.data);
    } else if(!this.expand) {
      this.collapse.emit(this.data);
    }
  }

  onClick(): void {
    if(!this.selectable) return;
    this.select.emit(this.data);
  }

}
