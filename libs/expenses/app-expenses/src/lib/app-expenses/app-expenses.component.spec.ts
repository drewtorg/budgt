import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppExpensesComponent } from './app-expenses.component';

describe('AppExpensesComponent', () => {
  let component: AppExpensesComponent;
  let fixture: ComponentFixture<AppExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExpensesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
