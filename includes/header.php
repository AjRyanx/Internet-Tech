<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group 11 Portal</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons (Development CDN) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <a href="index.php" class="logo">
                <i data-lucide="layout-grid" class="text-accent" style="width: 24px; height: 24px;"></i>
                Group 11 Portal
            </a>
            <div class="nav-links">
                <a href="index.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">Dashboard</a>
                <a href="payroll.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'payroll.php' ? 'active' : ''; ?>">Payroll</a>
                <a href="gpa.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'gpa.php' ? 'active' : ''; ?>">GPA Calculator</a>
                <a href="details.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'details.php' ? 'active' : ''; ?>">Members</a>
            </div>
        </nav>
    </header>
    <main>
