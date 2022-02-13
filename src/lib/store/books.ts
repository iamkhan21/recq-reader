import { writable } from 'svelte/store';
import { get, set } from 'idb-keyval';
import type { Book } from '$lib/domains/models/Book';

export const books = writable<Book[] | null>(null);

const setBooks = (bookList) => books.set(bookList);

export const loadBooksFromStorage = () => {
	get('books').then((books: Book[] = []) => setBooks(books));
};

export const addBook = (file: Book) => {
	books.update((files) => {
		const books = [...files, file];
		set('books', books);
		return books;
	});
};
