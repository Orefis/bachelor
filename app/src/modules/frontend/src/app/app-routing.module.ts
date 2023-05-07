import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingsComponent } from './trainings/trainings.component';
import { CaloriesListComponent } from './calories-list/calories-list.component';
import { TrainingStartComponent } from './trainings/training-start/training-start.component';
import { TrainingDetailComponent } from './trainings/training-detail/training-detail.component';
import { TrainingEditComponent } from './trainings/training/training-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/trainings', pathMatch: 'full' },
  { path: 'trainings', component: TrainingsComponent, children: [
    { path: '', component: TrainingStartComponent },
    { path: 'new', component: TrainingEditComponent },
    { path: ':id', component: TrainingDetailComponent },
    { path: ':id/edit', component: TrainingEditComponent },
  ] },
  { path: 'calories-list', component: CaloriesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
