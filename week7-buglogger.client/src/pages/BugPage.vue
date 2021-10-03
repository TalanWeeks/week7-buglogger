<template>
  <div class="bugPage container-fluid px-5">
    <div v-if="!currentBug">
      <h3>loading.........</h3>
    </div>
    <div v-else>
      <div class="row container-fluid">
        <div class="col-2 text-end">
          <h2>Bug Title:</h2>
        </div>
        <div class="col-8 text-start ">
          <h3>{{ currentBug.title }}</h3>
        </div>
      </div>
      <div class="row ">
        <div class="col-12">
          <div class="card">
            <div class="card-header  shadow">
              <div class="row">
                <div class="col-md-3">
                  <h5>Reported by: </h5>
                  <!-- <img :src="currentBug.creator.picture" width="75" alt=""> -->
                  <!-- <h6>{{ currentBug.creator.name }}</h6> -->
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
                  <h6>{{ currentBug.closed }}</h6>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <h6>Description: </h6>
                  <p>{{ currentBug.description }}</p>
                </div>
                <div class="col-6 text-end" v-if="account.id === currentBug.creatorId">
                  <i class="mdi mdi-cog text-success f-20 mx-3 selectable" title="edit bug"></i>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-12">
                  <button class="btn btn-info mb-2">
                    Track Bug
                  </button>
                  <h6>
                    People Tracking This Bug:
                    <span>people tracking it</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-4">
        <div class="col-12">
          <h5>Notes: </h5>
        </div>
      </div>
      <div class="row mx-5">
        <div class="card shadow" v-if="notes">
          <!--  INJECT NOTES FOR THIS BUG HERE -->
        </div>
        <div class="card shadow py-3" v-else>
          <h6>There are no notes for this bug</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()

    onMounted(async() => {
      try {
        AppState.currentBug = {}
        await bugsService.getBugById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
