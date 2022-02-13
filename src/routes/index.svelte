<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { loadBooksFromStorage } from '$lib/store/books';

	export async function load() {
		if (browser) {
			loadBooksFromStorage();
		}

		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	import BookList from '$lib/components/bookshelf/BookList.svelte';
	import ControlPanel from '$lib/components/bookshelf/ControlPanel.svelte';
	import { onMount } from 'svelte';
	import MyWorker from '../workers/search.ts?worker';

	onMount(() => {
		const myWorker = new MyWorker();

		myWorker.postMessage('sfdgsdfgsdfg');
		myWorker.onmessage = function (e) {
			console.log(e.data);
			console.log('Message received from worker');
		};
	});
</script>

<article>
	<ControlPanel />
	<BookList />
</article>
