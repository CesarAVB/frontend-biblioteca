import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  book = input.required<Book>();

  editBook = output<Book>();
  deleteBook = output<number>();

  getInitial(): string {
    return this.book().titulo.charAt(0).toUpperCase();
  }

  getYear(): string {
    if (!this.book().publicadoEm) return '';
    return new Date(this.book().publicadoEm).getFullYear().toString();
  }

  onEdit(): void {
    this.editBook.emit(this.book());
  }

  onDelete(): void {
    if (this.book().id) {
      this.deleteBook.emit(this.book().id);
    }
  }
}
