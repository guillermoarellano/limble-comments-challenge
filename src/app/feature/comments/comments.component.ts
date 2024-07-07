import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentsService } from './services/comments.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User, UserComment } from './comments';
import { CommentComponent } from './comment/comment.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lmbl-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, CommentInputComponent, CommonModule, CommentComponent],
  providers: [CommentsService]
})
export class CommentsComponent {
  private readonly commentService = inject(CommentsService);

  showCommentInput = false;

  comments$: Observable<UserComment[]> = this.commentService.getComments();

  mentionUsers$: Observable<User[]> = this.commentService.getMentionUsers();

  showCommentInputSection(): void {
    this.showCommentInput = true;
  }

  onCommentSubmit(comment: string): void {
    this.showCommentInput = false;

    if (!comment) {
      return;
    }

    const newComment: UserComment = {
      commentID: 0,
      comment,
      createdBy: 'Sonic',
      mentions: [],
      createdDate: new Date().toISOString()
    };

    this.commentService.saveComment(newComment);
  }
}
