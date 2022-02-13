<script lang="ts">
	import { addBook } from '$lib/store/books';
	import { createBook } from '$lib/services/book';

	async function openFileInput() {
		const [fileHandle] = await window.showOpenFilePicker({
			multiple: false,
			excludeAcceptAllOption: true,
			types: [{ description: 'Books', accept: { 'application/epub+zip': ['.epub'] } }]
		});

		fileHandle &&
			createBook(fileHandle)
				.then((book) => addBook(book))
				.catch((e) => {
					console.log(e);
				});
	}
</script>

<button on:click={openFileInput} type="button"> Add book</button>

<style lang="postcss">
</style>
