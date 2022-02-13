import type { Book, BookMeta } from '$lib/domains/Book';
import BookWorker from '../../workers/book.worker.ts?worker';
import ePub from 'epubjs';
import { blobToBase64 } from '$lib/services/fileSystem';
import { WorkerResponse } from '$lib/domains/constants';

export const createBook = (file: FileSystemHandle): Promise<Book> => {
	return new Promise((resolve, reject) => {
		const dbWorker = new BookWorker();

		dbWorker.postMessage(file);
		dbWorker.onmessage = async function (e) {
			const [resp, data] = e.data;

			if (resp === WorkerResponse.SUCCESS) {
				data.meta = await getBookMetadata(data.meta);
				resolve(data as Book);
			} else {
				reject(data);
			}
			dbWorker.terminate();
		};
	});
};

function getBookMetadata(file: ArrayBuffer): Promise<BookMeta> {
	return new Promise((resolve, reject) => {
		const book = ePub();
		book.open(file, 'binary');

		book.loaded.metadata.then(async ({ title }) => {
			const cover = await blobToBase64(await book.coverUrl());
			resolve({ cover, title });
			book.destroy();
		});
	});
}
