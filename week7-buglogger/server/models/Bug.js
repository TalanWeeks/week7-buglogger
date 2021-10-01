import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true },
    closed: { tpye: Boolean, required: true },
    closedDate: { type: Date, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
