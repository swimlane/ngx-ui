import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DrawerDirection, DrawerService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-parent-drawer',
  template: `
    <ngx-dialog-drawer-content drawerTitle="Drawer" (dismiss)="dismiss.emit()">
      <button class="btn" (click)="openInnerDrawer()">Open Drawer</button>
      <p>
        Iaculis pellentesque in curae purus accumsan ac nostra semper, scelerisque lorem quam ad aenean nulla turpis,
        proin metus ligula luctus sociosqu sapien aliquet. Class dui arcu metus tristique conubia rhoncus varius
        feugiat, ligula rutrum elit molestie accumsan facilisis augue amet lobortis, condimentum nostra dapibus torquent
        sit fermentum nisl. Vel ornare porttitor vestibulum metus vitae non volutpat augue sit lacus, eros maecenas
        pharetra ipsum leo congue adipiscing natoque iaculis, consectetur rhoncus imperdiet justo maximus per vehicula
        aliquet quisque. Mattis imperdiet eros pretium sed eleifend cubilia ipsum, elit dictumst faucibus interdum massa
        orci quam, congue odio vitae bibendum inceptos sapien. Tempus dignissim amet fermentum class tempor suspendisse
        orci nunc curae, risus in mi sem urna ridiculus potenti aptent, porta scelerisque vel posuere ligula natoque
        pulvinar faucibus. Odio varius vitae inceptos quis blandit, penatibus conubia pharetra eros, cursus rutrum
        praesent aliquam. Montes tortor sapien natoque vivamus placerat potenti fermentum facilisis, pretium tempor ac
        imperdiet praesent dictum viverra blandit in, tellus orci sem eget nullam ad platea. Vivamus in nascetur commodo
        habitasse finibus luctus massa sed, erat integer donec efficitur purus ullamcorper metus. Nulla suscipit
        eleifend curae tempus congue mus justo, sagittis facilisi luctus non blandit lectus metus leo, placerat mi
        ultrices dapibus rutrum et. Euismod nam taciti maecenas vulputate dictumst mi ornare, elementum laoreet gravida
        porttitor fames tempus integer sociosqu, tincidunt lorem hendrerit nullam consectetur ex. Iaculis pellentesque
        in curae purus accumsan ac nostra semper, scelerisque lorem quam ad aenean nulla turpis, proin metus ligula
        luctus sociosqu sapien aliquet. Class dui arcu metus tristique conubia rhoncus varius feugiat, ligula rutrum
        elit molestie accumsan facilisis augue amet lobortis, condimentum nostra dapibus torquent sit fermentum nisl.
        Vel ornare porttitor vestibulum metus vitae non volutpat augue sit lacus, eros maecenas pharetra ipsum leo
        congue adipiscing natoque iaculis, consectetur rhoncus imperdiet justo maximus per vehicula aliquet quisque.
        Mattis imperdiet eros pretium sed eleifend cubilia ipsum, elit dictumst faucibus interdum massa orci quam,
        congue odio vitae bibendum inceptos sapien. Tempus dignissim amet fermentum class tempor suspendisse orci nunc
        curae, risus in mi sem urna ridiculus potenti aptent, porta scelerisque vel posuere ligula natoque pulvinar
        faucibus. Odio varius vitae inceptos quis blandit, penatibus conubia pharetra eros, cursus rutrum praesent
        aliquam. Montes tortor sapien natoque vivamus placerat potenti fermentum facilisis, pretium tempor ac imperdiet
        praesent dictum viverra blandit in, tellus orci sem eget nullam ad platea. Vivamus in nascetur commodo habitasse
        finibus luctus massa sed, erat integer donec efficitur purus ullamcorper metus. Nulla suscipit eleifend curae
        tempus congue mus justo, sagittis facilisi luctus non blandit lectus metus leo, placerat mi ultrices dapibus
        rutrum et. Euismod nam taciti maecenas vulputate dictumst mi ornare, elementum laoreet gravida porttitor fames
        tempus integer sociosqu, tincidunt lorem hendrerit nullam consectetur ex. Iaculis pellentesque in curae purus
        accumsan ac nostra semper, scelerisque lorem quam ad aenean nulla turpis, proin metus ligula luctus sociosqu
        sapien aliquet. Class dui arcu metus tristique conubia rhoncus varius feugiat, ligula rutrum elit molestie
        accumsan facilisis augue amet lobortis, condimentum nostra dapibus torquent sit fermentum nisl. Vel ornare
        porttitor vestibulum metus vitae non volutpat augue sit lacus, eros maecenas pharetra ipsum leo congue
        adipiscing natoque iaculis, consectetur rhoncus imperdiet justo maximus per vehicula aliquet quisque. Mattis
        imperdiet eros pretium sed eleifend cubilia ipsum, elit dictumst faucibus interdum massa orci quam, congue odio
        vitae bibendum inceptos sapien. Tempus dignissim amet fermentum class tempor suspendisse orci nunc curae, risus
        in mi sem urna ridiculus potenti aptent, porta scelerisque vel posuere ligula natoque pulvinar faucibus. Odio
        varius vitae inceptos quis blandit, penatibus conubia pharetra eros, cursus rutrum praesent aliquam. Montes
        tortor sapien natoque vivamus placerat potenti fermentum facilisis, pretium tempor ac imperdiet praesent dictum
        viverra blandit in, tellus orci sem eget nullam ad platea. Vivamus in nascetur commodo habitasse finibus luctus
        massa sed, erat integer donec efficitur purus ullamcorper metus. Nulla suscipit eleifend curae tempus congue mus
        justo, sagittis facilisi luctus non blandit lectus metus leo, placerat mi ultrices dapibus rutrum et. Euismod
        nam taciti maecenas vulputate dictumst mi ornare, elementum laoreet gravida porttitor fames tempus integer
        sociosqu, tincidunt lorem hendrerit nullam consectetur ex. Iaculis pellentesque in curae purus accumsan ac
        nostra semper, scelerisque lorem quam ad aenean nulla turpis, proin metus ligula luctus sociosqu sapien aliquet.
        Class dui arcu metus tristique conubia rhoncus varius feugiat, ligula rutrum elit molestie accumsan facilisis
        augue amet lobortis, condimentum nostra dapibus torquent sit fermentum nisl. Vel ornare porttitor vestibulum
        metus vitae non volutpat augue sit lacus, eros maecenas pharetra ipsum leo congue adipiscing natoque iaculis,
        consectetur rhoncus imperdiet justo maximus per vehicula aliquet quisque. Mattis imperdiet eros pretium sed
        eleifend cubilia ipsum, elit dictumst faucibus interdum massa orci quam, congue odio vitae bibendum inceptos
        sapien. Tempus dignissim amet fermentum class tempor suspendisse orci nunc curae, risus in mi sem urna ridiculus
        potenti aptent, porta scelerisque vel posuere ligula natoque pulvinar faucibus. Odio varius vitae inceptos quis
        blandit, penatibus conubia pharetra eros, cursus rutrum praesent aliquam. Montes tortor sapien natoque vivamus
        placerat potenti fermentum facilisis, pretium tempor ac imperdiet praesent dictum viverra blandit in, tellus
        orci sem eget nullam ad platea. Vivamus in nascetur commodo habitasse finibus luctus massa sed, erat integer
        donec efficitur purus ullamcorper metus. Nulla suscipit eleifend curae tempus congue mus justo, sagittis
        facilisi luctus non blandit lectus metus leo, placerat mi ultrices dapibus rutrum et. Euismod nam taciti
        maecenas vulputate dictumst mi ornare, elementum laoreet gravida porttitor fames tempus integer sociosqu,
        tincidunt lorem hendrerit nullam consectetur ex. Iaculis pellentesque in curae purus accumsan ac nostra semper,
        scelerisque lorem quam ad aenean nulla turpis, proin metus ligula luctus sociosqu sapien aliquet. Class dui arcu
        metus tristique conubia rhoncus varius feugiat, ligula rutrum elit molestie accumsan facilisis augue amet
        lobortis, condimentum nostra dapibus torquent sit fermentum nisl. Vel ornare porttitor vestibulum metus vitae
        non volutpat augue sit lacus, eros maecenas pharetra ipsum leo congue adipiscing natoque iaculis, consectetur
        rhoncus imperdiet justo maximus per vehicula aliquet quisque. Mattis imperdiet eros pretium sed eleifend cubilia
        ipsum, elit dictumst faucibus interdum massa orci quam, congue odio vitae bibendum inceptos sapien. Tempus
        dignissim amet fermentum class tempor suspendisse orci nunc curae, risus in mi sem urna ridiculus potenti
        aptent, porta scelerisque vel posuere ligula natoque pulvinar faucibus. Odio varius vitae inceptos quis blandit,
        penatibus conubia pharetra eros, cursus rutrum praesent aliquam. Montes tortor sapien natoque vivamus placerat
        potenti fermentum facilisis, pretium tempor ac imperdiet praesent dictum viverra blandit in, tellus orci sem
        eget nullam ad platea. Vivamus in nascetur commodo habitasse finibus luctus massa sed, erat integer donec
        efficitur purus ullamcorper metus. Nulla suscipit eleifend curae tempus congue mus justo, sagittis facilisi
        luctus non blandit lectus metus leo, placerat mi ultrices dapibus rutrum et. Euismod nam taciti maecenas
        vulputate dictumst mi ornare, elementum laoreet gravida porttitor fames tempus integer sociosqu, tincidunt lorem
        hendrerit nullam consectetur ex.
      </p>
    </ngx-dialog-drawer-content>

    <ng-template #childDrawer let-close="close">
      <app-child-drawer (dismiss)="close.emit()"></app-child-drawer>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ParentDrawerComponent {
  @Output() dismiss = new EventEmitter();

  @ViewChild('childDrawer', { static: true }) childDrawer: TemplateRef<unknown>;

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly drawerService: DrawerService
  ) {}

  openInnerDrawer() {
    this.drawerService.create({
      parentContainer: this.elRef.nativeElement,
      isRoot: false,
      size: 100,
      template: this.childDrawer,
      cssClass: 'large-format-dialog-drawer',
      direction: DrawerDirection.Bottom
    });
  }
}
