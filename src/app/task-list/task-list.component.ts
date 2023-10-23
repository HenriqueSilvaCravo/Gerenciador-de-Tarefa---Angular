import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { faCalendarCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTaskTitle: string = "";
  newTaskStatus: string = "A fazer";
  faCalendarCheck = faCalendarCheck;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  // addTask() {
  //   if (this.newTaskTitle) {
  //     const newTask: Task = {
  //       title: this.newTaskTitle,
  //       completed: false,
  //       status: this.newTaskStatus,
  //       hidden: false
  //     };

  //     this.taskService.addTask(newTask);
  //     this.loadTasks();

  //     this.newTaskTitle = "";
  //     this.newTaskStatus = "A fazer";
  //   }
  // }

  toggleStatus(task: Task) {
    task.status = task.status === 'A fazer' ? 'Concluída' : 'A fazer';
    this.taskService.updateTaskStatus(task);
    this.loadTasks();
  }

  deleteTask(task: Task) {
    console.log('Tarefa a ser excluída:', task);
    this.taskService.deleteTask(task);
    console.log('Tarefas após exclusão:', this.tasks); // Adicione esta linha
    this.tasks = this.taskService.getTasks();

    this.loadTasks();
  }

  // deleteTask(task: Task) {
  //   this.taskService.deleteTask(task);
  //   // Defina a propriedade hidden da tarefa como true após a exclusão.
  //   task.hidden = true;
  // }

  clearAllTasks() {
    this.taskService.clearAllTasks();
    this.loadTasks();
  }
}