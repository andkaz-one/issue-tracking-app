import {
  Component,
  output,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ClarityModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ConfirmDialogComponent {
  visible = input.required<boolean>();
  issueNo = input<number | null>();
  confirmation = output<boolean>();

  agree() {
    this.confirmation.emit(true);
  }
  disagree() {
    this.confirmation.emit(false);
  }
}
