import { Injectable } from '@angular/core';
import { InjectionService } from '../../services';
import { DrawerContainerComponent } from './drawer-container.component';

@Injectable()
export class DrawerService {

  size: number = 80;
  direction: string = 'left';
  drawers: any[] = [];
  closeAllOnExit: boolean = false;

  get zIndex(): number {
    return this._zIndex;
  }

  set zIndex(val: number) {
    this._zIndex = val;

    if(this.container) {
      // update container zIndex
      this.container.instance.backdropZIndex = this.backdropZIndex;
    }
  }

  get backdropZIndex(): number {
    return this.zIndex - 1;
  }

  private _zIndex: number = 995;
  private container: any;

  constructor(private injectionService: InjectionService) { }

  open(template, options) {
    this.transposeDefaults(options);

    if(!this.container) {
      this.container = this.injectionService.appendNextToRoot(
        DrawerContainerComponent, {
          drawers: this.drawers,
          backdropZIndex: this.backdropZIndex
        });

      this.container.instance.close.subscribe(this.close.bind(this));
    }

    this.drawers.push({ template, options });
  }

  close() {
    const length = this.drawers.length;

    if(this.closeAllOnExit) {
      this.zIndex = 990;
      this.size = 90;
      this.drawers.splice(0, length);
    } else {
      this.zIndex = this.zIndex - 1;
      this.size = this.size + 10;
      this.drawers.splice(length - 1, length);
    }
  }

  private transposeDefaults(options) {
    if(!options.zIndex) {
      this.zIndex = this.zIndex + 1;
      options.zIndex = this.zIndex;
    }

    if(!options.size) {
      this.size = this.size - 10;
      options.size = this.size;
    }

    if(!options.direction) {
      options.direction = this.direction;
    }
  }

}
