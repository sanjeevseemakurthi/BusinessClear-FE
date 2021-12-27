import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStocksDailogComponent } from './edit-stocks-dailog.component';

describe('EditStocksDailogComponent', () => {
  let component: EditStocksDailogComponent;
  let fixture: ComponentFixture<EditStocksDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStocksDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStocksDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
