// Dialogue data with Egyptian Arabic phonetics, English translation, and grammatical/cultural explanations
const DIALOGUE_DATA = [
  {
    id: "line_1",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "أهلاً وسهلاً، اتفضل، تحت أمرك.",
    phonetic: "Ahlan wa sahlan, itfaddal, taht amrak.",
    english: "Welcome! Please come in, at your service.",
    audio: "audio/line_1.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "تعبير مصري أصيل للترحيب والضيافة: 'تحت أمرك' تعني أنا في خدمتك تماماً."
  },
  {
    id: "line_2",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "لو سمحت، هو عندكم لبن؟",
    phonetic: "Law samaht, howwa 'andokom laban?",
    english: "Excuse me, do you have milk?",
    audio: "audio/line_2.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "صيغة السؤال الشائعة في مصر للسؤال عن توفر سلعة: 'هو عندكم...؟'."
  },
  {
    id: "line_3",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "أيوه طبعًا، عايزة كام علبة؟",
    phonetic: "Aywa tab'an, 'ayza kam 'elba?",
    english: "Yes of course, how many cartons would you like?",
    audio: "audio/line_3.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "'عايزة' (للمؤنث) = تريدين. السؤال عن العدد: 'كام علبة؟' بعد (كام) يأتي المفرد منصوباً دائماً."
  },
  {
    id: "line_4",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "عايزة علبتين، لو سمحت.",
    phonetic: "'Ayza 'elbetayn, law samaht.",
    english: "I'd like two cartons, please.",
    audio: "audio/line_4.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "المثنى في العامية المصرية بإضافة 'ين' (علبة -> علبتين، كيلو -> كيلوين)."
  },
  {
    id: "line_5",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "حاضر، تحبي حاجة تانية؟",
    phonetic: "Hader, tehebbi haga tanya?",
    english: "Certainly, would you like anything else?",
    audio: "audio/line_5.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "'حاضر' تعني بكل سرور، و'حاجة تانية' تعني شيئاً آخر (Another thing)."
  },
  {
    id: "line_6",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "آه، هو كيلو السكر بكام؟",
    phonetic: "Aah, howwa keelo es-sokkar bekam?",
    english: "Yeah, how much is a kilo of sugar?",
    audio: "audio/line_6.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "السؤال عن السعر في مصر: 'بكام؟' (How much is it?)."
  },
  {
    id: "line_7",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "الكيلو بتلاتين جنيه.",
    phonetic: "El-keelo be-talateen geneeh.",
    english: "A kilo is thirty pounds.",
    audio: "audio/line_7.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "تلاتين جنيه = 30 EGP (حرف الثاء ينطق تاء في العامية: ثلاثين -> تلاتين)."
  },
  {
    id: "line_8",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "طيب، هاتلي كيلو سكر كمان.",
    phonetic: "Tayyeb, hatli keelo sokkar kaman.",
    english: "Alright, bring me a kilo of sugar too.",
    audio: "audio/line_8.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "'هاتلي' تعني أحضر لي / أعطني (Give/Bring me). و'كمان' تعني أيضاً / إضافة لذلك (Also/Too)."
  },
  {
    id: "line_9",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "من عنيا، أي حاجة تانية؟",
    phonetic: "Men 'enayya, ayy haga tanya?",
    english: "With pleasure! Anything else?",
    audio: "audio/line_9.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "'من عنيا' = من عيوني، تعبير مصري دافئ يدل على الترحيب الشديد بخدمة الزبون."
  },
  {
    id: "line_10",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "لأ، كده تمام. الحساب كام؟",
    phonetic: "La', kedah tamam. El-hesaab kam?",
    english: "No, that's all. How much is the total?",
    audio: "audio/line_10.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "'كده تمام' = هكذا ممتاز / اكتفيت. 'الحساب كام؟' = كم الإجمالي؟"
  },
  {
    id: "line_11",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "الحساب كله خمسة وسبعين جنيه.",
    phonetic: "El-hesaab kolloh khamsa we-sab'een geneeh.",
    english: "The total is seventy-five pounds.",
    audio: "audio/line_11.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "75 جنيه = علبتين لبن (45 جنيه) + كيلو سكر (30 جنيه)."
  },
  {
    id: "line_12",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "ممكن أدفع بالكارت؟",
    phonetic: "Momken adfa' bel-kart?",
    english: "Can I pay by card?",
    audio: "audio/line_12.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "'ممكن' تستخدم للاستئذان والطلب بأدب (Can I / May I?)."
  },
  {
    id: "line_13",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "أيوه طبعًا، اتفضلي.",
    phonetic: "Aywa tab'an, itfaddali.",
    english: "Yes of course, please go ahead.",
    audio: "audio/line_13.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "'اتفضلي' للمؤنث (اتفضل للمذكر) = Here you go / Please do."
  },
  {
    id: "line_14",
    speaker: "customer",
    speakerNameAr: "الزبونة (منى)",
    speakerNameEn: "The Customer (Mona)",
    arabic: "شكرًا ليك.",
    phonetic: "Shokran leek.",
    english: "Thank you!",
    audio: "audio/line_14.mp3",
    role: "customer",
    avatar: "👩‍💼",
    note: "'شكرًا ليك' (للمذكر) أو 'شكرًا ليكي' (للمؤنث)."
  },
  {
    id: "line_15",
    speaker: "seller",
    speakerNameAr: "البائع (أحمد)",
    speakerNameEn: "The Seller (Ahmed)",
    arabic: "العفو، نورتينا.",
    phonetic: "El-'afw, nawwartiina.",
    english: "You're welcome, you brightened our day!",
    audio: "audio/line_15.mp3",
    role: "seller",
    avatar: "👨‍🍳",
    note: "'نورتينا' مجاملة مصرية لطيفة جداً تقال عند المغادرة تعني أن زيارتك أنارت المكان."
  }
];

