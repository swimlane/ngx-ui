import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LargeFormatDialogFooterComponent } from './large-format-dialog-footer.component';

describe(LargeFormatDialogFooterComponent.name, () => {
  let component: LargeFormatDialogFooterComponent;
  let fixture: ComponentFixture<LargeFormatDialogFooterComponent>;
  let nativeElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LargeFormatDialogFooterComponent],
      imports: [NoopAnimationsModule]
    })
      .overrideComponent(LargeFormatDialogFooterComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LargeFormatDialogFooterComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have host class', () => {
    expect(nativeElement.classList.contains('ngx-large-format-dialog-footer')).toEqual(true);
  });

  it('should map align start to flex-start on host', () => {
    component.align = 'start';
    fixture.detectChanges();
    expect(nativeElement.style.justifyContent).toBe('flex-start');
  });

  it('should map align end to flex-end on host', () => {
    component.align = 'end';
    fixture.detectChanges();
    expect(nativeElement.style.justifyContent).toBe('flex-end');
  });

  it('should use center as default justify-content', () => {
    expect(nativeElement.style.justifyContent).toBe('center');
  });
});
