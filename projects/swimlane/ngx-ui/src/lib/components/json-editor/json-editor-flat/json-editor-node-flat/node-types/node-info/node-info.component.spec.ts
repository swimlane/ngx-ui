import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JsonEditorNodeInfoComponent } from './node-info.component';
import { TooltipModule } from '../../../../../tooltip/tooltip.module';

describe('JsonEditorNodeInfoComponent', () => {
  let component: JsonEditorNodeInfoComponent;
  let fixture: ComponentFixture<JsonEditorNodeInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorNodeInfoComponent],
      imports: [TooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorNodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
