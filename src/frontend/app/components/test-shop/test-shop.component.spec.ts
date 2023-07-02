import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestShopComponent } from './test-shop.component';
import { FormsModule } from '@angular/forms';

describe('TestShopComponent', () => {
  let component: TestShopComponent;
  let fixture: ComponentFixture<TestShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestShopComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
