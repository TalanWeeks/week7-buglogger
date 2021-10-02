import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId }).populate('creator')
    if (!notes) {
      throw new BadRequest('theres no notes for this bug sir')
    }
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
