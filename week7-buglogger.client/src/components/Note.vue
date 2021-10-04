<template>
  <div class="note">
    <div class="row" v-if="note">
      <div class="card">
        <div class="col-12 text-end">
          <h3>Note Creator: <span>{{ note.creator.name }}</span></h3>
        </div>
        <div class="col-12">
          <p>{{ note.body }}</p>
          <i class="mdi mdi-delete-forever text-danger f-20 mx-3" v-if="note.creator.id === account.id"> Closed </i>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <h6>...loading...</h6>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
export default {
  props: {
    note: { type: Note, required: true }
  },
  setup() {
    return {
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
