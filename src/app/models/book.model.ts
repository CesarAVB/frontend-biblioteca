export interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  publicadoEm: string; // LocalDate vem como string ISO do backend
}
