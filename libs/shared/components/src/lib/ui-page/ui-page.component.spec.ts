import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPageComponent } from './ui-page.component';

describe('UiPageComponent', () => {
  let component: UiPageComponent;
  let fixture: ComponentFixture<UiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
