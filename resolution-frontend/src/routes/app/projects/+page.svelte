<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getTimeLeft() {
		if (!data.season) return { days: 0, hours: 0, mins: 0 };
		
		const now = new Date();
		const end = new Date(data.season.endsAt);
		const diff = end.getTime() - now.getTime();
		
		if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
		
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		
		return { days, hours, mins };
	}

	let timeLeft = $state(getTimeLeft());

	$effect(() => {
		const interval = setInterval(() => {
			timeLeft = getTimeLeft();
		}, 60000);
		
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Your Projects - Resolution</title>
</svelte:head>

<div class="projects-page">
	<header class="page-header">
		<h1 class="page-title">Your Projects</h1>
		<div class="time-badge">
			<span class="time-label">Time Left</span>
			<span class="time-value">{timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.mins} mins</span>
		</div>
		<form method="POST" action="/api/auth/logout" class="logout-form">
			<button type="submit" class="logout-btn">Logout</button>
		</form>
	</header>

	{#if data.projects.length === 0}
		<div class="empty-state">
			<p>You haven't created any projects yet.</p>
			<a href="/app/projects/create" class="create-btn">Create Your First Project</a>
		</div>
	{:else}
		<div class="projects-grid">
			{#each data.projects as project}
				<a href="/app/projects/{project.id}" class="project-card">
					<span class="project-name">{project.name}</span>
				</a>
			{/each}
			<a href="/app/projects/create" class="project-card add-card">
				<span class="add-icon">+</span>
			</a>
		</div>
	{/if}
</div>

<style>
	.projects-page {
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.page-title {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.5rem);
		color: var(--color-white);
		margin: 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.time-badge {
		background: var(--color-gold);
		color: #1a1a2e;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: var(--shadow-card);
	}

	.time-label {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.time-value {
		font-family: var(--font-primary);
		font-weight: 600;
		font-size: 0.9rem;
	}

	.logout-form {
		margin-left: auto;
	}

	.logout-btn {
		background: var(--color-white);
		border: 2px solid var(--color-white);
		color: #1a1a2e;
		padding: 0.75rem 1.5rem;
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

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: rgba(5, 4, 23, 0.8);
		border-radius: 16px;
		border: 2px solid var(--color-gold);
	}

	.empty-state p {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		color: var(--color-white);
		margin-bottom: 1.5rem;
	}

	.create-btn {
		display: inline-block;
		background: var(--color-gold);
		color: #1a1a2e;
		padding: 1rem 2rem;
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 1.1rem;
		text-decoration: none;
		border-radius: 8px;
		transition: all var(--transition-fast);
	}

	.create-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 228, 117, 0.4);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1.5rem;
	}

	.project-card {
		aspect-ratio: 3 / 4;
		background: linear-gradient(135deg, var(--color-gold) 0%, #f5c842 100%);
		border: 4px solid var(--color-white);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-card);
		padding: 1rem;
	}

	.project-card:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 8px 24px rgba(255, 228, 117, 0.3);
	}

	.project-name {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 1.5rem);
		color: #1a1a2e;
		text-align: center;
		word-break: break-word;
		text-transform: uppercase;
	}

	.add-card {
		background: transparent;
		border: 4px dashed var(--color-gold);
	}

	.add-card:hover {
		background: rgba(255, 228, 117, 0.1);
	}

	.add-icon {
		font-size: 4rem;
		color: var(--color-gold);
		font-weight: 300;
	}

	@media (max-width: 640px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.logout-btn {
			margin-left: 0;
		}

		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}
</style>
