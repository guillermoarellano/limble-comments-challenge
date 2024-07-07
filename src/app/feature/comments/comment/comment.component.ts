import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UserComment } from '../comments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lmbl-comment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input.required<UserComment>();
}
