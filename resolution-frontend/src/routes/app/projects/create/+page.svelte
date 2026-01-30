<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { form }: { form: ActionData } = $props();

	let name = $state('');
	let description = $state('');
	let isSubmitting = $state(false);

	$effect(() => {
		if (form?.name) name = form.name;
		if (form?.description) description = form.description;
	});

	const nameMax = 30;
	const descriptionMax = 300;
</script>

<svelte:head>
	<title>Create Project - Resolution</title>
</svelte:head>

<div class="create-page">
	<a href="/app/projects" class="back-btn">
		<span class="back-arrow">←</span> Back
	</a>

	<div class="form-card">
		<h1 class="form-title">Create Your Project</h1>
		<p class="form-subtitle">Don't worry about the perfect name, you can change it later!</p>

		<form
			method="POST"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					isSubmitting = false;
					await update();
				};
			}}
		>
			<div class="form-group">
				<div class="input-wrapper">
					<input
						type="text"
						name="name"
						placeholder="Project Name *"
						bind:value={name}
						maxlength={nameMax}
						required
					/>
					<span class="char-count">{name.length}/{nameMax}</span>
				</div>
				{#if form?.errors?.name}
					<p class="error">{form.errors.name[0]}</p>
				{/if}
			</div>

			<div class="form-group">
				<div class="input-wrapper textarea-wrapper">
					<textarea
						name="description"
						placeholder="Project Description *"
						bind:value={description}
						maxlength={descriptionMax}
						rows="6"
						required
					></textarea>
					<span class="char-count">{description.length}/{descriptionMax}</span>
				</div>
				{#if form?.errors?.description}
					<p class="error">{form.errors.description[0]}</p>
				{/if}
			</div>

			<button type="submit" class="submit-btn" disabled={isSubmitting || !name || !description}>
				{isSubmitting ? 'Creating...' : 'Create Project'}
			</button>
		</form>
	</div>
</div>

<style>
	.create-page {
		max-width: 800px;
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

	.form-card {
		background: var(--color-white);
		border-radius: 16px;
		padding: 3rem;
		box-shadow: var(--shadow-card-lg);
	}

	.form-title {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		color: #1a1a2e;
		text-align: center;
		margin: 0 0 0.5rem;
	}

	.form-subtitle {
		font-family: var(--font-primary);
		font-size: 1rem;
		color: #666;
		text-align: center;
		margin: 0 0 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.input-wrapper {
		position: relative;
	}

	input,
	textarea {
		width: 100%;
		padding: 1rem;
		padding-right: 4rem;
		font-family: var(--font-primary);
		font-size: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		transition: border-color var(--transition-fast);
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-gold);
	}

	textarea {
		resize: vertical;
		min-height: 150px;
	}

	.textarea-wrapper .char-count {
		bottom: 1rem;
		top: auto;
	}

	.char-count {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-primary);
		font-size: 0.85rem;
		color: #999;
	}

	.textarea-wrapper .char-count {
		top: auto;
		bottom: 1rem;
		transform: none;
	}

	.error {
		color: var(--color-error);
		font-family: var(--font-primary);
		font-size: 0.875rem;
		margin: 0.5rem 0 0;
	}

	.submit-btn {
		width: 100%;
		padding: 1rem 2rem;
		background: var(--color-gold);
		color: #1a1a2e;
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 1.25rem;
		text-transform: uppercase;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all var(--transition-fast);
		margin-top: 1rem;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 228, 117, 0.4);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		.form-card {
			padding: 1.5rem;
		}
	}
</style>
