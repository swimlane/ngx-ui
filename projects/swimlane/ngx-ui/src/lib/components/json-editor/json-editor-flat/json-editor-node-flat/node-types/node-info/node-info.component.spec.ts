/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorNodeInfoComponent } from './node-info.component';

describe('JsonEditorNodeInfoComponent', () => {
  let component: JsonEditorNodeInfoComponent;
  let fixture: ComponentFixture<JsonEditorNodeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorNodeInfoComponent]
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
