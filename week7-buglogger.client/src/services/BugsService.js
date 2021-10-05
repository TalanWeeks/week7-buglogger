
import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { TrackedBug } from '../models/TrackedBug'
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
    AppState.bugs = []
    const res = await api.get('api/bugs')
    logger.log('get all the bugs', res)
    if (res.data.length > 1) {
      AppState.bugs = res.data.map(b => new Bug(b))
      logger.log('after mappage', AppState.bugs)
    } else {
      AppState.currentBug = new Bug(res.data)
    }
  }

  async getBugsByPriority() {
    AppState.bugs = []
    const res = await api.get('api/bugs')
    logger.log('get all the bugs', res)
    const unsortedBugs = res.data.map(b => new Bug(b))
    AppState.bugs = unsortedBugs.sort((a, b) => b.priority - a.priority)
    logger.log('after sort', AppState.bugs)
  }

  async getBugsByQuery(query) {
    AppState.bugs = []

    const res = await api.get(`api/bugs?${query}`)
    logger.log('get bugs by query', res)
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async getBugById(id) {
    AppState.currentBug = {}
    const res = await api.get('api/bugs/' + id)
    logger.log('your single bug sir', res.data)
    AppState.currentBug = res.data
  }

  async editBug(bugData, bugId) {
    AppState.currentBug = {}
    const res = await api.put('api/bugs/' + bugId, bugData)
    AppState.currentBug = res.data
    logger.log('your edited bug sir', res.data)
  }

  async toggleStatus(closed, bugId) {
    AppState.currentBug = {}
    const res = await api.put('api/bugs/' + bugId, { closed: closed })
    AppState.currentBug = res.data
    logger.log('your edited bug sir', res.data)
  }

  async createTrackedBug(trackedBugData) {
    logger.log(trackedBugData)
    const res = await api.post('api/trackedbugs', trackedBugData)
    logger.log('created tracked bug', res)
    AppState.trackedBug = res.data
    logger.log('tracked bug in app state', AppState.trackedBug)
    AppState.trackedBugs.unshift(new TrackedBug(res.data))
  }

  async getTrackedBugByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackedBugs = res.data.map(b => new TrackedBug(b))
    logger.log('the bugs or bug tied to this id...not sure how this will go', res.data)
  }
}
export const bugsService = new BugsService()
