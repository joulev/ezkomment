const package_json = require("../server/package.json");
const { execSync } = require("child_process");

const dependencies = Object.keys(package_json.dependencies).join(" ");
const devDependencies = Object.keys(package_json.devDependencies).join(" ");

// execSync(
//     "cp -r ../server/pages/api/* pages/api && rsync -av ../server lib --exclude-from=.exclude"
// );
execSync(`yarn add ${dependencies}`);
execSync(`yarn add --dev ${devDependencies}`);
