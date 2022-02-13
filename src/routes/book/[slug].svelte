<script lang="ts">
	import { get } from 'idb-keyval';
	import { verifyPermission } from '$lib/services/fileSystem';
	import { afterNavigate } from '$app/navigation';
  import type { Book } from "$lib/domains/Book";

	let showNeedPermission = false;
	let img;

	afterNavigate(async ({ from }) => {
		if (!from) {
			showNeedPermission = true;
		} else {
			loadFile();
		}
	});

	async function loadFile() {
		showNeedPermission && (showNeedPermission = false);
		const [book]: Book[] = await get('books');

    console.log(book);
    if (!(await verifyPermission(book.file))) {
			console.error(`User did not grant permission to '${book.meta.title}'`);
			return;
		}
	}
</script>

{#if showNeedPermission}
	<article>
		<p>Click button below to continue reading</p>
		<button on:click={loadFile}>Continue</button>
	</article>
{:else}
	<img src={img} alt="" />
	<article id="area" />
{/if}
