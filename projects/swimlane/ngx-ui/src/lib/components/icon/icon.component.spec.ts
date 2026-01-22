import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { IconRegistryService } from '../../services/icon-registry/icon-registry.service';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [IconComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: IconRegistryService, useValue: { get: () => ['test'] } }]
    });
  });

  beforeEach(() => {
    httpClient = TestBed.inject<HttpClient>(HttpClient);
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call update on change', () => {
    const spy = spyOn(component, 'update');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should update if fontIcon set', () => {
    component.fontIcon = 'test';
    component.cssClasses = [];
    component.update();
    expect(component.cssClasses.length).toBeGreaterThan(0);
  });

  it('should load svg src', () => {
    const spy = spyOn(component, 'loadSvg');
    component.svgSrc = 'test';
    expect(spy).toHaveBeenCalled();
  });

  it('should svg', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough();
    component.loadSvg('test');
    expect(spy).toHaveBeenCalled();
  });
});
