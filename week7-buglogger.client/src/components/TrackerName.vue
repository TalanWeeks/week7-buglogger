<template>
  <div class="tracker-name container-fluid my-4">
    <div v-if="trackedBugs.length > 0">
      <h5>
        <span class="border-bottom">
          Tracker:
        </span>
      </h5>
      <h6>{{ bug.trackerName }}</h6>
    </div>
    <div v-else>
      <h1>hello</h1>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { TrackedBug } from '../models/TrackedBug'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  props: {
    bug: { type: TrackedBug, required: true }
  },
  setup() {
    const route = useRoute()
    return {
      trackedBugs: computed(() => AppState.trackedBugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
