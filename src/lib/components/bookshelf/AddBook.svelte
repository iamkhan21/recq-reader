<script lang="ts">
	import { addBook } from '$lib/store/books';
	import { createBook } from '$lib/domains/services/book';

	async function openFileInput() {
		let fileHandles = await window.showOpenFilePicker({
			multiple: true,
			excludeAcceptAllOption: true,
			types: [{ description: 'Books', accept: { 'application/epub+zip': ['.epub'] } }]
		});

		// get('books').then(async (files) => {
		//   for (const file of files[0]) {
		//     console.log(await file.isSameEntry(fileHandle[0]));
		//   }
		// });

		const book = await createBook(fileHandles[0]);
		addBook(book);
	}
</script>

<button on:click={openFileInput} type="button"> Add book</button>

<style lang="postcss">
</style>