// Vocabulary dictionary with audio, icons, and examples
const VOCAB_DATA = [
  {
    id: "vocab_laban",
    arabic: "لبن",
    translit: "Laban",
    english: "Milk",
    icon: "🥛",
    category: "منتجات (Products)",
    audio: "audio/vocab_laban.mp3",
    tip: "في مصر كلمة 'لبن' تعني الحليب الطازج، أما في بعض الدول العربية فتعني الرائب."
  },
  {
    id: "vocab_olba",
    arabic: "علبة",
    translit: "'Olba",
    english: "Carton / Box / Can",
    icon: "📦",
    category: "عبوات وأوزان (Packaging & Weights)",
    audio: "audio/vocab_olba.mp3",
    tip: "تستخدم لعلب اللبن والجبن والمعلبات."
  },
  {
    id: "vocab_olbeten",
    arabic: "علبتين",
    translit: "'Elbetayn",
    english: "Two cartons / boxes",
    icon: "🥛🥛",
    category: "عبوات وأوزان (Packaging & Weights)",
    audio: "audio/vocab_olbeten.mp3",
    tip: "صيغة المثنى في اللهجة المصرية تنتهي دائماً بـ (ـين)."
  },
  {
    id: "vocab_sokkar",
    arabic: "سكر",
    translit: "Sokkar",
    english: "Sugar",
    icon: "🧂",
    category: "منتجات (Products)",
    audio: "audio/vocab_sokkar.mp3",
    tip: "سلعة أساسية، وتستخدم الكلمة أيضاً كمديح لطيف: 'يا سكر!'."
  },
  {
    id: "vocab_kilo",
    arabic: "كيلو",
    translit: "Keelo",
    english: "Kilogram",
    icon: "⚖️",
    category: "عبوات وأوزان (Packaging & Weights)",
    audio: "audio/vocab_kilo.mp3",
    tip: "وحدة الوزن القياسية في الأسواق والسوبرماركت المصرية."
  },
  {
    id: "vocab_geneh",
    arabic: "جنيه",
    translit: "Geneeh",
    english: "Egyptian Pound (EGP)",
    icon: "💵",
    category: "معاملات ودفع (Transactions & Payment)",
    audio: "audio/vocab_geneh.mp3",
    tip: "العملة الرسمية لمصر، يلفظ بحرف الجيم القاهرية المعطشة (Hard G)."
  },
  {
    id: "vocab_hesab",
    arabic: "الحساب",
    translit: "El-Hesaab",
    english: "The bill / total",
    icon: "🧾",
    category: "معاملات ودفع (Transactions & Payment)",
    audio: "audio/vocab_hesab.mp3",
    tip: "تقولها عندما تنتهي من التسوق أو في المطعم: 'الحساب كام؟'."
  },
  {
    id: "vocab_kart",
    arabic: "بالكارت",
    translit: "Bel-Kart",
    english: "By card (debit/credit)",
    icon: "💳",
    category: "معاملات ودفع (Transactions & Payment)",
    audio: "audio/vocab_kart.mp3",
    tip: "أصبحت البطاقات المصرفية مقبولة في معظم سلاسل السوبرماركت المصرية."
  },
  {
    id: "vocab_menenia",
    arabic: "من عنيا",
    translit: "Men 'enayya",
    english: "With pleasure (lit. From my eyes)",
    icon: "👀✨",
    category: "تعبيرات ومجاملات (Idioms & Greetings)",
    audio: "audio/vocab_menenia.mp3",
    tip: "تعبير مصري أصيل يعبر عن الاستعداد التام لمساعدة الآخرين بقلب رحب."
  },
  {
    id: "vocab_nawartina",
    arabic: "نورتينا",
    translit: "Nawwartiina",
    english: "You brightened our place",
    icon: "💡❤️",
    category: "تعبيرات ومجاملات (Idioms & Greetings)",
    audio: "audio/vocab_nawartina.mp3",
    tip: "تقال للضيف أو الزبون عند قدومه أو مغادرته كتحية ود ومحبة."
  }
];

