import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNotesByBugId)
      .get('/:id/trackedbugs', this.getTrackedBugsByBugId)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const createdBug = await bugsService.createBug(req.body)
      res.send(createdBug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const editedBug = await bugsService.editBug(req.params.id, req.body)
      res.send(editedBug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const closedBug = await bugsService.closeBug(req.params.id)
      res.send(closedBug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = bugsService.getNotesByBugId(req.params.bugId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedBugsByBugId(req, res, next) {
    try {
      const trackedBugs = bugsService.getTrackedBugsByBugId(req.params.bugId)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }
}
