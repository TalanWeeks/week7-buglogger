<template>
  <div class="bugPage container-fluid px-5">
    <div v-if="currentBug">
      <div class="row container-fluid ">
        <div class="col-2 text-end">
          <h2>Bug Title:</h2>
        </div>
        <div class="col-8 text-start ">
          <h3>{{ currentBug.title }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
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
                  <h6>{{ currentBug.updatedAt }}</h6>
                </div>
                <div class="col-md-3">
                  <h5>Closed Status:</h5>
                  <h6>{{ currentBug.closed }}</h6>
                </div>
              </div>
            </div>
            <div class="card-body">
            </div>
            <div class="card-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>loading.........</h3>
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
        await bugsService.getBugById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
