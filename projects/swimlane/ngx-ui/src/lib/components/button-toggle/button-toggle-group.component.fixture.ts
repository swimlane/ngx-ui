import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonToggleModule } from './button-toggle.module';

@Component({
  selector: 'ngx-button-toggle-group-fixture',
  template: `
    <ngx-button-toggle-group [(value)]="value" [disabled]="disabled">
      <ngx-button-toggle *ngFor="let item of items" [value]="item">
        {{ item }}
      </ngx-button-toggle>
    </ngx-button-toggle-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ButtonToggleGroupComponentFixture {
  @Input() items: string[] = [];
  @Input() value: string;
  @Input() disabled = false;
}

@NgModule({
  declarations: [ButtonToggleGroupComponentFixture],
  imports: [FormsModule, ButtonToggleModule]
})
export class ButtonToggleGroupTestModule {}
