import { createHandler, createRouter } from "~/server/next-connect";

const router = createRouter<{ url: string }>();

router.post(async (req, res) => {
    const { domain } = req.body;
    const tryURLs = [
        `https://${domain}/apple-touch-icon.png`,
        `https://${domain}/images/apple-touch-icon.png`,
        `https://${domain}/img/apple-touch-icon.png`,
        `http://${domain}/apple-touch-icon.png`,
        `http://${domain}/images/apple-touch-icon.png`,
        `http://${domain}/img/apple-touch-icon.png`,
    ];
    for (const url of tryURLs) {
        const tryRes = await fetch(url);
        if (tryRes.status === 200) return res.status(200).json({ url });
    }
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).json({ url: "/images/logo.svg" });
});

export default createHandler(router);
