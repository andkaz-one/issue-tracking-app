import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../interfaces';
import { ClarityModule } from '@clr/angular';
import { IssueReportComponent } from '../issue-report/issue-report.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditIssueComponent } from '../edit-issue/edit-issue.component';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-list',
  imports: [
    ClarityModule,
    IssueReportComponent,
    ConfirmDialogComponent,
    EditIssueComponent,
    CommonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueListComponent {
  private issuesService: IssuesService = inject(IssuesService);
  private toastr: ToastrService = inject(ToastrService);

  private issues = this.issuesService.issues;
  pendingIssues = computed(() => this.issues().filter((i) => !i.completed));
  completedIssues = computed(() => this.issues().filter((i) => i.completed));

  showReportIssue: WritableSignal<boolean> = signal(false);

  selectedIssue: Issue | null = null;

  showSolveDialog: WritableSignal<boolean> = signal(false);
  showEditDialog: WritableSignal<boolean> = signal(false);

  toggleSolveDialog(issue: Issue): void {
    this.selectedIssue = issue;
    this.showSolveDialog.set(true);
  }

  toggleReportDialog(): void {
    this.showEditDialog.set(true);
  }

  toggleEditDialog(issue: Issue): void {
    this.selectedIssue = issue;
    this.showEditDialog.set(true);
  }

  onCloseReportForm() {
    this.showReportIssue.set(false);
    this.showEditDialog.set(false);
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.showSolveDialog.set(false);
      this.markAsCompleted(this.selectedIssue);
    }
    this.showSolveDialog.set(false);
    this.selectedIssue = null;
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.item.data.completed) {
        this.markAsUncompleted(event.item.data);
      } else {
        this.markAsCompleted(event.item.data);
      }
    }
  }

  private markAsCompleted(issue: Issue): void {
    this.issuesService.completeIssue(issue);
    this.showSuccess(
      'Success',
      `Issue with id: ${issue.issueNo} was mark as completed`
    );
  }

  private markAsUncompleted(issue: Issue): void {
    this.issuesService.uncompleteIssue(issue);
    this.showSuccess(
      'Success',
      `Issue with id: ${issue.issueNo} was mark as uncompleted`
    );
  }

  private showSuccess(details: string, message: string) {
    this.toastr.success(message, details);
  }
}
