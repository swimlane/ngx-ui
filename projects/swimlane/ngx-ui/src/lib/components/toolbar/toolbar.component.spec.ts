import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Renderer2, ElementRef } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  beforeEach(() => {
    const renderer2Stub = { removeAttribute: () => ({}) };
    const elementRefStub = { nativeElement: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ToolbarComponent],
      providers: [{ provide: Renderer2, useValue: renderer2Stub }, { provide: ElementRef, useValue: elementRefStub }]
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
