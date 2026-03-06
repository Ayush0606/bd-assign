#!/usr/bin/env node

/**
 * Generate a cryptographically secure JWT secret
 * Run: node generate-jwt-secret.js
 */

const crypto = require('crypto');

// Generate 64 random bytes and convert to hexadecimal
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n=================================');
console.log('JWT SECRET GENERATED');
console.log('=================================\n');
console.log('Copy this secret to your .env file:\n');
console.log(`JWT_SECRET=${secret}\n`);
console.log('⚠️  Keep this secret safe and never commit it to version control!\n');
console.log('=================================\n');
