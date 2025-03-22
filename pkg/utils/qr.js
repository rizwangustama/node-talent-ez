import { createCanvas, loadImage } from "canvas";
import qrcode from "qrcode";
import path from "path";

export const createQrCode = async (url, width, cwidth) => {
    try {
        const canvas = createCanvas(width, width);
        qrcode.toCanvas(
            canvas,
            url,
            {
                errorCorrectionLevel: "H",
                margin: 1,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            }
        );
        const ctx = canvas.getContext("2d");
        const img = await loadImage(path.join(__dirname,"./../resources/public/assets/icon/smart-icon.png"));
        const center = (width - cwidth) / 2;
        ctx.drawImage(img, center, center, cwidth, cwidth);
        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error(error)
        throw error
    }
}