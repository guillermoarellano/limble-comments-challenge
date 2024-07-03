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
});
