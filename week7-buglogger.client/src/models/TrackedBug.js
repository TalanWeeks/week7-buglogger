export class TrackedBug {
  constructor(trackedBugData) {
    this.id = trackedBugData.id
    // one of these is wrong lol well see
    this.bugId = trackedBugData.bug.id
    this.accountId = trackedBugData.accountId
  }
}
