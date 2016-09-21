import { Injectable } from '@angular/core';

@Injectable()
export class TooltipOptions {

  title: string;
  template: any;
  context: any;
  host: any;
  placement: any;

  constructor(opts) {
    Object.assign(this, opts);
  }

}
