import { dbContext } from '../db/DbContext'

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
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

  async deleteTrackedBug(id) {
    const trackedBug = await dbContext.TrackedBugs.findByIdAndDelete(id)
    return trackedBug
  }
}

export const trackedBugsService = new TrackedBugsService()
