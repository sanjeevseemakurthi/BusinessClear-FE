import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockspersondetailsComponent } from './stockspersondetails.component';

describe('StockspersondetailsComponent', () => {
  let component: StockspersondetailsComponent;
  let fixture: ComponentFixture<StockspersondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockspersondetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockspersondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
