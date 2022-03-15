import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsdailogComponent } from './accountsdailog.component';

describe('AccountsdailogComponent', () => {
  let component: AccountsdailogComponent;
  let fixture: ComponentFixture<AccountsdailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsdailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsdailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
