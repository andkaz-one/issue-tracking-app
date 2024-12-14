import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Issue, IssueForm } from '../../interfaces';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-report',
  imports: [ClarityModule, CommonModule, ReactiveFormsModule],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueReportComponent implements OnInit {
  private issuesService: IssuesService = inject(IssuesService);

  closeFormHandler = output();

  issueReportForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  suggestions: Issue[] = [];

  ngOnInit(): void {
    this.issueReportForm.controls.title.valueChanges.subscribe((title) => {
      this.suggestions = this.issuesService.getSuggestions(title);
    });
  }

  addIssue(): void {
    if (this.issueReportForm && this.issueReportForm.invalid) {
      this.issueReportForm.markAllAsTouched();
      return;
    }
    this.issuesService.createIssue(this.issueReportForm.getRawValue() as Issue);
    this.closeFormHandler.emit();
  }
}
