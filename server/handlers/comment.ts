import * as comment from "~/server/crud/comment";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";

export const create: ApiHandler = async (req, res) => {
    await comment.create(req.body);
    res.json({});
};

export const update: ApiHandler = async (req, res) => {
    const { commentId } = extractFirstQueryValue(req);
    await comment.update(commentId, req.body);
    res.json({});
};

export const remove: ApiHandler = async (req, res) => {
    const { commentId } = extractFirstQueryValue(req);
    await comment.remove(commentId);
    res.json({});
};
