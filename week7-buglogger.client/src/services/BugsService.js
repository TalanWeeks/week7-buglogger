import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('get all the bugs', res)
    if (res.data.length > 1) {
      AppState.bugs = res.data.map(b => new Bug(b))
      logger.log('after mappage', AppState.bugs)
    } else {
      AppState.currentBug = new Bug(res.data)
    }
  }
}
export const bugsService = new BugsService()
