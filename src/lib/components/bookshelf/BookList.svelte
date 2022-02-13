<script lang="ts">
	import BookCard from '$lib/components/bookshelf/BookCard.svelte';
	import { books } from '$lib/store/books.ts';
</script>

<section class="books_grid py-2">
	{#if $books}
		{#each $books as book}
			<BookCard {...book.meta} />
		{:else}
			<p>No books</p>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style lang="postcss">
	.books_grid {
		display: grid;
		gap: 20px 15px;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		max-height: 80vh;
		overflow-y: auto;
	}
</style>
