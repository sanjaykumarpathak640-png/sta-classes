import { NextRequest, NextResponse } from "next/server";

interface DoubtRequest {
  question: string;
  classGrade?: string;
  subject?: string;
  history?: Array<{ sender: "user" | "ai"; text: string }>;
}

// Educational response generator tailored for Class 4 to 12 students
function generateTutorResponse(question: string, grade?: string, subject?: string): string {
  const q = question.toLowerCase();

  // 1. Photosynthesis / Plants
  if (q.includes("photo") || q.includes("prakash") || (q.includes("plant") && q.includes("food"))) {
    return `🌱 **Photosynthesis (प्रकाश संश्लेषण) Samjho Asaan Bhasha Me:**

**1. Kya Hota Hai?**
Green plants apna khana khud banate hain sun ki light, carbon dioxide (CO₂) aur pani (H₂O) ka use karke. Is process ko Photosynthesis kehte hain!

**2. Chemical Equation (Exam me zaroor likhna):**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{Sunlight, Chlorophyll}} C_6H_{12}O_6 + 6O_2$$

**3. Main Steps (CBSE/State Board me 3 marks ka aata hai):**
- **Absorption:** Chlorophyll sunlight ko absorb karta hai.
- **Conversion:** Light energy chemical energy me badalti hai aur water ($H_2O$) split hota hai Hydrogen aur Oxygen me.
- **Reduction:** Carbon Dioxide ($CO_2$) carbohydrates (glucose) me convert hota hai.

💡 **STA Mentor Tip:** Oxygen ($O_2$) jo hum saans lene ke liye use karte hain, wo is process ka by-product hai jo stomata ke through bahar aati hai!

Kya aapko Stomata ya Chloroplast ka structure bhi samajhna hai?`;
  }

  // 2. Mitochondria / Powerhouse
  if (q.includes("mitochondria") || q.includes("powerhouse") || q.includes("cell")) {
    return `⚡ **Mitochondria ko "Powerhouse of the Cell" kyu kehte hain?**

**Short & Clear Answer:**
Mitochondria cell ke andar **ATP (Adenosine Triphosphate)** banata hai, jo cell ki **"Energy Currency"** hai. Hamare shareer ki har activity (bolna, khelna, padhna) ke liye energy yahi se aati hai!

**Key Points Jo Exam Me Marks Dilwayenge:**
1. **Double Membrane:** Mitochondria ke paas 2 layers hoti hain — outer membrane smooth hoti hai aur inner membrane deeply folded hoti hai (jise *cristae* kehte hain) taaki ATP banane ke liye large surface area mile.
2. **Apna DNA & Ribosomes:** Mitochondria ek aisa unique organelle hai jiske paas apna khud ka DNA aur ribosomes hote hain, isliye ye apne proteins khud bana sakta hai.
3. **Aerobic Respiration:** Glucose ka breakdown karke ATP energy generate karta hai.

💡 **Exam Trick:** Jab bhi Mitochondria ka question aaye, hamesha ATP ka full form zaroor likhein: *Adenosine Triphosphate*!`;
  }

  // 3. Ohm's Law / Electricity
  if (q.includes("ohm") || q.includes("current") || q.includes("voltage") || q.includes("resistance") || q.includes("v=ir")) {
    return `⚡ **Ohm's Law (Class 10 Physics Special):**

**Statement:**
At a constant temperature, a conductor ke across jo potential difference ($V$) hota hai, wo usme flow hone wale current ($I$) ke directly proportional hota hai.

**Mathematical Formula:**
$$V \\propto I \\implies V = I \\times R$$
Jahan:
- $V$ = Potential Difference (Volt me)
- $I$ = Electric Current (Ampere me)
- $R$ = Resistance (Ohm $\\Omega$ me)

**Ek Simple Example Numerical:**
> **Question:** Agar kisi bulb ke across 220V lagaya jaye aur uska resistance $110\\ \\Omega$ ho, to current kitna flow hoga?
> **Solution:** $I = \\frac{V}{R} = \\frac{220}{110} = 2\\text{ Amperes (A)}$.

💡 **Graph Tip:** $V$ vs $I$ ka graph hamesha ek **Straight Line Passing Through Origin** hota hai! Slope hume Resistance ($R$) deta hai.`;
  }

  // 4. Pythagoras Theorem
  if (q.includes("pythagoras") || q.includes("triangle") || q.includes("hypotenuse") || q.includes("right angle")) {
    return `📐 **Pythagoras Theorem (Class 7 to 10 Maths):**

**Kahan lagta hai?**
Sirf aur sirf **Right-Angled Triangle** (jisme ek angle $90^\\circ$ ho) me lagta hai!

**Formula:**
$$(\\text{Hypotenuse})^2 = (\\text{Base})^2 + (\\text{Perpendicular})^2$$
$$H^2 = B^2 + P^2 \\quad \\text{ya} \\quad H = \\sqrt{B^2 + P^2}$$

*Jahan Hypotenuse $90^\\circ$ ke theek saamne wali sabse lambi side hoti hai.*

**Common Pythagorean Triplets (Fast Calculation ke liye yaad rakho):**
- $3, 4, 5 \\implies 3^2 + 4^2 = 9 + 16 = 25 = 5^2$
- $5, 12, 13$
- $6, 8, 10$
- $8, 15, 17$

Agar aapko triangle ke sides diye hain aur Hypotenuse nikalna hai, to dono sides ka square karke add karo aur square root le lo!`;
  }

  // 5. Newton's Laws of Motion
  if (q.includes("newton") || q.includes("motion") || q.includes("force") || q.includes("inertia")) {
    return `🚀 **Newton's 3 Laws of Motion (Easy Examples Ke Saath):**

1. **First Law (Law of Inertia):**
   - Koi object tab tak rest pe rahega (ya straight line me move karta rahega), jab tak uspe koi external force na lage.
   - *Daily Life Example:* Jab chalte bus me sudden brake lagta hai, hum aage ki taraf jhuk jate hain!

2. **Second Law ($F = ma$):**
   - Rate of change of momentum is proportional to applied force.
   - Formula: **$$F = m \\times a$$** (Force = Mass $\\times$ Acceleration).
   - *Daily Life Example:* Cricket player ball catch karte waqt apne haath piche khinchta hai taaki force kam lage aur chot na aaye.

3. **Third Law (Action & Reaction):**
   - To every action, there is an equal and opposite reaction.
   - *Daily Life Example:* Rocket ka udna — fuel niche nikalta hai (Action) aur rocket upar bhagta hai (Reaction)!

Kaunse law ka numerical solve karna hai aapko?`;
  }

  // 6. Quadratic Equations / Math
  if (q.includes("quadratic") || q.includes("d=b^2-4ac") || q.includes("shreedhar") || q.includes("roots")) {
    return `🧮 **Quadratic Equation (द्विघात समीकरण) Master Guide:**

**Standard Form:**
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

**Shreedharacharya Formula (Quadratic Formula):**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Discriminant ($D = b^2 - 4ac$) se Nature of Roots pata karo:**
- Agar $D > 0$ : **Do Real aur Distinct roots** honge.
- Agar $D = 0$ : **Do Real aur Equal roots** honge ($x = \\frac{-b}{2a}$).
- Agar $D < 0$ : **Koi Real root nahi hoga** (Imaginary roots).

💡 **Pro-Tip:** Middle term splitting agar na ho rahi ho, to seedha Quadratic Formula lagao — 100% answer aayega!`;
  }

  // 7. Light Reflection & Refraction / Mirrors
  if (q.includes("light") || q.includes("mirror") || q.includes("lens") || q.includes("focal") || q.includes("reflection") || q.includes("refraction")) {
    return `🔍 **Spherical Mirrors & Lens Quick Formula Sheet (Class 10):**

**1. Mirror Formula:**
$$\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$$
Magnification: $m = -\\frac{v}{u} = \\frac{h_i}{h_o}$

**2. Lens Formula:**
$$\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$$
Magnification: $m = +\\frac{v}{u} = \\frac{h_i}{h_o}$

**Sign Convention Rule (Cartesian Rule):**
- Object distance ($u$) **hamesha negative** ($-$) liya jata hai.
- Concave mirror / Concave lens ki focal length ($f$) **negative** hoti hai.
- Convex mirror / Convex lens ki focal length ($f$) **positive** hoti hai.

Bataiye, Concave mirror ke 6 ray diagrams me se kaunsa diagram banana hai?`;
  }

  // 8. English Grammar / Tenses / Letters
  if (q.includes("tense") || q.includes("grammar") || q.includes("active") || q.includes("passive") || q.includes("letter") || q.includes("english")) {
    return `✍️ **English Grammar & Tenses Quick Reference:**

**Tenses Rule Chart (Rules for 3 Main Tenses):**
1. **Present Indefinite:** Subject + $V_1$ (+ s/es) + Object.
   - *Example:* She studies hard every day.
2. **Past Indefinite:** Subject + $V_2$ + Object.
   - *Example:* She studied hard yesterday.
3. **Future Indefinite:** Subject + will/shall + $V_1$ + Object.
   - *Example:* She will study hard tomorrow.

**Active to Passive Voice Golden Rule:**
- Object becomes Subject.
- Hamesha **$V_3$ (Past Participle)** use hota hai.
- *Active:* Rahul plays cricket.
- *Passive:* Cricket **is played** by Rahul.

Aapko kisi specific sentence ka conversion chahiye? Type karke bhejiye!`;
  }

  // Default friendly educational response
  return `👋 **Namaste! Main STA Classes ka AI Study Mentor hu.**

Aapne poocha: *"\"${question}\""*

**Padhai Ke Liye Step-by-Step Guidance:**
1. **Basic Concept:** Is topic ko samajhne ke liye pehle basic definition aur iska real-life use dekhein.
2. **Formula / Key Terms:** Is topic me jo terms aate hain unhe note karein.
3. **Step-by-Step Solution:** NCERT ya standard syllabus ke hisaab se har step likhna zaroori hai.

✨ **Mujhse aap ye sab pooch sakte hain:**
- Maths ke formula aur step-by-step numerical solve karwana
- Science ke concepts (Physics, Chemistry, Biology) Class 4th se 12th tak
- English Grammar aur Sentence correction
- Board exam ke liye high-scoring revision tips

Aap apna exact question ya numerical values share karein, main turant solve karke dunga!`;
}

export async function POST(req: NextRequest) {
  try {
    const body: DoubtRequest = await req.json();
    const { question, classGrade, subject } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Question cannot be empty" },
        { status: 400 }
      );
    }

    // Generate educational guidance
    const answer = generateTutorResponse(question, classGrade, subject);

    return NextResponse.json({
      success: true,
      question,
      answer,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process doubt question: " + error.message },
      { status: 500 }
    );
  }
}
