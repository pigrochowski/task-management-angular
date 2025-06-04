import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // ← SPRAWDŹ ten import
import { TaskListComponent } from './components/task-list/task-list.component';  // ← SPRAWDŹ ten import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],  // ← TO jest OK
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management';
}
