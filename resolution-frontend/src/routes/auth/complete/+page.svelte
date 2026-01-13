<script lang="ts">
  import { goto } from '$app/navigation';
  import LoadingScreen from '$lib/components/LoadingScreen.svelte';

  function handleComplete() {
    goto('/app');
  }
</script>

<svelte:head>
  <title>Loading... - Resolution</title>
</svelte:head>

<LoadingScreen onComplete={handleComplete} duration={1000} />
