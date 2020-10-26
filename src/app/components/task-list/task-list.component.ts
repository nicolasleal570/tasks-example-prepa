import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task> = [];
  loading = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.loading = true;
    this.tasksService.getAllTasks().subscribe((items) => {
      // Setting up tasks
      this.tasks = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Task)
      );

      this.loading = false;
    });
  }

  deleteTask(taskId: string): void {
    this.loading = true;
    this.tasksService.deleteTask(taskId).then((res) => {
      this.loading = false;
    });
  }
}
