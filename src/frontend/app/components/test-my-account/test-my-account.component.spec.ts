import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMyAccountComponent } from './test-my-account.component';

describe('TestMyAccountComponent', () => {
  let component: TestMyAccountComponent;
  let fixture: ComponentFixture<TestMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
