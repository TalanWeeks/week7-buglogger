import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
export class NotesController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/notes', this.createNote)
      .delete('/notes/:id', this.deleteNote)
  }

  async getNotesByBugId(req, res, next) {
    try {
      logger.log('get notes by bug id')
      const notes = await notesService.getNotesByBugId(req.params.id)

      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      req.body.accountId = req.account.id
      req.body.creatorId = req.note.creatorId
      const note = await notesService.deleteNote(req.params.id, req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
