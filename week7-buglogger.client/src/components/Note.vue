<template>
  <div class="note">
    <div class="row" v-if="!note.creatorName">
      <h6>...loading...</h6>
    </div>
    <div class="row" v-else>
      <div class="card">
        <div class="col-12 text-start">
          <h5>
            <span class="border-bottom">Note Creator: {{ note.creatorName }}</span>
          </h5>
        </div>
        <div class="row">
          <div class="col-md-6 my-2">
            <p>* {{ note.body }}</p>
          </div>
          <div class="col-md-6 text-end my-2">
            <i class="mdi mdi-delete-forever selectable text-danger f-20 mx-3" title="Delete Note" v-if="note.creatorId === account.id" @click="deleteNote(note.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
import Pop from '../utils/Pop'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: { type: Note, required: true }
  },
  setup(props) {
    return {
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(noteId)
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
