import mongoose, { Document } from 'mongoose';

export interface IRoadmap extends Document {
  userId: string;
  title: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  checklist: {
    title: string;
    completed: boolean;
    dueDate: Date;
    category: 'education' | 'skill' | 'experience';
  }[];
  targetCompletionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'on-hold'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  checklist: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      enum: ['education', 'skill', 'experience'],
      required: true
    }
  }],
  targetCompletionDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
roadmapSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IRoadmap>('Roadmap', roadmapSchema); 