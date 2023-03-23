import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-button-toggle-group-fixture',
  template: `
    <ngx-button-toggle-group [(ngModel)]="favoriteSeason">
      <ngx-button-toggle *ngFor="let season of seasons" [value]="season">
        {{ season }}
      </ngx-button-toggle>
    </ngx-button-toggle-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleGroupComponentFixture {
  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
  favoriteSeason;
}
