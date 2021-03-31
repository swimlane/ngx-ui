import { Directive, OnInit, Optional, Self } from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/destroyed';
import { CopyToClipboardDirective } from '@swimlane/ngx-ui/directives/copy-to-clipboard';
import { NotificationService, NotificationStyleType } from '@swimlane/ngx-ui/notification';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[copyToClipboard]',
  providers: [DestroyedService]
})
export class CopyToClipboardPatchDirective implements OnInit {
  constructor(
    private readonly destroyed: DestroyedService,
    private readonly notificationService: NotificationService,
    @Self() @Optional() private readonly self?: CopyToClipboardDirective
  ) {}

  ngOnInit() {
    this.self?.copied.pipe(takeUntil(this.destroyed)).subscribe(copiedText => {
      this.notificationService.create({
        title: 'Copied to clipboard',
        body: copiedText,
        styleType: NotificationStyleType.info
      });
    });
  }
}
