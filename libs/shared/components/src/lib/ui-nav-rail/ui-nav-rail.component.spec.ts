import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiNavRailComponent } from './ui-nav-rail.component';

describe('UiNavRailComponent', () => {
  let component: UiNavRailComponent;
  let fixture: ComponentFixture<UiNavRailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavRailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiNavRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
