import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tooltip-page.component.scss']
})
export class TooltipPageComponent {
  tooltipModel = {
    text: 'foo'
  };
  dynamicVal = `Attack at ${new Date()}`;
  shown: any;

  aLongString =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac magna sed velit vestibulum suscipit. Fusce pulvinar ac purus ut commodo. Suspendisse potenti. Sed convallis quam in velit ultrices volutpat. Integer non aliquam sem. Integer eu nibh sit amet diam lacinia dignissim. Quisque semper justo non tellus feugiat fermentum. Nulla eu faucibus augue.';
  aVeryLongString = this.aLongString.replace(/\s/g, '');

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
