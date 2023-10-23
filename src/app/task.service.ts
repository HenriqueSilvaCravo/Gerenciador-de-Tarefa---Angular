import { Injectable } from '@angular/core';

export class Task {
  title: string = '';
  completed: boolean = false;
  status: string = 'A fazer'; // Defina como 'A fazer' por padrão
  hidden: boolean | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() {}

  getTasks(): Task[] {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  updateTaskStatus(task: Task): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.map(t => (t === task ? task : t));
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTasks));
  }

  deleteTask(task: Task): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTasks));
  }

  clearAllTasks(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}