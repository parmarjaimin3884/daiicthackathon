import mongoose, { Document } from 'mongoose';

export interface IInterview extends Document {
  userId: string;
  subject: string;
  type: 'mock' | 'real';
  status: 'scheduled' | 'completed' | 'cancelled';
  scheduledDate: Date;
  duration: number;
  feedback?: {
    rating: number;
    comments: string;
    strengths: string[];
    improvements: string[];
  };
  questions: {
    id: string;
    score: number;
    feedback: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['mock', 'real'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 120
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    strengths: [String],
    improvements: [String]
  },
  questions: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    score: {
      type: Number,
      min: 0,
      max: 10
    },
    feedback: String
  }]
}, {
  timestamps: true
});

export default mongoose.model<IInterview>('Interview', interviewSchema); 