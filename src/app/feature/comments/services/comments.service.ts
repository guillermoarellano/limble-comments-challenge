import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserComment } from '../comments';

@Injectable()
export class CommentsService {
  httpClient = inject(HttpClient);

  getMentionUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('users.json');
  }

  getComments(): Observable<UserComment[]> {
    return this.httpClient.get<UserComment[]>('comments.json');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveComment(newComment: UserComment): void {
    // TODO: implement this
  }
}
