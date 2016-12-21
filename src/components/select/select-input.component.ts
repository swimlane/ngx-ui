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
        <ul 
          *ngIf="selectedOptions?.length"
          class="horizontal-list ngx-select-input-list">
          <li 
            *ngFor="let option of selectedOptions" 
            class="ngx-select-input-option"
            [class.disabled]="option.disabled">
            <template
              *ngIf="option.inputTemplate"
              [ngTemplateOutlet]="option.inputTemplate"
              [ngOutletContext]="{ option: option }">
            </template>
            <span
              *ngIf="!option.inputTemplate"
              class="ngx-select-input-name"
              [innerHTML]="option.name">
            </span>
            <span
              *ngIf="allowClear && multiple && !option.disabled"
              title="Remove Selection"
              class="ngx-select-clear icon-x"
              (click)="onOptionRemove($event, option)">
            </span>
          </li>
          <li *ngIf="tagging">
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
        *ngIf="allowClear && !multiple && selectedOptions?.length"
        title="Clear Selections"
        class="ngx-select-clear icon-x"
        (click)="change.emit([])">
      </span>
      <span
        class="ngx-select-caret icon-arrow-down"
        (click)="toggle.emit()">
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
  @Input() identifier: any;
  @Input() options: any[];

  @Input()
  set selected(val: any[]) {
    this._selected = val;
    this.selectedOptions = this.calcSelectedOptions(val);
  }

  get selected(): any[] {
    return this._selected;
  }

  @Output() toggle: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  @ViewChild('#input') inputElement: any;

  selectedOptions: any[] = [];
  _selected: any[];

  onKeyUp(event) {
    // todo
  }

  onClick(event) {
    this.focus.emit(event);
  }

  onOptionRemove(event, option): void {
    event.stopPropagation();

    const newSelections = this.selected.filter(selection => {
      const value = this.identifier ? option.value[this.identifier] : option.value;
      return value !== selection;
    });

    this.change.emit(newSelections);
  }

  calcSelectedOptions(selected: any[]): any[] {
    if(!selected || !this.options) return [];

    let results = [];

    for(let selection of selected) {
      const match = this.options.find(option => {
        if(this.identifier) return selection[this.identifier] === option.value[this.identifier];
        return selection === option.value;
      });

      if(match) results.push(match);
    }
    
    return results;
  }

}
