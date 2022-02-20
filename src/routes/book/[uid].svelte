<script context="module">
	export async function load({ params }) {
		return {
			status: 200,
			props: {
				uid: params.uid
			}
		};
	}
</script>

<script lang="ts">
	import { verifyPermission } from "$lib/services/fileSystem";
	import { goto } from "$app/navigation";
	import type { Book, BookControls, UID } from "$lib/models/Book";
	import { findBookToStorage } from "$lib/services/storage";
	import { showAlert } from "$lib/utils/alerts";
	import { onMount } from "svelte";
	import { renderBook } from "$lib/services/book";
	import Spinner from "$lib/components/shared/Spinner.svelte";

	export let uid: UID;

	let bookObj: Book;
	let destroyBook;
	let nextPage = () => {};
	let prevPage = () => {};

	async function checkFilePermission(book: Book) {
		try {
			await verifyPermission(book.file);
		} catch (e) {
			console.log(e);
			showAlert({
				title: "Need permission",
				html: "<p>Due to browser security rules we need to request permission to access your file system,<br/> please click the button below to continue reading.</p>",
				confirmButtonText: "Grant permission",
				confirmButtonColor: "#2f9e44",
				denyButtonText: "To bookshelf",
				showDenyButton: true,
				allowOutsideClick: false
			}).then(({ isConfirmed }) => {
				if (isConfirmed) {
					checkAndRenderBook(book);
				} else {
					goto("/");
				}
			});
		}
	}

	function renderBookFile(book: Book) {
		renderBook(book.file, "viewer").then((data: BookControls) => {
			bookObj = book;

			({ destroy: destroyBook, next: nextPage, prev: prevPage } = data);
		});
	}

	async function checkAndRenderBook(book: Book) {
		await checkFilePermission(book);
		renderBookFile(book);
	}

	onMount(() => {
		findBookToStorage(uid)
			.then(checkAndRenderBook)
			.catch(() => {
				showAlert({
					title: "Book not found",
					text: "Can't find this book in system.",
					confirmButtonColor: "#1c7ed6",
					confirmButtonText: "Go to bookshelf"
				}).then(({ isConfirmed }) => {
					if (isConfirmed) {
						goto("/");
					}
				});
			});

		return () => {
			destroyBook && destroyBook();
		};
	});
</script>

<svelte:head>
	<title>
		{bookObj?.meta?.title || "Loading book..."} | RecqReader
	</title>
</svelte:head>

<article>
	<button class="btn" on:click={prevPage}>prev</button>
	<section id="viewer" />
	<button class="btn" on:click={nextPage}>next</button>
	{#if !bookObj}
		<Spinner />
	{/if}
</article>

<style lang="postcss">
	article {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn {
		margin-inline: 20px;
	}

	#viewer {
		min-width: 700px;
	}
</style>
