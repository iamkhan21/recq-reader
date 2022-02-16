import { writable } from 'svelte/store';
import type { Book } from '$lib/models/Book';
import { addBookToStorage } from '$lib/services/storage';

export const books = writable<Book[] | null>(null);

export const setBooks = (bookList) => {
	books.set(bookList);
};

export const addBook = (file: Book) => {
	books.update((files) => [file, ...files]);
	addBookToStorage(file);
};
