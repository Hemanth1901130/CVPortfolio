#!/bin/bash

# Print Node.js version for debugging
echo "Using Node.js version: $(node -v)"

# Install the Linux-specific rollup dependency with --force to bypass engine checks
npm install @rollup/rollup-linux-x64-gnu --force

# Run the build command with --force to bypass engine checks
npm run build --force