import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { UpdateTaskPageComponent } from './pages/update-task-page/update-task-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'tasks',
    canActivate: [AuthenticationGuard],
    component: TasksPageComponent,
  },
  {
    path: 'task/create',
    canActivate: [AuthenticationGuard],
    component: CreateTaskPageComponent,
  },
  {
    path: 'task/:taskId/update',
    canActivate: [AuthenticationGuard],
    component: UpdateTaskPageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
