<template>
  <div class="about container-fluid">
    <div class="row text-center my-4">
      <h3>Welcome {{ account.name }}</h3>
    </div>
    <div class="card m-3 shadow">
      <div class="row">
        <div class="col-md-5 m-2">
          <img class="rounded" :src="account.picture" alt="" />
          <h6>{{ account.name }}</h6>
        </div>
        <div class="col-md-5 m-2">
          <h5>
            <span class="border-bottom border-1 border-secondary">
              Bugs You're Tracking:
            </span>
          </h5>
          <h6>{{ account.name }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'

export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await accountService.getTrackedBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      yourBugs: computed(() => AppState.yourTrackedBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
