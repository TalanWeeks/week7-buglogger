<template>
  <div class="bug">
    <div class="row mx-5 my-2 p-4 bg-dark text-light">
      <div class="col-2">
        {{ bug.title }}
      </div>
      <div class="col-2">
        <span class="px-5">{{ bug.priority }}</span>
      </div>
      <div class="col-2">
        <span class="px-5">{{ bug.creatorName }}</span>
      </div>
      <div class="col-4 text-center">
        {{ bug.updatedAt }}
      </div>
      <div class="col-2">
        {{ bug.closed }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
