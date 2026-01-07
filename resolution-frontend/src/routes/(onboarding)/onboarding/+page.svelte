<script lang="ts">
	import { onMount } from 'svelte';
	import ResolutionPaper from '$lib/components/ResolutionPaper.svelte';

	let showPaper = $state(false);

	onMount(() => {
		const timer = setTimeout(() => {
			showPaper = true;
		}, 500);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>Join Resolution - Stake Your Claim</title>
	<meta name="description" content="Sign up for Resolution - an 8-week personal goal-setting challenge. Ship every week, earn prizes, and be part of the few who follow through." />
</svelte:head>

<div class="onboarding">
	<div class="bg-first"></div>
	<ResolutionPaper visible={showPaper} />
</div>

<style>
	.onboarding {
		position: relative;
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	.bg-first {
		position: absolute;
		inset: 0;
		background-image: url('$lib/assets/onboarding_bg.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
