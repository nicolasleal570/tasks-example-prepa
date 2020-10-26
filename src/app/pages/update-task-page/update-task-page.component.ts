import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-update-task-page',
  templateUrl: './update-task-page.component.html',
  styleUrls: ['./update-task-page.component.scss'],
})
export class UpdateTaskPageComponent implements OnInit {
  taskId = '';
  task: Task = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('todoId');
    });
  }

  getTaskById(): void {
    this.taskService.getTask(this.taskId).subscribe((item) => {
      this.task = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
  }
}
