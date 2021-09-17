import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'docs-basic-single-select-example',
  templateUrl: './basic-single-select-example.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSingleSelectExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
