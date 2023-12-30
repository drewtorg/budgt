import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCreateMonthComponent } from './ui-create-month.component';

describe('UiCreateMonthComponent', () => {
  let component: UiCreateMonthComponent;
  let fixture: ComponentFixture<UiCreateMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCreateMonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCreateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
