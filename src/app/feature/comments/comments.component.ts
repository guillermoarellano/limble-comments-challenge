import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserMentionComponent } from './user-mention/user-mention.component';

@Component({
  selector: 'lmbl-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserMentionComponent]
})
export class CommentsComponent {}
