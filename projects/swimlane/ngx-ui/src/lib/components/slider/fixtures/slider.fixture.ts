import { Component, ViewChild } from '@angular/core';
import { SliderComponent } from '../slider.component';
import { SliderModule } from '../slider.module';
import { FormsModule } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'slider-fixture',
  templateUrl: 'slider.fixture.html',
  standalone: true,
  imports: [SliderModule, FormsModule]
})
export class SliderFixtureComponent {
  @ViewChild('defaultSlider', { static: true }) defaultSlider: SliderComponent;
  @ViewChild('multiSlider', { static: true }) multiSlider: SliderComponent;

  sliderEvent1: any;
  sliderEvent2: any;
  sliderEvent3: any;
  sliderEvent4: any;
  sliderEvent5: any;
  sliderEvent6: any;
  sliderEvent7: any;
  sliderEvent8: any;
  sliderValue = 85;
  sliderValues = '45,85';
}
