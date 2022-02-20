<article class="spinner-holder">
	<section class="spinner">
		<div class="rect1" />
		<div class="rect2" />
		<div class="rect3" />
		<div class="rect4" />
		<div class="rect5" />
	</section>
</article>

<style lang="postcss">
	.spinner-holder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 100;
	}

	.spinner {
		height: 60px;
		font-size: 15px;

		& > div {
			height: 100%;
			width: 10px;
			display: inline-block;
			background-color: #fff;
			animation: sk-stretchdelay 1.2s infinite ease-in-out;
		}

		.rect2 {
			animation-delay: -1.1s;
		}

		.rect3 {
			animation-delay: -1s;
		}

		.rect4 {
			animation-delay: -0.9s;
		}

		.rect5 {
			animation-delay: -0.8s;
		}
	}

	@keyframes sk-stretchdelay {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1);
		}
	}
</style>
