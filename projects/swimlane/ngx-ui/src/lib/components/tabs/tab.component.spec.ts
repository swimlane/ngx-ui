import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TabComponent } from './tab.component';
describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  beforeEach(() => {
    const elementRefStub = { nativeElement: {} };
    const renderer2Stub = { removeAttribute: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TabComponent],
      providers: [{ provide: ElementRef, useValue: elementRefStub }, { provide: Renderer2, useValue: renderer2Stub }]
    });
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('active defaults to: false', () => {
    expect(component.active).toEqual(false);
  });
  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const renderer2Stub: Renderer2 = fixture.debugElement.injector.get(Renderer2);
      spyOn(renderer2Stub, 'removeAttribute');
      component.ngOnInit();
      expect(renderer2Stub.removeAttribute).toHaveBeenCalled();
    });
  });
});
