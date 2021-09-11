import * as fs from "fs";
import { ImagePool } from "@squoosh/lib";
import { cpus } from "os";

const { readFile, writeFile } = fs.promises;

const isDir = (path: string): boolean => fs.lstatSync(path).isDirectory();

const getFiles = (path: string): string[] => {
  if (isDir(path)) {
    const files = fs.readdirSync(path);
    return files
      .map((file) => `${path}/${file}`)
      .filter((file) => !isDir(file));
  }
  return [path];
};

const createFolder = (path: string) => {
  const malohaPath = `${path}/maloha`;
  if (!fs.existsSync(malohaPath)) {
    fs.mkdirSync(malohaPath);
  }
};

const compressAndWrite = async (
  image: any,
  targetPath: string,
  targetSize: number | undefined
) => {
  await image.encode({ mozjpeg: {} });
  let encodedImage = await image.encodedWith.mozjpeg;

  if (targetSize) {
    // start at 70 because 75 is the default
    let quality = 70;
    while (encodedImage.size > targetSize && quality > 5) {
      await image.encode({ mozjpeg: { quality } });
      encodedImage = await image.encodedWith.mozjpeg;
      quality -= 5;
    }
  }

  await writeFile(targetPath, encodedImage.binary);
};

const targetPath = (imagePath: string): string => {
  const parts = imagePath.split("/");
  const filename = parts[parts.length - 1].split(".")[0];
  return `${parts.slice(0, parts.length - 1).join("/")}/maloha/${filename}.jpg`;
};

const processImages = async (
  paths: string[],
  targetSize: number | undefined,
  width: number | undefined
) => {
  const imagePool = new ImagePool(cpus().length);
  await Promise.all(
    paths.map(async (path) => {
      const file = await readFile(path);
      try {
        const image = await imagePool.ingestImage(file);

        if (width && (await image.decoded).bitmap.width > width) {
          await image.preprocess({ resize: { enabled: true, width } });
        }

        await compressAndWrite(image, targetPath(path), targetSize);
      } catch (e) {
        console.error(e);
      }
    })
  );
  await imagePool.close();
};

export default async (
  path: string,
  targetSize: number | undefined,
  width: number | undefined
) => {
  createFolder(path);
  const files = getFiles(path);
  await processImages(files, targetSize, width);
};
