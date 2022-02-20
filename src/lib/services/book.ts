import type { Book, BookControls, BookMeta } from "$lib/models/Book";
import BookWorker from "../../workers/book.worker.ts?worker";
import ePub from "epubjs";
import { blobToBase64 } from "$lib/services/fileSystem";
import { BookWorkTypes, WorkerResponse } from "$lib/models/constants";
import { nanoid } from "nanoid";

export const createBook = (file: FileSystemFileHandle): Promise<Book> => {
	return new Promise((resolve, reject) => {
		const worker = new BookWorker();

		worker.postMessage([BookWorkTypes.CREATE_BOOK, file]);
		worker.onmessage = async function (e) {
			const [resp, data] = e.data;

			if (resp === WorkerResponse.SUCCESS) {
				const meta = await getBookMetadata(data as ArrayBuffer);
				resolve({
					uid: nanoid(15),
					meta,
					file,
					updated: Date.now(),
					created: Date.now()
				});
			} else {
				reject(data);
			}
			worker.terminate();
		};
	});
};

function getBookMetadata(file: ArrayBuffer): Promise<BookMeta> {
	return new Promise((resolve, reject) => {
		const book = ePub();
		book.open(file, "binary");

		book.loaded.metadata.then(async ({ title }) => {
			const cover = await blobToBase64(await book.coverUrl());
			resolve({ cover, title });
			book.destroy();
		});
	});
}

export function renderBook(file: FileSystemFileHandle, selector): Promise<BookControls> {
	return new Promise((resolve, reject) => {
		const worker = new BookWorker();

		worker.postMessage([BookWorkTypes.CONVERT_FILE, file]);
		worker.onmessage = async function (e) {
			const [resp, data] = e.data;

			if (resp === WorkerResponse.SUCCESS) {
				const book = ePub();
				book.open(data, "binary");

				const rendition = await book.renderTo(selector, {
					width: 700,
					height: "90vh"
				});

				rendition.display();

				book.ready.then(() => {
					resolve({
						prev: () => rendition.prev(),
						next: () => rendition.next(),
						destroy: () => book.destroy()
					});
				});
			} else {
				reject(data);
			}
			worker.terminate();
		};
	});
}
