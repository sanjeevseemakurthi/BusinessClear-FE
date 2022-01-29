import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockssalesharedaddComponent } from './stockssalesharedadd.component';

describe('StockssalesharedaddComponent', () => {
  let component: StockssalesharedaddComponent;
  let fixture: ComponentFixture<StockssalesharedaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockssalesharedaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockssalesharedaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
