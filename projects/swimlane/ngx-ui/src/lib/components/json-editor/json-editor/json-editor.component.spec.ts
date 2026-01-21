import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditorComponent } from './json-editor.component';
import { JsonEditorModule } from '../json-editor.module';

describe('JsonEditorComponent', () => {
  let component: JsonEditorComponent;
  let fixture: ComponentFixture<JsonEditorComponent>;
  beforeEach(() => {
    const schemaValidatorServiceStub = { validate: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [JsonEditorModule],
      declarations: [JsonEditorComponent],
      providers: [
        {
          provide: SchemaValidatorService,
          useValue: schemaValidatorServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(JsonEditorComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
