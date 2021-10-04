<template>
  <div class="home container-fluid">
    <div class="row m-2 p-2 text-center">
      <div class="col-12">
        <h1 title="show all bugs" class="selectable" @click="getBugs()">
          Bugs
        </h1>
      </div>
    </div>
    <div class="row mx-4">
      <div class="col-6">
        <button v-if="user.isAuthenticated" class="btn btn-info my-3 ms-3" type="button" data-bs-toggle="modal" data-bs-target="#bug-form">
          Report Bug
        </button>
      </div>
      <div class="col-6 text-end">
        <div class="dropdown mb-4">
          <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Filter Options
          </button>
          <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="btn btn-info mx-1 mb-2" @click="filterByStatus(query='closed=true')">
                Show Closed Bugs
              </button>
            </li>
            <li>
              <button class="btn btn-info mx-1" @click="filterByStatus(query='closed=false')">
                Show Open Bugs
              </button>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            Sort Options
          </button>
          <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton2">
            <li>
              <button class="btn btn-info mx-1 mb-2" @click="sortByPriority()">
                Sort By Priority
              </button>
            </li>
            <li>
              <button class="btn btn-info mx-1" @click="getBugs()">
                Sort By Time
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-md-2">
        <h3>Bug Title</h3>
      </div>
      <div class="col-md-2">
        <h3>Bug Priority</h3>
      </div>
      <div class="col-md-2">
        <h3>Reported By</h3>
      </div>
      <div class="col-md-3">
        <h3>Last Updated</h3>
      </div>
      <div class="col-md-2">
        <h3>Bug Status</h3>
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
      bugs: computed(() => AppState.bugs),
      async filterByStatus(query) {
        try {
          await bugsService.getBugsByQuery(query)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async sortByPriority() {
        try {
          await bugsService.getBugsByPriority()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getBugs() {
        try {
          await bugsService.getBugs()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
