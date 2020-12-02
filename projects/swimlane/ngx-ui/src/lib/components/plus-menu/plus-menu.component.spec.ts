import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotkeysModule } from '../hotkeys/hotkeys.module';
import { TooltipModule } from '../tooltip/tooltip.module';

import { PlusMenuComponent } from './plus-menu.component';

describe('PlusMenuComponent', () => {
  let component: PlusMenuComponent;
  let fixture: ComponentFixture<PlusMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotkeysModule, TooltipModule],
      declarations: [PlusMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
