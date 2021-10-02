import { trackedBugsService } from '../services/TrackedBugController'
import BaseController from '../utils/BaseController'

export class TrackedBugController extends BaseController {
  constructor() {
    super('')
    this.router
      .get('api/bugs/:bugId/trackedbugs', this.getUsersTrackingBug)
      .get('account/trackedbugs', this.getUsersTrackedBugs)
      .post('api/trackedbugs', this.createTrackedBug)
      .delete('api/trackedbugs/:id', this.deleteTrackedBug)
  }

  async createTrackedBug(res, req, next) {
    try {
      req.body.creatorId = req.account.id
      const trackedBug = await trackedBugsService.createTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTrackingBug(res, req, next) {
    try {
      const users = await trackedBugsService.getUsersTrackingBug(req.params.accountId)
      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTrackedBugs(res, req, next) {
    try {
      const bugs = await trackedBugsService.getUsersTrackedBugs(req.params.bugI)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(res, req, next) {
    try {
      const trackedBug = await trackedBugsService.deleteTrackedBug(req.params.id)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}
