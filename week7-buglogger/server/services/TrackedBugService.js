import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    // if (trackedBugData.trackedId === trackedBugData.bugId) {
    //   throw new BadRequest('you cant track this twice')
    // }
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker')
    await trackedBug.populate('bug')
    return trackedBug
  }

  async getUsersTrackingBug(accountId) {
    const users = await dbContext.TrackedBugs.find({ accountId: accountId }).populate('tracker').populate('bug')
    return users
  }

  async getUsersTrackedBugs(id) {
    const bugs = await dbContext.TrackedBugs.find({ accountId: id }).populate('tracker').populate('bug')
    return bugs
  }

  async deleteTrackedBug(id, body) {
    if (body.creatorId !== body.accountId) {
      throw new BadRequest('you dont have permission to delete this')
    }
    const trackedBug = await dbContext.TrackedBugs.findByIdAndDelete(id)
    return trackedBug
  }
}

export const trackedBugsService = new TrackedBugsService()
