@echo off
echo ========================================
echo Naveen K Portfolio - Setup Verification
echo ========================================
echo.

echo Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Checking npm version...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm is not working properly
    pause
    exit /b 1
)

echo.
echo Checking if we're in the correct directory...
if not exist "package.json" (
    echo ERROR: package.json not found. Please run this script from the naveen-portfolio directory
    pause
    exit /b 1
)

echo.
echo Clearing npm cache...
call npm cache clean --force

echo.
echo Installing dependencies...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Checking TypeScript compilation...
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo WARNING: TypeScript errors found, but continuing...
)

echo.
echo ========================================
echo Setup verification complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm start
echo.
echo Or use the start-dev.bat script
echo.
pause 