// Interactive Quiz Questions
const QUIZ_DATA = [
  {
    question: "كم علبة لبن طلبت الزبونة من البائع؟",
    questionEn: "How many cartons of milk did the customer ask for?",
    options: ["علبة واحدة (1)", "علبتين (2)", "تلات علب (3)", "أربع علب (4)"],
    correctIndex: 1,
    explanation: "قالت الزبونة: 'عايزة علبتين، لو سمحت' (I'd like two cartons, please)."
  },
  {
    question: "كم سعر كيلو السكر في المحادثة؟",
    questionEn: "How much is a kilo of sugar in the dialogue?",
    options: ["عشرين جنيه (20)", "خمسة وعشرين جنيه (25)", "بتلاتين جنيه (30)", "أربعين جنيه (40)"],
    correctIndex: 2,
    explanation: "رد البائع: 'الكيلو بتلاتين جنيه' (A kilo is thirty pounds)."
  },
  {
    question: "ماذا تعني العبارة المصرية الشهيرة: 'من عنيا'؟",
    questionEn: "What does the Egyptian expression 'Men 'enayya' mean?",
    options: ["عندي مشكلة في عيني", "بكل سرور ومن دواعي سروري", "انظر هناك", "لا أستطيع خدمتك"],
    correctIndex: 1,
    explanation: "'من عنيا' تعبير مجازي مصري دافئ يعني 'بكل سرور وتحت أمرك'."
  },
  {
    question: "كم كان إجمالي الحساب الذي طلبه البائع؟",
    questionEn: "What was the total bill amount requested by the seller?",
    options: ["خمسين جنيه (50)", "خمسة وسبعين جنيه (75)", "مية جنيه (100)", "ستين جنيه (60)"],
    correctIndex: 1,
    explanation: "قال البائع: 'الحساب كله خمسة وسبعين جنيه' (The total is 75 pounds)."
  },
  {
    question: "كيف دفعت الزبونة ثمن المشتريات؟",
    questionEn: "How did the customer pay for her groceries?",
    options: ["كاش (نقداً)", "بالكارت (بطاقة بنكية)", "فودافون كاش", "شيك بنكي"],
    correctIndex: 1,
    explanation: "سألت الزبونة: 'ممكن أدفع بالكارت؟' وأجابها البائع: 'أيوه طبعًا، اتفضلي'."
  }
];

// Supermarket items in cart for the interactive bill
const CART_DATA = {
  items: [
    { nameAr: "لبن (علبتين)", nameEn: "Milk (2 Cartons)", qty: "2 علب", unitPrice: 22.5, total: 45, icon: "🥛" },
    { nameAr: "سكر (كيلو)", nameEn: "Sugar (1 Kilo)", qty: "1 كجم", unitPrice: 30, total: 30, icon: "🧂" }
  ],
  totalAmount: 75,
  currency: "جنيه مصري (EGP)",
  paymentMethod: "دفع إلكتروني (بالكارت - Card)"
};
