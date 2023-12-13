import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncomeTableComponent } from './category-table.component';

describe('IncomeTableComponent', () => {
  let component: IncomeTableComponent;
  let fixture: ComponentFixture<IncomeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});