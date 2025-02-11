import { ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { DialogComponent, DialogFormat, DialogOptions, DialogService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-dialog-medium-format-dialog-page',
  templateUrl: './dialog-medium-format-dialog-page.component.html',
  styleUrls: ['./dialog-medium-format-dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DialogMediumFormatDialogPageComponent {
  private dialogRef?: ComponentRef<DialogComponent>;

  longContent = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet lobortis nisi non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus faucibus metus diam, non pulvinar orci maximus sit amet. Maecenas dui felis, tempor sit amet magna quis, ornare fermentum mauris. In quis nibh et erat semper sagittis ut quis risus. Proin malesuada eleifend risus ut mattis. Maecenas scelerisque nibh eu elit sagittis, a egestas leo posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ornare vulputate semper. Nullam in justo in tortor interdum ultrices nec eget nisl.
  Maecenas vel volutpat ligula. Suspendisse blandit ac felis non tempor. Integer tincidunt lorem nunc, non vulputate nisi bibendum quis. Fusce sapien erat, eleifend sit amet mi vitae, posuere malesuada ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tempus venenatis eros. Mauris volutpat neque vel elementum dignissim. Nulla facilisi. Cras vulputate arcu et nulla tincidunt, eu efficitur nisi iaculis.
  Nulla euismod sem ut purus fermentum, non venenatis turpis blandit. Donec ut bibendum odio, vel mollis dui. Suspendisse suscipit lacus eu odio egestas tempus in ut quam. Maecenas iaculis tristique vehicula. Aliquam nisl mauris, lobortis et porttitor id, egestas sed nunc. Nulla nec gravida magna. Donec at est sit amet justo tempor semper. Praesent vel sollicitudin dolor, eget tempus nisi. Ut et arcu vitae nunc dignissim fringilla. Proin maximus bibendum egestas. Morbi a velit risus. Suspendisse luctus arcu non tortor fermentum suscipit. Aenean id hendrerit orci.
  Donec tempus ac orci at scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras maximus tincidunt arcu ac lobortis. Morbi sit amet interdum justo. Fusce in dignissim massa. Proin vitae libero vel diam mattis convallis eu sit amet erat. Morbi semper ornare dui, ut accumsan diam aliquam vel. Donec tristique mattis mi, hendrerit imperdiet tellus dignissim sed. Vestibulum at felis pellentesque, ornare ex vel, sodales ante.
  Praesent a blandit lectus, a aliquam magna. Mauris placerat auctor nisl elementum pharetra. Phasellus dictum aliquam neque porta molestie. Morbi accumsan eleifend leo sed tempus. Donec fermentum enim nulla, id pharetra neque efficitur eu. Praesent quam lectus, dapibus ac erat non, sagittis vehicula tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque vitae erat id enim posuere tempus. Duis vitae malesuada est. Nam pellentesque ultricies nibh ac pulvinar. Fusce quis ullamcorper ipsum. Ut sed rutrum velit. Vestibulum metus velit, porta sed hendrerit sed, scelerisque ac mi.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet lobortis nisi non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus faucibus metus diam, non pulvinar orci maximus sit amet. Maecenas dui felis, tempor sit amet magna quis, ornare fermentum mauris. In quis nibh et erat semper sagittis ut quis risus. Proin malesuada eleifend risus ut mattis. Maecenas scelerisque nibh eu elit sagittis, a egestas leo posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ornare vulputate semper. Nullam in justo in tortor interdum ultrices nec eget nisl.
  Maecenas vel volutpat ligula. Suspendisse blandit ac felis non tempor. Integer tincidunt lorem nunc, non vulputate nisi bibendum quis. Fusce sapien erat, eleifend sit amet mi vitae, posuere malesuada ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tempus venenatis eros. Mauris volutpat neque vel elementum dignissim. Nulla facilisi. Cras vulputate arcu et nulla tincidunt, eu efficitur nisi iaculis.
  Nulla euismod sem ut purus fermentum, non venenatis turpis blandit. Donec ut bibendum odio, vel mollis dui. Suspendisse suscipit lacus eu odio egestas tempus in ut quam. Maecenas iaculis tristique vehicula. Aliquam nisl mauris, lobortis et porttitor id, egestas sed nunc. Nulla nec gravida magna. Donec at est sit amet justo tempor semper. Praesent vel sollicitudin dolor, eget tempus nisi. Ut et arcu vitae nunc dignissim fringilla. Proin maximus bibendum egestas. Morbi a velit risus. Suspendisse luctus arcu non tortor fermentum suscipit. Aenean id hendrerit orci.
  Donec tempus ac orci at scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras maximus tincidunt arcu ac lobortis. Morbi sit amet interdum justo. Fusce in dignissim massa. Proin vitae libero vel diam mattis convallis eu sit amet erat. Morbi semper ornare dui, ut accumsan diam aliquam vel. Donec tristique mattis mi, hendrerit imperdiet tellus dignissim sed. Vestibulum at felis pellentesque, ornare ex vel, sodales ante.
  Praesent a blandit lectus, a aliquam magna. Mauris placerat auctor nisl elementum pharetra. Phasellus dictum aliquam neque porta molestie. Morbi accumsan eleifend leo sed tempus. Donec fermentum enim nulla, id pharetra neque efficitur eu. Praesent quam lectus, dapibus ac erat non, sagittis vehicula tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque vitae erat id enim posuere tempus. Duis vitae malesuada est. Nam pellentesque ultricies nibh ac pulvinar. Fusce quis ullamcorper ipsum. Ut sed rutrum velit. Vestibulum metus velit, porta sed hendrerit sed, scelerisque ac mi.
  `;
  content: string;

  constructor(
    public dialogService: DialogService // private drawerService: DrawerService
  ) {}

  openDialog(options: DialogOptions, longContent = false) {
    this.content = longContent ? this.longContent : 'Dialog Content';
    this.dialogRef = this.dialogService.create({
      showOverlay: true,
      format: DialogFormat.Medium,
      closeOnEscape: true,
      ...options
    });
  }

  onCloseOrCancel() {
    this.dialogRef?.destroy();
  }
}
