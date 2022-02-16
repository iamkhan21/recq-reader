import type { Book, UID } from '$lib/models/Book';
import DBWorker from '../../workers/index-db.worker.ts?worker';
import { DBWorkTypes } from '$lib/models/constants';

export const writeBooksToStorage = (books: Book[]) => {
	const dbWorker = new DBWorker();

	dbWorker.postMessage([DBWorkTypes.SET_BOOKS, books]);
	dbWorker.onmessage = function () {
		dbWorker.terminate();
	};
};

export const loadBooksFromStorage = (): Promise<Book[]> => {
	return new Promise((resolve) => {
		const dbWorker = new DBWorker();

		dbWorker.postMessage([DBWorkTypes.GET_BOOKS]);
		dbWorker.onmessage = function (e) {
			resolve((e.data as Book[]) || []);
			dbWorker.terminate();
		};
	});
};

export const addBookToStorage = (file: Book): Promise<Book> => {
	return new Promise((resolve) => {
		const dbWorker = new DBWorker();

		dbWorker.postMessage([DBWorkTypes.ADD_BOOK, file]);
		dbWorker.onmessage = function (e) {
			resolve(e.data as Book);
			dbWorker.terminate();
		};
	});
};

export const findBookToStorage = (uid: UID): Promise<Book> => {
	return new Promise((resolve, reject) => {
		const dbWorker = new DBWorker();

		dbWorker.postMessage([DBWorkTypes.FIND_BOOK, uid]);
		dbWorker.onmessage = function (e) {
			e.data ? resolve(e.data as Book) : reject('Book not found');
			dbWorker.terminate();
		};
	});
};
