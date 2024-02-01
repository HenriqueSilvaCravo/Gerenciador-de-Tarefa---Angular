import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { faCalendarCheck, faPlus, faTrash, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  itemsPerPage: number = 5;
  currentPage: number = 1;

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

  getPaginatedTasks(): Task[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tasks.slice(startIndex, endIndex);
  }

  calculateTotalPages(): number {
    return Math.ceil(this.tasks.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.calculateTotalPages()) {
      this.currentPage = page;
    }
  }

  getPaginationArray(): number[] {
    return Array(this.calculateTotalPages()).fill(0).map((_, index) => index + 1);
  }
}