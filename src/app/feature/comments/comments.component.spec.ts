import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow to mention same user more than once', undefined);

  it('should close menu if ESC key pressed', undefined);

  it('should notify valid users mentioned after @ character', undefined);

  it('should bold valid users mentioned after @ character', undefined);

  it('should allow keyboard up arrow to navigate in menu list', undefined);

  it('should allow keyboard down arrow to navigate in menu list', undefined);

  it('should allow keyboard enter key to make a selection in menu list', undefined);
});
