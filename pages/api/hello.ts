import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

type Data = {
    data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const data = req.body;
    fs.writeFileSync("programming.html", data);
    res.status(200).json({ data: "success" });
}
