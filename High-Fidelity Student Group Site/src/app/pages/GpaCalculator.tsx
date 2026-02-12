import { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  units: string;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  'A': 5.0,
  'B': 4.0,
  'C': 3.0,
  'D': 2.0,
  'E': 1.0,
  'F': 0.0,
};

export function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', units: '', grade: '' },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', units: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalUnits = 0;

    courses.forEach(course => {
      const units = parseFloat(course.units) || 0;
      const points = gradePoints[course.grade] || 0;

      if (units > 0 && course.grade) {
        totalPoints += units * points;
        totalUnits += units;
      }
    });

    return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
  };

  const getGPAClass = () => {
    const gpa = parseFloat(calculateGPA());
    if (gpa >= 4.5) return 'First Class';
    if (gpa >= 3.5) return 'Second Class Upper';
    if (gpa >= 2.5) return 'Second Class Lower';
    if (gpa >= 1.5) return 'Third Class';
    return 'Pass';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1>GPA Calculator</h1>
        </div>
        <p className="text-muted-foreground">
          Calculate your 1st semester Grade Point Average
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Input Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-card-foreground">Course Details</h3>
              <button
                onClick={addCourse}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-muted rounded-lg">
              <div className="col-span-5 text-sm">Course Name</div>
              <div className="col-span-2 text-sm">Units</div>
              <div className="col-span-3 text-sm">Grade</div>
              <div className="col-span-2 text-sm text-center">Action</div>
            </div>

            {/* Course Rows */}
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-muted/50 rounded-lg border border-border"
                >
                  {/* Course Name */}
                  <div className="md:col-span-5">
                    <label className="block md:hidden mb-2 text-sm">Course Name</label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      placeholder="e.g., Data Structures"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Units */}
                  <div className="md:col-span-2">
                    <label className="block md:hidden mb-2 text-sm">Units</label>
                    <input
                      type="number"
                      value={course.units}
                      onChange={(e) => updateCourse(course.id, 'units', e.target.value)}
                      placeholder="3"
                      min="0"
                      max="6"
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Grade */}
                  <div className="md:col-span-3">
                    <label className="block md:hidden mb-2 text-sm">Grade</label>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select</option>
                      <option value="A">A (5.0)</option>
                      <option value="B">B (4.0)</option>
                      <option value="C">C (3.0)</option>
                      <option value="D">D (2.0)</option>
                      <option value="E">E (1.0)</option>
                      <option value="F">F (0.0)</option>
                    </select>
                  </div>

                  {/* Delete Button */}
                  <div className="md:col-span-2 flex items-end md:items-center justify-end md:justify-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="inline-flex items-center gap-2 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="md:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grade Scale Reference */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-card-foreground mb-3 text-sm">Grade Scale Reference</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
                {Object.entries(gradePoints).map(([grade, points]) => (
                  <div key={grade} className="flex items-center gap-2">
                    <span className="font-medium">{grade}:</span>
                    <span className="text-muted-foreground">{points.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GPA Result Display */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-0">
            <h3 className="text-card-foreground mb-6">GPA Result</h3>

            {/* Large GPA Display */}
            <div className="mb-6 p-6 bg-gradient-to-br from-accent to-accent/80 rounded-lg text-center">
              <p className="text-accent-foreground/80 mb-2">Your GPA</p>
              <p className="text-6xl text-accent-foreground mb-2">{calculateGPA()}</p>
              <div className="inline-block px-4 py-2 bg-accent-foreground/20 rounded-full">
                <p className="text-accent-foreground text-sm">{getGPAClass()}</p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Total Courses</p>
                <p className="text-card-foreground text-xl">
                  {courses.filter(c => c.name && c.units && c.grade).length}
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Total Units</p>
                <p className="text-card-foreground text-xl">
                  {courses.reduce((sum, c) => sum + (parseFloat(c.units) || 0), 0)}
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Quality Points</p>
                <p className="text-card-foreground text-xl">
                  {courses.reduce((sum, c) => {
                    const units = parseFloat(c.units) || 0;
                    const points = gradePoints[c.grade] || 0;
                    return sum + (units * points);
                  }, 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Add all your courses with their units and grades to calculate your semester GPA accurately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
