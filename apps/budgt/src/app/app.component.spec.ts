import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    component = TestBed.inject(AppComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
