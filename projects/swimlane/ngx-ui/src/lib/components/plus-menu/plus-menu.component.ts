import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-plus-menu',
  templateUrl: './plus-menu.component.html',
  styleUrls: ['./plus-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('init component');
  }
}
