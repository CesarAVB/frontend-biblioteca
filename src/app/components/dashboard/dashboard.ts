import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../book-card/book-card';
import { BookFormComponent } from '../book-form/book-form';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent, BookFormComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  // ✅ USE inject() ao invés de construtor
  private readonly bookService = inject(BookService);

  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);
  searchQuery = signal('');
  showForm = signal(false);
  bookToEdit = signal<Book | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading.set(true);
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);
        this.filteredBooks.set(books);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
        this.isLoading.set(false);
      }
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery.set(query);

    if (!query) {
      this.filteredBooks.set(this.books());
      return;
    }

    const filtered = this.books().filter(book =>
      book.titulo.toLowerCase().includes(query) ||
      book.autor.toLowerCase().includes(query) ||
      book.isbn?.toLowerCase().includes(query)
    );
    this.filteredBooks.set(filtered);
  }

  openAddForm(): void {
    this.bookToEdit.set(null);
    this.showForm.set(true);
  }

  onEditBook(book: Book): void {
    this.bookToEdit.set(book);
    this.showForm.set(true);
  }

  onDeleteBook(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (error) => {
          console.error('Erro ao excluir livro:', error);
        }
      });
    }
  }

  onFormSubmit(book: Book): void {
    if (book.id) {
      this.bookService.updateBook(book.id, book).subscribe({
        next: () => {
          this.loadBooks();
          this.showForm.set(false);
        },
        error: (error) => {
          console.error('Erro ao atualizar livro:', error);
        }
      });
    } else {
      this.bookService.createBook(book).subscribe({
        next: () => {
          this.loadBooks();
          this.showForm.set(false);
        },
        error: (error) => {
          console.error('Erro ao criar livro:', error);
        }
      });
    }
  }

  onFormCancel(): void {
    this.showForm.set(false);
    this.bookToEdit.set(null);
  }
}