import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAuthHandlerComponent } from './app-auth-handler.component';

describe('AppAuthHandlerComponent', () => {
  let component: AppAuthHandlerComponent;
  let fixture: ComponentFixture<AppAuthHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAuthHandlerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppAuthHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
