import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskFilter } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Prywatne BehaviorSubject do przechowywania listy zadań
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Ukończ projekt Angular',
      description: 'Stwórz aplikację do zarządzania zadaniami',
      completed: false,
      priority: 'high',
      dueDate: new Date('2025-06-10'),
      createdAt: new Date('2025-06-03'),
      updatedAt: new Date('2025-06-03'),
      tags: ['angular', 'typescript', 'projekt'],
    },
    {
      id: 2,
      title: 'Napisz dokumentację',
      description: 'Przygotuj README dla projektu',
      completed: true,
      priority: 'medium',
      createdAt: new Date('2025-06-02'),
      updatedAt: new Date('2025-06-03'),
      tags: ['dokumentacja'],
    },
  ]);

  // Publiczny Observable do subskrypcji przez komponenty
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  // Pobierz wszystkie zadania
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // Dodaj nowe zadanie
  addTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const currentTasks = this.tasksSubject.value;
    const newTask: Task = {
      ...taskData,
      id: Date.now(), // Prosta generacja ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  // Aktualizuj zadanie
  updateTask(id: number, updates: Partial<Task>): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  // Usuń zadanie
  deleteTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter((task) => task.id !== id);
    this.tasksSubject.next(filteredTasks);
  }

  // Przełącz status ukończenia zadania
  toggleTaskCompletion(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    );
    this.tasksSubject.next(updatedTasks);
  }
}
