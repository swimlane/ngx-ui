import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { AlertService } from '../alert/alert.service';
import { LargeFormatDialogContentComponent } from './large-format-dialog-content.component';
import { LargeFormatDialogHeaderActionComponent } from './components/large-format-dialog-header-action/large-format-dialog-header-action.component';
import { LargeFormatDialogHeaderTitleComponent } from './components/large-format-dialog-header-title/large-format-dialog-header-title.component';
import { LargeFormatDialogStepperDirective } from './directives/large-format-dialog-stepper/large-format-dialog-stepper.directive';
import { LargeFormatDialogTabsDirective } from './directives/large-format-dialog-tabs/large-format-dialog-tabs.directive';

@Component({
  selector: 'ngx-test-host-header-content',
  standalone: false,
  template: `
    <ng-template #headerContentTpl>
      <span class="header-content-test-marker">Extra Action</span>
    </ng-template>
    <ngx-large-format-dialog-content
      dialogTitle="Title"
      [largeFormatDialogHeaderContent]="headerContentTpl"
      (closeOrCancel)="noop()"
    >
      <p>Body</p>
    </ngx-large-format-dialog-content>
  `
})
class TestHostWithHeaderContentComponent {
  noop(): void {}
}

@Component({
  selector: 'ngx-test-host-no-header-content',
  standalone: false,
  template: `
    <ngx-large-format-dialog-content dialogTitle="Title" (closeOrCancel)="noop()">
      <p>Body</p>
    </ngx-large-format-dialog-content>
  `
})
class TestHostWithoutHeaderContentComponent {
  noop(): void {}
}

@Component({
  selector: 'ngx-test-host-tabs-with-header-content',
  standalone: false,
  template: `
    <ng-template #headerContentTpl>
      <span class="header-content-test-marker">Extra Action</span>
    </ng-template>
    <ngx-large-format-dialog-content
      dialogTitle="Title"
      [largeFormatDialogHeaderContent]="headerContentTpl"
      (closeOrCancel)="noop()"
    >
      <ng-template largeFormatDialogTabs>
        <div class="tabs-stub">Tabs</div>
      </ng-template>
    </ngx-large-format-dialog-content>
  `
})
class TestHostTabsWithHeaderContentComponent {
  noop(): void {}
}

@Component({
  selector: 'ngx-test-host-stepper-with-header-content',
  standalone: false,
  template: `
    <ng-template #headerContentTpl>
      <span class="header-content-test-marker">Extra Action</span>
    </ng-template>
    <ngx-large-format-dialog-content
      dialogTitle="Title"
      [largeFormatDialogHeaderContent]="headerContentTpl"
      (closeOrCancel)="noop()"
    >
      <ng-template largeFormatDialogStepper>
        <div class="stepper-stub">Stepper</div>
      </ng-template>
    </ngx-large-format-dialog-content>
  `
})
class TestHostStepperWithHeaderContentComponent {
  noop(): void {}
}

describe(LargeFormatDialogContentComponent.name, () => {
  let fixture: ComponentFixture<LargeFormatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LargeFormatDialogContentComponent,
        LargeFormatDialogHeaderTitleComponent,
        LargeFormatDialogHeaderActionComponent
      ],
      imports: [CommonModule, NoopAnimationsModule],
      providers: [
        {
          provide: AlertService,
          useValue: {
            confirm: vi.fn().mockReturnValue({
              asObservable: () => of({ type: 'cancel' })
            })
          }
        }
      ]
    })
      .overrideComponent(LargeFormatDialogContentComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LargeFormatDialogContentComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe(`${LargeFormatDialogContentComponent.name} largeFormatDialogHeaderContent`, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LargeFormatDialogContentComponent,
        LargeFormatDialogHeaderTitleComponent,
        LargeFormatDialogHeaderActionComponent,
        LargeFormatDialogTabsDirective,
        LargeFormatDialogStepperDirective,
        TestHostWithHeaderContentComponent,
        TestHostWithoutHeaderContentComponent,
        TestHostTabsWithHeaderContentComponent,
        TestHostStepperWithHeaderContentComponent
      ],
      imports: [CommonModule, NoopAnimationsModule],
      providers: [
        {
          provide: AlertService,
          useValue: {
            confirm: vi.fn().mockReturnValue({
              asObservable: () => of({ type: 'cancel' })
            })
          }
        }
      ]
    })
      .overrideComponent(LargeFormatDialogContentComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  });

  it('should accept largeFormatDialogHeaderContent input', () => {
    const fixture = TestBed.createComponent(TestHostWithHeaderContentComponent);
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.directive(LargeFormatDialogContentComponent));
    expect(content.componentInstance.largeFormatDialogHeaderContent).toBeTruthy();
  });

  it('should render header content template inside the header content container', () => {
    const fixture = TestBed.createComponent(TestHostWithHeaderContentComponent);
    fixture.detectChanges();

    const marker = fixture.nativeElement.querySelector('.header-content-test-marker');
    expect(marker).toBeTruthy();
    expect(marker.textContent).toContain('Extra Action');
    expect(
      fixture.nativeElement.querySelector('.ngx-large-format-dialog-header-content .header-content-test-marker')
    ).toBeTruthy();
  });

  it('should not render header content template when largeFormatDialogHeaderContent is not provided', () => {
    const fixture = TestBed.createComponent(TestHostWithoutHeaderContentComponent);
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.directive(LargeFormatDialogContentComponent));
    expect(content.componentInstance.largeFormatDialogHeaderContent).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.header-content-test-marker')).toBeFalsy();
  });

  it('should not render header content when tabs template is present', () => {
    const fixture = TestBed.createComponent(TestHostTabsWithHeaderContentComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tabs-stub')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.header-content-test-marker')).toBeFalsy();
  });

  it('should not render header content when stepper template is present', () => {
    const fixture = TestBed.createComponent(TestHostStepperWithHeaderContentComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.stepper-stub')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.header-content-test-marker')).toBeFalsy();
  });
});
