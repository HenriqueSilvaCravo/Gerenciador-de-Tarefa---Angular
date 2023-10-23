import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.service';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }
}