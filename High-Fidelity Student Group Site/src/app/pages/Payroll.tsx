import { useState } from 'react';
import { Search, Edit, DollarSign, X } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  hoursWorked?: number;
  hourlyRate?: number;
  deductions?: number;
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'John Anderson', position: 'Senior Developer', department: 'Engineering' },
  { id: 2, name: 'Sarah Williams', position: 'Product Manager', department: 'Product' },
  { id: 3, name: 'Michael Chen', position: 'UI/UX Designer', department: 'Design' },
  { id: 4, name: 'Emily Johnson', position: 'HR Manager', department: 'Human Resources' },
  { id: 5, name: 'David Martinez', position: 'DevOps Engineer', department: 'Engineering' },
  { id: 6, name: 'Jennifer Lee', position: 'Marketing Lead', department: 'Marketing' },
  { id: 7, name: 'Robert Taylor', position: 'Sales Director', department: 'Sales' },
  { id: 8, name: 'Lisa Brown', position: 'Frontend Developer', department: 'Engineering' },
  { id: 9, name: 'James Wilson', position: 'Backend Developer', department: 'Engineering' },
  { id: 10, name: 'Maria Garcia', position: 'QA Engineer', department: 'Engineering' },
  { id: 11, name: 'Christopher Davis', position: 'Data Analyst', department: 'Analytics' },
  { id: 12, name: 'Amanda Rodriguez', position: 'Content Writer', department: 'Marketing' },
  { id: 13, name: 'Daniel Kim', position: 'Security Specialist', department: 'Security' },
  { id: 14, name: 'Jessica Moore', position: 'Account Manager', department: 'Sales' },
  { id: 15, name: 'Matthew Jackson', position: 'Full Stack Developer', department: 'Engineering' },
  { id: 16, name: 'Ashley White', position: 'Graphic Designer', department: 'Design' },
  { id: 17, name: 'Joshua Harris', position: 'Business Analyst', department: 'Analytics' },
  { id: 18, name: 'Nicole Martin', position: 'Customer Support Lead', department: 'Support' },
  { id: 19, name: 'Andrew Thompson', position: 'Finance Manager', department: 'Finance' },
  { id: 20, name: 'Samantha Lewis', position: 'Legal Counsel', department: 'Legal' },
];

// Generate more employees to reach 50+
for (let i = 21; i <= 55; i++) {
  const departments = ['Engineering', 'Marketing', 'Sales', 'Support', 'Finance', 'HR', 'Design'];
  const positions = ['Developer', 'Analyst', 'Manager', 'Specialist', 'Coordinator', 'Associate'];
  initialEmployees.push({
    id: i,
    name: `Employee ${i}`,
    position: positions[i % positions.length],
    department: departments[i % departments.length],
  });
}

export function Payroll() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [hoursWorked, setHoursWorked] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [deductions, setDeductions] = useState('');

  const filteredEmployees = initialEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setHoursWorked(employee.hoursWorked?.toString() || '');
    setHourlyRate(employee.hourlyRate?.toString() || '');
    setDeductions(employee.deductions?.toString() || '');
  };

  const handleClose = () => {
    setSelectedEmployee(null);
    setHoursWorked('');
    setHourlyRate('');
    setDeductions('');
  };

  const calculateGrossPay = () => {
    const hours = parseFloat(hoursWorked) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    return hours * rate;
  };

  const calculateNetPay = () => {
    const gross = calculateGrossPay();
    const deduct = parseFloat(deductions) || 0;
    return gross - deduct;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="w-8 h-8 text-accent" />
          <h1>Payroll Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Manage payroll for {initialEmployees.length} employees
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg shadow-sm">
            {/* Search Bar */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search employees by name, position, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-auto max-h-[600px]">
              <table className="w-full">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm">Name</th>
                    <th className="text-left px-4 py-3 text-sm">Position</th>
                    <th className="text-left px-4 py-3 text-sm">Department</th>
                    <th className="text-center px-4 py-3 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">{employee.name}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{employee.position}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{employee.department}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Panel / Payslip */}
        <div className="lg:col-span-1">
          {selectedEmployee ? (
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-card-foreground">Calculate Payroll</h3>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Employee Info */}
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h4 className="text-card-foreground mb-1">{selectedEmployee.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block mb-2 text-card-foreground">Hours Worked</label>
                  <input
                    type="number"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                    placeholder="160"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-card-foreground">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="25.00"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-card-foreground">Deductions ($)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    placeholder="500.00"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Payslip Preview */}
              <div className="border-t border-border pt-6">
                <h4 className="text-card-foreground mb-4">Payslip Preview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Gross Pay</span>
                    <span className="text-card-foreground text-xl">
                      ${calculateGrossPay().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Deductions</span>
                    <span className="text-destructive text-xl">
                      -${(parseFloat(deductions) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-accent text-accent-foreground rounded-lg">
                    <span>Net Pay</span>
                    <span className="text-2xl">
                      ${calculateNetPay().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select an employee to calculate payroll</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
