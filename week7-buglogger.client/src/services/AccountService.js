import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'
import { TrackedBug } from '../models/TrackedBug'
class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getTrackedBugs() {
    try {
      AppState.yourTrackedBugs = []
      const res = await api.get('account/trackedbugs')
      logger.log(res)
      AppState.yourTrackedBugs = res.data.map(b => new TrackedBug(b))
      logger.log(AppState.yourTrackedBugs)
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }
}

export const accountService = new AccountService()
