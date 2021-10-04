<template>
  <div class="bug">
    <div class="row mx-5 shadow my-2 p-4 text-light" :class="[bug.priority > 4? 'bg-info':'bg-dark']">
      <div class="col-md-2">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" class="selectable text-light" title="Bug Details">
          {{ bug.title }}
        </router-link>
      </div>
      <div class="col-md-2">
        <span class="px-5">{{ bug.priority }}</span>
      </div>
      <div class="col-md-2">
        <span class="px-5">{{ bug.creatorName }}</span>
      </div>
      <div class="col-md-4 text-center">
        {{ new Date(bug.updatedAt).toLocaleTimeString() }}
      </div>
      <div class="col-md-2">
        <div>
          <i class="mdi mdi-brightness-1 text-danger f-20 mx-3" v-if="bug.closed"> Closed </i>
          <i class="mdi mdi-brightness-1 text-success f-20 mx-3 selectable" title="close bug" v-else @click="toggleStatus(true, bug.id)"> Open </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'

export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs),
      async toggleStatus(closed, bugId) {
        try {
          await bugsService.toggleStatus(closed, bugId)
          window.location.reload()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
