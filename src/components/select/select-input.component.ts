import { 
  Component, Input, Output, EventEmitter, ViewChild, AfterViewInit
} from '@angular/core';
import { KeyboardKeys } from '../../utils/keys';

@Component({
  selector: 'ngx-select-input',
  template: `
    <div>
      <div
        tabindex="-1"
        (keydown)="onKeyDown($event)"
        class="ngx-select-input-box"
        (click)="onClick($event)">
        <ul 
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
              [innerHTML]="option.name || option.value">
            </span>
            <span
              *ngIf="allowClear && (multiple || tagging) && !option.disabled"
              title="Remove Selection"
              class="ngx-select-clear icon-x"
              (click)="onOptionRemove($event, option)">
            </span>
          </li>
          <li *ngIf="tagging">
            <input
              #tagInput
              type="search"
              class="ng-select-text-box"
              tabindex=""
              autocomplete="off" 
              autocorrect="off"
              spellcheck="off"
              (keyup)="onKeyUp($event)"
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
        *ngIf="allowClear && !multiple && !tagging && selectedOptions?.length"
        title="Clear Selections"
        class="ngx-select-clear icon-x"
        (click)="selection.emit([])">
      </span>
      <span
        *ngIf="caretVisible"
        class="ngx-select-caret icon-arrow-down"
        (click)="toggle.emit()">
      </span>
    </div>
  `,
  host: {
    class: 'ngx-select-input'
  }
})
export class SelectInputComponent implements AfterViewInit {

  @Input() placeholder: string;
  @Input() autofocus: boolean;
  @Input() allowClear: boolean;
  @Input() multiple: boolean;
  @Input() tagging: boolean;
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
  @Output() selection: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() keyup: EventEmitter<any> = new EventEmitter();

  @ViewChild('tagInput') inputElement: any;

  get caretVisible(): boolean {
    if(this.tagging && (!this.options || !this.options.length)) return false;
    return true;
  }

  selectedOptions: any[] = [];
  _selected: any[];

  ngAfterViewInit(): void {
    if(this.tagging && this.autofocus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  onKeyUp(event): void {
    event.preventDefault();
    event.stopPropagation();

    const key = event.key;
    const value = event.target.value;

    if(key === KeyboardKeys.ENTER && value !== '') {
      const hasSelection = this.selected.find(selection => {
        return value === selection;
      });

      if(!hasSelection) {
        const newSelections = [ ...this.selected, value ];
        this.selection.emit(newSelections);
        event.target.value = '';
      }
    } else if(key === KeyboardKeys.ESCAPE) {
      this.toggle.emit();
    }

    this.keyup.emit({ event, value });
  }

  onKeyDown(event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if(!this.tagging) {
      this.keyup.emit({ event });
    }
  } 

  onClick(event): void {
    this.activate.emit(event);

    if(this.tagging) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  onOptionRemove(event, option): void {
    event.stopPropagation();

    const newSelections = this.selected.filter(selection => {
      const value = this.identifier ? option.value[this.identifier] : option.value;
      return value !== selection;
    });

    this.selection.emit(newSelections);
  }

  calcSelectedOptions(selected: any[]): any[] {
    let results = [];

    // result out if nothing here
    if(!selected) return results;

    for(let selection of selected) {           
      let match;

      if(this.options) {
        match = this.options.find(option => {
          if(this.identifier) return selection[this.identifier] === option.value[this.identifier];
          return selection === option.value;
        });
      }

      if(this.tagging && !match) {
        match = { value: selection, name: selection };
      }

      if(match) results.push(match);
    }
    
    return results;
  }

}
