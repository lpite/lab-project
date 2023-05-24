import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBlockComponent } from './pizza-block.component';

describe('PizzaBlockComponent', () => {
  let component: PizzaBlockComponent;
  let fixture: ComponentFixture<PizzaBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaBlockComponent]
    });
    fixture = TestBed.createComponent(PizzaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
