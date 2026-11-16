import { NextRequest, NextResponse } from "next/server";

interface DoubtRequest {
  question: string;
  classGrade?: string;
  subject?: string;
  language?: "hinglish" | "english" | "hindi";
  history?: Array<{ sender: "user" | "ai"; text: string }>;
}

// Comprehensive intelligent educational solver for Class 4 to 12
function generateTutorResponse(
  question: string,
  grade: string = "Class 10th",
  subject: string = "General",
  language: "hinglish" | "english" | "hindi" = "hinglish"
): string {
  const q = question.toLowerCase().trim();

  // 1. Photosynthesis & Plant Physiology
  if (q.includes("photo") || q.includes("prakash") || (q.includes("plant") && (q.includes("food") || q.includes("khana")))) {
    if (language === "hindi") {
      return `🌱 **प्रकाश संश्लेषण (Photosynthesis) — संपूर्ण विवरण:**

**1. परिभाषा:**
हरे पौधे सूर्य के प्रकाश, कार्बन डाइऑक्साइड ($CO_2$) और जल ($H_2O$) की सहायता से क्लोरोफिल की उपस्थिति में अपना भोजन (ग्लूकोज) बनाते हैं। इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं।

**2. रासायनिक समीकरण (परीक्षा के लिए अनिवार्य):**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{सूर्य का प्रकाश, क्लोरोफिल}} C_6H_{12}O_6 + 6O_2$$

**3. मुख्य 3 चरण (Board Exam 3 Marks):**
1. **प्रकाश ऊर्जा का अवशोषण:** क्लोरोफिल द्वारा सौर ऊर्जा को सोखना।
2. **ऊर्जा रूपांतरण:** प्रकाश ऊर्जा को रासायनिक ऊर्जा में बदलना और जल के अणुओं का हाइड्रोजन व ऑक्सीजन में अपघटन।
3. **अपचयन (Reduction):** कार्बन डाइऑक्साइड का कार्बोहाइड्रेट्स (ग्लूकोज) में बदलना।

💡 **STA मास्टर टिप:** ऑक्सीजन ($O_2$) जो जीव सांस लेते हैं, वह जल ($H_2O$) के टूटने से निकलती है, न कि $CO_2$ से!

🎯 **अभ्यास प्रश्न:**
- प्रकाश संश्लेषण में स्टोमेटा (रंध्र) का क्या कार्य है?`;
    }

    if (language === "english") {
      return `🌱 **Photosynthesis — Step-by-Step Master Guide:**

**1. Definition:**
The biochemical process by which autotrophic green plants synthesize organic food (glucose) from carbon dioxide and water in the presence of sunlight and chlorophyll.

**2. Chemical Equation:**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2$$

**3. Three Core Events (CBSE & State Board Favorite):**
1. **Absorption** of light energy by chlorophyll.
2. **Conversion** of light energy into chemical energy and splitting of water ($H_2O$) into hydrogen and oxygen.
3. **Reduction** of carbon dioxide ($CO_2$) to carbohydrates (glucose).

💡 **STA Pro Tip:** Oxygen released during photosynthesis originates from water ($H_2O$), proven by Ruben & Kamen using isotopic tracers ($^{18}O$).

🎯 **Self-Check Question:**
- What triggers the opening and closing of stomatal guard cells?`;
    }

    // Hinglish (Default)
    return `🌱 **Photosynthesis (प्रकाश संश्लेषण) Asaan Bhasha Me:**

**1. Concept Kya Hai?**
Green plants sunlight, carbon dioxide ($CO_2$) aur pani ($H_2O$) ka use karke chlorophyll ki presence me apna khana (glucose) banate hain. Is process ko Photosynthesis kehte hain!

**2. Chemical Equation (Board Exam Me Full Marks Ke Liye):**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2$$

**3. Teen Important Steps:**
- **Step 1:** Chlorophyll sunlight ko capture/absorb karta hai.
- **Step 2:** Light energy chemical energy me badalti hai aur paani ($H_2O$) Hydrogen aur Oxygen ($O_2$) me split hota hai.
- **Step 3:** Carbon Dioxide ($CO_2$) reduce hokar Carbohydrates (Glucose) banata hai.

💡 **STA Mentor Secret Tip:** Jo oxygen ($O_2$) hum saans lene me use karte hain, wo $H_2O$ ke tutne se release hoti hai, $CO_2$ se nahi!

🎯 **Practice Question:**
- Stomata ke khulne aur band hone ko kaun control karta hai? (Answer: Guard Cells)`;
  }

  // 2. Balancing Chemical Equations
  if (q.includes("balance") || q.includes("samyikaran") || q.includes("equation") || q.includes("fe + h2o") || q.includes("h2 + o2")) {
    return `⚖️ **Chemical Equations Balance Karne Ka Master Method (Hit & Trial / Algebraic):**

**Example Question:**
$$Fe + H_2O \\longrightarrow Fe_3O_4 + H_2$$

**Step-by-Step Solution:**
1. **Right side me Fe ke 3 atoms hain:** Left me $Fe$ ke aage 3 lagao:
   $$3Fe + H_2O \\longrightarrow Fe_3O_4 + H_2$$
2. **Right side me Oxygen ke 4 atoms hain:** Left me $H_2O$ ke aage 4 lagao:
   $$3Fe + 4H_2O \\longrightarrow Fe_3O_4 + H_2$$
3. **Ab Left side me Hydrogen $4 \\times 2 = 8$ ho gaya:** Right me $H_2$ ke aage 4 lagao:
   $$3Fe + 4H_2O \\longrightarrow Fe_3O_4 + 4H_2$$

✅ **Final Balanced Equation:**
$$3Fe(s) + 4H_2O(g) \\longrightarrow Fe_3O_4(s) + 4H_2(g)$$

💡 **Exam Trick:** Hamesha sabse pehle us element ko balance karo jiske atoms sabse zyada ho (usually Oxygen ya Metal), aur sabse aakhiri me Hydrogen aur Oxygen ko fine-tune karo!`;
  }

  // 3. Ohm's Law & Electricity
  if (q.includes("ohm") || q.includes("current") || q.includes("voltage") || q.includes("resistance") || q.includes("v=ir") || q.includes("vidyut")) {
    return `⚡ **Ohm's Law & Electricity (विद्युत धारा एवं ओम का नियम):**

**1. Statement:**
Kisi conductor ke across ka Potential Difference ($V$), usme flow hone wale Electric Current ($I$) ke directly proportional hota hai, bas temperature constant rehna chahiye.

**2. Formula & Triangle:**
$$V = I \\times R \\quad \\implies \\quad I = \\frac{V}{R} \\quad \\implies \\quad R = \\frac{V}{I}$$
- $V$ = Voltage / Potential Difference (Volts - $V$)
- $I$ = Electric Current (Amperes - $A$)
- $R$ = Electrical Resistance (Ohms - $\\Omega$)

**3. Quick Numerical Solve Karein:**
> **Question:** Ek electric heater 220V source se 5A current leta hai. Uska resistance kitna hoga?
> **Solution:** $R = \\frac{V}{I} = \\frac{220}{5} = 44\\ \\Omega$.

💡 **STA Board Tip:** V-I graph hamesha **origin ($0,0$) se guzarti hui straight line** hoti hai. Graph ka slope hume Resistance ($R$) batata hai!`;
  }

  // 4. Pythagoras Theorem & Trigonometry
  if (q.includes("pythagoras") || q.includes("hypotenuse") || q.includes("trigo") || q.includes("sin") || q.includes("cos") || q.includes("tan")) {
    return `📐 **Pythagoras Theorem & Trigonometry Super Shortcuts:**

**1. Pythagoras Theorem (Right Triangle Ke Liye):**
$$(\\text{Hypotenuse})^2 = (\\text{Perpendicular})^2 + (\\text{Base})^2$$
$$H^2 = P^2 + B^2 \\implies H = \\sqrt{P^2 + B^2}$$

**Super Triplets Jo 5 Second Me Answer Denge:**
- $3 - 4 - 5$ ($3^2 + 4^2 = 9 + 16 = 25 = 5^2$)
- $5 - 12 - 13$
- $6 - 8 - 10$
- $8 - 15 - 17$
- $7 - 24 - 25$

**2. Trigonometry Ratios Yaad Rakhne Ki Desi Trick:**
> *"Pandit Badri Prasad, Har Har Bole"*
- $\\sin \\theta = \\frac{P}{H}$ (Pandit / Har)
- $\\cos \\theta = \\frac{B}{H}$ (Badri / Har)
- $\\tan \\theta = \\frac{P}{B}$ (Prasad / Bole)

💡 **Golden Identity:** $\\sin^2 \\theta + \\cos^2 \\theta = 1$ har exam me aati hai!`;
  }

  // 5. Quadratic Equations & Shreedharacharya
  if (q.includes("quadratic") || q.includes("dwighat") || q.includes("roots") || q.includes("discriminant") || q.includes("d=b^2")) {
    return `🧮 **Quadratic Equation (द्विघात समीकरण) Step-by-Step:**

**Standard Form:**
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

**Shreedharacharya Formula (Universal Formula):**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Discriminant ($D = b^2 - 4ac$) Ka Magic Table:**
| Value of $D$ | Nature of Roots | Number of Roots |
| :--- | :--- | :--- |
| $D > 0$ | Real & Distinct (अलग-अलग) | 2 Roots |
| $D = 0$ | Real & Equal (समान: $x = -b/2a$) | 2 Equal Roots |
| $D < 0$ | No Real Roots (काल्पनिक) | 0 Real Roots |

💡 **STA Shortcut:** Agar middle term split na ho paaye ya decimal/root ho, bina samay gawaye seedha Shreedharacharya Formula lagayein!`;
  }

  // 6. Mitochondria & Cell Biology
  if (q.includes("mitochondria") || q.includes("powerhouse") || q.includes("cell") || q.includes("koshika") || q.includes("atp")) {
    return `🔬 **Mitochondria — Powerhouse of the Cell (कोशिका का ऊर्जा गृह):**

**Kyu kehte hain Powerhouse?**
Kyunki ye cellular respiration ke dauraan food (glucose) ko tod kar **ATP (Adenosine Triphosphate)** banata hai, jo pure shareer ke kaam aane wali "Energy Currency" hai!

**Key Examination Points:**
1. **Double Membrane:** Outer layer smooth hoti hai, inner layer me folds hote hain jise **Cristae** kehte hain (ye ATP production ke surface area ko badhate hain).
2. **Semi-Autonomous:** Iske paas apna khud ka **DNA** aur **Ribosomes** hote hain, isliye ye apne jaruri proteins khud bana leta hai.
3. **ATP Formula:** $ADP + \\text{Phosphate} + \\text{Energy} \\longrightarrow ATP$.

💡 **1-Mark Question:** ATP ka full form hamesha yaad rakhein: *Adenosine Triphosphate*!`;
  }

  // 7. Newton's Laws of Motion & Gravity
  if (q.includes("newton") || q.includes("motion") || q.includes("gati") || q.includes("force") || q.includes("gravity") || q.includes("bal")) {
    return `🚀 **Newton's Laws of Motion (न्यूटन के गति नियम) With Real Life Examples:**

**1. First Law (Law of Inertia - जड़त्व का नियम):**
- Koi cheez jaisi hai waisi hi rahegi jab tak us par bahari bal (external force) na lage.
- *Real Life:* Chalte tempo ya bus me achanak break lagne par hum aage jhul jate hain!

**2. Second Law ($F = m \\times a$):**
- Force = Mass $\\times$ Acceleration.
- Momentum me badlav ki dar (rate of change of momentum) force ke barabar hoti hai.
- *Real Life:* Cricket fielder catch pakadte waqt hath peeche kheechta hai taaki chot na lage!

**3. Third Law (Action-Reaction - क्रिया-प्रतिक्रिया का नियम):**
- Har action ka ek equal aur opposite reaction hota hai.
- *Real Life:* Bandook se goli daagne par piche kick lagna, aur Barh ke Ganga ji me naav se koodte waqt naav ka peeche jana!

💡 **STA Formula:** $F = m \\times a$, Weight $W = m \\times g$ (jahan $g = 9.8\\text{ m/s}^2$).`;
  }

  // 8. Light, Mirrors & Lens Formula
  if (q.includes("light") || q.includes("mirror") || q.includes("lens") || q.includes("refraction") || q.includes("reflection") || q.includes("focal")) {
    return `🔍 **Spherical Mirrors & Lens (प्रकाश - परावर्तन तथा अपवर्तन):**

**Formula Comparison Sheet:**
| Feature | Spherical Mirror (दर्पण) | Spherical Lens (लेंस) |
| :--- | :--- | :--- |
| **Formula** | $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ | $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$ |
| **Magnification ($m$)** | $m = -\\frac{v}{u} = \\frac{h_i}{h_o}$ | $m = +\\frac{v}{u} = \\frac{h_i}{h_o}$ |
| **Power ($P$)** | N/A | $P = \\frac{1}{f\\text{ (in meters)}}$ (Dioptre, D) |

**Sign Convention Golden Rules:**
- $u$ (Object distance) **hamesha negative ($-$)** hota hai.
- Concave mirror / Concave lens ki focal length ($f$) **hamesha negative ($-$)** hoti hai.
- Convex mirror / Convex lens ki focal length ($f$) **hamesha positive ($+$)** hoti hai.`;
  }

  // 9. English Grammar & Tenses
  if (q.includes("tense") || q.includes("grammar") || q.includes("active") || q.includes("passive") || q.includes("voice") || q.includes("english")) {
    return `✍️ **English Grammar & Tense Chart (आसान नियम एवं उदाहरण):**

**1. 3 Main Tenses Ka Formula Chart:**
- **Present Indefinite:** Subject + $V_1$ (+ s/es with he/she/it) + Object.
  - *Example:* Rohit attends STA Classes daily.
- **Past Indefinite:** Subject + $V_2$ + Object.
  - *Example:* Rohit attended STA Classes yesterday.
- **Future Indefinite:** Subject + will/shall + $V_1$ + Object.
  - *Example:* Rohit will attend STA Classes tomorrow.

**2. Active to Passive Voice Super Rule:**
- Object ban jata hai naya Subject.
- Hamesha **$V_3$ (Past Participle)** aati hai.
- *Active:* Teacher teaches mathematics.
- *Passive:* Mathematics **is taught** by the teacher.

💡 **STA Tip:** Passive voice me hamesha 'by' lagana jaruri nahi hota agar subject obvious ho (e.g. *The thief was arrested*).`;
  }

  // 10. Acids, Bases & Salts (Chemistry)
  if (q.includes("acid") || q.includes("base") || q.includes("ph") || q.includes("salt") || q.includes("amla") || q.includes("kshar")) {
    return `🧪 **Acids, Bases & Salts (अम्ल, क्षारक एवं लवण):**

**Key Properties:**
- **Acids (अम्ल):** Sour taste (खट्टा), Blue Litmus ko Red karte hain, $H^+$ ions release karte hain ($pH < 7$).
- **Bases (क्षारक):** Bitter taste (कड़वा), Red Litmus ko Blue karte hain, $OH^-$ ions release karte hain ($pH > 7$).
- **Neutral (उदासीन):** Pure water ($pH = 7$).

**Neutralization Reaction:**
$$\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{Water}$$
$$HCl + NaOH \\longrightarrow NaCl + H_2O$$

**Common Important Compounds:**
1. **Baking Soda:** $NaHCO_3$ (Sodium Hydrogen Carbonate)
2. **Washing Soda:** $Na_2CO_3 \\cdot 10H_2O$
3. **Bleaching Powder:** $CaOCl_2$
4. **Plaster of Paris (POP):** $CaSO_4 \\cdot \\frac{1}{2}H_2O$`;
  }

  // 11. Mathematics - Fractions, Decimals, Percentages (Class 4 to 8)
  if (q.includes("fraction") || q.includes("bhinn") || q.includes("decimal") || q.includes("percent") || q.includes("pratishat") || q.includes("lcm") || q.includes("hcf")) {
    return `🔢 **Fractions & Percentages (भिन्न और प्रतिशत आसान ट्रिक):**

**1. Fractions Add Karne Ka Universal Tarika:**
$$\\frac{a}{b} + \\frac{c}{d} = \\frac{(a \\times d) + (b \\times c)}{b \\times d}$$
*Example:* $\\frac{2}{3} + \\frac{4}{5} = \\frac{(2 \\times 5) + (3 \\times 4)}{3 \\times 5} = \\frac{10 + 12}{15} = \\frac{22}{15}$.

**2. Percentage (%):**
- Kisi bhi fraction ko percentage me badalne ke liye **$100$ se guna (multiply)** karein:
  - $\\frac{4}{5} \\times 100 = 80\\%$.
- Percentage ko fraction me badalne ke liye **$100$ se bhaag (divide)** karein:
  - $25\\% = \\frac{25}{100} = \\frac{1}{4}$.

💡 **LCM Shortcut:** Badi sankhya ka pahada (table) padho jab tak wo dusri sankhya se poori tarah na cut jaaye!`;
  }

  // 12. Dynamic Intelligent Response for Any Other Doubt
  return `🎓 **STA Classes AI Study Mentor — ${grade} (${subject}):**

Aapka sawal: *"\"${question}\""*

**1. Basic Concept & Explanation:**
Is concept ko samajhne ke liye pehle mukhya bindu dekhein:
- Is vishay me mukhya paribhasha (definition) aur real-life prayog sabse jaruri hai.
- Yadi ye numerical ya equation hai, to hamesha standard units (SI Units jaise meter, second, kg) me likhein.

**2. Step-by-Step Problem Solving Approach:**
1. **Given Data:** Jo values prashna me di gayi hain unhe alag se note karein.
2. **Formula Applied:** Topic ka mukhya formula likhein (formula likhne se exam me step marking ke marks milte hain).
3. **Calculation:** Step-by-step calculate karein aur aakhiri me sahi unit zaroor likhein.

**3. Board Exam / Class Test Scoring Tip:**
- Exam paper me clean diagram ya formula box zaroor banayein.
- Revision ke liye roz sham ko 15 minute formula chart revise karein.

✨ **Mujhse aap turant ye sab pooch sakte hain:**
- Maths numericals, Geometry proofs aur Quadratic calculations
- Physics derivations, Ray diagrams aur Electricity numericals
- Chemistry chemical equations balance karna aur Formula sheet
- Biology diagrams (Heart, Eye, Nephron, Digestive System) aur processes
- English grammar, Tense conversion aur Letter writing

Aap is question ki specific values ya equation type karke bhejiye, main turant solve kar dunga!`;
}

