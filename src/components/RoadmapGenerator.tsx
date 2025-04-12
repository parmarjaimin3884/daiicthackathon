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
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
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
  Briefcase,
  Filter,
  SortAsc,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Download,
  BarChart2,
  Clock,
  Target,
  Award
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
  lastUpdated: string;
  targetCompletionDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'on-hold';
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
      ],
      lastUpdated: '2024-03-15',
      targetCompletionDate: '2024-06-01',
      priority: 'high',
      status: 'active'
    },
    {
      id: '2',
      title: 'Data Science Specialization',
      createdAt: '2024-02-01',
      progress: 100,
      checklist: [
        { id: '6', title: 'Python for Data Science', completed: true, dueDate: '2024-02-15', category: 'skill' },
        { id: '7', title: 'Statistics Fundamentals', completed: true, dueDate: '2024-03-01', category: 'education' },
        { id: '8', title: 'Machine Learning Basics', completed: true, dueDate: '2024-03-15', category: 'skill' }
      ],
      lastUpdated: '2024-03-15',
      targetCompletionDate: '2024-03-15',
      priority: 'medium',
      status: 'completed'
    },
    {
      id: '3',
      title: 'UI/UX Design Path',
      createdAt: '2024-01-15',
      progress: 30,
      checklist: [
        { id: '9', title: 'Learn Figma', completed: true, dueDate: '2024-02-01', category: 'skill' },
        { id: '10', title: 'UX Research Methods', completed: false, dueDate: '2024-02-15', category: 'education' },
        { id: '11', title: 'Design System Creation', completed: false, dueDate: '2024-03-01', category: 'experience' }
      ],
      lastUpdated: '2024-02-01',
      targetCompletionDate: '2024-04-01',
      priority: 'low',
      status: 'on-hold'
    }
  ]);

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'on-hold'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'progress' | 'priority' | 'dueDate'>('progress');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Add new states for roadmap editing
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'education' | 'skill' | 'experience'>('skill');
  const [newTaskDueDate, setNewTaskDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Add state for notifications
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    type: 'success'
  });

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
          const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);
          
          showNotification(
            `Task marked as ${!roadmap.checklist.find(i => i.id === itemId)?.completed ? 'completed' : 'incomplete'}!`,
            'info'
          );
          
          return {
            ...roadmap,
            checklist: updatedChecklist,
            progress: newProgress
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
      ],
      lastUpdated: new Date().toISOString(),
      targetCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      status: 'active'
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

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle filter changes
  const handleFilterStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value as any);
  };

  const handleFilterPriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPriority(event.target.value as any);
  };

  // Handle sort changes
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value as any);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter and sort roadmaps
  const getFilteredRoadmaps = () => {
    return roadmaps
      .filter(roadmap => {
        const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || roadmap.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || roadmap.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'progress':
            return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress;
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return sortOrder === 'asc' 
              ? priorityOrder[a.priority] - priorityOrder[b.priority]
              : priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'dueDate':
            return sortOrder === 'asc'
              ? new Date(a.targetCompletionDate).getTime() - new Date(b.targetCompletionDate).getTime()
              : new Date(b.targetCompletionDate).getTime() - new Date(a.targetCompletionDate).getTime();
          default:
            return 0;
        }
      });
  };

  // Handle roadmap actions
  const handleEditRoadmap = (roadmapId: string) => {
    // In a real app, this would open an edit modal
    console.log('Edit roadmap:', roadmapId);
  };

  const handleShareRoadmap = (roadmapId: string) => {
    // In a real app, this would open a share dialog
    console.log('Share roadmap:', roadmapId);
  };

  const handleDownloadRoadmap = (roadmapId: string) => {
    // In a real app, this would generate and download a PDF
    console.log('Download roadmap:', roadmapId);
  };

  const handleDeleteRoadmap = (roadmapId: string) => {
    setRoadmaps(prev => prev.filter(roadmap => roadmap.id !== roadmapId));
  };

  // Handle checklist item actions
  const handleAddChecklistItem = (roadmapId: string) => {
    setRoadmaps(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          const newItem: ChecklistItem = {
            id: Date.now().toString(),
            title: 'New Task',
            completed: false,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'skill'
          };
          return {
            ...roadmap,
            checklist: [...roadmap.checklist, newItem]
          };
        }
        return roadmap;
      })
    );
  };

  const handleEditChecklistItem = (roadmapId: string, itemId: string, updates: Partial<ChecklistItem>) => {
    setRoadmaps(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          const updatedChecklist = roadmap.checklist.map(item => {
            if (item.id === itemId) {
              return { ...item, ...updates };
            }
            return item;
          });
          return {
            ...roadmap,
            checklist: updatedChecklist,
            lastUpdated: new Date().toISOString()
          };
        }
        return roadmap;
      })
    );
  };

  const handleDeleteChecklistItem = (roadmapId: string, itemId: string) => {
    setRoadmaps(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          const updatedChecklist = roadmap.checklist.filter(item => item.id !== itemId);
          const completedCount = updatedChecklist.filter(item => item.completed).length;
          return {
            ...roadmap,
            checklist: updatedChecklist,
            progress: Math.round((completedCount / updatedChecklist.length) * 100),
            lastUpdated: new Date().toISOString()
          };
        }
        return roadmap;
      })
    );
  };

  // Handle roadmap status changes
  const handleStatusChange = (roadmapId: string, newStatus: 'active' | 'completed' | 'on-hold') => {
    setRoadmaps(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          return {
            ...roadmap,
            status: newStatus,
            lastUpdated: new Date().toISOString()
          };
        }
        return roadmap;
      })
    );
  };

  // Handle roadmap priority changes
  const handlePriorityChange = (roadmapId: string, newPriority: 'high' | 'medium' | 'low') => {
    setRoadmaps(prev => 
      prev.map(roadmap => {
        if (roadmap.id === roadmapId) {
          return {
            ...roadmap,
            priority: newPriority,
            lastUpdated: new Date().toISOString()
          };
        }
        return roadmap;
      })
    );
  };

  // Calculate roadmap statistics
  const getRoadmapStatistics = () => {
    const totalRoadmaps = roadmaps.length;
    const activeRoadmaps = roadmaps.filter(r => r.status === 'active').length;
    const completedRoadmaps = roadmaps.filter(r => r.status === 'completed').length;
    const onHoldRoadmaps = roadmaps.filter(r => r.status === 'on-hold').length;
    const averageProgress = Math.round(roadmaps.reduce((acc, curr) => acc + curr.progress, 0) / totalRoadmaps);

    return {
      totalRoadmaps,
      activeRoadmaps,
      completedRoadmaps,
      onHoldRoadmaps,
      averageProgress
    };
  };

  // Function to start editing a roadmap
  const startEditingRoadmap = (roadmap: Roadmap) => {
    setEditingRoadmap(roadmap);
    setIsEditMode(true);
  };

  // Function to show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      open: true,
      message,
      type
    });
  };

  // Function to handle notification close
  const handleNotificationClose = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Function to save roadmap edits
  const saveRoadmapEdits = () => {
    if (!editingRoadmap) return;

    setRoadmaps(prev => prev.map(r => 
      r.id === editingRoadmap.id ? editingRoadmap : r
    ));
    setIsEditMode(false);
    setEditingRoadmap(null);
    showNotification('Roadmap updated successfully!');
  };

  // Function to add new task to roadmap
  const addNewTask = (roadmapId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: ChecklistItem = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      dueDate: new Date(newTaskDueDate).toISOString(),
      category: newTaskCategory
    };

    setRoadmaps(prev => prev.map(roadmap => {
      if (roadmap.id === roadmapId) {
        return {
          ...roadmap,
          checklist: [...roadmap.checklist, newTask],
          lastUpdated: new Date().toISOString()
        };
      }
      return roadmap;
    }));

    setNewTaskTitle('');
    setNewTaskCategory('skill');
    setNewTaskDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    showNotification('New task added successfully!');
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
    // Calculate active roadmaps statistics
    const activeRoadmaps = roadmaps.filter(r => r.status === 'active');
    const activeStats = {
      count: activeRoadmaps.length,
      avgProgress: activeRoadmaps.length > 0 
        ? Math.round(activeRoadmaps.reduce((acc, curr) => acc + curr.progress, 0) / activeRoadmaps.length)
        : 0,
      totalTasks: activeRoadmaps.reduce((acc, curr) => acc + curr.checklist.length, 0),
      completedTasks: activeRoadmaps.reduce((acc, curr) => 
        acc + curr.checklist.filter(task => task.completed).length, 0
      )
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <Box className="flex justify-between items-center mb-8">
          <Typography variant="h4">My Roadmaps</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={() => setActiveTab(0)}
          >
            Create New Roadmap
          </Button>
        </Box>

        {/* Active Roadmaps Stats */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box className="flex items-center mb-4">
                  <Target className="text-blue-600 mr-3" size={28} />
                  <div>
                    <Typography variant="h5" className="text-blue-600 font-bold">
                      Active Roadmaps
                    </Typography>
                    <Typography variant="h3" className="text-blue-700 font-bold mt-1">
                      {activeStats.count}
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="flex flex-col justify-center h-full">
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Overall Progress
                  </Typography>
                  <Box className="flex items-center">
                    <Box className="flex-grow mr-3">
                      <LinearProgress 
                        variant="determinate" 
                        value={activeStats.avgProgress}
                        className="h-2 rounded"
                      />
                    </Box>
                    <Typography variant="h6" className="text-blue-600 font-bold whitespace-nowrap">
                      {activeStats.avgProgress}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" className="mt-2">
                    {activeStats.completedTasks} of {activeStats.totalTasks} tasks completed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Roadmap Cards */}
        {roadmaps.filter(r => r.status === 'active').map(roadmap => {
          const isEditing = isEditMode && editingRoadmap?.id === roadmap.id;
          
          // Calculate category-specific progress
          const getProgressByCategory = (category: string) => {
            const categoryItems = roadmap.checklist.filter(item => item.category === category);
            if (categoryItems.length === 0) return 0;
            const completedItems = categoryItems.filter(item => item.completed);
            return Math.round((completedItems.length / categoryItems.length) * 100);
          };

          return (
            <Grid item xs={12} key={roadmap.id}>
              <Card className="mb-6">
                <CardContent>
                  <Box className="flex justify-between items-start mb-4">
                    <Box>
                      {isEditing ? (
                        <TextField
                          value={editingRoadmap.title}
                          onChange={(e) => setEditingRoadmap({
                            ...editingRoadmap,
                            title: e.target.value
                          })}
                          variant="outlined"
                          size="small"
                          className="mb-2"
                        />
                      ) : (
                        <Typography variant="h5" gutterBottom>
                          {roadmap.title}
                        </Typography>
                      )}
                      <Box className="flex items-center space-x-4">
                        <Chip 
                          label={`${roadmap.progress}% Complete`} 
                          color={roadmap.progress === 100 ? 'success' : 'primary'}
                        />
                        {isEditing ? (
                          <Select
                            value={editingRoadmap.priority}
                            onChange={(e) => setEditingRoadmap({
                              ...editingRoadmap,
                              priority: e.target.value as 'high' | 'medium' | 'low'
                            })}
                            size="small"
                          >
                            <MenuItem value="high">High Priority</MenuItem>
                            <MenuItem value="medium">Medium Priority</MenuItem>
                            <MenuItem value="low">Low Priority</MenuItem>
                          </Select>
                        ) : (
                          <Chip
                            label={roadmap.priority}
                            color={
                              roadmap.priority === 'high' ? 'error' :
                              roadmap.priority === 'medium' ? 'warning' :
                              'success'
                            }
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box className="flex space-x-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={saveRoadmapEdits}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => {
                              setIsEditMode(false);
                              setEditingRoadmap(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <IconButton size="small" onClick={() => startEditingRoadmap(roadmap)}>
                            <Edit size={20} />
                          </IconButton>
                          <IconButton size="small">
                            <Share2 size={20} />
                          </IconButton>
                          <IconButton size="small">
                            <Download size={20} />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={roadmap.progress} 
                    className="mb-4"
                  />

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6">Checklist</Typography>
                        {!isEditing && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Plus size={16} />}
                            onClick={() => startEditingRoadmap(roadmap)}
                          >
                            Add Task
                          </Button>
                        )}
                      </Box>

                      {isEditing && (
                        <Paper className="p-4 mb-4">
                          <Typography variant="subtitle2" gutterBottom>
                            Add New Task
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Task Title"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Category</InputLabel>
                                <Select
                                  value={newTaskCategory}
                                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                                  label="Category"
                                >
                                  <MenuItem value="education">Education</MenuItem>
                                  <MenuItem value="skill">Skill</MenuItem>
                                  <MenuItem value="experience">Experience</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                type="date"
                                label="Due Date"
                                value={newTaskDueDate}
                                onChange={(e) => setNewTaskDueDate(e.target.value)}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addNewTask(roadmap.id)}
                                disabled={!newTaskTitle.trim()}
                              >
                                Add Task
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      )}

                      <List>
                        {roadmap.checklist.map(item => (
                          <ListItem
                            key={item.id}
                            secondaryAction={isEditing && (
                              <IconButton
                                edge="end"
                                onClick={() => {
                                  if (editingRoadmap) {
                                    setEditingRoadmap({
                                      ...editingRoadmap,
                                      checklist: editingRoadmap.checklist.filter(t => t.id !== item.id)
                                    });
                                  }
                                }}
                              >
                                <Trash2 size={16} />
                              </IconButton>
                            )}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={item.completed}
                                onChange={() => handleCheckboxChange(roadmap.id, item.id)}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={isEditing ? (
                                <TextField
                                  value={item.title}
                                  onChange={(e) => {
                                    if (editingRoadmap) {
                                      setEditingRoadmap({
                                        ...editingRoadmap,
                                        checklist: editingRoadmap.checklist.map(t =>
                                          t.id === item.id ? { ...t, title: e.target.value } : t
                                        )
                                      });
                                    }
                                  }}
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                item.title
                              )}
                              secondary={
                                <Box className="flex items-center space-x-4">
                                  {isEditing ? (
                                    <>
                                      <TextField
                                        type="date"
                                        value={item.dueDate.split('T')[0]}
                                        onChange={(e) => {
                                          if (editingRoadmap) {
                                            setEditingRoadmap({
                                              ...editingRoadmap,
                                              checklist: editingRoadmap.checklist.map(t =>
                                                t.id === item.id ? { ...t, dueDate: e.target.value } : t
                                              )
                                            });
                                          }
                                        }}
                                        size="small"
                                      />
                                      <Select
                                        value={item.category}
                                        onChange={(e) => {
                                          if (editingRoadmap) {
                                            setEditingRoadmap({
                                              ...editingRoadmap,
                                              checklist: editingRoadmap.checklist.map(t =>
                                                t.id === item.id ? { ...t, category: e.target.value as any } : t
                                              )
                                            });
                                          }
                                        }}
                                        size="small"
                                      >
                                        <MenuItem value="education">Education</MenuItem>
                                        <MenuItem value="skill">Skill</MenuItem>
                                        <MenuItem value="experience">Experience</MenuItem>
                                      </Select>
                                    </>
                                  ) : (
                                    <>
                                      <Typography variant="body2">
                                        Due: {new Date(item.dueDate).toLocaleDateString()}
                                      </Typography>
                                      <Chip
                                        icon={item.category === 'education' ? <BookOpen size={16} /> : 
                                              item.category === 'skill' ? <TrendingUp size={16} /> : 
                                              <Briefcase size={16} />}
                                        label={item.category}
                                        size="small"
                                      />
                                    </>
                                  )}
                                </Box>
                              }
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
                              value={getProgressByCategory('education')} 
                            />
                          </div>
                          <div>
                            <Typography variant="body2" color="textSecondary">
                              Skill Development
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={getProgressByCategory('skill')} 
                            />
                          </div>
                          <div>
                            <Typography variant="body2" color="textSecondary">
                              Experience Building
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={getProgressByCategory('experience')} 
                            />
                          </div>
                        </Box>
                        <Divider className="my-4" />
                        <Box className="space-y-2">
                          <Typography variant="body2" color="textSecondary">
                            Created: {new Date(roadmap.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Last Updated: {new Date(roadmap.lastUpdated).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Target Completion: {new Date(roadmap.targetCompletionDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
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

      {/* Add Snackbar at the end of the component */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoadmapGenerator; 