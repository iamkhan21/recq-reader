<script lang="ts">
	export let title: string;
	export let cover: string;
</script>

<section class="p-1">
	<figure>
		<img class="max-h-20rem" height="50" src={cover} alt="" />
		<figcaption>{title}</figcaption>
	</figure>
</section>
