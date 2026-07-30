import { Component } from '@angular/core';

@Component({
  selector: 'app-controls-page',
  templateUrl: './controls-page.component.html',
  styleUrls: ['./controls-page.component.scss'],
  standalone: false
})
export class ControlsPageComponent {
  inputValue = 'Breach';
  selectValue = ['Breach'];

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
  favoriteSeason = 'Spring';

  appearances = ['legacy', 'fill'];
  appearance = 'legacy';

  alignments = ['top', 'baseline', 'middle', 'bottom'];
  alignment = 'baseline';

  fontSizes = ['16px', '13px', '21px', '10px'];
  fontSize = '16px';

  showOutline = false;

  dateChanged(val: any) {
    console.log('date changed!', val);
  }

  onSubmit() {
    alert('Form Submit');
  }
}
