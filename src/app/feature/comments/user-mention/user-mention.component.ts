import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'lmbl-user-mention',
  standalone: true,
  imports: [CommonModule, CdkMenuModule], // TODO: get rid of common module, new v18 control flow
  templateUrl: './user-mention.component.html',
  styleUrl: './user-mention.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMentionComponent {
  @ViewChild('commentInput') commentInput!: ElementRef<HTMLTextAreaElement>;

  users: { userID: number; name: string }[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' }
  ];

  filteredUsers: { userID: number; name: string }[] = [];
  showMenu = false;
  menuPosition = { x: 0, y: 0 };

  onKeyUp(): void {
    const textarea = this.commentInput.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const mentionQuery = textBeforeCursor.substring(lastAtIndex + 1);
      this.filteredUsers = this.users.filter((user) => user.name.toLowerCase().includes(mentionQuery.toLowerCase()));

      if (this.filteredUsers.length > 0) {
        this.showMenu = true;
        const { top, left } = textarea.getBoundingClientRect();
        this.menuPosition = {
          x: left,
          y: top + cursorPosition * 1.2
        };
      } else {
        this.showMenu = false;
      }
    } else {
      this.showMenu = false;
    }
  }

  selectUser(user: { userID: number; name: string }): void {
    const textarea = this.commentInput.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    textarea.value =
      textBeforeCursor.substring(0, lastAtIndex + 1) + user.name + textarea.value.substring(cursorPosition);

    this.showMenu = false;
    textarea.focus();
  }
}
