<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { setBooks } from '$lib/store/books';
	import { loadBooksFromStorage } from '$lib/services/storage';

	export async function load() {
		if (browser) {
			loadBooksFromStorage().then((books) => setBooks(books));
		}

		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	import '../assets/styles/main.pcss';
	import 'uno.css';
</script>

<header class="flex gap-x-10 items-center justify-between">
	<h4>RecqReader</h4>
	<nav class="flex gap-x-5">
		<a class="p-0" href="/">Bookshelf</a>
		<a class="p-0" href="/about">About</a>
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	<small
		>Created by
		<a href="https://www.8byte.agency" rel="noopener noreferrer" target="_blank">8byte Agency</a
		></small
	>
</footer>
