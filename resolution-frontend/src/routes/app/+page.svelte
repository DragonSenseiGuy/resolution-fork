<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/app/projects', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Dashboard - Resolution</title>
</svelte:head>

<div class="loading">
	<p>Loading...</p>
</div>

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		font-family: var(--font-primary);
		color: var(--color-white);
	}
</style>
