import {
  Component, Input, Output, EventEmitter, QueryList, ContentChildren, forwardRef
} from '@angular/core';

@Component({
  selector: 'ngx-select-dropdown',
  template: `
    <div>
      <ul class="vertical-list ngx-select-dropdown-options">
        <li 
          class="ngx-select-dropdown-option"
          *ngFor="let option of options" 
          tabindex="-1" 
          (click)="onClick(option)">
          <template
            *ngIf="option.optionTemplate"
            [ngTemplateOutlet]="option.optionTemplate"
            [ngOutletContext]="{ option: option }">
          </template>
          <span
            *ngIf="!option.optionTemplate"
            [innerHTML]="option.name">
          </span>
        </li>
      </ul>
    </div>
  `,
  host: {
    class: 'ngx-select-dropdown'
  }
})
export class SelectDropdownComponent {

  @Input() selected: any[] = [];
  @Input() options: any[] = [];

  @Output() select: EventEmitter<any> = new EventEmitter();

  onClick(option) {
    console.log('here', option);
    this.select.emit(option);
  }

}
