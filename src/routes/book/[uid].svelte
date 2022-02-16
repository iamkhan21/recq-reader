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
	import { verifyPermission } from '$lib/services/fileSystem';
	import { goto } from '$app/navigation';
	import type { Book, UID } from '$lib/models/Book';
	import { findBookToStorage } from '$lib/services/storage';
	import { showAlert } from '$lib/utils/alerts';
	import { onMount } from 'svelte';
	import { renderBook } from '$lib/services/book';

	export let uid: UID;
	let bookObj: Book;
	let destroyBook;

	async function checkFilePermission(book: Book) {
		try {
			await verifyPermission(book.file);
		} catch (e) {
			console.log(e);
			showAlert({
				title: 'Need permission',
				html: '<p>Due to browser security rules we need to request permission to access your file system,<br/> please click the button below to continue reading.</p>',
				confirmButtonText: 'Grant permission',
				confirmButtonColor: '#2f9e44',
				denyButtonText: 'To bookshelf',
				showDenyButton: true,
				allowOutsideClick: false
			}).then(({ isConfirmed }) => {
				if (isConfirmed) {
					checkAndRenderBook(book);
				} else {
					goto('/');
				}
			});
		}
	}

	function renderBookFile(book: Book) {
		bookObj = book;

		renderBook(book.file, 'area').then((data) => {
			console.log(2, data);
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
					title: 'Book not found',
					text: "Can't find this book in system.",
					confirmButtonColor: '#1c7ed6',
					confirmButtonText: 'Go to bookshelf'
				}).then(({ isConfirmed }) => {
					if (isConfirmed) {
						goto('/');
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
		{bookObj?.meta?.title || 'Loading book...'} | RecqReader
	</title>
</svelte:head>

<article id="area" />

<style global lang="postcss">
	.epub-container {
		margin-inline: auto;
	}
</style>
