import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';

import { NagComponent } from './nag.component';

describe('NagComponent', () => {
  let component: NagComponent;
  let fixture: ComponentFixture<NagComponent>;
  const simpleChangesStub: SimpleChanges = { watch: new SimpleChange(0, 2, true) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NagComponent],
      imports: [NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(NagComponent);
    component = fixture.componentInstance;

    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('state defaults to: closed', () => {
    expect(component.state).toEqual('closed');
  });

  it('can set component z index', () => {
    component.zIndex = 100;

    expect(component.zIndex).toEqual(100);
  });

  it('toggle changes state and triggers stateChanged emitter', () => {
    spyOn(component.stateChanged, 'emit');
    expect(component.state).toEqual('closed');

    component.toggle();
    expect(component.state).toEqual('open');

    component.toggle();
    expect(component.state).toEqual('closed');

    expect(component.stateChanged.emit).toHaveBeenCalledTimes(2);
  });

  // TODO: this test is flaky (updated in #423)
  xit('can peek into component if watch is set', fakeAsync(() => {
    expect(component.state).toEqual('closed');

    component.ngOnChanges(simpleChangesStub);
    tick(20);
    expect(component.state).toEqual('peek');
    tick(90);
    expect(component.state).toEqual('closed');
  }));

  it('nag remains closed if watch is falsy', () => {
    expect(component.state).toEqual('closed');

    simpleChangesStub.watch = undefined;
    component.ngOnChanges(simpleChangesStub);
    expect(component.state).toEqual('closed');
  });
});
