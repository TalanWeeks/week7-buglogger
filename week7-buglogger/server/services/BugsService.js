import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugsService {
  async getBugs() {
    const bugs = await dbContext.Bug.find()
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bug.find(bugId)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async editBug(bugId, body) {
    const bug = await this.getBugById(bugId)
    bug.title = body.title || bug.title
    bug.description = body.description || bug.description
    bug.priority = body.priority || bug.priority
    bug.closed = body.closed || bug.closed
    bug.closedDate = body.closedDate || bug.closedDate
    bug.creatorId = body.creatorId || bug.creatorId
    await bug.save()
    return bug
  }

  async deleteBug(bugId) {
    const deletedBug = await dbContext.Bug.findByIdAndDelete(bugId)
    return deletedBug
  }

  async getNotesByBugId(bugId) {
    const notes = await dbContext.Note.find({ bugId }).populate('creator')
    return notes
  }

  async getTrackedBugsByBugId(bugId) {
    const trackedBugs = await dbContext.TrackedBug.find({ bugId }).populate('bug').populate('tracker')
    return trackedBugs
  }
}

export const bugsService = new BugsService()
