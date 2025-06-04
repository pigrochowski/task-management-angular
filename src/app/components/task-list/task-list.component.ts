import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';
import { Task, TaskFilter } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    TaskItemComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>; // Observable z listą zadań
  filteredTasks: Task[] = []; // Przefiltrowane zadania

  // Obiekt z filtrami
  filter: TaskFilter = {
    status: 'all',
    priority: 'all',
    searchTerm: '',
  };

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit(): void {
    // Nasłuchiwanie zmian w zadaniach i automatyczne filtrowanie
    this.tasks$.subscribe((tasks) => {
      this.filteredTasks = this.applyFilters(tasks);
    });
  }

  // Funkcja filtrowania zadań
  private applyFilters(tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      // Filtr statusu ukończenia
      const statusMatch =
        this.filter.status === 'all' ||
        (this.filter.status === 'completed' && task.completed) ||
        (this.filter.status === 'pending' && !task.completed);

      // Filtr priorytetu
      const priorityMatch =
        this.filter.priority === 'all' ||
        task.priority === this.filter.priority;

      // Filtr wyszukiwania tekstowego
      const searchMatch =
        !this.filter.searchTerm ||
        task.title
          .toLowerCase()
          .includes(this.filter.searchTerm.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(this.filter.searchTerm.toLowerCase());

      return statusMatch && priorityMatch && searchMatch;
    });
  }

  // Wywołanie po zmianie filtrów
  onFilterChange(): void {
    this.tasks$.subscribe((tasks) => {
      this.filteredTasks = this.applyFilters(tasks);
    });
  }

  // Przełączenie statusu ukończenia zadania
  onToggleTask(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  // Usunięcie zadania
  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  // Dodanie nowego zadania (placeholder)

  onAddTask(): void {
    console.log('Przycisk + kliknięty!'); // ← DEBUG
    console.log('Dialog service:', this.dialog); // ← DEBUG

    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog zamknięty:', result); // ← DEBUG
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }

  // Edycja zadania
  onEditTask(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
      data: { task: task, isEdit: true }, // Przekaż dane zadania do dialogu
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(task.id, result); // Aktualizuj zadanie
      }
    });
  }
}
