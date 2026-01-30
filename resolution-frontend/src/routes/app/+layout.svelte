<script lang="ts">
	import type { LayoutData } from './$types';
	import PlatformBackground from '$lib/components/PlatformBackground.svelte';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
</script>

<PlatformBackground>
	<div class="app-wrapper">
		<div class="app-content">
			{@render children()}
		</div>

		<nav class="bottom-nav">
			<div class="nav-links">
				<a href="/app/projects" class="nav-item nav-primary">Projects</a>
				<a href="/app/faq" class="nav-item">FAQ</a>
			</div>
			<div class="nav-icons">
				<a href="/app/settings" class="nav-icon" aria-label="Settings">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
				</a>
			</div>
		</nav>
	</div>
</PlatformBackground>

<style>
	.app-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.app-content {
		flex: 1;
		padding: 2rem;
		padding-bottom: 6rem;
		overflow-y: auto;
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(180deg, rgba(5, 4, 23, 0.95) 0%, rgba(5, 4, 23, 1) 100%);
		border-top: 2px solid var(--color-gold);
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
	}

	.nav-links {
		display: flex;
		gap: 2.5rem;
	}

	.nav-item {
		font-family: var(--font-primary);
		font-weight: 700;
		font-size: 1.5rem;
		color: var(--color-white);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: color var(--transition-fast);
	}

	.nav-item:hover {
		color: var(--color-gold);
	}

	.nav-primary {
		color: var(--color-gold);
	}

	.nav-icons {
		display: flex;
		gap: 1.5rem;
	}

	.nav-icon {
		color: var(--color-white);
		transition: color var(--transition-fast);
	}

	.nav-icon:hover {
		color: var(--color-gold);
	}

	.nav-icon svg {
		width: 28px;
		height: 28px;
	}

	@media (max-width: 640px) {
		.nav-item {
			font-size: 1.1rem;
		}

		.nav-links {
			gap: 1.5rem;
		}

		.bottom-nav {
			padding: 0.75rem 1rem;
		}
	}
</style>
