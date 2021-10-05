<template>
  <div class="bugPage container-fluid px-5">
    <div v-if="!currentBug.creator">
      <h3>loading.........</h3>
    </div>
    <div v-else>
      <div class="row container-fluid">
        <div class="col-md-12 text-center">
          <h2 class="my-3">
            <span class="border-dark border-bottom">
              Bug Title:
            </span>
          </h2>
          <h3 class="my-4">
            <span class="border border-info">
              {{ currentBug.title }}
            </span>
          </h3>
        </div>
      </div>
      <div class="row ">
        <div class="col-12">
          <div class="card">
            <div class="card-header  shadow">
              <div class="row">
                <div class="col-md-3">
                  <h5>Reported by: </h5>
                  <img :src="currentBug.creator.picture" width="75" alt="">
                  <h6>{{ currentBug.creator.name }}</h6>
                </div>
                <div class="col-md-3">
                  <h5>Priority: </h5>
                  <h6>{{ currentBug.priority }}</h6>
                </div>
                <div class="col-md-3">
                  <h5>Last Updated</h5>
                  <h6>{{ new Date(currentBug.updatedAt).toLocaleTimeString() }}</h6>
                </div>
                <div class="col-md-3">
                  <h5>Closed Status:</h5>
                  <div>
                    <i class="mdi mdi-brightness-1 text-danger f-20 mx-3" v-if="currentBug.closed"> Closed </i>
                    <i class="mdi mdi-brightness-1 text-success f-20 mx-3 selectable" title="close bug" v-else @click="toggleStatus(true)"> Open </i>
                  </div>
                </div>
              </div>

              <div class="my-5 border-top">
                <div class="row">
                  <div class="col-6">
                    <h6>Description: </h6>
                    <p>{{ currentBug.description }}</p>
                  </div>
                  <div class="col-6 text-end" v-if="account.id === currentBug.creatorId && currentBug.closed === false">
                    <span>Edit Bug Details: </span>
                    <i class="mdi mdi-cog text-success f-20 mx-3 selectable" title="edit bug" data-bs-toggle="modal" data-bs-target="#bug-form"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-info mb-2" @click="createTrackedBug(account.id)">
                    Track Bug
                  </button>
                  <div>
                    <button class="btn btn-danger mb-2 unselectable" @click="popMessage()">
                      Tracking Bug
                    </button>
                    <img :src="currentBug.creator.picture" width="35" class="ms-3" alt="">
                    <span>{{ account.name }}</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <h6>
                    Other Users Tracking This Bug:
                  </h6>
                  <div v-if="trackedBugs.length">
                    <TrackerName v-for="bugs in trackedBugs" :key="bugs" :bug="bugs" />
                  </div>
                  <div v-else>
                    <h6>There are no users tracking this bug</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-5">
        <div class="col-12">
          <h5>Notes: </h5>
          <button v-if="user.isAuthenticated" class="btn btn-info my-2" type="button" data-bs-toggle="modal" data-bs-target="#note-form">
            Create Note
          </button>
        </div>
      </div>
      <div class="row m-5">
        <div class="card shadow" v-if="notes.length > 0">
          <Note v-for=" n in notes" :key="n.bugId" :note="n" />
        </div>
        <div class="card shadow py-3" v-else>
          <h6>No current notes for this bug</h6>
        </div>
      </div>
    </div>
  </div>
  <Modal id="bug-form">
    <template #modal-title>
      Edit Bug
    </template>
    <template #modal-body>
      <BugEditForm />
    </template>
  </Modal>
  <Modal id="note-form">
    <template #modal-title>
      Create Note
    </template>
    <template #modal-body>
      <NoteForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import { TrackedBug } from '../models/TrackedBug'

export default {
  props: {
    trackedBug: { type: TrackedBug, required: true }
  },
  setup() {
    const route = useRoute()
    const editable = ref({})

    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        const bugId = route.params.id
        await notesService.getNotesByBugId(bugId)
        await bugsService.getTrackedBugByBugId(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })

    return {
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      trackedBugs: computed(() => AppState.trackedBugs),

      async toggleStatus(closed) {
        try {
          await bugsService.toggleStatus(closed, route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async createTrackedBug(accountId) {
        try {
          editable.value.accountId = accountId
          editable.value.bugId = route.params.id
          await bugsService.createTrackedBug(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },

      popMessage() {
        Pop.toast('you\'re already tracking this bug', 'error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
