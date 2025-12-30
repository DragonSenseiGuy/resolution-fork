<script lang="ts">
	import swirl from "$lib/assets/swirl 1.png";
</script>

<div class="landing">
	<a href="/onboarding" class="cta-button">Get Started</a>
</div>

<section class="swirl-layout" style="background-image: url({swirl})">
	<div class="section-wrapper left">
		<div class="step">
			<h2>Capture Your Intentions</h2>
			<p>
				Resolution helps you turn fleeting thoughts into concrete goals.
				Write them down and see them take shape in a space designed for
				clarity.
			</p>
		</div>
	</div>

	<div class="section-wrapper right">
		<div class="step">
			<h2>Track Your Progress</h2>
			<p>
				Our intuitive interface lets you follow your journey from the
				first spark of an idea to its full realization, keeping you
				motivated at every step.
			</p>
		</div>
	</div>

	<div class="section-wrapper left">
		<div class="step">
			<h2>Celebrate Success</h2>
			<p>
				Every milestone reached is a reason to celebrate. Join a
				community dedicated to growth and achievement, where your wins
				are shared and recognized.
			</p>
		</div>
	</div>
</section>

<style>
	.landing {
		background-image: url("$lib/assets/onboarding-1.png");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 10%;
	}

	.cta-button {
		border: 2px solid rgba(253, 205, 5, 0.69);
		padding: 12px 32px;
		font-size: 1.2rem;
		cursor: pointer;
		border-radius: 50px;
		text-decoration: none;
		color: #333;
		background-color: rgba(255, 255, 255, 0.9);
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.cta-button:hover {
		background-color: #fdcd05;
		transform: translateY(-4px) scale(1.05);
		box-shadow: 0 10px 20px rgba(253, 205, 5, 0.3);
		border-color: #fdcd05;
	}

	/* Swirl Layout */
	.swirl-layout {
		position: relative;
		background-color: #050511;
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 100% 100%; /* Force image to cover total height of all sections */
		width: 100%;
		overflow: hidden;
	}

	.section-wrapper {
		min-height: 100vh; /* One full section height */
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 20px;
		box-sizing: border-box;
	}

	.section-wrapper.left {
		justify-content: flex-start;
		padding-left: 5%;
	}

	.section-wrapper.right {
		justify-content: flex-end;
		padding-right: 5%;
	}

	.step {
		position: relative;
		max-width: 450px;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		padding: 40px;
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
		color: #fff;
	}

	.step:hover {
		transform: translateY(-10px);
		background: rgba(255, 255, 255, 0.07);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.step h2 {
		font-size: 2.5rem;
		margin-bottom: 16px;
		background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 800;
	}

	.step p {
		font-size: 1.1rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.8);
	}

	/* Special styling for the middle step to distinguish it */
	.section-wrapper.right .step h2 {
		background: linear-gradient(135deg, #fdcd05 0%, #ffed4a 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media (max-width: 768px) {
		.section-wrapper {
			justify-content: center !important;
			padding: 40px 20px;
			min-height: auto; /* Allow flexible height on mobile if needed */
			padding-bottom: 100px;
		}

		.swirl-layout {
			background-size: cover;
		}

		.step {
			width: 100%;
			text-align: center;
			background: rgba(10, 14, 23, 0.85);
		}
	}
</style>
