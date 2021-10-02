import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator')
    return notes
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    return note
  }

  async deleteNote(id) {
    const deletedNote = await dbContext.Notes.findByIdAndDelete(id)
    return deletedNote
  }
}

export const notesService = new NotesService()
