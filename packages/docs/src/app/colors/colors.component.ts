import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-colors',
  template: `
    <p>
      colors works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
