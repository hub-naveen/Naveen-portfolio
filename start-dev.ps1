# PowerShell script to start the development server
Write-Host "Setting up Naveen K Portfolio..." -ForegroundColor Green

# Set execution policy for current user
Write-Host "Setting execution policy..." -ForegroundColor Yellow
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

Write-Host "Starting development server..." -ForegroundColor Green
npm start

Read-Host "Press Enter to exit" 