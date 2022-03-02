<script lang="ts">
	export let title: string;
	export let cover: string;
</script>

<section>
	<figure>
		<img alt="" class="max-h-20rem" height="50" src={cover} />
		<figcaption>{title}</figcaption>
	</figure>
</section>

<style lang="postcss">
	section {
		&:hover {
			box-shadow: var(--shadow-4);
		}
	}
</style>
