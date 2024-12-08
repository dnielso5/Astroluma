const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appsDir = path.resolve(__dirname, 'apps');

// Function to install npm dependencies
const installDependencies = (moduleDir) => {
  try {
    console.log(`Installing dependencies for module at ${moduleDir}...`);
    execSync('npm install', { cwd: moduleDir, stdio: 'inherit' });
    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error(`Failed to install dependencies for module at ${moduleDir}`);
    console.error(error);
  }
}

// Iterate over each app directory and install dependencies
fs.readdir(appsDir, (err, files) => {
  if (err) {
    console.error(`Failed to read directory: ${appsDir}`);
    console.error(err);
    throw new Error(`Failed to read directory: ${appsDir}`);
  }

  files.forEach((file) => {
    const moduleDir = path.join(appsDir, file);
    const packageJsonPath = path.join(moduleDir, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      console.log(`Found package.json at ${packageJsonPath}`);
      installDependencies(moduleDir);
    } else {
      console.log(`No package.json found in ${moduleDir}. Skipping dependency installation.`);
    }
  });
});
