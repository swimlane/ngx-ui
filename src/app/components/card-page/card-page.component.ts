/* eslint-disable no-console */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardPageComponent implements AfterViewInit {
  cardWidth: number;
  isSelected = true;
  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onDelete(): void {
    console.log('Card Deleted');
  }

  onResize(card): void {
    this.cardWidth = card.width;
    this.cdr.detectChanges();
  }

  onClick(): void {
    console.log('Card clicked');
  }

  onSelect(isSelected: boolean) {
    console.log('Card select', isSelected);
  }

  onActionClick() {
    console.log('Card action clicked');
  }
}
