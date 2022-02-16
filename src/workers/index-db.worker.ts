import { get, set } from 'idb-keyval';
import type { Book, UID } from '$lib/models/Book';
import { DBWorkTypes, Entities, WorkerResponse } from '$lib/models/constants';

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

function findBook(uid: UID) {
	get(Entities.DB_NAME).then((books: Book[] = []) => {
		const book = books.find((book) => book.uid === uid);
		self.postMessage(book);
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
		case DBWorkTypes.FIND_BOOK: {
			findBook(data as UID);
			break;
		}
	}
};
