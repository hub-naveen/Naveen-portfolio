@echo off
echo Fixing TypeScript issues and starting Naveen K Portfolio...
echo.

echo Clearing npm cache...
call npm cache clean --force

echo.
echo Installing dependencies with legacy peer deps...
call npm install --legacy-peer-deps

echo.
echo Checking for TypeScript errors...
call npx tsc --noEmit

echo.
echo Starting development server...
call npm start

pause 