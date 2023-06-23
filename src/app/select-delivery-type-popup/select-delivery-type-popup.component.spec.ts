import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDeliveryTypePopupComponent } from './select-delivery-type-popup.component';

describe('SelectDeliveryTypePopupComponent', () => {
  let component: SelectDeliveryTypePopupComponent;
  let fixture: ComponentFixture<SelectDeliveryTypePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDeliveryTypePopupComponent]
    });
    fixture = TestBed.createComponent(SelectDeliveryTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
