# Project Setup and Run Instructions

This project is a PHP application.

## Prerequisites

To run this application, you need **PHP** installed on your system.

## Setting up PHP

### Option 1: Install XAMPP (Recommended)
This is the easiest way to get PHP running on Windows.
1.  Download **XAMPP** from [apachefriends.org](https://www.apachefriends.org/download.html).
2.  Install it.
3.  Open the **XAMPP Control Panel** and start **Apache**.

### Option 2: Install PHP Manually
If you prefer a lightweight CLI version:
1.  Download the **Non-Thread Safe** version of PHP from [windows.php.net](https://windows.php.net/download/).
2.  Extract the zip file to `C:\php`.
3.  Add `C:\php` to your system **PATH** environment variable.
    *   Search "Environment Variables" in Windows Start menu.
    *   Edit "System Environment Variables".
    *   Select `Path` -> `Edit` -> `New` -> Paste `C:\php`.
4.  Restart your terminal and run `php -v`.

## How to Run

### If you installed PHP directly:
1.  Open a terminal in this directory.
2.  Start the built-in server:
    ```bash
    php -S localhost:8000
    ```
3.  Open `http://localhost:8000` in your browser.

### If you used XAMPP:
1.  Copy the entire `miniproject` folder to `C:\xampp\htdocs`.
2.  Open your browser and navigate to `http://localhost/miniproject`.
