import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown-page.component.html',
  styleUrls: ['./dropdown-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownPageComponent {}
