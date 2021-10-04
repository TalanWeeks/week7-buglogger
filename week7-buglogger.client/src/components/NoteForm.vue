<template>
  <div class="note-form">
    <form @submit.prevent="createNote()">
      <div class="form-group">
        <label for="body"></label>
        <input v-model="editable.body"
               type="text"
               name="body"
               id="body"
               placeholder="Bug body"
               class="form-control"
        >
      </div>

      <div class="btn-group">
        <button type="submit" class="btn mt-3 btn-success selectable">
          <b>Submit</b>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

import { Modal } from 'bootstrap'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createNote() {
        try {
          editable.value.bugId = route.params.id

          await notesService.createNote(editable.value)
          editable.value = {}
          Pop.toast('Bug reported!', 'success')
          const modal = Modal.getInstance(document.getElementById('note-form'))
          modal.hide()
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
