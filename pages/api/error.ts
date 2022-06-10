import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const sendErr = await fetch("https://cloud.axiom.co/api/v1/datasets/errors/ingest", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.AXIOM_ERROR_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify([req.body]),
    });

    if (sendErr.ok) return res.status(200).end();

    console.log(await sendErr.json());
    res.status(500).json({
        error: "Errors couldn't be logged. Please contact us at joulev.vvd@yahoo.com.",
    });
};

export default handler;
