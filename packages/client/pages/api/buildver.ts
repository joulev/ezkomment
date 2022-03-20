import { execSync } from "child_process";
import type { NextApiHandler } from "next";

function getCommitInfo() {
    return {
        time: execSync("git log -1 --pretty=format:%cI").toString(),
        hash: execSync("git rev-parse --short HEAD").toString().trim(),
    };
}

const handler: NextApiHandler = (req, res) => {
    const { time, hash } = getCommitInfo();
    res.status(200).json({ time, hash });
};

export default handler;
