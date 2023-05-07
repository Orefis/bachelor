import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { TrainingDetailComponent } from './trainings/training-detail/training-detail.component';
import { TrainingItemComponent } from './trainings/training-list/training-item/training-item.component';
import { CaloriesListComponent } from './calories-list/calories-list.component';
import { CaloriesEditComponent } from './calories-list/calories-edit/calories-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CaloriesListService } from './calories-list/calories-list.service';
import { AppRoutingModule } from './app-routing.module';
import { TrainingStartComponent } from './trainings/training-start/training-start.component';
import { TrainingEditComponent } from './trainings/training/training-edit.component';
import { TrainingService } from './trainings/training.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrainingsComponent,
    TrainingListComponent,
    TrainingDetailComponent,
    TrainingItemComponent,
    CaloriesListComponent,
    CaloriesEditComponent,
    DropdownDirective,
    TrainingStartComponent,
    TrainingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CaloriesListService, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
