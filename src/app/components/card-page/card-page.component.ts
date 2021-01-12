import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardPageComponent {
  cardWidth: number;
  isSelected = true;
  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onDelete() {
    console.log('Card Deleted');
  }

  onResize(card) {
    this.cardWidth = card.width;
    this.cdr.detectChanges();
  }

  onClick() {
    console.log('Card clicked');
  }

  onSelect(isSelected: boolean) {
    console.log('Card select', isSelected);
  }

  onActionClick() {
    console.log('Card action clicked');
  }
}
