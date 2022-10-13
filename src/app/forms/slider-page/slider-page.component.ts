import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderPageComponent {
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

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
