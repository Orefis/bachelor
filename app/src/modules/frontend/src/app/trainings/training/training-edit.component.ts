import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { TrainingService } from '../training.service';
import {v4 as uuidv4} from 'uuid';
import {Training} from '../training.model';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  id: string;
  editMode = false;
  trainingForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private trainingService: TrainingService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.trainingService.updateTraining(this.id, this.trainingForm.value);
    } else {
      this.trainingService.addTraining({
        ...this.trainingForm.value,
        id: uuidv4()
      });
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.trainingForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.trainingForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let trainingName = '';
    let trainingDescription = '';
    const trainingIngredients = new FormArray([]);

    if (this.editMode) {
      const training = this.trainingService.getTraining(this.id);
      trainingName = training.name;
      trainingDescription = training.description;
      if (training['ingredients']) {
        for (const ingredient of training.ingredients) {
          trainingIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.trainingForm = new FormGroup({
      'name': new FormControl(trainingName, Validators.required),
      'description': new FormControl(trainingDescription, Validators.required),
      'ingredients': trainingIngredients
    });
  }

}
