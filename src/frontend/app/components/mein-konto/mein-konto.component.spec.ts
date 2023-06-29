import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeinKontoComponent } from './mein-konto.component';

describe('MeinKontoComponent', () => {
  let component: MeinKontoComponent;
  let fixture: ComponentFixture<MeinKontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeinKontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeinKontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
