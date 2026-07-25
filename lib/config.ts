import { promises as fs } from "node:fs";
import path from "node:path";

import type { SiteConfig } from "@/types/experience";

const fallbackConfig: SiteConfig = {
  name: "",
  father: "",
  school: "Kalem Vakfı Okulları",
  message: "",
  letter: {
    date: "Bugün",
    greeting: "Simay'ıma...",
    paragraphs: [
      "Canım kızım,",
      "Doğduğun gün hayatıma yeniden umut ve anlam geldi. Sen benim en güzel duam, en büyük gururumsun. Hayat seni nereye götürürse götürsün, bil ki seni canımdan çok seven bir baban var. İyi ki doğdun, iyi ki benim kızımsın.",
    ],
    highlight: [
      "Bu hediye sadece doğum günün için değil; sana olan sevgimin, sana duyduğum güvenin ve geleceğine olan inancımın küçük bir hatırası. Umarım her baktığında seni ne kadar çok sevdiğimi ve her zaman yanında olduğumu hatırlarsın.",
    ],
    closing: [
      "İyi ki doğdun, güzel kızım.",
      "Seni çok seven Baban ❤️",
    ],
    foldButton: "Mektubu Katla",
  },
  copy: {
    introFirst: "Bir sürprizin var...",
    introSecond: "Hazırsan başlayalım",
    openGift: "Hediyeyi Aç",
    birthdayTitle: "İyi ki doğdun",
    photosTitle: "Birlikte biriken anılar",
    photosSubtitle:
      "Her fotoğraf, birlikte yaşadığımız güzel anların sessiz bir tanığı... Yıllar geçse de bu anılar hep kalbimde yaşayacak. Bir gün bu fotoğraflara baktığında, seni dünyadaki her şeyden çok seven bir baban olduğunu ve sevgimin hiç değişmeyeceğini daima hatırla.",
    noPhotosTitle: "Fotoğraf bekleniyor",
    noPhotosBody: "Anıları göstermek için assets/photos klasörüne fotoğrafları ekleyebilirsin.",
    schoolPreludeOne: "Ama...",
    schoolPreludeTwo: "Bugün sana sadece doğum günü hediyesi vermedik.",
    schoolLineBefore: "Büyük sürpriz",
    schoolLineAfter: "öğrencisisin.",
    pride: "Seninle gurur duyuyoruz.",
    finalTitle: "Nice mutlu yaşlara...",
    finalBody:
      "Hayatın boyunca farklı insanlar tanıyacak, farklı yollar göreceksin. Ama hangi şartta olursan ol, kalbindeki iyiliği, vicdanını ve merhametini koru. İnsanları kırmak yerine onarmayı, kin yerine sevgiyi, bencillik yerine paylaşmayı seç.\n\nİşte o zaman hem güçlü hem de güzel bir insan olacaksın.\n\nSana en büyük dileğim; iyi bir insan olarak mutlu bir hayat yaşaman. Buna tüm kalbimle inanıyorum.",
    musicOn: "Müziği kapat",
    musicOff: "Müziği aç",
  },
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(process.cwd(), "assets", "config.json");

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteConfig>;

    return {
      name: parsed.name?.trim() ?? "",
      father: parsed.father?.trim() ?? "",
      school: parsed.school?.trim() ?? fallbackConfig.school,
      message: parsed.message?.trim() ?? "",
      letter: {
        ...fallbackConfig.letter,
        ...(parsed.letter ?? {}),
        paragraphs: parsed.letter?.paragraphs ?? fallbackConfig.letter.paragraphs,
        highlight: parsed.letter?.highlight ?? fallbackConfig.letter.highlight,
        closing: parsed.letter?.closing ?? fallbackConfig.letter.closing,
      },
      copy: {
        ...fallbackConfig.copy,
        ...(parsed.copy ?? {}),
      },
    };
  } catch {
    return fallbackConfig;
  }
}
