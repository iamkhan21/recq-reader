import { nanoid } from 'nanoid';
import ePub from 'epubjs';
import type { Book, BookMeta } from '$lib/domains/models/Book';
import { blobToBase64 } from '$lib/domains/services/fileSystem';

export async function createBook(file: FileSystemHandle): Promise<Book> {
	const meta = await getBookMetadata(file);

	return {
		uid: nanoid(15),
		file,
		meta,
		updated: Date.now(),
		created: Date.now()
	};
}

export async function getBookMetadata(fileHandle: FileSystemHandle): Promise<BookMeta> {
	const file: File = await fileHandle.getFile();
	const book = ePub();

	return new Promise<any>((resolve, reject) => {
		if (window.FileReader) {
			const reader = new FileReader();
			reader.onload = openBook;
			reader.readAsArrayBuffer(file);
		}

		async function openBook(e) {
			const bookData = e.target.result;
			book.open(bookData, 'binary');
			const cover = await blobToBase64(await book.coverUrl());
			book.loaded.metadata.then(async ({ title }) => {
				resolve({ cover, title });
				book.destroy();
			});
		}
	});
}
