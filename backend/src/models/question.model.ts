import mongoose, { Document } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  description: string;
  category: 'technical' | 'aptitude';
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'aptitude'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

export default mongoose.model<IQuestion>('Question', questionSchema); 