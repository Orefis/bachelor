import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Training} from './training.model';
import {Ingredient} from './ingredient.model';
import {CaloriesListService} from '../calories-list/calories-list.service';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';

@Injectable()
export class TrainingService {
  trainingsChanged = new Subject<Training[]>();

  private trainings: Training[] = [
    new Training('FBW - woman',
      'Simple training',
      [
        new Ingredient('Squats', 5),
        new Ingredient('Benchpress', 10)
      ]),
    new Training(
      'FBW - man',
      'Simple training',
      [
        new Ingredient('OHP', 1),
        new Ingredient('BENCHPRESS', 20)
      ])
  ];

  constructor(
    private slService: CaloriesListService,
    private readonly httpClient: HttpClient,
  ) {
  }

  getTrainings() {
    return this.trainings.slice();
  }

  getTraining(id: string) {
    return this.trainings
      .find(it => it.id === id);
  }

  addTraining(training: Training) {
    this.httpClient
      .put(
        `/api/trainings/${training.id}`,
        training,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      )
      .pipe(take(1))
      .subscribe(value => this.refreshTrainings()); }

  refreshTrainings() {
    this.httpClient
      .get<GetTrainingsResponse>('/api/trainings')
      .pipe(take(1))
      .subscribe(refreshedList => {
        this.trainingsChanged.next(refreshedList.trainings);
        this.trainings = refreshedList.trainings;
      });
  }

  updateTraining(id: string, training: Training) {
    this.httpClient
      .put(
        `/api/trainings/${id}`,
        training,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      )
      .pipe(take(1))
      .subscribe(value => this.refreshTrainings());
  }

  deleteTraining(id: string) {
    this.httpClient
      .delete(`/api/trainings/${id}`)
      .pipe(take(1))
      .subscribe(value => this.refreshTrainings());
  }
}

interface GetTrainingsResponse {
  trainings: Training[];
}
