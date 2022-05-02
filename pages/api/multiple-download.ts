import https from "https";
import fs from "fs";
const path = require("path");
import type { NextApiRequest, NextApiResponse } from "next";

async function downloadImage(url: string) {
    try {
        const fullUrl = ``; // add your url here
        const filename = path.basename(fullUrl);
        https.get(fullUrl, function (response) {
            const fileStream = fs.createWriteStream(`files/${filename}`);
            response.pipe(fileStream);

            fileStream.on("finish", function () {
                fileStream.close();
            });

            fileStream.on("error", function () {
                fileStream.close();
            });
        });
    } catch (err) {
        console.log(err);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const images = JSON.parse(req.body);
        for (let i = 0; i < images.length; i++) {
            await downloadImage(images[i]);
        }
        return res.status(200).json({ data: "success" });
    } catch (err) {
        console.log(err);
    }
}
