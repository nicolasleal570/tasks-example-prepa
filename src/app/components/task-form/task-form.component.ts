import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;

  @Input() editTask: Task = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  createTask(data: Task): void {
    this.loading = true;
    this.taskService.createTask(data).then((res) => {
      console.log('repsonse', res);
      this.loading = false;
      this.router.navigate(['']);
    });
  }

  updateTask(data: Task): void {}

  onSubmit(): void {
    const dataTask: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      completed: false,
    };

    if (this.editTask) {
      this.updateTask(dataTask);
      return;
    }

    this.createTask(dataTask);

    console.log(`Submiting form...`, dataTask);
  }
}
