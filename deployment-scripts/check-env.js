#!/usr/bin/env node

/**
 * Check environment variables before deployment
 * Run: node check-env.js
 */

const path = require('path');
const fs = require('fs');

const requiredBackendVars = [
  'NODE_ENV',
  'MONGO_URI',
  'JWT_SECRET',
  'CORS_ORIGIN',
  'PORT'
];

const requiredFrontendVars = [
  'REACT_APP_API_URL'
];

let errors = 0;

console.log('\n=================================');
console.log('ENVIRONMENT VARIABLES CHECK');
console.log('=================================\n');

// Check Backend .env
console.log('📦 Checking Backend Environment...\n');
const backendEnvPath = path.join(__dirname, '..', 'backend', '.env');

if (!fs.existsSync(backendEnvPath)) {
  console.error('❌ Backend .env file not found!');
  console.log('   Create it by copying .env.example\n');
  errors++;
} else {
  const backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
  
  requiredBackendVars.forEach(varName => {
    const regex = new RegExp(`^${varName}=.+`, 'm');
    if (regex.test(backendEnv)) {
      // Check for placeholder values
      const match = backendEnv.match(new RegExp(`^${varName}=(.+)`, 'm'));
      const value = match ? match[1].trim() : '';
      
      if (varName === 'JWT_SECRET' && (value.includes('your_') || value.includes('change') || value.length < 32)) {
        console.log(`⚠️  ${varName}: Set but appears to be a placeholder or too short`);
        errors++;
      } else if (varName === 'MONGO_URI' && (value.includes('localhost') || value.includes('your_'))) {
        console.log(`⚠️  ${varName}: Using localhost or placeholder`);
        errors++;
      } else {
        console.log(`✅ ${varName}: OK`);
      }
    } else {
      console.log(`❌ ${varName}: Missing`);
      errors++;
    }
  });
}

console.log('\n📦 Checking Frontend Environment...\n');
const frontendEnvPath = path.join(__dirname, '..', 'frontend', '.env.production');

if (!fs.existsSync(frontendEnvPath)) {
  console.log('⚠️  Frontend .env.production file not found');
  console.log('   Create it if deploying to production\n');
} else {
  const frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
  
  requiredFrontendVars.forEach(varName => {
    const regex = new RegExp(`^${varName}=.+`, 'm');
    if (regex.test(frontendEnv)) {
      const match = frontendEnv.match(new RegExp(`^${varName}=(.+)`, 'm'));
      const value = match ? match[1].trim() : '';
      
      if (value.includes('localhost') || value.includes('your_')) {
        console.log(`⚠️  ${varName}: Using localhost or placeholder`);
      } else {
        console.log(`✅ ${varName}: OK`);
      }
    } else {
      console.log(`❌ ${varName}: Missing`);
      errors++;
    }
  });
}

console.log('\n=================================');
if (errors > 0) {
  console.log(`\n❌ Found ${errors} issue(s). Please fix before deploying.\n`);
  process.exit(1);
} else {
  console.log('\n✅ All environment variables are set!\n');
  process.exit(0);
}
