import { trackedBugsService } from '../services/TrackedBugController'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TrackedBugController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs/:bugId/trackedbugs', this.getUsersTrackingBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/trackedbugs', this.createTrackedBug)
      .delete('/trackedbugs/:id', this.deleteTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      // req.body.accountId = req.account.id
      const trackedBug = await trackedBugsService.createTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTrackingBug(req, res, next) {
    try {
      const users = await trackedBugsService.getUsersTrackingBug(req.params.accountId)
      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(req, res, next) {
    try {
      const trackedBug = await trackedBugsService.deleteTrackedBug(req.params.id)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}
