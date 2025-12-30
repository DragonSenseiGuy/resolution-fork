<script>
	let { visible = false, text = "Your resolution here" } = $props();
</script>

<div class="resolution-paper" class:visible>
	<p class="resolution-text">{text}</p>
</div>

<style>
	.resolution-paper {
		position: absolute;
		inset: 0;
		background-image: url('$lib/assets/resolution_paper.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translateY(100%);
		transition: transform 0.8s ease-out;
	}

	.resolution-paper.visible {
		transform: translateY(0);
	}

	.resolution-text {
		font-family: "Patrick Hand", cursive;
		font-weight: 400;
		font-style: normal;
		font-size: 2rem;
		color: #B5AB9A;
	}
</style>
