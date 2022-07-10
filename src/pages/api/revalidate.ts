import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as { path?: string; secret?: string };

  if (body.secret === undefined) {
    return res.status(400).json({ message: "Missing token" });
  }

  if (body.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (body.path === undefined) {
    return res.status(400).json({ message: "Missing path" });
  }

  try {
    await res.revalidate(body.path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
