<template>
  <div class="bugPage">
    <div v-if="currentBug">
      <h3>hello from the this bugs page</h3>
      {{ currentBug.name }}
    </div>
    <div v-else>
      <h3>loading.........</h3>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()

    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
