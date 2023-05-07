import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Calorie } from '../calorie.model';
import { CaloriesListService } from '../calories-list.service';

@Component({
  selector: 'app-calories-edit',
  templateUrl: './calories-edit.component.html',
  styleUrls: ['./calories-edit.component.css']
})
export class CaloriesEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Calorie;

  constructor(private slService: CaloriesListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getCalorie(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            age: this.editedItem.age,
            weight: this.editedItem.weight,
            height: this.editedItem.height,
            sex: this.editedItem.sex,
            activity: this.editedItem.activity,
            goal: this.editedItem.goal
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCalorie = new Calorie(value.name, value.age, value.weight, value.height, value.sex, value.activity, value.goal);
    if (this.editMode) {
      this.slService.updateCalorie(this.editedItemIndex, newCalorie);
    } else {
      this.slService.addCalorie(newCalorie);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteCalorie(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
