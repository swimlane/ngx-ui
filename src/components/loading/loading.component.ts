import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <div class="ngx-loading-bar" [hidden]="!visible">
      <div 
        class="ngx-loading-bar-bar"
        [style.width.%]="progress">
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() visible: boolean = false;
  @Input() progress: number = 0;

}
