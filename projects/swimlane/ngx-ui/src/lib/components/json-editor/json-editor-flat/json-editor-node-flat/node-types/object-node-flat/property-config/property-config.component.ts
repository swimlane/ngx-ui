import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-property-config',
  templateUrl: './property-config.component.html',
  styleUrls: ['./property-config.component.scss']
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: unknown;
  @Input() propertyIndex: Array<unknown>;
  @Input() schema: any;

  constructor() { }

  ngOnInit() {
    console.log(this.property);
    console.log(this.propertyIndex);
  }

}
