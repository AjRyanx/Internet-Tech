import { Users } from 'lucide-react';

interface Course {
  code: string;
  title: string;
}

interface GroupMember {
  id: number;
  matricNumber: string;
  fullName: string;
  courses: Course[];
}

const groupMembers: GroupMember[] = [
  {
    id: 1,
    matricNumber: 'CSC/2021/001',
    fullName: 'Adebayo Oluwaseun',
    courses: [
      { code: 'CSC301', title: 'Data Structures and Algorithms' },
      { code: 'CSC302', title: 'Database Management Systems' },
      { code: 'CSC303', title: 'Operating Systems' },
      { code: 'MTH301', title: 'Numerical Analysis' },
    ],
  },
  {
    id: 2,
    matricNumber: 'CSC/2021/002',
    fullName: 'Chioma Nwosu',
    courses: [
      { code: 'CSC301', title: 'Data Structures and Algorithms' },
      { code: 'CSC304', title: 'Software Engineering' },
      { code: 'CSC305', title: 'Computer Networks' },
      { code: 'GST301', title: 'Entrepreneurship Studies' },
    ],
  },
  {
    id: 3,
    matricNumber: 'CSC/2021/003',
    fullName: 'Ibrahim Mohammed',
    courses: [
      { code: 'CSC302', title: 'Database Management Systems' },
      { code: 'CSC303', title: 'Operating Systems' },
      { code: 'CSC306', title: 'Web Development' },
      { code: 'MTH302', title: 'Linear Algebra' },
    ],
  },
  {
    id: 4,
    matricNumber: 'CSC/2021/004',
    fullName: 'Fatima Abubakar',
    courses: [
      { code: 'CSC301', title: 'Data Structures and Algorithms' },
      { code: 'CSC304', title: 'Software Engineering' },
      { code: 'CSC307', title: 'Artificial Intelligence' },
      { code: 'STA301', title: 'Probability and Statistics' },
    ],
  },
  {
    id: 5,
    matricNumber: 'CSC/2021/005',
    fullName: 'Ngozi Okafor',
    courses: [
      { code: 'CSC302', title: 'Database Management Systems' },
      { code: 'CSC305', title: 'Computer Networks' },
      { code: 'CSC308', title: 'Mobile App Development' },
      { code: 'PHY301', title: 'Electronics' },
    ],
  },
  {
    id: 6,
    matricNumber: 'CSC/2021/006',
    fullName: 'Emeka Okonkwo',
    courses: [
      { code: 'CSC301', title: 'Data Structures and Algorithms' },
      { code: 'CSC303', title: 'Operating Systems' },
      { code: 'CSC306', title: 'Web Development' },
      { code: 'MTH301', title: 'Numerical Analysis' },
    ],
  },
];

export function Home() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-accent" />
          <h1>Group Portal Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Overview of all group members and their registered courses
        </p>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groupMembers.map((member) => (
          <div
            key={member.id}
            className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Member Header */}
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-card-foreground mb-1">{member.fullName}</h3>
                  <p className="text-muted-foreground text-sm">
                    Matric No: <span className="text-accent font-medium">{member.matricNumber}</span>
                  </p>
                </div>
                <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                  {member.courses.length} Courses
                </div>
              </div>
            </div>

            {/* Registered Courses */}
            <div>
              <h4 className="text-card-foreground mb-3">Registered Courses</h4>
              <div className="space-y-2">
                {member.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-muted rounded-md p-3 flex items-start gap-3"
                  >
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm min-w-[80px] text-center">
                      {course.code}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">{course.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary text-primary-foreground rounded-lg p-6">
          <p className="text-primary-foreground/80 mb-1">Total Members</p>
          <p className="text-3xl">{groupMembers.length}</p>
        </div>
        <div className="bg-accent text-accent-foreground rounded-lg p-6">
          <p className="text-accent-foreground/80 mb-1">Total Courses</p>
          <p className="text-3xl">
            {new Set(groupMembers.flatMap(m => m.courses.map(c => c.code))).size}
          </p>
        </div>
        <div className="bg-secondary text-secondary-foreground rounded-lg p-6">
          <p className="text-secondary-foreground/80 mb-1">Avg. Courses/Student</p>
          <p className="text-3xl">
            {(groupMembers.reduce((sum, m) => sum + m.courses.length, 0) / groupMembers.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
