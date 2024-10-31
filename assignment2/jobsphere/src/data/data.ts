export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: Date;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface JobApplication {
  id: number;
  jobId: number;
  jobSeekerId: number;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  applicationDate: Date;
}

export interface JobSeeker {
  id: number;
  name: string;
  email: string;
  password: string;
  currentJobTitle: string;
  experienceLevel: string;
  skills: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$100k - $150k',
    postedDate: new Date('2024-10-28'),
    description:
      'We are seeking a talented Software Engineer to join our team...',
    requirements: [
      '5+ years of experience',
      'Proficiency in JavaScript',
      "Bachelor's degree in Computer Science",
    ],
    benefits: ['Health insurance', '401(k) matching', 'Flexible work hours'],
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'DataMind Analytics',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $180k',
    postedDate: new Date('2024-10-25'),
    description:
      'Join our data science team to solve complex problems using machine learning...',
    requirements: [
      'MS or PhD in Data Science or related field',
      'Experience with Python and R',
      'Strong statistical background',
    ],
    benefits: [
      'Competitive salary',
      'Stock options',
      'Remote work opportunities',
    ],
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'CreativeWorks Studio',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$80k - $120k',
    postedDate: new Date('2024-10-29'),
    description:
      'Were looking for a talented UX Designer to create intuitive and engaging user experiences...',
    requirements: [
      '3+ years of UX design experience',
      'Proficiency in Figma and Sketch',
      'Strong portfolio',
    ],
    benefits: [
      'Flexible schedule',
      'Creative work environment',
      'Professional development budget',
    ],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudScale Solutions',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110k - $160k',
    postedDate: new Date('2024-10-27'),
    description:
      'Join our DevOps team to build and maintain scalable cloud infrastructure...',
    requirements: [
      'Experience with AWS or Azure',
      'Knowledge of containerization and orchestration',
      'Scripting skills in Python or Bash',
    ],
    benefits: [
      'Generous vacation policy',
      'Health and wellness programs',
      'Regular team-building events',
    ],
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'GrowthBoost Marketing',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$90k - $130k',
    postedDate: new Date('2024-10-26'),
    description:
      'Lead our marketing efforts to drive growth and brand awareness...',
    requirements: [
      '5+ years of marketing experience',
      'Proven track record in digital marketing',
      'Strong analytical skills',
    ],
    benefits: [
      'Performance bonuses',
      'Professional development opportunities',
      'Gym membership',
    ],
  },
];

export const jobApplications: JobApplication[] = [
  {
    id: 1,
    jobId: 1,
    jobSeekerId: 2,
    fullName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '555-123-4567',
    coverLetter: 'I am excited to apply for the Software Engineer position...',
    applicationDate: new Date('2024-10-29'),
  },
  {
    id: 2,
    jobId: 2,
    jobSeekerId: 1,
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '555-987-6543',
    coverLetter: 'As an experienced Data Scientist, I am thrilled to apply...',
    applicationDate: new Date('2024-10-27'),
  },
  {
    id: 3,
    jobId: 3,
    jobSeekerId: 3,
    fullName: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '555-246-8135',
    coverLetter:
      'I believe my creative skills make me an ideal candidate for the UX Designer role...',
    applicationDate: new Date('2024-10-30'),
  },
];

export const jobSeekers: JobSeeker[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'hashedpassword123',
    currentJobTitle: 'Junior Data Analyst',
    experienceLevel: 'Mid-level',
    skills: ['Python', 'R', 'SQL', 'Data Visualization'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    password: 'hashedpassword456',
    currentJobTitle: 'Frontend Developer',
    experienceLevel: 'Senior',
    skills: ['JavaScript', 'React', 'CSS', 'HTML'],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    password: 'hashedpassword789',
    currentJobTitle: 'UI/UX Designer',
    experienceLevel: 'Entry-level',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing'],
  },
  {
    id: 4,
    name: 'Bob Williams',
    email: 'bob.williams@email.com',
    password: 'hashedpasswordabc',
    currentJobTitle: 'DevOps Engineer',
    experienceLevel: 'Senior',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
  },
  {
    id: 5,
    name: 'Emily Brown',
    email: 'emily.brown@email.com',
    password: 'hashedpassworddef',
    currentJobTitle: 'Marketing Specialist',
    experienceLevel: 'Mid-level',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
  },
];
