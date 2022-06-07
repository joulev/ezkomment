const { execSync } = require("child_process");

execSync(
    "cp -r ../server/pages/api/* pages/api && rsync -av ../server lib --exclude-from=.exclude"
);

const serverPackageJson = require("../server/package.json");
const clientPackageJson = require("./package.json");

const serverDependencies = Object.keys(serverPackageJson.dependencies);
const clientDependencies = Object.keys(clientPackageJson.dependencies);

if (serverDependencies.some(dep => !clientDependencies.includes(dep))) {
    console.log("Missing dependencies, run yarn add");
    execSync(`yarn add ${serverDependencies.join(" ")}`);
}

const serverDevDependencies = Object.keys(serverPackageJson.devDependencies);
const clientDevDependencies = Object.keys(clientPackageJson.devDependencies);

if (serverDevDependencies.some(dep => !clientDevDependencies.includes(dep))) {
    console.log("Missing dev dependencies, run yarn add --dev");
    execSync(`yarn add --dev ${serverDevDependencies.join(" ")}`);
}
