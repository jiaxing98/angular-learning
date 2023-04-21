import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../../shared/models/Food';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  cartObservable$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(food: Food) {
    let cartItem = this.cart.items.find(x => x.food.id === food.id);
    if (cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.calculateCartTotalCountAndPrice();
    this.cartSubject.next(this.cart);
  }

  removeFromCart(foodId: string) {
    this.cart.items = this.cart.items
      .filter(x => x.food.id != foodId);
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(x => x.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.calculateCartTotalCountAndPrice();

    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = new Cart();
  }

  private calculateCartTotalCountAndPrice() {
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + item.price, 0);
    this.cart.totalCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
