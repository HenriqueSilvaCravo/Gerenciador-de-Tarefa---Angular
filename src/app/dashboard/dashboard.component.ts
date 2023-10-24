import { Component } from '@angular/core';
import { faCalendarCheck, faSearch, faFilter, faPlus, faEllipsisVertical, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 // dashboard
  faCalendarCheck = faCalendarCheck;
  faSearch = faSearch;
  faFilter = faFilter;
  faPlus = faPlus;
  faEllipsisVertical = faEllipsisVertical;
  faCalendarXmark = faCalendarXmark;

  concludedTasksCount: number = 0;
  todoTasksCount: number = 0;
  recentTasks: Task[] = [];
  tasks: Task[] = [];

  filterStatus: string = "";
  filterTitle: string = "";
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
    this.applyFilters();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.calculateTaskCounts();
  }

  private calculateTaskCounts() {
    // Filtre as tarefas com base no status e no título
    const filteredTasks = this.tasks.filter(task => this.filterByStatus(task) && this.filterByTitle(task));
    this.concludedTasksCount = filteredTasks.filter(task => task.status === 'Concluída').length;
    this.todoTasksCount = filteredTasks.filter(task => task.status === 'A fazer').length;
  }

  private filterByStatus(task: Task): boolean {
    if (!this.filterStatus) {
      return true;
    }
    return task.status === this.filterStatus;
  }

  private filterByTitle(task: Task): boolean {
    if (!this.filterTitle) {
      return true;
    }
    return task.title.toLowerCase().includes(this.filterTitle.toLowerCase());
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const statusMatch = !this.filterStatus || task.status === this.filterStatus;
      const titleMatch = !this.filterTitle || task.title.toLowerCase().includes(this.filterTitle.toLowerCase());
      return statusMatch && titleMatch;
    });
  }
}