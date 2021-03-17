import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class LayoutComponent {}
