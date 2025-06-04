import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task; // Zadanie przekazane z rodzica
  @Output() toggleCompletion = new EventEmitter<number>(); // Evento zmiany statusu
  @Output() deleteTask = new EventEmitter<number>(); // Evento usunięcia
  @Output() editTask = new EventEmitter<Task>(); // 

// Emisja evento edycji
onEdit(): void {
  this.editTask.emit(this.task); // 
}


  // Funkcja zwracająca kolor priorytetu
  getPriorityColor(): string {
    switch (this.task.priority) {
      case 'high':
        return '#f44336'; // Czerwony
      case 'medium':
        return '#ff9800'; // Pomarańczowy
      case 'low':
        return '#4caf50'; // Zielony
      default:
        return '#757575'; // Szary
    }
  }

  // Funkcja zwracająca polską nazwę priorytetu
  getPriorityLabel(): string {
    switch (this.task.priority) {
      case 'high':
        return 'Wysoki';
      case 'medium':
        return 'Średni';
      case 'low':
        return 'Niski';
      default:
        return 'Nieznany';
    }
  }

  // Formatowanie daty
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pl-PL');
  }

  // Sprawdzenie czy termin minął
  isOverdue(): boolean {
    if (!this.task.dueDate) return false;
    return new Date(this.task.dueDate) < new Date() && !this.task.completed;
  }

  // Emisja evento przełączenia statusu
  onToggleCompletion(): void {
    this.toggleCompletion.emit(this.task.id);
  }

  // Emisja evento usunięcia
  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }
}
