import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plus-menu-page',
  templateUrl: './plus-menu-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMenuPageComponent {
  ngOnInit() {
    console.log('init page component');
  }
}
