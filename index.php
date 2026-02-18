<?php 
include 'includes/header.php'; 
include 'includes/members_data.php';

// Calculate Stats
$total_members = count($members);
$all_courses = [];
$total_course_count = 0;
foreach ($members as $m) {
    foreach ($m['courses'] as $c) {
        $all_courses[] = $c['code'];
        $total_course_count++;
    }
}
$unique_courses = count(array_unique($all_courses));
$avg_courses = $total_members > 0 ? number_format($total_course_count / $total_members, 1) : 0;
?>

<div class="mb-8">

    <div class="flex items-center gap-4 mb-2">
        <i data-lucide="users" class="text-accent" style="width: 32px; height: 32px;"></i>
        <h1 style="font-size: 2rem; font-weight: 500;">Group Portal Dashboard</h1>
    </div>
    <p class="text-muted">All group members and their registered courses</p>
</div>

<!-- Member Cards Grid -->
<div class="grid" style="grid-template-columns: repeat(3, minmax(400px, 1fr)); gap: 1.5rem;">
    <?php foreach ($members as $member): ?>
        <div class="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
            <!-- Member Header -->
            <div class="mb-4 pb-4 border-bottom" style="border-bottom: 1px solid var(--border);">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="">
                            Matric No: <span class="text-accent font-medium"><?php echo htmlspecialchars($member['matric_no']); ?></span>
                        </p>
                        <h3 class=" mb-1">Name: <?php echo htmlspecialchars($member['name']); ?></h3>
                    </div>
           
                </div>
            </div>

            <!-- Registered Courses -->
            <div>
                <h4 class="text-sm font-medium mb-4">Registered Courses: <?php echo count($member['courses']); ?> </h4>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <?php foreach ($member['courses'] as $course): ?>
                        <div class="bg-muted rounded-lg p-3 flex items-start gap-3">
                            <div class="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium" style="min-width: 80px; text-align: center;">
                                <?php echo htmlspecialchars($course['code']); ?>
                            </div>
                            <div style="flex: 1;">
                                <p class="text-sm font-medium"><?php echo htmlspecialchars($course['title']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem;">
                 <a href="details.php#<?php echo $member['matric_no']; ?>" style="color: var(--primary); font-size: 0.875rem; font-weight: 500; display: inline-flex; align-items: center; gap: 0.25rem;">
                    View Profile <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                 </a>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<!-- Summary Stats -->
<div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;">
    <div class="bg-primary text-primary-foreground rounded-lg p-6">
        <p style="opacity: 0.8; margin-bottom: 0.25rem;">Total Members</p>
        <p style="font-size: 1.875rem; font-weight: 600;"><?php echo $total_members; ?></p>
    </div>
    <div class="bg-accent text-accent-foreground rounded-lg p-6">
        <p style="opacity: 0.9; margin-bottom: 0.25rem;">Total Courses</p>
        <p style="font-size: 1.875rem; font-weight: 600;"><?php echo $unique_courses; ?></p>
    </div>
    <div class="bg-surface border rounded-lg p-6">
        <p class="text-muted text-sm mb-1">Avg. Courses/Student</p>
        <p style="font-size: 1.875rem; font-weight: 600; color: var(--foreground);"><?php echo $avg_courses; ?></p>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
