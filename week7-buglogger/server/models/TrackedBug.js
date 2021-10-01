import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, required: true },
    accountId: { tpye: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bug'
})
TrackedBugSchema.virtual('$tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
