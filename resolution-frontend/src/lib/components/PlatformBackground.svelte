<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="platform-bg">
  <!-- Panning sky background -->
  <div class="bg-scroll">
    <img src="/platform-bg.png" alt="" class="bg-image" />
    <img src="/platform-bg.png" alt="" class="bg-image" />
  </div>

  <!-- Floating clouds/rocks -->
  <div class="clouds">
    <img src="/cloud-white.png" alt="" class="cloud cloud-white" />
    <img src="/cloud-purple.png" alt="" class="cloud cloud-purple" />
    <img src="/cloud-pink.png" alt="" class="cloud cloud-pink" />
    <img src="/cloud-cyan.png" alt="" class="cloud cloud-cyan" />
    <img src="/cloud-yellow.png" alt="" class="cloud cloud-yellow" />
  </div>


  
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style>
  .platform-bg {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background-color: #91c8ff;
  }

  .bg-scroll {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;
    animation: pan 120s linear infinite;
  }

  .bg-image {
    height: 100%;
    width: auto;
    min-width: 100vw;
    object-fit: cover;
    flex-shrink: 0;
  }

  /* Floating clouds */
  .clouds {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cloud {
    position: absolute;
    object-fit: contain;
  }

  .cloud-white {
    left: -10%;
    top: 5%;
    width: 50%;
    animation: float 8s ease-in-out infinite;
  }

  .cloud-purple {
    left: 3%;
    bottom: 10%;
    width: 25%;
    animation: float 10s ease-in-out infinite 1s;
  }

  .cloud-pink {
    left: 30%;
    top: 0%;
    width: 22%;
    animation: float 9s ease-in-out infinite 0.5s;
  }

  .cloud-cyan {
    right: 15%;
    bottom: 20%;
    width: 28%;
    animation: float 11s ease-in-out infinite 2s;
  }

  .cloud-yellow {
    right: 2%;
    top: 10%;
    width: 18%;
    animation: float 7s ease-in-out infinite 1.5s;
  }

  .content {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  @keyframes pan {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
</style>
