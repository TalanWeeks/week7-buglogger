import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class NotesService {
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId }).populate('creator')
    return notes
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    logger.log(note)
    return note
  }

  async deleteNote(id, body) {
    if (body.creatorId !== body.accountId) {
      throw new BadRequest('you dont have permission to delete this')
    }
    const deletedNote = await dbContext.Notes.findByIdAndDelete(id)
    return deletedNote
  }
}

export const notesService = new NotesService()
