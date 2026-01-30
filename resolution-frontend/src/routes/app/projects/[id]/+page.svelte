<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.project.name} - Resolution</title>
</svelte:head>

<div class="project-page">
	<a href="/app/projects" class="back-btn">
		<span class="back-arrow">←</span> Back to Projects
	</a>

	<div class="project-content">
		<div class="project-card-preview">
			<span class="project-name">{data.project.name}</span>
		</div>

		<div class="project-details">
			<h1 class="project-title">{data.project.name}</h1>
			
			<p class="project-description">{data.project.description}</p>

			<div class="project-meta">
				<span class="meta-label">Created:</span>
				<span class="meta-value">{formatDate(data.project.createdAt)}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.project-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(5, 4, 23, 0.9);
		border: 2px solid var(--color-white);
		color: var(--color-white);
		padding: 0.75rem 1.5rem;
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		border-radius: 8px;
		margin-bottom: 2rem;
		transition: all var(--transition-fast);
	}

	.back-btn:hover {
		background: rgba(5, 4, 23, 1);
		border-color: var(--color-gold);
		color: var(--color-gold);
	}

	.back-arrow {
		font-size: 1.2rem;
	}

	.project-content {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		align-items: start;
	}

	.project-card-preview {
		aspect-ratio: 3 / 4;
		background: linear-gradient(135deg, var(--color-gold) 0%, #f5c842 100%);
		border: 6px solid var(--color-white);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-card-lg);
		padding: 1.5rem;
	}

	.project-card-preview .project-name {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 2rem;
		color: #1a1a2e;
		text-align: center;
		word-break: break-word;
		text-transform: uppercase;
	}

	.project-details {
		background: rgba(5, 4, 23, 0.85);
		border-radius: 16px;
		padding: 2rem;
		border: 2px solid rgba(255, 255, 255, 0.1);
	}

	.project-title {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3rem);
		color: var(--color-white);
		margin: 0 0 1.5rem;
		text-transform: uppercase;
	}

	.project-description {
		font-family: var(--font-primary);
		font-size: 1.1rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 2rem;
	}

	.project-meta {
		display: flex;
		gap: 0.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.meta-label {
		font-family: var(--font-primary);
		font-weight: 600;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.meta-value {
		font-family: var(--font-primary);
		font-size: 0.9rem;
		color: var(--color-white);
	}

	@media (max-width: 768px) {
		.project-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.project-card-preview {
			max-width: 250px;
			margin: 0 auto;
		}
	}
</style>
