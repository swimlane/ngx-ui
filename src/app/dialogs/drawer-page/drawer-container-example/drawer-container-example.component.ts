import { ChangeDetectionStrategy, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { DrawerDirection, DrawerService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-drawer-container-example',
  templateUrl: './drawer-container-example.component.html',
  styleUrls: ['./drawer-container-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DrawerContainerExampleComponent {
  @Input() template: TemplateRef<any>;

  readonly DrawerDirection = DrawerDirection;

  constructor(private readonly drawerService: DrawerService, private readonly el: ElementRef<HTMLElement>) {}

  open(direction: DrawerDirection) {
    this.drawerService.create({
      direction,
      template: this.template,
      context: 'Alert Everyone!',
      closeOnOutsideClick: true,
      parentContainer: this.el.nativeElement,
      isRoot: false
    });
  }
}
