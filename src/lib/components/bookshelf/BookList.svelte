<script lang="ts">
	import BookCard from "$lib/components/bookshelf/BookCard.svelte";
	import { books } from "$lib/store/books.ts";
</script>

<section class="book__grid my-4">
	{#if $books}
		{#each $books as book}
			<a class="book__link" href="/book/{book.uid}">
				<BookCard {...book.meta} />
			</a>
		{:else}
			<p>No books</p>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style lang="postcss">
	.book {
		&__grid {
			display: grid;
			gap: 20px 15px;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			max-height: 85vh;
			overflow-y: auto;
		}

		&__link {
			color: var(--text1);
			padding: 0;
			margin: 0;
		}
	}
</style>
