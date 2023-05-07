import { Subject } from 'rxjs/Subject';
import { Calorie } from './calorie.model';

export class CaloriesListService {
  caloriesChanged = new Subject<Calorie[]>();
  startedEditing = new Subject<number>();
  private calories: Calorie[] = [];

  getCalories() {
    return this.calories.slice();
  }

  getCalorie(index: number) {
    return this.calories[index];
  }

  addCalorie(calories: Calorie) {
    this.calories.push(calories);
    this.caloriesChanged.next(this.calories.slice());
  }

  addCalories(calories: Calorie[]) {
    this.calories.push(...calories);
    this.caloriesChanged.next(this.calories.slice());
  }

  updateCalorie(index: number, newCalories: Calorie) {
    this.calories[index] = newCalories;
    this.caloriesChanged.next(this.calories.slice());
  }

  deleteCalorie(index: number) {
    this.calories.splice(index, 1);
    this.caloriesChanged.next(this.calories.slice());
  }

}
