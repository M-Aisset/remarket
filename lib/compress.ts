import "server-only";
import sharp from "sharp";

export async function compress(file: File) {
  try {
    const inputBuffer = await file.arrayBuffer();

    const compressedBuffer = await sharp(Buffer.from(inputBuffer))
      .resize({ width: 1500 })
      .webp({ quality: 80 })
      .toBuffer();

    const compressedFile = new File([compressedBuffer], file.name.replace(/\.[^/.]+$/, ".webp"), {
      type: "image/webp",
    });
    return compressedFile;
  } catch (e) {
    throw Error("Compressing error");
  }
}
