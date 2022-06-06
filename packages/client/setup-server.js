const package_json = require("../server/package.json");
const { execSync } = require("child_process");

const dependencies = Object.keys(package_json.dependencies).join(" ");

execSync("cp -r ../server/pages/api/* pages/api && rsync -av ../server . --exclude-from=.exclude");
execSync(`yarn add ${dependencies}`);
