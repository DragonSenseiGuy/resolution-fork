<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Settings - Resolution</title>
</svelte:head>

<div class="settings-page">
	<h1 class="page-title">Settings</h1>

	<div class="settings-card">
		<form method="POST" action="/api/auth/logout" class="logout-section">
			<button type="submit" class="logout-btn">Sign Out</button>
		</form>
	</div>
</div>

<style>
	.settings-page {
		max-width: 600px;
		margin: 0 auto;
	}

	.page-title {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--color-white);
		margin: 0 0 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.settings-card {
		background: rgba(5, 4, 23, 0.85);
		border-radius: 16px;
		padding: 2rem;
		border: 2px solid rgba(255, 255, 255, 0.1);
	}

	.logout-section {
		display: flex;
		justify-content: center;
	}

	.logout-btn {
		background: var(--color-white);
		border: 2px solid var(--color-white);
		color: #1a1a2e;
		padding: 0.75rem 2rem;
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: transform var(--transition-fast);
	}

	.logout-btn:hover {
		transform: scale(1.05);
	}
</style>
