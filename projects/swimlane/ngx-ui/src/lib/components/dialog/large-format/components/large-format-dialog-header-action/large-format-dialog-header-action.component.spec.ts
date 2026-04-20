import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LargeFormatDialogHeaderActionComponent } from './large-format-dialog-header-action.component';

describe(LargeFormatDialogHeaderActionComponent.name, () => {
  let component: LargeFormatDialogHeaderActionComponent;
  let fixture: ComponentFixture<LargeFormatDialogHeaderActionComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LargeFormatDialogHeaderActionComponent],
      imports: [NoopAnimationsModule]
    })
      .overrideComponent(LargeFormatDialogHeaderActionComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeFormatDialogHeaderActionComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have host class', () => {
    fixture.detectChanges();
    expect(nativeElement.classList.contains('ngx-large-format-dialog-header-action')).toEqual(true);
  });

  it('should have button', () => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('button.ngx-large-format-dialog-header-action__button')).toBeTruthy();
  });

  it('should have close icon', () => {
    fixture.detectChanges();
    const button = nativeElement.querySelector(
      'button.ngx-large-format-dialog-header-action__button'
    ) as HTMLButtonElement | null;
    expect(button).toBeTruthy();
    expect(button!.querySelector('i.ngx-icon.ngx-x')).toBeTruthy();
  });

  describe('dirty', () => {
    it('should have action title', () => {
      fixture.detectChanges();
      const button = nativeElement.querySelector('button') as HTMLButtonElement | null;
      expect(button).toBeTruthy();
      expect(button!.textContent ?? '').toContain(component.actionTitle);
    });

    it('should have dirty action title when state is dirty', () => {
      component.dirty = true;
      fixture.detectChanges();

      const button = nativeElement.querySelector('button') as HTMLButtonElement | null;
      expect(button).toBeTruthy();
      expect(button!.textContent ?? '').toContain(component.dirtyActionTitle);
    });
  });
});
