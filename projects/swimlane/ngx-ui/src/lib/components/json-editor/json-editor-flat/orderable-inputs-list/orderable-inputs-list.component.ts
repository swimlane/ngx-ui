import { Component, Input, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { debounceable } from '../../../../utils';

@Component({
  selector: 'ngx-orderable-inputs-list',
  templateUrl: './orderable-inputs-list.component.html',
  styleUrls: ['./orderable-inputs-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderableInputsListComponent implements OnInit {
  @Input() data: string[];
  @Output() onUpdate = new EventEmitter<string[]>();

  ngOnInit() {
    this.data = this.data || [];
  }

  addExample(): void {
    this.data.push('');
  }

  removeItem(index: number): void {
    this.data.splice(index, 1);
    this.update();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.update();
  }

  @debounceable(500)
  update(): void {
    this.onUpdate.emit(this.data);
  }
}
