import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UpdateTaskPageComponent } from './pages/update-task-page/update-task-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'task/create', component: CreateTaskPageComponent },
  { path: 'task/:todoId/update', component: UpdateTaskPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
