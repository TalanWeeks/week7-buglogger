<template>
  <div class="home">
    <div class="row m-2 p-2">
      <div class="col-6">
        <h3>Bugs</h3>
      </div>
      <div class="col-6 text-end">
        <button class="m-2 p-2 text-center btn btn-info selectable">
          Report Bug
        </button>
      </div>
    </div>
    <div class="row">
      <Bug v-for=" b in bugs" :key="b.id" :bug="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService.js'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
