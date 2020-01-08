import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  ViewContainerRef,
  Type
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InjectionService } from './injection.service';

describe('InjectionService', () => {
  let service: InjectionService;
  beforeEach(() => {
    const applicationRefStub = { components: { length: {} } };
    const componentFactoryResolverStub = {
      resolveComponentFactory: () => ({ create: () => ({}) })
    };
    const componentRefStub = { instance: {} };
    const injectorStub = {};
    const viewContainerRefStub = {};
    const typeStub = {};
    TestBed.configureTestingModule({
      providers: [
        InjectionService,
        { provide: ApplicationRef, useValue: applicationRefStub },
        {
          provide: ComponentFactoryResolver,
          useValue: componentFactoryResolverStub
        },
        { provide: ComponentRef, useValue: componentRefStub },
        { provide: Injector, useValue: injectorStub },
        { provide: ViewContainerRef, useValue: viewContainerRefStub },
        { provide: Type, useValue: typeStub }
      ]
    });
    service = TestBed.get(InjectionService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
