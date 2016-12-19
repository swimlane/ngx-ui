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
        <ul class="horizontal-list" *ngIf="selectedOptions?.length">
          <li *ngFor="let option of selectedOptions">
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
          <li>
            <input 
              #input
              type="text" 
              autocomplete="off" 
              autocorrect="off"
              spellcheck="off"
              tabindex=""
              class="ng-select-text-box"
            />
          </li>
        </ul>
        <span 
          *ngIf="!selected?.length && placeholder"
          class="ngx-select-placeholder"
          [innerHTML]="placeholder">
        </span>
      </div>
      <div class="ngx-select-input-underline">
        <div class="underline-fill"></div>
      </div>
      <span
        *ngIf="allowClear && !multiple && selected?.length"
        title="Clear Selections"
        class="ngx-select-clear icon-x"
        (click)="clear.emit(true)">
      </span>
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

  @Input() placeholder: string = '';
  @Input() autofocus: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() multiple: boolean = true;
  @Input() tagging: boolean = true;
  @Input() trackBy: any;
  @Input() options: any[];

  @Input()
  set selected(val: any[]) {
    this._selected = val;
    this.selectedOptions = this.calcSelectedOptions(val);
  }

  get selected(): any[] {
    return this._selected;
  }

  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('#input') inputElement: any;

  focused: boolean = false;
  selectedOptions: any[] = [];
  _selected: any[];

  onKeyUp(event) {
    // todo
  }

  onClick(event) {
    this.focused = true;
    this.focus.emit(event);
  }

  calcSelectedOptions(selected: any[]): any[] {
    if(!selected || !this.options) return [];

    let results = [];

    for(let selection of selected) {
      const match = this.options.find(option => {
        if(this.trackBy) return selection[this.trackBy] === option.value[this.trackBy];
        return selection === option.value;
      });

      if(match) results.push(match);
    }
    
    return results;
  }

}
