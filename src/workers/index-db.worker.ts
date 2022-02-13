import { get, set } from 'idb-keyval';
import type { Book } from '$lib/domains/Book';
import { DBWorkTypes, Entities, WorkerResponse } from '$lib/domains/constants';

function getBooks() {
	get(Entities.DB_NAME).then((books: Book[] = []) => {
		self.postMessage(books);
	});
}

function setBooks(books: Book[]) {
	set(Entities.DB_NAME, books).then(() => {
		self.postMessage(WorkerResponse.SUCCESS);
	});
}

function addBook(book: Book) {
	get(Entities.DB_NAME).then((books: Book[] = []) => {
		setBooks([book, ...books]);
	});
}

self.onmessage = function (e) {
	const [action, data] = e.data;
	switch (action as DBWorkTypes) {
		case DBWorkTypes.GET_BOOKS: {
			getBooks();
			break;
		}
		case DBWorkTypes.SET_BOOKS: {
			setBooks(data as Book[]);
			break;
		}
		case DBWorkTypes.ADD_BOOK: {
			addBook(data as Book);
			break;
		}
	}
};
