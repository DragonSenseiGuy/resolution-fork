<script lang="ts">
	import type { Step, Event, FAQ } from '$lib/types';
	import heroBg from '$lib/assets/hero_bg.png';
	import darkBg from '$lib/assets/dark_bg.png';
	import swirlBg from '$lib/assets/swirl_overlay.png';
	import lightBlueBg from '$lib/assets/light_blue_bg.png';
	import fireworks from '$lib/assets/firework_burst.png';
	import fireworksGif from '$lib/assets/fireworks_gif.png';
	import stair from '$lib/assets/stair.png';
	import running from '$lib/assets/running_person.png';
	import vectorLine from '$lib/assets/vector_divider.svg';
	import EventCard from './EventCard.svelte';

	interface Props {
		heroDescription?: string;
		ctaText?: string;
		ctaHref?: string;
		steps?: Step[];
		events?: Event[];
		faqs?: FAQ[];
		showSteps?: boolean;
		showEvents?: boolean;
		showFaq?: boolean;
	}

	let {
		heroDescription = "Ship every week. Earn prizes. Most people quit. Will you be different?",
		ctaText = "STAKE YOUR CLAIM",
		ctaHref = "/onboarding",
		steps = [
			{ title: "⭐ One Star", description: "~2hr/week • 8 weeks • $80 prize pool. Light commitment, real rewards." },
			{ title: "⭐⭐ Two Star", description: "~5hr/week • 8 weeks • $200 prize pool. Serious growth, bigger prizes." },
			{ title: "⭐⭐⭐ Three Star", description: "~9hr/week • 8 weeks • $360 prize pool. Maximum effort, maximum payout." }
		],
		events = [
			{ title: "Event 1", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit" },
			{ title: "Event 2", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit", rotation: 12 },
			{ title: "Event 3", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit", rotation: -21 }
		],
		faqs = [
			{ question: "Question 1" },
			{ question: "Question 2" },
			{ question: "Question 3" },
			{ question: "Question 4" },
			{ question: "Question 5" }
		],
		showSteps = false,
		showEvents = false,
		showFaq = false
	}: Props = $props();

	const eventVariants = ['yellow', 'pink', 'blue'] as const;
</script>

<div class="initial-page">
	<section class="hero">
		<img src={heroBg} alt="" class="hero-bg" />
		
		<div class="fireworks-left">
			<img src={fireworksGif} alt="" />
		</div>
		<div class="fireworks-right">
			<img src={fireworksGif} alt="" />
		</div>

		<div class="hero-content">
			<p class="hero-description">{heroDescription}</p>

			<a href={ctaHref} class="cta-button">
				<span>{ctaText}</span>
			</a>
		</div>
	</section>

	{#if showSteps}
		<section class="steps-section">
			<img src={darkBg} alt="" class="section-bg dark-bg-1" />
			<img src={darkBg} alt="" class="section-bg dark-bg-2" />
			<img src={swirlBg} alt="" class="swirl-overlay" />
			
			<div class="big-firework">
				<img src={fireworks} alt="" />
			</div>

			<div class="steps-content">
				{#each steps as step, i}
					<div class="step step-{i + 1}">
						<p class="step-text">{step.title}:<br/>{step.description}</p>
					</div>
					{#if i === 1}
						<div class="fireworks-decoration">
							<img src={fireworks} alt="" />
						</div>
					{/if}
				{/each}
			</div>
		</section>
	{/if}

	{#if showEvents || showFaq}
		<section class="events-faq-section">
			<img src={lightBlueBg} alt="" class="section-bg" />
			
			{#if showEvents}
				<h2 class="events-title">Stories from Past Events</h2>

				<div class="events-grid">
					{#each events as event, i}
						<div class="event-card-wrapper event-{i + 1}">
							<EventCard 
								title={event.title} 
								description={event.description}
								variant={eventVariants[i % eventVariants.length]}
								rotation={event.rotation ?? 0}
							/>
						</div>
					{/each}
				</div>
			{/if}

			{#if showFaq}
				<div class="running-decoration">
					<img src={running} alt="" />
				</div>

				<h2 class="faq-title">FAQ</h2>

				<div class="faq-wrapper">
					<div class="faq-list">
						{#each faqs as faq, i}
							<div class="faq-item">
								<span class="faq-question">{faq.question}</span>
							</div>
							{#if i < faqs.length - 1}
								<img src={vectorLine} alt="" class="faq-divider" />
							{/if}
						{/each}
					</div>

					<div class="stair-decoration">
						<img src={stair} alt="" />
					</div>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	.initial-page {
		width: 100%;
		overflow-x: hidden;
		font-family: var(--font-primary, 'Kodchasan', sans-serif);
	}

	/* ========== HERO SECTION ========== */
	.hero {
		position: relative;
		width: 100%;
		height: auto;
		min-height: 100vh;
		overflow: hidden;
	}

	.hero-bg {
		width: 100%;
		height: auto;
		display: block;
	}

	.fireworks-left,
	.fireworks-right {
		position: absolute;
		top: 0;
		width: 45%;
		max-width: 600px;
		z-index: var(--z-overlay, 2);
	}

	.fireworks-left {
		left: 0;
	}

	.fireworks-right {
		right: 0;
		transform: scaleX(-1) scaleY(-1);
	}

	.fireworks-left img,
	.fireworks-right img {
		width: 100%;
		height: auto;
	}

	.hero-content {
		position: absolute;
		bottom: 15%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		z-index: var(--z-modal, 3);
		width: 90%;
		max-width: 800px;
	}

	.hero-description {
		color: var(--color-gold, #ffe475);
		font-size: clamp(1rem, 2vw, 2.5rem);
		text-align: center;
		text-shadow: var(--shadow-glow-gold, 0 0 12.8px #ffe475);
		line-height: 1.6;
		margin: 0;
	}

	.cta-button {
		background: var(--color-cta-bg, rgba(253, 205, 5, 0.36));
		border: 6px solid var(--color-cta-border, rgba(253, 205, 5, 0.69));
		border-radius: var(--radius-lg, 50px);
		box-shadow: var(--shadow-glow-cta, 0 0 13.6px 5px #ffe475);
		padding: 1rem 3rem;
		text-decoration: none;
		transition: all var(--transition-normal, 0.3s ease);
		cursor: pointer;
		display: inline-block;
	}

	.cta-button:hover {
		background: var(--color-cta-hover, rgba(253, 205, 5, 0.5));
		transform: scale(1.05);
	}

	.cta-button span {
		color: var(--color-gold-muted, #fff0af);
		font-size: clamp(1.5rem, 4vw, 4rem);
		font-weight: 400;
		white-space: nowrap;
	}

	/* ========== STEPS SECTION ========== */
	.steps-section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
	}

	.section-bg {
		position: absolute;
		width: 100%;
		height: auto;
		z-index: var(--z-base, 0);
	}

	.dark-bg-1 {
		top: 0;
	}

	.dark-bg-2 {
		bottom: 0;
	}

	.swirl-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: var(--z-raised, 1);
		opacity: 0.3;
	}

	.steps-content {
		position: relative;
		z-index: var(--z-overlay, 2);
		display: flex;
		flex-direction: column;
		padding: 10% 5%;
		min-height: 100vh;
	}

	.step {
		max-width: 500px;
		padding: 2rem;
	}

	.step-1 {
		align-self: flex-start;
		margin-left: 15%;
	}

	.step-2 {
		align-self: center;
		margin-top: 10%;
	}

	.step-3 {
		align-self: flex-end;
		margin-right: 25%;
	}

	.step-text {
		color: var(--color-gold-light, #fff2b9);
		font-size: clamp(1.2rem, 3vw, 2.5rem);
		text-align: center;
		text-shadow: 0 0 10.6px var(--color-gold, #ffe475);
		line-height: 1.4;
		margin: 0;
	}

	.big-firework {
		position: absolute;
		left: -125%;
		top: 5%;
		width: 160%;
		z-index: var(--z-raised, 1);
		pointer-events: none;
		transform: rotate(-40deg);
		filter: blur(10px);
		opacity: 0.85;
	}

	.big-firework img {
		width: 100%;
		height: auto;
	}

	.fireworks-decoration {
		position: absolute;
		right: -15%;
		top: 40%;
		width: 80%;
		z-index: var(--z-modal, 3);
		pointer-events: none;
	}

	.fireworks-decoration img {
		width: 100%;
		height: auto;
	}

	/* ========== EVENTS & FAQ SECTION ========== */
	.events-faq-section {
		position: relative;
		width: 100%;
		background: var(--color-blue-light, #a8d4f5);
	}

	.events-faq-section .section-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: var(--z-base, 0);
	}

	.events-faq-section .events-title,
	.events-faq-section .events-grid,
	.events-faq-section .faq-title,
	.events-faq-section .faq-wrapper,
	.events-faq-section .running-decoration {
		position: relative;
		z-index: var(--z-raised, 1);
	}

	.events-title {
		font-family: var(--font-primary, 'Kodchasan', sans-serif);
		font-weight: 400;
		font-style: italic;
		color: var(--color-gold-dark, #a58d28);
		font-size: clamp(1.5rem, 4vw, 3.5rem);
		text-align: center;
		margin: 0;
		padding: 8rem 0 2rem;
		white-space: nowrap;
	}

	.events-grid {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 2%;
		padding: 2rem 5% 4rem;
		flex-wrap: wrap;
	}

	.event-card-wrapper {
		position: relative;
		width: 30%;
		max-width: 350px;
		flex-shrink: 0;
	}

	.event-1 {
		align-self: flex-start;
	}

	.event-2 {
		align-self: center;
		margin-top: 10%;
	}

	.event-3 {
		align-self: flex-start;
		margin-left: auto;
	}

	/* ========== FAQ ELEMENTS ========== */
	.running-decoration {
		position: absolute;
		left: -5%;
		bottom: 5%;
		width: 25%;
		max-width: 350px;
		z-index: var(--z-raised, 1);
		transform: rotate(162deg) scaleY(-1);
		pointer-events: none;
	}

	.running-decoration img {
		width: 100%;
		height: auto;
	}

	.faq-title {
		position: absolute;
		bottom: 35%;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-primary, 'Kodchasan', sans-serif);
		font-weight: 700;
		color: var(--color-white, white);
		font-size: clamp(4rem, 12vw, 15rem);
		text-align: center;
		margin: 0;
	}

	.faq-wrapper {
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 1000px;
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}

	.faq-list {
		background: var(--color-white, white);
		border-radius: var(--radius-xl, 60px);
		padding: 2rem 3rem;
		flex: 1;
		max-width: 700px;
	}

	.faq-item {
		padding: 1rem 0;
	}

	.faq-divider {
		width: 100%;
		height: auto;
		display: block;
	}

	.faq-question {
		font-family: var(--font-primary, 'Kodchasan', sans-serif);
		font-weight: 600;
		color: var(--color-blue, #91c8ff);
		font-size: clamp(1rem, 2.5vw, 2rem);
	}

	.stair-decoration {
		width: 50%;
		max-width: 400px;
		flex-shrink: 0;
		pointer-events: none;
	}

	.stair-decoration img {
		width: 100%;
		height: auto;
	}

	/* ========== RESPONSIVE ========== */
	@media (max-width: 768px) {
		.fireworks-left,
		.fireworks-right {
			width: 50%;
		}

		.hero-content {
			bottom: 10%;
		}

		.step {
			max-width: 90%;
		}

		.step-1,
		.step-2,
		.step-3 {
			align-self: center;
			margin-top: 15%;
			margin-left: 0;
			margin-right: 0;
		}

		.events-grid {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			top: 15%;
			height: auto;
		}

		.event-card-wrapper {
			width: 60%;
			max-width: 300px;
		}

		.event-2,
		.event-3 {
			transform: none;
			margin: 0;
		}

		.faq-wrapper {
			flex-direction: column;
			align-items: center;
		}

		.faq-list {
			border-radius: 40px;
			padding: 1.5rem 2rem;
		}

		.running-decoration,
		.stair-decoration {
			display: none;
		}
	}
</style>
