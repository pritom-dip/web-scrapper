import https from "https";
import fs from "fs";
const path = require("path");

export default async function handler(req: any, res: any) {
    try {
        const filename = path.basename(req.body);
        https.get(req.body, function (response) {
            const fileStream = fs.createWriteStream(filename);
            response.pipe(fileStream);

            fileStream.on("finish", function () {
                console.log("here");
                fileStream.close();
                return res.status(200).json({ data: "success" });
            });

            fileStream.on("error", function () {
                fileStream.close();
                return res.status(404).json({ data: "failed" });
            });
        });
    } catch (err) {
        console.log(err);
    }
}
