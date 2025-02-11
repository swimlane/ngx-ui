import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { debounceable } from '../../../../decorators/debounceable/debounceable.decorator';

interface DataValue {
  value: string;
}

@Component({
  selector: 'ngx-orderable-inputs-list',
  templateUrl: './orderable-inputs-list.component.html',
  styleUrls: ['./orderable-inputs-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class OrderableInputsListComponent implements OnInit {
  @Input() data: string[];
  @Output() onUpdate = new EventEmitter<string[]>();

  dataValues: DataValue[] = [];

  ngOnInit() {
    (this.data || []).forEach(item => {
      this.dataValues.push({
        value: item
      });
    });
  }

  addExample(): void {
    this.dataValues.push({
      value: ''
    });
  }

  removeItem(index: number): void {
    this.dataValues.splice(index, 1);
    this.update();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataValues, event.previousIndex, event.currentIndex);
    this.update();
  }

  @debounceable(500)
  update(): void {
    const data = this.dataValues.map(item => item.value);
    this.onUpdate.emit(data);
  }
}
