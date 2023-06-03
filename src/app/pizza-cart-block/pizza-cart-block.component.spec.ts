import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCartBlockComponent } from './pizza-cart-block.component';

describe('PizzaCartBlockComponent', () => {
  let component: PizzaCartBlockComponent;
  let fixture: ComponentFixture<PizzaCartBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaCartBlockComponent]
    });
    fixture = TestBed.createComponent(PizzaCartBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
