import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketTableComponent } from './bucket-table.component';

describe('BucketTableComponent', () => {
  let component: BucketTableComponent;
  let fixture: ComponentFixture<BucketTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BucketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
