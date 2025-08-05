@echo off
echo Starting Naveen K Portfolio Development Server...
echo.

echo Installing dependencies...
call npm install --legacy-peer-deps

echo.
echo Starting development server...
call npm start

pause 