<script lang="ts">
	import type { PageData } from './$types';
	import vectorLine from '$lib/assets/vector_divider.svg';

	let { data }: { data: PageData } = $props();

	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		if (openFaqIndex === index) {
			openFaqIndex = null;
		} else {
			openFaqIndex = index;
		}
	}
</script>

<svelte:head>
	<title>FAQ - Resolution</title>
</svelte:head>

<div class="faq-page">
	<h1 class="page-title">FAQ</h1>

	<div class="faq-card">
		{#each data.faqs as faq, i}
			<button 
				class="faq-item" 
				class:is-open={openFaqIndex === i}
				onclick={() => toggleFaq(i)}
			>
				<div class="faq-header">
					<span class="faq-question">{faq.question}</span>
					<span class="faq-chevron">{openFaqIndex === i ? '▲' : '▼'}</span>
				</div>
				{#if openFaqIndex === i && faq.answer}
					<div class="faq-answer">
						<p>{faq.answer}</p>
					</div>
				{/if}
			</button>
			{#if i < data.faqs.length - 1}
				<img src={vectorLine} alt="" class="faq-divider" />
			{/if}
		{/each}
	</div>
</div>

<style>
	.faq-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.page-title {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: clamp(3rem, 8vw, 5rem);
		color: var(--color-white);
		text-align: center;
		margin: 0 0 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.faq-card {
		background: var(--color-white);
		border-radius: clamp(1.5rem, 4vw, 3rem);
		padding: clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 4vw, 4rem);
		box-shadow: var(--shadow-card-lg);
	}

	.faq-item {
		width: 100%;
		padding: clamp(0.75rem, 1.5vw, 1.25rem) 0;
		text-align: center;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.faq-item:hover {
		background: rgba(145, 200, 255, 0.08);
		border-radius: 1rem;
	}

	.faq-item.is-open {
		background: rgba(145, 200, 255, 0.12);
		border-radius: 1rem;
		padding: clamp(0.75rem, 1.5vw, 1.25rem);
	}

	.faq-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.faq-question {
		font-family: var(--font-primary);
		font-weight: 600;
		color: var(--color-blue);
		font-size: clamp(1rem, 1.5vw + 0.5rem, 1.5rem);
		word-break: break-word;
	}

	.faq-chevron {
		font-size: clamp(0.75rem, 1vw, 1rem);
		color: var(--color-blue);
		opacity: 0.6;
		transition: transform 0.2s ease;
	}

	.faq-item.is-open .faq-chevron {
		opacity: 1;
	}

	.faq-answer {
		margin-top: 1rem;
		padding: 0 1rem;
		animation: slideDown 0.3s ease;
	}

	.faq-answer p {
		font-family: var(--font-primary);
		font-weight: 400;
		color: #5a5a7a;
		font-size: clamp(0.9rem, 1.2vw + 0.3rem, 1.1rem);
		line-height: 1.6;
		margin: 0;
		text-align: center;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.faq-divider {
		width: 100%;
		height: auto;
		display: block;
		opacity: 0.8;
	}

	@media (max-width: 640px) {
		.faq-card {
			padding: 1.5rem;
			border-radius: 1.5rem;
		}
	}
</style>
