import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

export enum ButtonGroupOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum ButtonGroupSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum ButtonGroupVariant {
  Contained = 'contained',
  Text = 'text'
}

export enum BottonGroupStyle {
  Default = 'default',
  Primary = 'primary',
  Bordered = 'bordered'
}

@Component({
  selector: 'ngx-button-group',
  exportAs: 'ngxButtonGroup',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  host: {
    class: 'ngx-button-group'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupComponent {
  @Input()
  orientation: ButtonGroupOrientation = ButtonGroupOrientation.Horizontal;

  @Input()
  variant: ButtonGroupVariant = ButtonGroupVariant.Contained;

  @Input()
  size: ButtonGroupSize = ButtonGroupSize.Medium;

  @Input()
  buttonGroupStyle: BottonGroupStyle = BottonGroupStyle.Default;

  // button group orientations
  @HostBinding('class.ngx-button-group--horizontal')
  get Horizontal() {
    return this.orientation === ButtonGroupOrientation.Horizontal;
  }

  @HostBinding('class.ngx-button-group--vertical')
  get vertical() {
    return this.orientation === ButtonGroupOrientation.Vertical;
  }

  // button group variants
  @HostBinding('class.ngx-button-group--contained')
  get Contained() {
    return this.variant === 'contained';
  }

  @HostBinding('class.ngx-button-group--text')
  get text() {
    return this.variant === 'text';
  }

  // button group sizes
  @HostBinding('class.ngx-button-group--small')
  get small() {
    return this.size === ButtonGroupSize.Small;
  }

  @HostBinding('class.ngx-button-group--medium')
  get medium() {
    return this.size === ButtonGroupSize.Medium;
  }

  @HostBinding('class.ngx-button-group--large')
  get large() {
    return this.size === ButtonGroupSize.Large;
  }

  // button group styles
  @HostBinding('class.ngx-button-group--contained--default')
  get default() {
    return this.buttonGroupStyle === BottonGroupStyle.Default;
  }

  @HostBinding('class.ngx-button-group--contained--primary')
  get primary() {
    return this.buttonGroupStyle === BottonGroupStyle.Primary;
  }

  @HostBinding('class.ngx-button-group--contained--bordered')
  get bordered() {
    return this.buttonGroupStyle === BottonGroupStyle.Bordered;
  }
}
