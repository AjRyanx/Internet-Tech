<?php 
include 'includes/header.php'; 

// Mock Employees Data (Reduced set for display)
// Mock Employees Data 
// $employees = [
//     ['id' => 1, 'name' => 'John Anderson', 'position' => 'Senior Developer', 'dept' => 'Engineering'],
//     ['id' => 2, 'name' => 'Sarah Williams', 'position' => 'Product Manager', 'dept' => 'Product'],
//     ['id' => 3, 'name' => 'Michael Chen', 'position' => 'UI/UX Designer', 'dept' => 'Design'],
//     ['id' => 4, 'name' => 'Emily Johnson', 'position' => 'HR Manager', 'dept' => 'Human Resources'],
//     ['id' => 5, 'name' => 'David Martinez', 'position' => 'DevOps Engineer', 'dept' => 'Engineering'],
//     ['id' => 6, 'name' => 'Jennifer Lee', 'position' => 'Marketing Lead', 'dept' => 'Marketing'],
// ];

// Generate additional employees to reach at least 50
$departments = ['Engineering', 'Marketing', 'Sales', 'Support', 'Finance', 'HR', 'Design'];
$positions = ['Developer', 'Analyst', 'Manager', 'Specialist', 'Coordinator', 'Associate'];

for ($i = 1; $i <= 50; $i++) {
    $employees[] = [
        'id' => $i,
        'name' => "Employee $i",
        'position' => $positions[$i % count($positions)],
        'dept' => $departments[$i % count($departments)]
    ];
}

$selected_employee = null;
$payslip = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hours = filter_input(INPUT_POST, 'hours', FILTER_VALIDATE_FLOAT);
    $rate = filter_input(INPUT_POST, 'rate', FILTER_VALIDATE_FLOAT);
    $deductions = filter_input(INPUT_POST, 'deductions', FILTER_VALIDATE_FLOAT);
    $emp_id = filter_input(INPUT_POST, 'employee_id', FILTER_VALIDATE_INT);

    if ($hours !== false && $rate !== false) {
        $gross = $hours * $rate;
        $net = max(0, $gross - ($deductions ?? 0));
        
        // Find employee name if selected
        $emp_name = "Employee";
        $emp_pos = "Staff";
        foreach($employees as $e) {
            if($e['id'] == $emp_id) {
                $emp_name = $e['name'];
                $emp_pos = $e['position'];
                break;
            }
        }

        $payslip = [
            'name' => $emp_name,
            'position' => $emp_pos,
            'hours' => $hours,
            'rate' => $rate,
            'gross' => $gross,
            'deductions' => $deductions,
            'net' => $net
        ];
    }
}
?>

<div class="mb-8">
    <div class="flex items-center gap-4 mb-2">
        <i data-lucide="dollar-sign" class="text-accent" style="width: 32px; height: 32px;"></i>
        <h1 style="font-size: 2rem; font-weight: 500;">Simple Payroll</h1>
    </div>
    <p class="text-muted">Manage payroll for employees</p>
</div>

<div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start;">
    <!-- Employee List Section -->
    <div class="bg-card border rounded-lg shadow-sm">
        <div class="p-4 border-bottom" style="border-bottom: 1px solid var(--border);">
            <!-- <div style="position: relative;">
                <i data-lucide="search" class="text-muted" style="position: absolute; left: 12px; top: 10px; width: 18px; height: 18px;"></i>
                <input type="text" placeholder="Search employees..." class="form-control" style="padding-left: 2.5rem;">
            </div> -->
        </div>
        <div class="table-container" style="max-height: 500px; overflow-y: auto; box-shadow: none; border: none;">
            <table>
                <thead style="position: sticky; top: 0; background-color: var(--muted); z-index: 10;">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th style="text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($employees as $emp): ?>
                    <tr>
                        <td class="font-medium"><?php echo htmlspecialchars($emp['name']); ?></td>
                        <td class="text-muted text-sm"><?php echo htmlspecialchars($emp['position']); ?></td>
                        <td class="text-muted text-sm"><?php echo htmlspecialchars($emp['dept']); ?></td>
                        <td style="text-align: center;">
                            <button onclick="fillEmployee(<?php echo $emp['id']; ?>, '<?php echo $emp['name']; ?>', '<?php echo $emp['position']; ?>', '<?php echo $emp['dept']; ?>')" class="btn btn-accent" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                                Select
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Calculation / Payslip Panel -->
    <div class="bg-card border rounded-lg shadow-sm p-6" style="position: sticky; top: 5rem;">
        <div class="flex items-center justify-between mb-6">
            <h3 class="font-medium">Calculate Payroll</h3>
        </div>

        <!-- Selected Employee Info -->
        <div id="employee-info" class="mb-6 p-4 bg-muted rounded-lg" style="display: none;">
            <h4 class="font-medium mb-1" id="emp-name-display">Select an employee</h4>
            <p class="text-sm text-muted" id="emp-pos-display">...</p>
            <p class="text-sm text-muted" id="emp-dept-display">...</p>
        </div>

        <form action="payroll.php" method="POST" id="payroll-form">
            <input type="hidden" name="employee_id" id="employee_id">
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label>Hours Worked</label>
                    <input type="number" name="hours" class="form-control" placeholder="160" required step="0.5">
                </div>
                <div>
                    <label>Hourly Rate (&#8358;)</label>
                    <input type="number" name="rate" class="form-control" placeholder="2500.00" required step="0.01">
                </div>
                <div>
                    <label>Deductions (&#8358;)</label>
                    <input type="number" name="deductions" class="form-control" placeholder="5000.00" value="0" step="0.01">
                </div>
                
                <button type="submit" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
                    Generate Payslip
                </button>
            </div>
        </form>

        <?php if ($payslip): ?>
        <div class="border-top pt-6 mt-4 mb-4" style="border-top: 1px solid var(--border);">
            <h4 class="font-medium mb-4 mt-4">Payslip Result</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span class="text-muted text-sm">Employee</span>
                    <span class="font-medium"><?php echo htmlspecialchars($payslip['name']); ?></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span class="text-muted text-sm">Gross Pay</span>
                    <span class="font-medium">&#8358;<?php echo number_format($payslip['gross'], 2); ?></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span class="text-muted text-sm">Deductions</span>
                    <span class="text-destructive font-medium">-&#8358;<?php echo number_format($payslip['deductions'], 2); ?></span>
                </div>
                <div class="flex justify-between items-center p-4 bg-accent text-accent-foreground rounded-lg">
                    <span class="font-medium">Net Pay</span>
                    <span style="font-size: 1.5rem; font-weight: 700;">&#8358;<?php echo number_format($payslip['net'], 2); ?></span>
                </div>
            </div>
            <script>
                // Show info immediately if we just posted
                document.getElementById('employee-info').style.display = 'block';
                document.getElementById('emp-name-display').innerText = '<?php echo $payslip['name']; ?>';
                document.getElementById('emp-pos-display').innerText = '<?php echo $payslip['position']; ?>';
                // Scroll to result
                window.scrollTo(0, document.body.scrollHeight);
            </script>
        </div>
        <?php endif; ?>
    </div>
</div>

<script>
function fillEmployee(id, name, position, dept) {
    document.getElementById('employee_id').value = id;
    document.getElementById('emp-name-display').innerText = name;
    document.getElementById('emp-pos-display').innerText = position;
    document.getElementById('emp-dept-display').innerText = dept;
    document.getElementById('employee-info').style.display = 'block';
}
</script>

<?php include 'includes/footer.php'; ?>
