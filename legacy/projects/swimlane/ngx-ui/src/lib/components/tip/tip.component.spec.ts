import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipComponent } from './tip.component';

describe('TipComponent', () => {
  let component: TipComponent;
  let fixture: ComponentFixture<TipComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TipComponent]
    });
    fixture = TestBed.createComponent(TipComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isCloseable has default value', () => {
    expect(component.isCloseable).toEqual(false);
  });
  it('status values', () => {
    expect(component.TipStatus.Success).toEqual('success');
    expect(component.TipStatus.Error).toEqual('error');
    expect(component.TipStatus.Notice).toEqual('notice');
  });
  it('default icon', () => {
    const defaultIcon = 'info-filled-small';
    component.ngOnInit();
    expect(component.icon).toEqual(defaultIcon);
  });
  it('error icon', () => {
    const errorIcon = 'warning-filled-sm';
    (component.status as any) = 'error';
    component.ngOnInit();
    expect(component.icon).toEqual(errorIcon);
  });
  it('emits close', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
