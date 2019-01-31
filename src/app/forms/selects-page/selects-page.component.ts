import { Component } from '@angular/core';

@Component({
  selector: 'app-selects-page',
  templateUrl: './selects-page.component.html'
})
export class SelectsPageComponent {
  selects = (function() {
    let i = 50;
    const results = [];
    while (i--) {
      results.push({
        name: `Breach Level: ${i}`,
        attr: `${i}_intrusion_breach`,
        address: `${i}.${i}.${i}.12`,
        disabled: i === 48
      });
    }

    return results;
  })();

  selectsModel = [this.selects[0]];
  singleSelectModel = this.selects[0];

  onSelectKeyUp(event) {
    console.log('key up', event);
  }

  onEvent(name: string, event: any): void {
    console.log(name, event);
  }
}
