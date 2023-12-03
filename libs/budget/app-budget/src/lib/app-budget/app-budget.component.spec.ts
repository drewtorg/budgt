import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppBudgetComponent } from './app-budget.component';

describe('AppBudgetComponent', () => {
  let component: AppBudgetComponent;
  let fixture: ComponentFixture<AppBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBudgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
