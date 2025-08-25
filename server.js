import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(compression());

// 정적 파일 서빙 (public 폴더)
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: "1d",
    extensions: ["html"]
}));

// SPA 라우팅 보호
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html", "flovin_order.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`> http://localhost:${port}`);
});
