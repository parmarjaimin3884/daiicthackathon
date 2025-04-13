import express from 'express';
import Interview from '../models/interview.model';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Get all interviews for a user
router.get('/', protect, async (req: any, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id })
      .populate('questions.id')
      .sort({ scheduledDate: -1 });
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get interview by ID
router.get('/:id', protect, async (req: any, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('questions.id');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Schedule new interview
router.post('/', protect, async (req: any, res) => {
  try {
    const interview = await Interview.create({
      ...req.body,
      userId: req.user._id,
      status: 'scheduled'
    });

    res.status(201).json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update interview
router.put('/:id', protect, async (req: any, res) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Cancel interview
router.delete('/:id', protect, async (req: any, res) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status: 'cancelled' },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json({ message: 'Interview cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Submit interview feedback
router.post('/:id/feedback', protect, async (req: any, res) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        feedback: req.body.feedback,
        status: 'completed'
      },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router; 