# Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. PowerShell Execution Policy Error

**Error:** `File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled`

**Solution A - Use Command Prompt:**
```cmd
cd "C:\Users\nobyt\Documents\Cursor\naveen-portfolio"
npm install --legacy-peer-deps
npm start
```

**Solution B - Fix PowerShell Execution Policy:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Solution C - Use the provided scripts:**
- Double-click `start-dev.bat` (Command Prompt)
- Right-click `start-dev.ps1` → "Run with PowerShell"

### 2. Import Errors

**Error:** `'Tool' is not exported from 'lucide-react'`

**Solution:** ✅ **FIXED** - Updated Skills.tsx to use `Wrench` instead of `Tool`

### 3. ESLint Warnings

**Warning:** `'Award' is defined but never used`

**Solution:** ✅ **FIXED** - Removed unused import from Certifications.tsx

### 4. Node.js Version Issues

**Error:** `npm ERR! code ENOENT`

**Solution:**
1. Check Node.js version: `node --version` (should be 16+)
2. Update Node.js if needed: Download from [nodejs.org](https://nodejs.org)

### 5. Network Issues

**Error:** `npm ERR! network timeout`

**Solution:**
```bash
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install --legacy-peer-deps
```

## 🚀 Quick Start Options

### Option 1: Command Prompt (Recommended)
```cmd
cd "C:\Users\nobyt\Documents\Cursor\naveen-portfolio"
start-dev.bat
```

### Option 2: PowerShell
```powershell
cd "C:\Users\nobyt\Documents\Cursor\naveen-portfolio"
.\start-dev.ps1
```

### Option 3: Manual Steps
```cmd
# 1. Navigate to project
cd "C:\Users\nobyt\Documents\Cursor\naveen-portfolio"

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start development server
npm start
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📱 Access the Website

Once the development server starts successfully:
- Open your browser
- Go to: `http://localhost:3000`
- The portfolio should load with all animations and features

## 🐛 Debug Mode

If you encounter issues, run with verbose logging:
```bash
npm start --verbose
```

## 📞 Support

If you continue to have issues:

1. **Check Node.js version:**
   ```bash
   node --version
   npm --version
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   rmdir /s node_modules
   del package-lock.json
   npm install --legacy-peer-deps
   ```

4. **Check for conflicting processes:**
   - Make sure no other React apps are running on port 3000
   - Close other terminal windows

## ✅ Verification Checklist

- [ ] Node.js version 16+ installed
- [ ] npm is working (`npm --version`)
- [ ] All dependencies installed successfully
- [ ] Development server starts without errors
- [ ] Website loads at http://localhost:3000
- [ ] All animations work properly
- [ ] Responsive design works on mobile

---

**If all else fails, try using the batch file: `start-dev.bat`** 🚀 