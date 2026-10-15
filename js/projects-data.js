/**
 * ABHAY SHUKLA - PROJECTS ARCHIVE & METRIC DATABASE
 * Deep technical specs for all projects
 */

const PROJECTS_DATA = [
  {
    id: 'ai-attendance',
    title: 'AI Automated Attendance System',
    category: 'ai',
    badge: 'AI & Computer Vision',
    featured: true,
    summary: 'High-precision computer vision & voice-biometric attendance platform capable of logging an entire lecture hall via a single group photo or natural voice chat.',
    metrics: {
      accuracy: '98.4%',
      processingTime: '< 1.8s',
      modalities: 'Dual (Vision + Voice)'
    },
    techStack: ['Python', 'OpenCV', 'FaceNet / PyTorch', 'SpeechRecognition', 'SQLite / SQL', 'Flask API'],
    highlights: [
      'Single-shot multi-face detection & bounding-box clustering for crowded classrooms',
      'Real-time voice-chat attendance authentication using acoustic feature vectors',
      'Anti-spoofing liveness verification guarding against digital screen displays',
      'Automated daily attendance sheet generation with instant anomaly reports'
    ],
    architecture: {
      input: 'High-res lecture hall camera frame OR student microphone voice stream',
      pipeline: 'Facial landmarks extraction -> Deep embedding alignment -> Cosine similarity matcher against student database',
      output: 'Encrypted attendance log in SQL database with timestamp, confidence score, and exportable CSV'
    },
    github: 'https://github.com/abhayshukla',
    demo: '#'
  },
  {
    id: 'trekking-platform',
    title: 'Full-Stack Trekking Management Platform',
    category: 'fullstack',
    badge: 'Full-Stack Ecosystem',
    featured: true,
    summary: 'Next-generation expedition coordination system connecting Trekkers, Ground Staff/Guides, and Trekking Organizers with real-time slot booking, telemetry & logistics.',
    metrics: {
      roles: '3-Tier Architecture',
      reliability: '99.9%',
      realtime: 'Live Booking Sync'
    },
    techStack: ['Python', 'SQL Database', 'REST APIs', 'JavaScript', 'CSS3 Glassmorphism', 'Geolocation'],
    highlights: [
      'Multi-tenant role segmentation: Trekkers (booking/safety), Staff (duty tracking), Company (analytics)',
      'Dynamic inventory allocation: tents, oxygen cylinders, medical kits, and rations',
      'Emergency SOS beacon telemetry and offline trail map synchronization',
      'Automated payment gateway verification and digital gear check-in slips'
    ],
    architecture: {
      input: 'Trekker booking request, altitude log, and staff check-ins',
      pipeline: 'Role-based access gateway -> Transaction manager -> Inventory concurrency lock -> Dispatcher',
      output: 'Confirmed expedition itinerary, guide dispatch alert, and financial reporting ledger'
    },
    github: 'https://github.com/abhayshukla',
    demo: '#'
  },
  {
    id: 'career-portal',
    title: 'Corporate Career & Placement Drive Ecosystem',
    category: 'fullstack',
    badge: 'Enterprise Portal',
    featured: true,
    summary: 'Comprehensive campus placement engine providing an automated environment for recruiter companies, placement drives, and students for streamlined hiring cycles.',
    metrics: {
      workflows: 'Automated Screening',
      entities: '3 (Student / Recruiter / Admin)',
      latency: '< 120ms'
    },
    techStack: ['Python', 'SQL Database Architecture', 'Role-Based Access Control', 'HTML5/CSS3', 'Data Analytics'],
    highlights: [
      'Corporate job requisition portal with customizable eligibility filter parameters (CGPA, skills)',
      'Automated student shortlisting engine matching candidate profiles to job criteria',
      'Multi-round placement drive scheduling: Online assessment, technical rounds, and HR interviews',
      'Placement drive telemetry dashboard visualizing offer distribution and package metrics'
    ],
    architecture: {
      input: 'Company job postings, student academic profiles & resume data',
      pipeline: 'Eligibility rules engine -> Applicant ranking & shortlisting -> Interview slot allocation',
      output: 'Verified offer letters, real-time placement stats, and recruiter review logs'
    },
    github: 'https://github.com/abhayshukla',
    demo: '#'
  },
  {
    id: 'hospital-management',
    title: 'Smart Clinical & Hospital Management System',
    category: 'system',
    badge: 'Healthcare Ops',
    featured: false,
    summary: 'Scalable clinical operations suite developed for seamless Electronic Health Records (EHR), outpatient appointment scheduling, doctor shifts, and pharmacy billing.',
    metrics: {
      security: 'Role Encrypted',
      modules: 'EHR / OPD / Billing',
      scalability: 'Relational Schema'
    },
    techStack: ['Python', 'SQL (Complex Joins & Views)', 'Database Normalization', 'GUI / Web Interface'],
    highlights: [
      'Comprehensive patient health history tracking with timeline of consultations and diagnoses',
      'Automated OPD appointment slot scheduling with doctor availability conflict resolution',
      'Integrated medical billing module calculating medicine costs, room tariffs, and receipts',
      'Staff permission control separating Receptionists, Doctors, Pharmacists, and Hospital Admins'
    ],
    architecture: {
      input: 'Patient demographics, vital metrics, prescription records, doctor notes',
      pipeline: 'Normalized relational schema (3NF) -> ACID transactions -> Query optimization layer',
      output: 'Instant OPD token generation, formatted invoice generation, and doctor shift timetable'
    },
    github: 'https://github.com/abhayshukla',
    demo: '#'
  },
  {
    id: 'inventory-system',
    title: 'Automated Inventory & Stock Tracking Engine',
    category: 'system',
    badge: 'Supply Chain & Database',
    featured: false,
    summary: 'High-throughput stock tracking and warehouse inventory system with automated low-stock warnings, supplier dispatch records, and SQL-backed audit logging.',
    metrics: {
      queryPerformance: 'Optimized Indexing',
      auditing: '100% Immutable',
      alerts: 'Automated Reorder'
    },
    techStack: ['Python', 'SQL Relational DB', 'Data Handling', 'MS Excel Integration', 'Report Generation'],
    highlights: [
      'Real-time inventory deduction upon order dispatch with atomic database transactions',
      'Configurable minimum threshold alerts flagging replenishment requirements before stockouts',
      'Supplier transaction ledger maintaining procurement costs, vendor contacts, and batch IDs',
      'Excel/CSV bidirectional data sync for executive financial review and quarterly stock audits'
    ],
    architecture: {
      input: 'Warehouse SKU scans, goods received notes (GRN), and sales dispatches',
      pipeline: 'Trigger-based stock reconciliation -> Inventory discrepancy checks -> Audit trail writer',
      output: 'Live stock level dashboard, reorder notifications, and historical stock valuation reports'
    },
    github: 'https://github.com/abhayshukla',
    demo: '#'
  }
];

if (typeof module !== 'undefined') {
  module.exports = { PROJECTS_DATA };
}
