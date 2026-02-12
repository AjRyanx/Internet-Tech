<?php 
include 'includes/header.php'; 
include 'includes/members_data.php';

function getInitials($name) {
    $parts = explode(" ", $name);
    return strtoupper(substr($parts[0], 0, 1) . (isset($parts[1]) ? substr($parts[1], 0, 1) : ''));
}

// Map some colors for avatars
$colors = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];
?>

<div class="mb-8">
    <div class="flex items-center gap-4 mb-2">
        <i data-lucide="users" class="text-accent" style="width: 32px; height: 32px;"></i>
        <h1 style="font-size: 2rem; font-weight: 500;">Member Profiles</h1>
    </div>
    <p class="text-muted">Detailed information about all group members</p>
</div>

<div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
    <?php 
    $i = 0;
    foreach ($members as $member): 
        $color = $colors[$i % count($colors)];
        $i++;
    ?>
    <div id="<?php echo $member['matric_no']; ?>" class="bg-card border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
        <!-- Banner + Avatar -->
        <div style="background: linear-gradient(135deg, var(--primary), #334155); padding: 1.5rem; padding-bottom: 4rem; position: relative;">
            <div style="position: absolute; bottom: -3rem; left: 50%; transform: translateX(-50%);">
                <div style="width: 6rem; height: 6rem; border-radius: 50%; border: 4px solid var(--card); background-color: <?php echo $color; ?>; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700; box-shadow: var(--shadow-md);">
                    <?php echo getInitials($member['name']); ?>
                </div>
            </div>
        </div>

        <div style="padding: 4rem 1.5rem 1.5rem 1.5rem;">
            <!-- Name Block -->
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 class="font-medium text-lg mb-1"><?php echo htmlspecialchars($member['name']); ?></h3>
                <p class="text-muted text-sm">Group Member</p>
            </div>

            <!-- Stats -->
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="bg-muted p-3 rounded-lg flex items-center gap-3">
                    <div style="width: 2.5rem; height: 2.5rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="droplet" class="text-destructive" style="width: 1.25rem;"></i>
                    </div>
                    <div>
                        <p class="text-muted text-xs uppercase font-bold">Blood Group</p>
                        <p class="font-medium"><?php echo htmlspecialchars($member['blood_group']); ?></p>
                    </div>
                </div>

                <div class="bg-muted p-3 rounded-lg flex items-center gap-3">
                    <div style="width: 2.5rem; height: 2.5rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="map-pin" class="text-accent" style="width: 1.25rem;"></i>
                    </div>
                    <div>
                        <p class="text-muted text-xs uppercase font-bold">State of Origin</p>
                        <p class="font-medium"><?php echo htmlspecialchars($member['state_of_origin']); ?></p>
                    </div>
                </div>

                <div class="bg-muted p-3 rounded-lg flex items-center gap-3">
                    <div style="width: 2.5rem; height: 2.5rem; background: rgba(15, 23, 42, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="phone" class="text-primary" style="width: 1.25rem;"></i>
                    </div>
                    <div>
                        <p class="text-muted text-xs uppercase font-bold">Phone Number</p>
                        <p class="font-medium"><?php echo htmlspecialchars($member['phone']); ?></p>
                    </div>
                </div>
            </div>

            <!-- Hobbies -->
            <div>
                <p class="text-muted text-sm mb-2">Hobbies & Interests</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <?php foreach ($member['hobbies'] as $hobby): ?>
                        <span style="background-color: rgba(16, 185, 129, 0.1); color: var(--accent); padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem;">
                            <?php echo htmlspecialchars($hobby); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
            </div>
            
        </div>
    </div>
    <?php endforeach; ?>
</div>

<!-- Stats Summary -->
<div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;">
    <div class="bg-card border rounded-lg p-6 text-center">
        <p class="text-muted text-sm mb-1">Total Members</p>
        <p class="text-2xl font-bold"><?php echo count($members); ?></p>
    </div>
    <div class="bg-card border rounded-lg p-6 text-center">
        <p class="text-muted text-sm mb-1">States</p>
        <p class="text-2xl font-bold"><?php echo count(array_unique(array_column($members, 'state_of_origin'))); ?></p>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
