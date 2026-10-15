import asyncio
import os
import edge_tts

# Voice mapping:
# Shakir (Male) for Seller (البائع)
# Salma (Female) for Customer (الزبونة)

VOICE_SELLER = "ar-EG-ShakirNeural"
VOICE_CUSTOMER = "ar-EG-SalmaNeural"

# Lines with optimized Egyptian Arabic phonetics/tashkeel
DIALOGUE = [
    {
        "id": "line_1",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "أَهْلًا وِسَهْلًا، إِتْفَضَّلْ، تَحْتْ أَمْرَكْ.",
        "display_ar": "أهلاً وسهلاً، اتفضل، تحت أمرك.",
        "display_en": "Welcome! Please come in, at your service.",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_2",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "لَوْ سَمَحْتْ، هُوَّ عَنْدُكُمْ لَبَنْ؟",
        "display_ar": "لو سمحت، هو عندكم لبن؟",
        "display_en": "Excuse me, do you have milk?",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_3",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "أَيْوَة طَبْعًا، عَاوزَة كَامْ عِلْبَة؟",
        "display_ar": "أيوه طبعًا، عايزة كام علبة؟",
        "display_en": "Yes of course, how many cartons would you like?",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_4",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "عَاوْزَة عِلْبِتَيْنْ، لَوْ سَمَحْتْ.",
        "display_ar": "عايزة علبتين، لو سمحت.",
        "display_en": "I'd like two cartons, please.",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_5",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "حَاضِرْ، تِحِبِّي حَاجَة تَانْيَة؟",
        "display_ar": "حاضر، تحبي حاجة تانية؟",
        "display_en": "Certainly, would you like anything else?",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_6",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "آهْ، هُوَّ كِيلُو السُّكَّرْ بِكَامْ؟",
        "display_ar": "آه، هو كيلو السكر بكام؟",
        "display_en": "Yeah, how much is a kilo of sugar?",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_7",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "الكِيلُو بِتَلَاتِينْ جِنِيهْ.",
        "display_ar": "الكيلو بتلاتين جنيه.",
        "display_en": "A kilo is thirty pounds.",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_8",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "طَيِّبْ، هَاتْلِي كِيلُو سُكَّرْ كَمَانْ.",
        "display_ar": "طيب، هاتلي كيلو سكر كمان.",
        "display_en": "Alright, bring me a kilo of sugar too.",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_9",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "مِنْ عِنَيَّا، أَيّ حَاجَة تَانْيَة؟",
        "display_ar": "من عنيا، أي حاجة تانية؟",
        "display_en": "With pleasure! Anything else?",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_10",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "لَأ، كِدَه تَمَامْ. الحِسَابْ كَامْ؟",
        "display_ar": "لأ، كده تمام. الحساب كام؟",
        "display_en": "No, that's all. How much is the total?",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_11",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "الحِسَابْ كُلُّه خَمْسَة وِسَبْعِينْ جِنِيهْ.",
        "display_ar": "الحساب كله خمسة وسبعين جنيه.",
        "display_en": "The total is seventy-five pounds.",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_12",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "مُمْكِنْ أَدْفَعْ بِالكَرْتْ؟",
        "display_ar": "ممكن أدفع بالكارت؟",
        "display_en": "Can I pay by card?",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_13",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "أَيْوَة طَبْعًا، إِتْفَضَّلِي.",
        "display_ar": "أيوه طبعًا، اتفضلي.",
        "display_en": "Yes of course, please go ahead.",
        "role": "البائع (Seller)"
    },
    {
        "id": "line_14",
        "speaker": "customer",
        "voice": VOICE_CUSTOMER,
        "text": "شُكْرًا لِيكْ.",
        "display_ar": "شكرًا ليك.",
        "display_en": "Thank you!",
        "role": "الزبونة (Customer)"
    },
    {
        "id": "line_15",
        "speaker": "seller",
        "voice": VOICE_SELLER,
        "text": "العَفْو، نَوَّرْتِينَا.",
        "display_ar": "العفو، نورتينا.",
        "display_en": "You're welcome, you brightened our day!",
        "role": "البائع (Seller)"
    }
]

# Vocabulary items for interactive word bank
VOCAB = [
    {"id": "vocab_laban", "voice": VOICE_CUSTOMER, "text": "لَبَنْ", "display_ar": "لبن", "translit": "Laban", "en": "Milk"},
    {"id": "vocab_olba", "voice": VOICE_SELLER, "text": "عِلْبَة", "display_ar": "علبة", "translit": "'Olba", "en": "Carton / Box / Can"},
    {"id": "vocab_olbeten", "voice": VOICE_CUSTOMER, "text": "عِلْبِتَيْنْ", "display_ar": "علبتين", "translit": "'Elbetayn", "en": "Two cartons"},
    {"id": "vocab_sokkar", "voice": VOICE_CUSTOMER, "text": "سُكَّرْ", "display_ar": "سكر", "translit": "Sokkar", "en": "Sugar"},
    {"id": "vocab_kilo", "voice": VOICE_SELLER, "text": "كِيلُو", "display_ar": "كيلو", "translit": "Keelo", "en": "Kilogram"},
    {"id": "vocab_geneh", "voice": VOICE_SELLER, "text": "جِنِيهْ", "display_ar": "جنيه", "translit": "Geneeh", "en": "Egyptian Pound (EGP)"},
    {"id": "vocab_hesab", "voice": VOICE_CUSTOMER, "text": "الحِسَابْ", "display_ar": "الحساب", "translit": "El-Hesaab", "en": "The bill / total"},
    {"id": "vocab_kart", "voice": VOICE_CUSTOMER, "text": "بِالكَرْتْ", "display_ar": "بالكارت", "translit": "Bel-Kart", "en": "By card"},
    {"id": "vocab_menenia", "voice": VOICE_SELLER, "text": "مِنْ عِنَيَّا", "display_ar": "من عنيا", "translit": "Men 'enayya", "en": "With pleasure (lit. From my eyes)"},
    {"id": "vocab_nawartina", "voice": VOICE_SELLER, "text": "نَوَّرْتِينَا", "display_ar": "نورتينا", "translit": "Nawwartiina", "en": "You brightened our place"}
]

async def generate():
    os.makedirs("audio", exist_ok=True)
    print("Generating dialogue audio...")
    for item in DIALOGUE:
        filepath = os.path.join("audio", f"{item['id']}.mp3")
        comm = edge_tts.Communicate(item["text"], item["voice"], rate="+0%")
        await comm.save(filepath)
        print(f"Generated {filepath}")

    print("Generating vocab audio...")
    for item in VOCAB:
        filepath = os.path.join("audio", f"{item['id']}.mp3")
        comm = edge_tts.Communicate(item["text"], item["voice"], rate="-5%")
        await comm.save(filepath)
        print(f"Generated {filepath}")

    print("All audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
