<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Dashboard - Resolution</title>
</svelte:head>

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

<style>
  .app-container {
    min-height: 100vh;
    padding: 2rem;
    background-color: var(--color-bg-dark, #0a0a0a);
    color: white;
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
    background: transparent;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
