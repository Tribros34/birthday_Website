import { promises as fs } from "node:fs";
import path from "node:path";

import { imageSize } from "image-size";
import exifr from "exifr";

import type { ExperienceAssets, PhotoAsset } from "@/types/experience";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const audioExtensions = new Set([".mp3"]);
const logoExtensions = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif"]);

async function listFiles(dir: string) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "tr"));
  } catch {
    return [];
  }
}

function mediaUrl(folder: string, fileName: string) {
  return `/api/media/${folder}/${encodeURIComponent(fileName)}`;
}

function titleFromFileName(fileName: string) {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dateFromFileName(fileName: string) {
  const base = path.basename(fileName, path.extname(fileName));
  const match = base.match(/(20\d{2}|19\d{2})[-_. ]?([01]\d)[-_. ]?([0-3]\d)/);

  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match;
  return formatDate(new Date(Number(year), Number(month) - 1, Number(day)));
}

function formatDate(date: Date) {
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

async function readPhotoDate(filePath: string, fileName: string) {
  try {
    const data = await exifr.parse(filePath, ["DateTimeOriginal", "CreateDate", "ModifyDate"]);
    const date = data?.DateTimeOriginal ?? data?.CreateDate ?? data?.ModifyDate;

    if (date instanceof Date) {
      return formatDate(date);
    }
  } catch {
    return dateFromFileName(fileName);
  }

  return dateFromFileName(fileName);
}

async function getPhotoAssets() {
  const photosDir = path.join(process.cwd(), "assets", "photos");
  const files = await listFiles(photosDir);
  const imageFiles = files.filter(
    (file) => imageExtensions.has(path.extname(file).toLowerCase()) && !isSchoolExtraImage(file),
  );

  const photos = await Promise.all(
    imageFiles.map(async (fileName, index): Promise<PhotoAsset | undefined> => {
      const filePath = path.join(photosDir, fileName);

      try {
        const buffer = await fs.readFile(filePath);
        const dimensions = imageSize(buffer);

        return {
          id: `${index}-${fileName}`,
          src: mediaUrl("photos", fileName),
          alt: titleFromFileName(fileName) || `Ani ${index + 1}`,
          width: dimensions.width ?? 1200,
          height: dimensions.height ?? 1600,
          dateLabel: await readPhotoDate(filePath, fileName),
          variant: index % 5 === 0 ? "tilt" : index % 3 === 0 ? "softZoom" : "calm",
        };
      } catch {
        return undefined;
      }
    }),
  );

  return photos.filter(Boolean) as PhotoAsset[];
}

async function firstAsset(folder: string, extensions: Set<string>) {
  const dir = path.join(process.cwd(), "assets", folder);
  const files = await listFiles(dir);
  const fileName = files.find((file) => extensions.has(path.extname(file).toLowerCase()));
  return fileName ? mediaUrl(folder, fileName) : undefined;
}

function isSchoolExtraImage(fileName: string) {
  return fileName.toLowerCase().includes("chatgpt image");
}

async function getSchoolExtraImage() {
  const photosDir = path.join(process.cwd(), "assets", "photos");
  const files = await listFiles(photosDir);
  const fileName = files.find(
    (file) => imageExtensions.has(path.extname(file).toLowerCase()) && isSchoolExtraImage(file),
  );

  return fileName ? mediaUrl("photos", fileName) : undefined;
}

export async function getAssets(): Promise<ExperienceAssets> {
  const [photos, musicSrc, schoolLogoSrc, schoolExtraImageSrc] = await Promise.all([
    getPhotoAssets(),
    firstAsset("music", audioExtensions),
    firstAsset("school", logoExtensions),
    getSchoolExtraImage(),
  ]);

  return {
    photos,
    musicSrc,
    schoolLogoSrc,
    schoolExtraImageSrc,
  };
}
