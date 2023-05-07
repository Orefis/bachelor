import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CaloriesListService } from './calories-list.service';
import {Calorie} from './calorie.model';

@Component({
  selector: 'app-calories-list',
  templateUrl: './calories-list.component.html',
  styleUrls: ['./calories-list.component.css']
})
export class CaloriesListComponent implements OnInit, OnDestroy {
  calories: Calorie[];
  private subscription: Subscription;

  constructor(private slService: CaloriesListService) { }

  ngOnInit() {
    this.calories = this.slService.getCalories();
    this.subscription = this.slService.caloriesChanged
      .subscribe(
        (calories: Calorie[]) => {
          this.calories = calories;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
