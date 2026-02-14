<?php 
include 'includes/header.php'; 
?>

<div class="mb-8">
    <div class="flex items-center gap-4 mb-2">
        <i data-lucide="calculator" class="text-accent" style="width: 32px; height: 32px;"></i>
        <h1 style="font-size: 2rem; font-weight: 500;">GPA Calculator</h1>
    </div>
    <p class="text-muted">Calculate your 1st semester Grade Point Average</p>
</div>

<div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start;">
    <!-- Course Input Form -->
    <div class="bg-card border rounded-lg shadow-sm p-6 ">
        <div class="flex items-center justify-between mb-6">
            <h3 class="font-medium">Course Details</h3>
            <button type="button" onclick="addCourseRow()" class="btn btn-accent mb-4" style="font-size: 0.85rem;">
                <i data-lucide="plus" style="width: 16px;"></i> Add Course
            </button>
        </div>

        <form action="gpa.php" method="POST" id="gpa-form">
            <!-- Table Header -->
            <div class="grid gap-4 mb-4 px-4 py-2 bg-muted rounded-lg text-sm font-medium hidden-mobile" style="grid-template-columns: 3fr 1fr 2fr auto;">
                <div>Course Name</div>
                <div>Credit Units</div>
                <div>Final Grade</div>
                <div></div>
            </div>

            <div id="course-rows" style="display: flex; flex-direction: column; gap: 1rem;" class="mb-4">
                <!-- Initial Rows -->
                <?php 
                $num_rows = isset($_POST['units']) ? count($_POST['units']) : 5;
                for ($i = 0; $i < $num_rows; $i++): 
                    $curr_name = isset($_POST['names'][$i]) ? $_POST['names'][$i] : '';
                    $curr_unit = isset($_POST['units'][$i]) ? $_POST['units'][$i] : '';
                    $curr_grade = isset($_POST['grades'][$i]) ? $_POST['grades'][$i] : '';
                ?>
                <div class="course-row mb-4 grid gap-4 p-4 bg-surface border rounded-lg items-center" style="grid-template-columns: 3fr 1fr 2fr auto;">
                    <div>
                         <input type="text" name="names[]" value="<?php echo htmlspecialchars($curr_name); ?>" class="form-control" placeholder="Course Code">
                    </div>
                    <div>
                        <input type="number" name="units[]" value="<?php echo htmlspecialchars($curr_unit); ?>" class="form-control" placeholder="Unit" min="0" max="6">
                    </div>
                    <div>
                        <select name="grades[]" class="form-control">
                            <option value="">Grade</option>
                            <option value="5" <?php if($curr_grade=='5') echo 'selected'; ?>>A (5.0)</option>
                            <option value="4" <?php if($curr_grade=='4') echo 'selected'; ?>>B (4.0)</option>
                            <option value="3" <?php if($curr_grade=='3') echo 'selected'; ?>>C (3.0)</option>
                            <option value="2" <?php if($curr_grade=='2') echo 'selected'; ?>>D (2.0)</option>
                            <option value="1" <?php if($curr_grade=='1') echo 'selected'; ?>>E (1.0)</option>
                            <option value="0" <?php if($curr_grade=='0') echo 'selected'; ?>>F (0.0)</option>
                        </select>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger" style="padding: 0.5rem;" onclick="removeRow(this)">
                            <i data-lucide="trash-2" style="width: 16px;"></i>
                        </button>
                    </div>
                </div>
                <?php endfor; ?>
            </div>
            
            <input type="hidden" name="calculate_gpa" value="1">
            <button type="submit" class="btn btn-primary mt-10">Calculate Result</button>
        </form>
    </div>

    <!-- Results Panel -->
    <div class="bg-card border rounded-lg shadow-sm p-6" style="position: sticky; top: 5rem;">
        <h3 class="font-medium mb-6">GPA Result</h3>
        
        <?php
        $gpa = 0.00;
        $total_units = 0;
        $quality_points = 0;
        $calculated = false;

        if (isset($_POST['calculate_gpa'])) {
            $units = $_POST['units'];
            $grades = $_POST['grades'];
            
            for ($i = 0; $i < count($units); $i++) {
                $u = floatval($units[$i]);
                $g = $grades[$i];
                if ($u > 0 && $g !== "") {
                    $total_units += $u;
                    $quality_points += ($u * floatval($g));
                }
            }
            if ($total_units > 0) {
                $gpa = $quality_points / $total_units;
                $calculated = true;
            }
        }
        
        $grade_class = 'Pass';
        if ($gpa >= 4.5) $grade_class = 'First Class';
        elseif ($gpa >= 3.5) $grade_class = 'Second Class Upper';
        elseif ($gpa >= 2.4) $grade_class = 'Second Class Lower';
        elseif ($gpa >= 1.5) $grade_class = 'Third Class';
        ?>

        <div class="mb-6 p-6 rounded-lg text-center " style="background: linear-gradient(135deg, var(--accent), #34d399); color: white; margin-top: 4px;">
            <p style="opacity: 0.9; margin-bottom: 0.5rem;">Your GPA</p>
            <p style="font-size: 3.5rem; font-weight: 700; line-height: 1; margin-bottom: 0.5rem;"><?php echo number_format($gpa, 2); ?></p>
            <div style="background-color: rgba(255,255,255,0.2); display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem;">
                <?php echo $grade_class; ?>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 10px;">
            <div class="bg-muted p-5 flex justify-between rounded-lg" style="padding: 3px;">
                <span class="text-muted text-sm">Total Units</span>
                <span class="font-medium"><?php echo $total_units; ?></span>
            </div>
            <div class="bg-muted p-5  flex justify-between rounded-lg" style="padding: 5px;">
                <span class="text-muted text-sm">Points</span>
                <span class="font-medium"><?php echo $quality_points; ?></span>
            </div>
        </div>
    </div>
</div>

<script>
function addCourseRow() {
    const container = document.getElementById('course-rows');
    const div = document.createElement('div');
    div.className = 'course-row grid gap-4 p-4 bg-surface border rounded-lg items-center';
    div.style.gridTemplateColumns = '3fr 1fr 2fr auto';
    div.innerHTML = `
        <div>
             <input type="text" name="names[]" class="form-control" placeholder="Course Code">
        </div>
        <div>
            <input type="number" name="units[]" class="form-control" placeholder="Unit" min="0" max="6">
        </div>
        <div>
            <select name="grades[]" class="form-control">
                <option value="">Grade</option>
                <option value="5">A (5.0)</option>
                <option value="4">B (4.0)</option>
                <option value="3">C (3.0)</option>
                <option value="2">D (2.0)</option>
                <option value="1">E (1.0)</option>
                <option value="0">F (0.0)</option>
            </select>
        </div>
        <div>
            <button type="button" class="btn btn-danger" style="padding: 0.5rem;" onclick="removeRow(this)">
                <i data-lucide="trash-2" style="width: 16px;"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
    lucide.createIcons();
}

function removeRow(btn) {
    const row = btn.closest('.course-row');
    const rows = document.querySelectorAll('.course-row');
    if (rows.length > 1) {
        row.remove();
    } else {
        alert("You must have at least one course row.");
    }
}
</script>

<style>
@media (max-width: 768px) {
    .grid[style*="grid-template-columns: 3fr"] {
        grid-template-columns: 1fr !important;
    }
    .hidden-mobile {
        display: none !important;
    }
}
</style>

<?php include 'includes/footer.php'; ?>
