import { CommentsComponent } from './comments.component';
import { provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { render, screen, configure } from '@testing-library/angular';
import { CommentsService } from './services/comments.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentComponent } from './comment/comment.component';

configure({ dom: { testIdAttribute: 'data-test-id' } });

describe('CommentsComponent', () => {
  const renderSetup = {
    imports: [MatButtonModule, CommentInputComponent, CommonModule, CommentComponent],
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withInterceptorsFromDi()),
      CommentsService
    ]
  };

  it('should render the component', async () => {
    await render(CommentsComponent, {
      ...renderSetup
    });
    const result = screen.getByTestId('add-comment-button');

    expect(result).toBeTruthy();
  });

  it('should render no comments when comments data is empty', async () => {
    await render(CommentsComponent, {
      ...renderSetup,
      componentProperties: { comments: signal([]) }
    });

    const result = screen.getByTestId('no-comments');

    expect(result).toBeTruthy();
  });

  it('should close menu if ESC key pressed', undefined);

  it('should bold valid users mentioned after @ character', undefined);

  it('should allow keyboard up arrow to navigate in menu list', undefined);

  it('should allow keyboard down arrow to navigate in menu list', undefined);

  it('should allow keyboard enter key to make a selection in menu list', undefined);
});
