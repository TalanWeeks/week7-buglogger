import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async createBug(newBug) {
    AppState.createdBug = {}
    const res = await api.post('api/bugs', newBug)
    logger.log('Bug report was made', res.data)
    AppState.createdBug = res.data
    AppState.bugs.unshift(new Bug(res.data))
    router.push({ name: 'Bug', params: { id: res.data.id } })
  }

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

  async getBugById(id) {
    AppState.currentBug = {}
    const res = await api.get('api/bugs/' + id)
    logger.log('your single bug sir', res.data)
    AppState.currentBug = res.data
  }
}
export const bugsService = new BugsService()
