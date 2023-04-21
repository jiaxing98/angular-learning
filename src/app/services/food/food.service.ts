import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Food>[] {
    return this.http.get();
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getFoodById(foodId: string): Food {
    return this.getAll().find(x => x.id == foodId) ?? new Food();
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ?
      this.getAll() :
      this.getAll().filter(food => food.tags?.includes(tag))
  }
}
