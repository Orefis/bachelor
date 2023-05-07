import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Training } from '../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {
  training?: Training;
  id: string;

  constructor(private trainingService: TrainingService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.training = this.trainingService.getTraining(this.id);
        }
      );
  }

  onEditTraining() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteTraining() {
    this.trainingService.deleteTraining(this.training.id);
    this.router.navigate(['/trainings']);
  }

}
