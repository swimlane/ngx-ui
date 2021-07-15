import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorFlatComponent } from './json-editor-flat.component';

describe('JsonEditorFlatComponent', () => {
  let component: JsonEditorFlatComponent;
  let fixture: ComponentFixture<JsonEditorFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsonEditorFlatComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