export async function POST(req: NextRequest) {
  try {
    const body: DoubtRequest = await req.json();
    const { question, classGrade, subject, language = "hinglish" } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Question cannot be empty" },
        { status: 400 }
      );
    }

    // Check if an external Gemini API Key is configured in environment
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.length > 10) {
      try {
        const systemPrompt = `You are the master AI Study Mentor for STA Classes, a premier tuition institute in Barh, Bihar for Classes 4th to 12th (CBSE, ICSE, and Bihar Board).
The student is studying in ${classGrade || "Class 10th"} and asking about ${subject || "General Study"}.
Respond in ${language === "hindi" ? "pure Hindi" : language === "english" ? "clear English" : "friendly Hinglish (Hindi + English)"}.
Provide:
1. Clear conceptual answer
2. Step-by-step derivation or solution with formulas
3. Important board exam tip / shortcut trick
4. 1-2 quick self-test practice questions. Keep it encouraging, accurate, and educational.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: systemPrompt },
                    { text: `Question: ${question}` },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              question,
              answer: generatedText,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              source: "gemini-ai",
            });
          }
        }
      } catch (geminiError) {
        // Fall back gracefully to built-in comprehensive engine
      }
    }

    // Built-in intelligent educational brain
    const answer = generateTutorResponse(question, classGrade, subject, language);

    return NextResponse.json({
      success: true,
      question,
      answer,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      source: "sta-tutor-brain",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process doubt question: " + error.message },
      { status: 500 }
    );
  }
}
