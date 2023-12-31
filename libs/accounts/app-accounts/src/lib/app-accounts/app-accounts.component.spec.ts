import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAccountsComponent } from './app-accounts.component';

describe('AppAccountsComponent', () => {
  let component: AppAccountsComponent;
  let fixture: ComponentFixture<AppAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAccountsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
