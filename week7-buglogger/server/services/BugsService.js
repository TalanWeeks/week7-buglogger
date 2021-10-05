import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
class BugsService {
  async getBugs(query = {}) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async editBug(bugId, body) {
    const bug = await this.getBugById(bugId)
    if (bug.closed || bug.creatorId !== body.accountId) {
      throw new BadRequest('this item is closed')
    } else {
      bug.title = body.title || bug.title
      bug.description = body.description || bug.description
      bug.priority = body.priority || bug.priority
      bug.closed = body.closed || bug.closed

      await bug.save()
      return bug
    }
  }

  async closeBug(bugId, body) {
    const closedBug = await this.getBugById(bugId)
    if (closedBug.closed === true || closedBug.creatorId !== body) { throw new BadRequest('this item is closed') } else {
      closedBug.closed = true
      await closedBug.save()
      return closedBug
    }
  }

  async getNotesByBugId(bugId) {
    logger.log(bugId)
    const notes = await dbContext.Notes.find({ bugId: bugId }).populate('creator')
    return notes
  }

  async getTrackedBugsByBugId(id) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: id }).populate('bug').populate('tracker')
    return trackedBugs
  }
}

export const bugsService = new BugsService()
