import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    const spy = vi.spyOn(component, 'update');
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
    const spy = vi.spyOn(component, 'loadSvg');
    component.svgSrc = 'test';
    expect(spy).toHaveBeenCalled();
  });

  it('should svg', () => {
    const spy = vi.spyOn(httpClient, 'get');
    component.loadSvg('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should project ng-content when fontIcon is unset (cssClasses undefined)', () => {
    TestBed.resetTestingModule();
    @Component({
      template: `<ngx-icon>projected</ngx-icon>`,
      standalone: false
    })
    class HostComponent {}
    TestBed.configureTestingModule({
      declarations: [IconComponent, HostComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: IconRegistryService, useValue: { get: () => ['cls'] } }]
    });
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.textContent).toContain('projected');
    expect(hostFixture.nativeElement.querySelector('.icon-fx-stacked')).toBeNull();
  });
});
