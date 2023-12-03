import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSavingsComponent } from './app-savings.component';

describe('AppSavingsComponent', () => {
  let component: AppSavingsComponent;
  let fixture: ComponentFixture<AppSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSavingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
