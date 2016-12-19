import { 
  Component, Input, Output, EventEmitter, ViewChild
} from '@angular/core';

@Component({
  selector: 'ngx-select-input',
  template: `
    <div>
      <div 
        class="ngx-select-input-box"
        contenteditable="true" 
        #input
        (keyup)="onKeyUp($event)"
        (click)="onFocus($event)"
        (blur)="onBlur($event)">
        <ul class="horizontal-list">
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
      </div>
      <div class="ngx-select-input-underline">
        <div class="underline-fill"></div>
      </div>
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

  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('#input') inputElement: any;

  focused: boolean = false;

  onKeyUp(event) {
    // todo
  }

  onFocus(event) {
    this.focused = true;
    this.focus.emit(event);
  }

  onBlur(event) {
    this.focused = false;
    this.blur.emit(event);
  }

}
