import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCityPopupComponent } from './select-city-popup.component';

describe('SelectCityPopupComponent', () => {
  let component: SelectCityPopupComponent;
  let fixture: ComponentFixture<SelectCityPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCityPopupComponent]
    });
    fixture = TestBed.createComponent(SelectCityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
