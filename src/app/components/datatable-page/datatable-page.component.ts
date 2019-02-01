import { Component } from '@angular/core';

@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable-page.component.html'
})
export class DatatablePageComponent {
  rows: any[] = (function() {
    const res = [];

    let i = 0;
    while (i++ < 50) {
      res.push({
        type: i % 2 ? 'DDOS' : 'Malware',
        os: 'Linux',
        user: 'cody'
      });
    }

    return res;
  })();
}
