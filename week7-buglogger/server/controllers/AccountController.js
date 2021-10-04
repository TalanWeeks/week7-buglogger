import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { trackedBugsService } from '../services/TrackedBugController'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/trackedbugs', this.getUsersTrackedBugs)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUsersTrackedBugs(req, res, next) {
    try {
      const bugs = await trackedBugsService.getUsersTrackedBugs(req.userInfo.id)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
