import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  tasks: Task[] = [];
  newTaskTitle: string = "";
  newTaskStatus: string = "A fazer";
  faReply = faReply;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskTitle) {
      const newTask: Task = {
        title: this.newTaskTitle,
        completed: false,
        status: this.newTaskStatus,
        hidden: false
      };

      this.taskService.addTask(newTask);
      this.loadTasks();

      this.newTaskTitle = "";
      this.newTaskStatus = "A fazer";

      this.router.navigate(['/Tarefas']);
    }
  }

  toggleStatus(task: Task) {
    task.status = task.status === 'A fazer' ? 'Concluída' : 'A fazer';
    this.taskService.updateTaskStatus(task);
    this.loadTasks();
  }
}