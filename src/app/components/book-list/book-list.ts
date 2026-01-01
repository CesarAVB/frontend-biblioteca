import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookList {
  private bookService = inject(BookService);

  books = signal<Book[]>([]);
  searchTerm = signal('');
  isLoading = signal(false);
  showForm = signal(false);

  filteredBooks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.books();

    return this.books().filter(book =>
      book.titulo.toLowerCase().includes(term) ||
      book.autor.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term)
    );
  });

  totalBooks = computed(() => this.books().length);

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading.set(true);
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.isLoading.set(false);
      }
    });
  }

  getInitial(titulo: string): string {
    return titulo.charAt(0).toUpperCase();
  }

  getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openAddForm() {
    this.showForm.set(true);
  }

  editBook(book: Book) {
    // Implementar lógica de edição
    console.log('Editar livro:', book);
  }

  deleteBook(id: number) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }
}
