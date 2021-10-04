<template>
  <div class="bug-form">
    <form @submit.prevent="editBug()">
      <div class="form-group">
        <label for="title"></label>
        <input v-model="editable.title"
               type="text"
               name="title"
               id="title"
               placeholder="Bug title"
               class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="description"></label>
        <input v-model="editable.description"
               type="text"
               name="description"
               id="description"
               placeholder="Bug Description"
               class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="priority"></label>
        <input v-model="editable.priority"
               type="number"
               name="priority"
               id="priority"
               placeholder="Bug Priority lvl"
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
import { useRouter } from 'vue-router'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRouter()
    const editable = ref({})
    return {
      editable,
      currentBug: computed(() => AppState.currentBug),
      async editBug() {
        try {
          await bugsService.editBug(editable.value, this.currentBug.id)
          editable.value = {}
          Pop.toast('Bug Eddited', 'success')
          const modal = Modal.getInstance(document.getElementById('bug-form'))
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
