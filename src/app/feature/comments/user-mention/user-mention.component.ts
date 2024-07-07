import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, input } from '@angular/core';
import { User } from '../comments';

@Component({
  selector: 'lmbl-user-mention',
  standalone: true,
  imports: [CommonModule], // TODO: get rid of common module, new v18 control flow
  templateUrl: './user-mention.component.html',
  styleUrl: './user-mention.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMentionComponent {
  @ViewChild('commentInput') commentInput!: ElementRef<HTMLTextAreaElement>;

  users = input.required<User[]>();

  filteredUsers: { userID: number; name: string }[] = [];
  showMenu = false;
  selectedIndex = -1;
  menuPosition = { x: 0, y: 0 };

  onKeyUp(keyupEvent: KeyboardEvent): void {
    const textarea = this.commentInput.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if ((this.showMenu && keyupEvent.key === 'ArrowDown') || keyupEvent.key === 'ArrowUp') {
      return; // already handled by keydown arrow events
    }

    if (
      this.showMenu &&
      (keyupEvent.key === 'Escape' ||
        keyupEvent.key === ' ' ||
        keyupEvent.key === 'ArrowLeft' ||
        keyupEvent.key === 'ArrowRight')
    ) {
      this.closeMenu();
      return;
    }

    if (this.showMenu && (keyupEvent.key === 'Enter' || keyupEvent.key === 'Tab')) {
      this.selectUser(this.filteredUsers[this.selectedIndex]);
      this.closeMenu();
      return;
    }

    if (lastAtIndex !== -1) {
      const mentionQuery = textBeforeCursor.substring(lastAtIndex + 1);
      this.filteredUsers = this.users().filter((user) => user.name.toLowerCase().includes(mentionQuery.toLowerCase()));

      if (this.filteredUsers.length > 0) {
        this.showMenu = true;
        this.selectedIndex = 0;
        const { top, left } = textarea.getBoundingClientRect();
        this.menuPosition = {
          x: left,
          y: top + cursorPosition * 1.2
        };
      } else {
        this.closeMenu();
      }
    } else {
      this.closeMenu();
    }
  }

  arrowUpDown(keyupEvent: Event): void {
    if (this.showMenu) {
      keyupEvent.preventDefault();
      this.selectedIndex =
        (this.selectedIndex + ((keyupEvent as KeyboardEvent).key === 'ArrowUp' ? -1 : 1) + this.filteredUsers.length) %
        this.filteredUsers.length;
    }
  }

  onTabDown(): void {
    if (this.showMenu) {
      this.selectUser(this.filteredUsers[this.selectedIndex]);
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.showMenu = false;
    this.selectedIndex = -1;
  }

  selectUser(user: { userID: number; name: string }): void {
    const textarea = this.commentInput.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    textarea.value =
      textBeforeCursor.substring(0, lastAtIndex + 1) + user.name + textarea.value.substring(cursorPosition);

    this.closeMenu();
  }
}
