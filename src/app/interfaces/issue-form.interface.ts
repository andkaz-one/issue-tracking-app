import { FormControl } from '@angular/forms';

export interface IssueForm {
  issueNo?: FormControl<number | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}
