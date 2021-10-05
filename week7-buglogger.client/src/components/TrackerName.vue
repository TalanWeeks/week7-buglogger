<template>
  <div class="tracker-name container-fluid my-4">
    <h5>
      <span class="border-bottom">
        Tracker:
      </span>
    </h5>
    <h6>{{ bug.trackerName }}</h6>
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
      yourBugs: computed(() => AppState.yourTrackedBugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
