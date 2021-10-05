export class TrackedBug {
  constructor(trackedBugData) {
    this.id = trackedBugData.id
    this.bugId = trackedBugData.bug.id
    this.accountId = trackedBugData.accountId
    this.trackerName = trackedBugData.tracker.name
    this.bugName = trackedBugData.bug.title
  }
}
