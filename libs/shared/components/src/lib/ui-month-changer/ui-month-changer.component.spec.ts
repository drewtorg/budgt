import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMonthChangerComponent } from './month-changer.component';

describe('UiMonthChangerComponent', () => {
  let component: UiMonthChangerComponent;
  let fixture: ComponentFixture<UiMonthChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMonthChangerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMonthChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
