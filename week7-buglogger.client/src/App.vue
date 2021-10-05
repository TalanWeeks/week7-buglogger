<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <img class="m-2"
           alt="logo"
           src="https://th.bing.com/th/id/OIP.dZeSUTwd0_N32yQ5mqkm6AHaHa?pid=ImgDet&rs=1"
           height="45"
      />
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
