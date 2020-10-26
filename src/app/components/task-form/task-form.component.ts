import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  editTask: Task = null;
  taskForm: FormGroup;
  taskId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('taskId');

      if (this.taskId) {
        this.loading = true;
        this.taskService.getTask(this.taskId).subscribe((item) => {
          this.editTask = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.taskForm.patchValue({
            title: this.editTask.title,
            description: this.editTask.description,
          });
          this.loading = false;
        });
      }
    });
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
      this.loading = false;
      this.router.navigate(['']);
    });
  }

  updateTask(data: Task): void {
    this.loading = true;
    this.taskService.updateTask(data, this.taskId).then((res) => {
      this.loading = false;
      this.router.navigate(['']);
    });
  }

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
  }
}
