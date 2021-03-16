import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JsonEditorNodeInfoComponent } from './node-info.component';

describe('JsonEditorNodeInfoComponent', () => {
  let component: JsonEditorNodeInfoComponent;
  let fixture: ComponentFixture<JsonEditorNodeInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [JsonEditorNodeInfoComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorNodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
