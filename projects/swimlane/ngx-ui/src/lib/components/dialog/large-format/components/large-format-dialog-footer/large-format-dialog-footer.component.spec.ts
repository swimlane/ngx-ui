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
});
