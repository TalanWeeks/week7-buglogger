import { applyStyles } from '@popperjs/core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { router } from '../router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'

class NotesService {
  async createNote(newNote) {
    AppState.notes = []
    const res = await api.post('api/notes', newNote)
    logger.log('Note was made', res.data)
    AppState.notes.shift(new Note(res.data))
  }

  async getNotesByBugId(bugId) {
    AppState.notes = []

    try {
      const res = await api.get(`api/bugs/${bugId}/notes`)
      logger.log('notes for this bug', res.data)
      AppState.createdNote = res.data
      logger.log('creatednotes appstate', AppState.createdNote)
      AppState.notes = res.data.map(n => new Note(n))
      logger.log('your appState notes', AppState.notes)
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async deleteNote(noteId) {
    logger.log('delete this ish')
    const res = await api.delete(`api/notes/${noteId}`)
    logger.log('youre deleted note', res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}

export const notesService = new NotesService()
