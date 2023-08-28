import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class CheckoutComponent implements OnInit {
  isLoading: boolean = false;
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  cartID: string = '';
  constructor(
    private _paymentService: PaymentService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.cartID = params.get('cartID')!;
    });
  }
  handleSubmit(shippingForm: FormGroup) {
    this.isLoading = true;

    this._paymentService.payOnline(shippingForm.value, this.cartID).subscribe({
      next: (response) => {
        location.href = response.session.url;
        this.isLoading = false;
      },
    });
  }
}
