import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userService = inject(UserService);
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService
      .createComment({ text, userId: user._id })
      .subscribe((createdComment) => {
        [createdComment, ...this.comments()];
      });
  }

  commentTrackBy(_index:number, comment: Comment) {
    return comment._id
  }
}

