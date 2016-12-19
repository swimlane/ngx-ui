import { 
  Component, Input, Output, EventEmitter, ViewChild
} from '@angular/core';

@Component({
  selector: 'ngx-select-input',
  template: `
    <div>
      <div 
        class="ngx-select-input-box"
        (click)="onClick($event)">
        <ul class="horizontal-list" *ngIf="selected?.length">
          <li *ngFor="let option of selected">
            <template
              *ngIf="option.inputTemplate"
              [ngTemplateOutlet]="option.inputTemplate"
              [ngOutletContext]="{ option: option }">
            </template>
            <span
              *ngIf="!option.inputTemplate"
              [innerHTML]="option.name">
            </span>
          </li>
        </ul>
        <input 
          type="text" 
          autocomplete="off" 
          tabindex=""
          class="ng-select-text-box"
        />
        <span 
          *ngIf="!selected?.length"
          class="ngx-select-placeholder"
          [innerHTML]="placeholder">
        </span>
      </div>
      <div class="ngx-select-input-underline">
        <div class="underline-fill"></div>
      </div>
      <span 
        class="ngx-select-caret icon-arrow-down">
      </span>
    </div>
  `,
  host: {
    class: 'ngx-select-input'
  }
})
export class SelectInputComponent {

  @Input() selected: any[] = [];
  @Input() placeholder: string = '';
  @Input() autofocus: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() multiple: boolean = true;
  @Input() tagging: boolean = true;

  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('#input') inputElement: any;

  focused: boolean = false;

  onKeyUp(event) {
    // todo
  }

  onClick(event) {
    this.focused = true;
    this.focus.emit(event);
  }

  onBlur(event) {
    this.focused = false;
    this.blur.emit(event);
  }

}
