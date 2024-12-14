import { Injectable, signal, WritableSignal } from '@angular/core';
import { Issue } from '../interfaces';
import { issues as issuesMock } from '../../assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  issues: WritableSignal<Issue[]> = signal([...issuesMock]);

  constructor() {}

  createIssue(issue: Issue): void {
    const [lastId] = this.issues()
      .map((i) => i.issueNo)
      .slice(-1);

    issue.issueNo = lastId + 1;
    this.issues.update((issues) => [...issues, issue]);
  }

  completeIssue(issue: Issue): void {
    this.issues.update((issues: Issue[]) =>
      issues.map((i: Issue) =>
        i.issueNo === issue.issueNo
          ? { ...issue, completed: new Date() }
          : { ...i }
      )
    );
  }

  uncompleteIssue(issue: Issue): void {
    this.issues.update((issues: Issue[]) =>
      issues.map((i: Issue) =>
        i.issueNo === issue.issueNo ? { ...i, completed: null } : { ...i }
      )
    );
  }

  getSuggestions(title: string): Issue[] {
    if (title && title.length > 3) {
      return this.issues().filter(
        (issue: Issue) => issue.title.indexOf(title) !== -1
      );
    }

    return [];
  }

  updateIssue(issue: Issue): void {
    this.issues.update((issues: Issue[]) =>
      issues.map((i: Issue) =>
        i.issueNo === issue.issueNo ? { ...issue } : { ...i }
      )
    );
  }
}
