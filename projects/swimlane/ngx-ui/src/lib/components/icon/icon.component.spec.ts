import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef, Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconRegisteryService } from '../../services/icon-registery.service';
import { IconComponent } from './icon.component';
describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  beforeEach(() => {
    const elementRefStub = { nativeElement: { innerHTML: {} } };
    const rendererStub = {};
    const httpClientStub = { get: () => ({ subscribe: () => ({}) }) };
    const iconRegisteryServiceStub = { get: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [IconComponent],
      providers: [
        { provide: ElementRef, useValue: elementRefStub },
        { provide: Renderer, useValue: rendererStub },
        { provide: HttpClient, useValue: httpClientStub },
        { provide: IconRegisteryService, useValue: iconRegisteryServiceStub }
      ]
    });
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('defaultPath defaults to: assets/svgs', () => {
    expect(component.defaultPath).toEqual('assets/svgs');
  });
  it('fontSet defaults to: ngx', () => {
    expect(component.fontSet).toEqual('ngx');
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'update');
      component.ngOnInit();
      expect(component.update).toHaveBeenCalled();
    });
  });
});
