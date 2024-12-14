import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'issue-tracking-app';
}
