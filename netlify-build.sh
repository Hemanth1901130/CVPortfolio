#!/bin/bash

# Print Node.js version for debugging
echo "Using Node.js version: $(node -v)"

# Install the Linux-specific rollup dependency
npm install @rollup/rollup-linux-x64-gnu

# Run the build command
npm run build