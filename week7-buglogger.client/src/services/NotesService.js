import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async createNote(newNote) {
    AppState.notes = []
    const res = await api.post('api/notes', newNote)
    logger.log('Note was made', res.data)
    AppState.notes.unshift(new Note(res.data))
  }

  async getNotesByBugId(id) {
    AppState.notes = []
    const res = await api.get(`api/bugs/${id}/notes`)
    logger.log('notes for this bug', res.data)
    AppState.notes = res.data.map(n => new Note(n))
  }
}

export const notesService = new NotesService()
