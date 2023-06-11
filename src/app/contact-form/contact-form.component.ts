import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.min(2),
        Validators.pattern(/[А-Яа-яЇїЄє ]/g),
      ],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/\+380\d{3}\d{2}\d{2}\d{2}/gi)],
    ],
    text: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.http
        .post('/api/subscribe/', {
          name: this.contactForm.value.name,
          phoneNumber: this.contactForm.value.phoneNumber,
          text: this.contactForm.value.text,
        })
        .subscribe({
          next: () => {
            this.contactForm.reset();
            alert('Дякуємо за ваш відгук!');
          },
          error: (error) => alert('Сталася якась помилка. Спробуйте знову.'),
        });

      console.log(this.contactForm.value.name);
    }
  }
  validateInput(inputName: string): boolean {
    const isInvalid = this.contactForm.get(inputName)?.invalid;
    const isTouched = this.contactForm.get(inputName)?.touched;
    const isDirty = this.contactForm.get(inputName)?.dirty;
    if (isInvalid && (isTouched || isDirty)) {
      return true;
    }
    return false;
  }
}
