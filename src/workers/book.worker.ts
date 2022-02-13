import { nanoid } from 'nanoid';
import { get } from 'idb-keyval';
import { Entities, WorkerResponse } from '$lib/domains/constants';
import type { Book } from '$lib/domains/Book';

function checkDuplication(fileHandle: FileSystemHandle) {
	return new Promise((resolve, reject) => {
		get(Entities.DB_NAME).then(async (books: Book[] = []) => {
			for (const book of books) {
				if (await fileHandle.isSameEntry(book.file)) {
					return reject('Duplication');
				}
			}

			resolve(fileHandle);
		});
	});
}

async function createBook(fileHandle: FileSystemHandle) {
	const file: File = await fileHandle.getFile();

	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = (e) => {
			resolve({
				uid: nanoid(15),
				meta: e.target.result,
				file: fileHandle,
				updated: Date.now(),
				created: Date.now()
			});
		};
	});
}

self.onmessage = async function (e) {
	try {
		const file = await checkDuplication(e.data);
		const book = await createBook(file);
		self.postMessage([WorkerResponse.SUCCESS, book]);
	} catch (e) {
		self.postMessage([WorkerResponse.ERROR, e]);
	}
};
