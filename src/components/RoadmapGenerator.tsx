import React, { useState } from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot 
} from '@mui/lab';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  Tabs,
  Tab,
  Checkbox,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { 
  CheckCircle, 
  Circle, 
  Plus, 
  TrendingUp,
  Calendar,
  BookOpen,
  Briefcase
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Roadmap {
  id: string;
  title: string;
  createdAt: string;
  progress: number;
  checklist: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  category: 'education' | 'skill' | 'experience';
}

const RoadmapGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({
    currentEducation: '',
    careerGoals: '',
    skills: '',
    interests: '',
    timeline: '1-2 years'
  });

  // Sample roadmap data - in a real app, this would come from an API
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([
    {
      id: '1',
      title: 'Software Development Career Path',
      createdAt: '2024-03-15',
      progress: 45,
      checklist: [
        { id: '1', title: 'Complete Data Structures course', completed: true, dueDate: '2024-04-01', category: 'education' },
        { id: '2', title: 'Learn React.js basics', completed: true, dueDate: '2024-04-15', category: 'skill' },
        { id: '3', title: 'Build a portfolio project', completed: false, dueDate: '2024-05-01', category: 'experience' },
        { id: '4', title: 'Master TypeScript', completed: false, dueDate: '2024-05-15', category: 'skill' },
        { id: '5', title: 'Complete System Design course', completed: false, dueDate: '2024-06-01', category: 'education' }
      ]
    }
  ]);

  const steps = ['Profile Input', 'Career Roadmap', 'Educational Milestones', 'Career Insights & Recommendations'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCheckboxChange = (roadmapId: string, itemId: string) => {
    setRoadmaps(prevRoadmaps => 
      prevRoadmaps.map(roadmap => {
        if (roadmap.id === roadmapId) {
          const updatedChecklist = roadmap.checklist.map(item => {
            if (item.id === itemId) {
              return { ...item, completed: !item.completed };
            }
            return item;
          });
          const completedCount = updatedChecklist.filter(item => item.completed).length;
          return {
            ...roadmap,
            checklist: updatedChecklist,
            progress: Math.round((completedCount / updatedChecklist.length) * 100)
          };
        }
        return roadmap;
      })
    );
  };

  const handleSubmitRoadmap = () => {
    // In a real app, this would save the roadmap to a database
    const newRoadmap: Roadmap = {
      id: Date.now().toString(),
      title: `${profileData.careerGoals} Career Path`,
      createdAt: new Date().toISOString(),
      progress: 0,
      checklist: [
        {
          id: '1',
          title: 'Complete initial assessment',
          completed: false,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'education'
        },
        // Add more checklist items based on the user's input
      ]
    };

    setRoadmaps(prev => [...prev, newRoadmap]);
    setActiveTab(1); // Switch to View Progress tab
    setActiveStep(0); // Reset the steps
    setProfileData({
      currentEducation: '',
      careerGoals: '',
      skills: '',
      interests: '',
      timeline: '1-2 years'
    });
  };

  const handleRegenerateRoadmap = () => {
    // Reset the form to start over
    setProfileData({
      currentEducation: '',
      careerGoals: '',
      skills: '',
      interests: '',
      timeline: '1-2 years'
    });
    setActiveStep(0);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Card className="p-6">
            <Typography variant="h6" gutterBottom>Profile Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Education Level"
                  name="currentEducation"
                  value={profileData.currentEducation}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Career Goals"
                  name="careerGoals"
                  value={profileData.careerGoals}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={profileData.skills}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Interests"
                  name="interests"
                  value={profileData.interests}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Card>
        );
      case 1:
        return (
          <Card className="p-6">
            <Typography variant="h6" gutterBottom>Career Roadmap Timeline</Typography>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">Current Position</Typography>
                  <Typography>Start building your foundation</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">6 Months</Typography>
                  <Typography>Skill development and networking</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">1 Year</Typography>
                  <Typography>Achieve intermediate level expertise</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Card>
        );
      case 2:
        return (
          <Card className="p-6">
            <Typography variant="h6" gutterBottom>Educational Milestones</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} className="p-4">
                  <Typography variant="subtitle1">Short-term Goals</Typography>
                  <ul className="list-disc pl-4 mt-2">
                    <li>Complete online courses</li>
                    <li>Attend workshops</li>
                    <li>Build portfolio projects</li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} className="p-4">
                  <Typography variant="subtitle1">Long-term Goals</Typography>
                  <ul className="list-disc pl-4 mt-2">
                    <li>Advanced certifications</li>
                    <li>Industry-specific training</li>
                    <li>Higher education</li>
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        );
      case 3:
        return (
          <Card className="p-6">
            <Typography variant="h6" gutterBottom>Career Insights & Recommendations</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} className="p-4">
                  <Typography variant="subtitle1" gutterBottom>Industry Trends & Future Scope</Typography>
                  <Box className="mt-4">
                    <Line
                      data={{
                        labels: ['2024', '2025', '2026', '2027'],
                        datasets: [
                          {
                            label: 'Industry Growth',
                            data: [65, 75, 85, 95],
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          title: {
                            display: true,
                            text: 'Projected Industry Growth'
                          }
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="body2" className="mt-4">
                    Key trends to watch:
                  </Typography>
                  <ul className="list-disc pl-4 mt-2">
                    <li>AI and Machine Learning integration</li>
                    <li>Remote work opportunities</li>
                    <li>Focus on sustainability</li>
                    <li>Digital transformation</li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} className="p-4">
                  <Typography variant="subtitle1" gutterBottom>Job Platform Strategy</Typography>
                  <Typography variant="body2" className="mt-2">
                    Recommended platforms based on your profile:
                  </Typography>
                  <ul className="list-disc pl-4 mt-2">
                    <li>LinkedIn - Professional networking</li>
                    <li>Indeed - Job search and applications</li>
                    <li>Glassdoor - Company research</li>
                    <li>Industry-specific platforms</li>
                  </ul>
                  <Typography variant="body2" className="mt-4">
                    Optimization tips:
                  </Typography>
                  <ul className="list-disc pl-4 mt-2">
                    <li>Update profile regularly</li>
                    <li>Network with industry professionals</li>
                    <li>Showcase projects and achievements</li>
                    <li>Follow relevant companies</li>
                    <li>Engage with industry content</li>
                    <li>Set up job alerts</li>
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        );
      default:
        return null;
    }
  };

  const renderNewRoadmap = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" gutterBottom className="mb-8">
          Create New Career Roadmap
        </Typography>
        
        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider className="my-6" />

        {renderStepContent(activeStep)}

        <Box className="mt-8 flex justify-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Box className="space-x-4">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRoadmap}
              >
                Submit Roadmap
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRegenerateRoadmap}
              >
                Regenerate Roadmap
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </div>
    );
  };

  const renderRoadmapProgress = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" gutterBottom className="mb-8">
          My Roadmaps
        </Typography>
        
        {roadmaps.map(roadmap => (
          <Card key={roadmap.id} className="mb-6">
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h5">{roadmap.title}</Typography>
                <Chip 
                  label={`${roadmap.progress}% Complete`} 
                  color={roadmap.progress === 100 ? 'success' : 'primary'}
                />
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={roadmap.progress} 
                className="mb-4"
              />

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Checklist</Typography>
                  <List>
                    {roadmap.checklist.map(item => (
                      <ListItem key={item.id}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={item.completed}
                            onChange={() => handleCheckboxChange(roadmap.id, item.id)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={`Due: ${new Date(item.dueDate).toLocaleDateString()}`}
                        />
                        <Chip
                          icon={item.category === 'education' ? <BookOpen size={16} /> : 
                                item.category === 'skill' ? <TrendingUp size={16} /> : 
                                <Briefcase size={16} />}
                          label={item.category}
                          size="small"
                          className="ml-2"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={2} className="p-4">
                    <Typography variant="h6" gutterBottom>Progress Overview</Typography>
                    <Box className="space-y-4">
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Education Goals
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={roadmap.checklist.filter(item => 
                            item.category === 'education' && item.completed
                          ).length / roadmap.checklist.filter(item => 
                            item.category === 'education'
                          ).length * 100} 
                        />
                      </div>
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Skill Development
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={roadmap.checklist.filter(item => 
                            item.category === 'skill' && item.completed
                          ).length / roadmap.checklist.filter(item => 
                            item.category === 'skill'
                          ).length * 100} 
                        />
                      </div>
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Experience Building
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={roadmap.checklist.filter(item => 
                            item.category === 'experience' && item.completed
                          ).length / roadmap.checklist.filter(item => 
                            item.category === 'experience'
                          ).length * 100} 
                        />
                      </div>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          className="mb-6"
        >
          <Tab 
            label="Create New Roadmap" 
            icon={<Plus size={20} />} 
            iconPosition="start" 
          />
          <Tab 
            label="View Progress" 
            icon={<TrendingUp size={20} />} 
            iconPosition="start" 
          />
        </Tabs>
      </Box>

      {activeTab === 0 ? renderNewRoadmap() : renderRoadmapProgress()}
    </div>
  );
};

export default RoadmapGenerator; 