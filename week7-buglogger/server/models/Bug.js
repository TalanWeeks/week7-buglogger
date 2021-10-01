import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true, min: 1, max: 5 },
    closed: { type: Boolean, required: true, default: false },
    closedDate: { type: Date, required: false },
    creatorId: { type: Schema.Types.ObjectId, required: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
