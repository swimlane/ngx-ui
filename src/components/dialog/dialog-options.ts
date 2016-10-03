import { Injectable } from '@angular/core';
import { id } from '../../utils';

@Injectable()
export class DialogOptions {

  id: string;
  title: string;
  template: any;
  cssClass: string;
  context: any;
  zIndex: number = 990;
  closeOnBlur: boolean = true;
  closeOnEscape: boolean = true;
  closeButton: boolean = true;
  showOverlay: boolean = true;

  constructor(opts) {
    this.id = id();
    Object.assign(this, opts);
  }

}
