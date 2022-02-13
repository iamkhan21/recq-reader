export async function verifyPermission(fileHandle: FileSystemHandle) {
	const opts = {};

	// Check if we already have permission, if so, return true.
	if ((await fileHandle.queryPermission(opts)) === 'granted') {
		return true;
	}
	// Request permission to the file, if the user grants permission, return true.
	if ((await fileHandle.requestPermission(opts)) === 'granted') {
		return true;
	}
	// The user did nt grant permission, return false.
	return false;
}

export const blobToBase64 = (url): Promise<string> => {
	return new Promise(async (resolve, _) => {
		// do a request to the blob uri
		const response = await fetch(url);

		// response has a method called .blob() to get the blob file
		const blob = await response.blob();

		// instantiate a file reader
		const fileReader = new FileReader();

		// read the file
		fileReader.readAsDataURL(blob);

		fileReader.onloadend = function () {
			resolve(fileReader.result); // Here is the base64 string
		};
	});
};
