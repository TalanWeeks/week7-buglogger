<template>
  <div class="home container-fluid">
    <div class="row m-2 p-2">
      <div class="col-6">
        <h3>Bugs</h3>
      </div>
      <div class="col-6 text-end">
        <button v-if="user.isAuthenticated" class="btn btn-info my-5 ms-3" type="button" data-bs-toggle="modal" data-bs-target="#bug-form">
          Report Bug
        </button>
      </div>
    </div>
    <div class="row">
      <Bug v-for=" b in bugs" :key="b.id" :bug="b" />
    </div>
  </div>

  <Modal id="bug-form">
    <template #modal-title>
      Report a Bug
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
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
        AppState.currentBug = {}
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
