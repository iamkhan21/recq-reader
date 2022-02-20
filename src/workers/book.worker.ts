import { get } from "idb-keyval";
import { BookWorkTypes, Entities, WorkerResponse } from "$lib/models/constants";
import type { Book } from "$lib/models/Book";

function checkDuplication(fileHandle: FileSystemFileHandle) {
	return new Promise((resolve, reject) => {
		get(Entities.DB_NAME).then(async (books: Book[] = []) => {
			for (const book of books) {
				if (await fileHandle.isSameEntry(book.file)) {
					return reject("Duplication");
				}
			}

			resolve(fileHandle);
		});
	});
}

function convertFileToArray(fileHandle: FileSystemFileHandle) {
	return new Promise(async (resolve, reject) => {
		try {
			const file: File = await fileHandle.getFile();
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = (e) => {
				resolve(e.target.result);
			};
			reader.onerror = () => {
				reject("Error on file read");
			};
		} catch (e) {
			reject(e);
		}
	});
}

self.onmessage = async function (e) {
	const [type, file] = e.data;

	try {
		switch (type as BookWorkTypes) {
			case BookWorkTypes.CREATE_BOOK:
				await checkDuplication(file);
			case BookWorkTypes.CONVERT_FILE:
				{
					const bookArray = await convertFileToArray(file);
					self.postMessage([WorkerResponse.SUCCESS, bookArray]);
				}
				break;
		}
	} catch (e) {
		self.postMessage([WorkerResponse.ERROR, e]);
	}
};
