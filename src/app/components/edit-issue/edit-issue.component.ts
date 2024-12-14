import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { Issue, IssueForm } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-edit-issue',
  imports: [ClarityModule, ReactiveFormsModule],
  templateUrl: './edit-issue.component.html',
  styleUrl: './edit-issue.component.css',
})
export class EditIssueComponent implements OnInit {
  private issuesService: IssuesService = inject(IssuesService);

  visible = input.required<boolean>();
  issue = input<Issue | null>();
  onSaveIssue = output();

  editIssueForm = new FormGroup<IssueForm>({
    issueNo: new FormControl(null, {
      nonNullable: true,
      validators: Validators.required,
    }),
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

  ngOnInit(): void {
    if (this.issue()) {
      this.editIssueForm.patchValue({
        ...this.issue(),
      });
    }
  }

  save(): void {
    if (this.editIssueForm && this.editIssueForm.invalid) {
      this.editIssueForm.markAllAsTouched();
      return;
    }
    this.issuesService.updateIssue(this.editIssueForm.getRawValue() as Issue);
    this.onSaveIssue.emit();
  }
}
