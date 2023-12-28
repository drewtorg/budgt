import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBucketModalComponent } from './edit-bucket-modal.component';

describe('EditBucketModalComponent', () => {
  let component: EditBucketModalComponent;
  let fixture: ComponentFixture<EditBucketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBucketModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBucketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
