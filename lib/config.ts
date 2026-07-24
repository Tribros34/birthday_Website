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
    greeting: "Simay'a...",
    paragraphs: [
      "Canım kızım Simay, bugün senin doğum günün. Senin gülüşünle güzelleşen, sesinle anlam kazanan bir günü daha birlikte yaşıyoruz.",
      "Küçücük ellerini ilk tuttuğum günden bugüne kadar büyüyüşünü izlemek, hayatımın en büyük mutluluğu oldu. Her yaşında başka bir güzelliğini, başka bir cesaretini ve başka bir ışığını gördüm.",
      "Seninle sadece bugün değil, her gün gurur duyuyorum. Merakınla, kalbinle, neşenle ve iyi niyetinle bu dünyaya çok güzel bir iz bırakacağına inanıyorum.",
    ],
    highlight: [
      "Bugün sana sıradan bir hediye vermek istemedim.",
      "Çünkü sen benim için çok özelsin.",
      "Aşağıda sana büyük bir sürprizim var, bak.",
    ],
    closing: [
      "Bu sürprizi gördüğünde yüzündeki mutluluğu hayal ediyorum.",
      "İyi ki doğdun canım kızım.",
      "Seni çok seviyorum ve seninle her zaman gurur duyacağım.",
    ],
    foldButton: "Mektubu Katla",
  },
  copy: {
    introFirst: "Bir sürprizin var...",
    introSecond: "Hazırsan başlayalım",
    openGift: "Hediyeyi Aç",
    birthdayTitle: "İyi ki Doğdun",
    photosTitle: "Birlikte biriken anılar",
    photosSubtitle: "Bazı anlar sessizce büyür; sonra bir gün hepsi kalbinin önünden geçer.",
    noPhotosTitle: "Fotoğraf bekleniyor",
    noPhotosBody: "Anıları göstermek için assets/photos klasörüne fotoğrafları ekleyebilirsin.",
    schoolPreludeOne: "Ama...",
    schoolPreludeTwo: "Bugün sana sadece doğum günü hediyesi vermedik.",
    schoolLineBefore: "Büyük sürpriz",
    schoolLineAfter: "öğrencisisin.",
    pride: "Seninle gurur duyuyoruz.",
    finalTitle: "Nice mutlu yaşlara...",
    finalBody: "Seni çok seviyoruz.",
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
