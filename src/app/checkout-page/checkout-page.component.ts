import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../types/appState.interface';
import { selectPizzas, selectTotalPrice } from '../store/cart/cart.selectors';
import { CartPizza } from '../store/cart/cart.reducer';
import { Router } from '@angular/router';
import { clearCart } from '../store/cart/cart.actions';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  paymentMethod: 'credit' | 'cash' = 'credit';
  checkOutForm = this.formBuilder.group({
    name: [''],
    phoneNumber: [
      '+380',
      [Validators.required, Validators.pattern(/\+380\d{3}\d{2}\d{2}\d{2}/gi)],
    ],
    promoCode: ['', Validators.required],
    paymentMethod: ['credit'],
  });
  pizzas$: Observable<CartPizza[]> = this.store.select(selectPizzas);
  cartTotalPrice$: Observable<number> = this.store.select(selectTotalPrice);
  discountPercentage: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartTotalPrice$.subscribe((cartTotalPrice) => {
      if (!cartTotalPrice) {
        this.router.navigate(['/']);
      }
    });
  }

  checkPromoCode(): void {
    if (this.checkOutForm.valid) {
      this.http
        .get<{ valid: boolean; percentage: number }>(
          `/api/promocode/?promocode=${this.checkOutForm.value.promoCode}`
        )
        .subscribe({
          next: ({ valid, percentage }) => {
            if (!valid) {
              alert('Такого промокоду не інсує!');
            } else {
              this.discountPercentage = percentage;
              alert('Промокод успішно використано!');
            }
          },
        });
    }
  }

  createOrder(): void {
    console.log(this.checkOutForm.value.promoCode);
    // TODO
    const orderObject: any = {
      paymentMethod: this.paymentMethod,
      pizzas: [],
      promocode: this.checkOutForm.value.promoCode || '',
      customer: {
        name: this.checkOutForm.value.name,
        phoneNumber: this.checkOutForm.value.phoneNumber,
      },
    };
    this.pizzas$.subscribe((pizzas) => {
      orderObject.pizzas = pizzas;
    });
    this.http
      .post<{ success: boolean }>('/api/order/', orderObject)
      .subscribe(({ success }) => {
        if (success) {
          alert('Замовлення створено успішно!');
          this.store.dispatch(clearCart());
          this.router.navigate(['/']);
        }
      });
  }

  validateInput(inputName: string): boolean {
    const isInvalid = this.checkOutForm.get(inputName)?.invalid;
    const isTouched = this.checkOutForm.get(inputName)?.touched;
    const isDirty = this.checkOutForm.get(inputName)?.dirty;
    if (isInvalid && (isTouched || isDirty)) {
      return true;
    }
    return false;
  }
}
