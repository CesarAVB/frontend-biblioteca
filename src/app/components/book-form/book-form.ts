import { Component, ChangeDetectionStrategy, signal, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent {
  bookForm: FormGroup;

  // Inputs e Outputs usando Signals
  bookToEdit = input<Book | null>(null);
  formSubmit = output<Book>();
  formCancel = output<void>();

  isEditMode = signal(false);

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      autor: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.maxLength(20)]],
      publicadoEm: ['']
    });

    // Effect para preencher o form quando receber um livro para editar
    effect(() => {
      const book = this.bookToEdit();
      if (book) {
        this.isEditMode.set(true);
        this.bookForm.patchValue(book);
      } else {
        this.isEditMode.set(false);
        this.bookForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = {
        ...this.bookToEdit(),
        ...this.bookForm.value
      };
      this.formSubmit.emit(bookData);
      this.bookForm.reset();
    }
  }

  onCancel(): void {
    this.bookForm.reset();
    this.formCancel.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.bookForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('maxlength')) {
      return `Máximo de ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
