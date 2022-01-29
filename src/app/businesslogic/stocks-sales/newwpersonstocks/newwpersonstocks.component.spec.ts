import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewwpersonstocksComponent } from './newwpersonstocks.component';

describe('NewwpersonstocksComponent', () => {
  let component: NewwpersonstocksComponent;
  let fixture: ComponentFixture<NewwpersonstocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewwpersonstocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewwpersonstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
