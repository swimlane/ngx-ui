import { Component } from '@angular/core';

@Component({
  selector: 'app-controls-page',
  templateUrl: './controls-page.component.html',
  styleUrls: ['./controls-page.component.scss']
})
export class ControlsPageComponent {
  inputValue: any = 'A Value';
  minValue = 0;
  maxValue = 100;
  prefix = '$USD';
  suffix = '.00';
  helptext = `<i>
  Enter currency in
  <a href="http://www.x-rates.com/table/?from=USD&amount=1">USD</a>
</i>`;
  label = 'Net Profit';
  showHelp = true;
  hideAlertArea = false;
  hideFixedSidebar = false;
  curDate2: any = new Date('10/10/2016');
  favoriteSeason: string = 'Spring';

  dateChanged(val) {
    console.log('date changed!', val);
  }
}
