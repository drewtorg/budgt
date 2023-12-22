import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWorkspaceComponent } from './app-workspace.component';

describe('AppWorkspaceComponent', () => {
  let component: AppWorkspaceComponent;
  let fixture: ComponentFixture<AppWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkspaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
