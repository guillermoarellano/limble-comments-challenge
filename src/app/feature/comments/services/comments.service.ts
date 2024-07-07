import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { User, UserComment } from '../comments';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class CommentsService {
  httpClient = inject(HttpClient);

  private rawMentionUsers = toSignal(this.httpClient.get<User[]>('users.json'), { initialValue: [] });
  private rawComments = toSignal(this.httpClient.get<UserComment[]>('comments.json'), { initialValue: [] });

  private mentionUsers = computed(() => signal(this.rawMentionUsers()));
  private comments = computed(() => signal(this.rawComments()));

  displayMentionUsers = computed(() => this.mentionUsers()());
  displayComments = computed(() => this.comments()());

  saveComment(newComment: UserComment): void {
    const verifiedMentions = this.verifyUsernames(newComment.comment);
    const enrichedComment = {
      ...newComment,
      commentID: Math.floor(Math.random() * 1000),
      createdDate: new Date().toISOString(),
      mentions: verifiedMentions
    };

    console.log(enrichedComment);

    this.comments().update((comments) => [...comments, enrichedComment]);
  }

  /**
   * Verifies usernames mentioned in the given text and returns an array of verified users.
   *
   * @param {string} text - The text containing usernames to be verified.
   * @return {User[]} An array of verified users.
   */
  private verifyUsernames(text: string): User[] {
    const usernames = text.match(/@(\w+)\s/g)?.map((match) => match.trim().substring(1)) || [];
    const userNamesSet = new Set(this.displayMentionUsers().map((user) => user.name));
    const verifiedUsersMap = new Map<string, User>();

    for (const username of usernames) {
      if (userNamesSet.has(username) && !verifiedUsersMap.has(username)) {
        const user = this.displayMentionUsers().find((user) => user.name === username);
        if (user) {
          verifiedUsersMap.set(username, user);
        }
      }
    }

    return Array.from(verifiedUsersMap.values());
  }
}
