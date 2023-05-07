import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Training } from '../training.model';
import { TrainingService } from '../training.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit, OnDestroy {
  trainings: Observable<Training[]>;

  constructor(private trainingService: TrainingService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.trainings = this.trainingService.trainingsChanged;
    this.trainingService.refreshTrainings();
  }

  onNewTraining() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
  }
}
