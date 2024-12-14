import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/issue-list/issue-list.component').then(
        (m) => m.IssueListComponent
      ),
  },
];
