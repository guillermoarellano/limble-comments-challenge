import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lmbl-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {}
