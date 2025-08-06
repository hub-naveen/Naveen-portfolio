@echo off
echo ========================================
echo Git Repository Setup for Naveen Portfolio
echo ========================================
echo.

echo Current Git Status:
git status

echo.
echo Current commits:
git log --oneline

echo.
echo ========================================
echo To push to GitHub:
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to https://github.com
echo    - Click "New repository"
echo    - Name it: naveen-portfolio
echo    - Make it public or private
echo    - DON'T initialize with README
echo.
echo 2. Then run these commands:
echo    git remote add origin https://github.com/YOUR_USERNAME/naveen-portfolio.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo To push to GitLab:
echo ========================================
echo.
echo 1. Create a new project on GitLab:
echo    - Go to https://gitlab.com
echo    - Create new project
echo    - Name it: naveen-portfolio
echo.
echo 2. Then run these commands:
echo    git remote add origin https://gitlab.com/YOUR_USERNAME/naveen-portfolio.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo Quick Setup (replace YOUR_USERNAME):
echo ========================================
echo.
echo For GitHub:
echo git remote add origin https://github.com/YOUR_USERNAME/naveen-portfolio.git
echo git branch -M main
echo git push -u origin main
echo.
echo For GitLab:
echo git remote add origin https://gitlab.com/YOUR_USERNAME/naveen-portfolio.git
echo git branch -M main
echo git push -u origin main
echo.
pause 