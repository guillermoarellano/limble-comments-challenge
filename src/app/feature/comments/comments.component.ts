import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserMentionComponent } from './user-mention/user-mention.component';
import { CommentsService } from './services/comments.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User, UserComment } from './comments';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'lmbl-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserMentionComponent, CommonModule, CommentComponent],
  providers: [CommentsService]
})
export class CommentsComponent {
  private readonly commentService = inject(CommentsService);

  comments$: Observable<UserComment[]> = this.commentService.getComments();

  mentionUsers$: Observable<User[]> = this.commentService.getMentionUsers();
}
