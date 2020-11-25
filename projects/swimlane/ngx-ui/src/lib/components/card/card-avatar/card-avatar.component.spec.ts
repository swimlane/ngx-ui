import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardAvatarComponent } from './card-avatar.component';

describe('CardAvatarComponent', () => {
  let component: CardAvatarComponent;
  let fixture: ComponentFixture<CardAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAvatarComponent]
    });

    fixture = TestBed.createComponent(CardAvatarComponent);
    component = fixture.componentInstance;
  });

  it('initializes default avatar', () => {
    const avatar = fixture.debugElement.nativeElement;
    expect(avatar).toBeDefined();
    expect(avatar).toHaveClass('ngx-card-avatar');
    expect(component.status).toBeUndefined();
    expect(component.src).toBeUndefined();
  });
});
