import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  @Input() placeholder = ' write something';
  @Input() buttonText = 'create';
  @Output() formSubmitted = new EventEmitter<{
    text: string
  }>()

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem('commentText') as HTMLTextAreaElement;
    const commentText = textAreaElement.value;
    form.reset();
    console.log(commentText);
    this.formSubmitted.emit({
      text:commentText
    })
  }
}
