import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private cartService: CartService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["foodId"])
        this.food = this.foodService.getFoodById(params["foodId"]);
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
