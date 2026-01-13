<script lang="ts">
  import type { PageData } from './$types';
  import PlatformBackground from '$lib/components/PlatformBackground.svelte';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Dashboard - Resolution</title>
</svelte:head>

<PlatformBackground>
  <div class="app-container">
    <header>
      <h1>Welcome, {data.user.firstName || data.user.email}!</h1>
      <form method="POST" action="/api/auth/logout">
        <button type="submit">Sign out</button>
      </form>
    </header>

    <main>
      <p>You're signed in. Start building something awesome!</p>
    </main>
  </div>
</PlatformBackground>

<style>
  .app-container {
    min-height: 100vh;
    padding: 2rem;
    color: #1a1a2e;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  button {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #af98ff;
    color: #af98ff;
    cursor: pointer;
    border-radius: 20px;
    font-family: 'Kodchasan', sans-serif;
  }

  button:hover {
    background: rgba(255, 255, 255, 1);
  }
</style>
