// بنك أسئلة دروس الفيزياء — منصة التحصيلي المبكر (Nabthati)
// يمكنك إضافة أي درس جديد ككائن جديد داخل مصفوفة PHYSICS_LESSONS
export const PHYSICS_LESSONS = [
  {
    "id": "work-energy-power",
    "order": 1,
    "title": "الشغل والطاقة والقدرة",
    "subtitle": "الشغل، طاقة الحركة والوضع، حفظ الطاقة، والقدرة الميكانيكية",
    "badge": "الدرس الأول ⚡",
    "questions": [
      {
        "id": "wep-1",
        "topic": "حساب الشغل",
        "question": "دفع طالب صندوقاً بقوة أفقية ثابتة مقدارها $40\\text{ N}$ مسافة $5\\text{ m}$ في نفس اتجاه القوة. ما مقدار الشغل المبذول؟",
        "options": [
          "$8\\text{ J}$",
          "$45\\text{ J}$",
          "$200\\text{ J}$",
          "$400\\text{ J}$"
        ],
        "answer": 2,
        "explanation": "الشغل يساوي $W = F \\cdot d = 40 \\times 5 = 200\\text{ J}$."
      },
      {
        "id": "wep-2",
        "topic": "الشغل بزاوية",
        "svg": "<svg viewBox=\"0 0 420 180\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <line x1=\"30\" y1=\"140\" x2=\"390\" y2=\"140\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <rect x=\"70\" y=\"90\" width=\"70\" height=\"50\" fill=\"#f8fafc\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"120\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#0f172a\">m</text>\n  <!-- Horizontal dashed reference -->\n  <line x1=\"140\" y1=\"115\" x2=\"250\" y2=\"115\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"5,4\"/>\n  <!-- Angled force F at 60 deg -->\n  <line x1=\"140\" y1=\"115\" x2=\"195\" y2=\"25\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"195,25 184,32 194,38\" fill=\"#0f172a\"/>\n  <text x=\"210\" y=\"34\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F = 60 N</text>\n  <!-- Angle arc -->\n  <path d=\"M 172 115 A 32 32 0 0 0 156 88\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <text x=\"186\" y=\"102\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">60°</text>\n  <!-- Displacement arrow -->\n  <line x1=\"105\" y1=\"158\" x2=\"330\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"1.8\"/>\n  <polygon points=\"330,158 320,153 320,163\" fill=\"#0f172a\"/>\n  <text x=\"217\" y=\"174\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">d = 10 m</text>\n</svg>",
        "question": "في الشكل أعلاه، يُسحب صندوق بقوة $F = 60\\text{ N}$ تصنع زاوية $60^\\circ$ مع الأفقي لمسافة $d = 10\\text{ m}$. ما مقدار الشغل المبذول على الصندوق؟",
        "options": [
          "$150\\text{ J}$",
          "$300\\text{ J}$",
          "$520\\text{ J}$",
          "$600\\text{ J}$"
        ],
        "answer": 1,
        "explanation": "نستخدم القانون $W = F d \\cos\\theta = 60 \\times 10 \\times \\cos 60^\\circ = 600 \\times 0.5 = 300\\text{ J}$."
      },
      {
        "id": "wep-3",
        "topic": "القوة العمودية والشغل",
        "question": "يحمل عامل حقيبة وزنها $50\\text{ N}$ ويمشي بها أفقياً بسرعة ثابتة مسافة $8\\text{ m}$. ما مقدار الشغل الذي تبذله قوة الجاذبية على الحقيبة؟",
        "options": [
          "$0\\text{ J}$",
          "$50\\text{ J}$",
          "$200\\text{ J}$",
          "$400\\text{ J}$"
        ],
        "answer": 0,
        "explanation": "قوة الجاذبية عمودية على اتجاه الإزاحة الأفقية ($\\theta = 90^\\circ$)، وبما أن $\\cos 90^\\circ = 0$ فإن الشغل يساوي صفراً."
      },
      {
        "id": "wep-4",
        "topic": "الشغل السالب",
        "question": "ينزلق جسم على سطح خشن مسافة $6\\text{ m}$ تحت تأثير قوة احتكاك ثابتة مقدارها $15\\text{ N}$ عكس اتجاه الحركة. ما الشغل الذي تبذله قوة الاحتكاك؟",
        "options": [
          "$-90\\text{ J}$",
          "$-21\\text{ J}$",
          "$+90\\text{ J}$",
          "$0\\text{ J}$"
        ],
        "answer": 0,
        "explanation": "قوة الاحتكاك عكس الإزاحة ($\\theta = 180^\\circ$ و $\\cos 180^\\circ = -1$)، لذا $W = -15 \\times 6 = -90\\text{ J}$."
      },
      {
        "id": "wep-5",
        "topic": "منحنى القوة والإزاحة",
        "svg": "<svg viewBox=\"0 0 420 210\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Axes -->\n  <line x1=\"60\" y1=\"165\" x2=\"375\" y2=\"165\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <polygon points=\"375,165 365,160 365,170\" fill=\"#0f172a\"/>\n  <line x1=\"60\" y1=\"165\" x2=\"60\" y2=\"25\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <polygon points=\"60,25 55,35 65,35\" fill=\"#0f172a\"/>\n  <!-- Labels -->\n  <text x=\"48\" y=\"32\" text-anchor=\"end\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F (N)</text>\n  <text x=\"372\" y=\"185\" text-anchor=\"end\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">d (m)</text>\n  <!-- Grid & shaded area -->\n  <polygon points=\"60,165 60,65 240,65 330,165\" fill=\"#e2e8f0\" stroke=\"none\"/>\n  <polyline points=\"60,65 240,65 330,165\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <!-- Dashed guide -->\n  <line x1=\"240\" y1=\"65\" x2=\"240\" y2=\"165\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,4\"/>\n  <!-- Ticks -->\n  <line x1=\"55\" y1=\"65\" x2=\"65\" y2=\"65\" stroke=\"#0f172a\" stroke-width=\"1.8\"/>\n  <text x=\"48\" y=\"70\" text-anchor=\"end\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">20</text>\n  <text x=\"52\" y=\"182\" text-anchor=\"end\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\">0</text>\n  <line x1=\"240\" y1=\"160\" x2=\"240\" y2=\"170\" stroke=\"#0f172a\" stroke-width=\"1.8\"/>\n  <text x=\"240\" y=\"185\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">4</text>\n  <line x1=\"330\" y1=\"160\" x2=\"330\" y2=\"170\" stroke=\"#0f172a\" stroke-width=\"1.8\"/>\n  <text x=\"330\" y=\"185\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#0f172a\">6</text>\n</svg>",
        "question": "يوضح الرسم البياني أعلاه تغيّر القوة المؤثرة في جسم مع الإزاحة. ما مقدار الشغل الكلي المبذول خلال إزاحة الجسم من $0$ إلى $6\\text{ m}$؟",
        "options": [
          "$60\\text{ J}$",
          "$80\\text{ J}$",
          "$100\\text{ J}$",
          "$120\\text{ J}$"
        ],
        "answer": 2,
        "explanation": "الشغل يساوي المساحة تحت منحنى ($F-d$): مساحة المستطيل ($20 \\times 4 = 80$) + مساحة المثلث ($\\frac{1}{2} \\times 20 \\times 2 = 20$) = $100\\text{ J}$."
      },
      {
        "id": "wep-6",
        "topic": "طاقة الحركة",
        "question": "جسم كتلته $4\\text{ kg}$ يتحرك بسرعة $6\\text{ m/s}$. ما مقدار طاقته الحركية ($KE$)؟",
        "options": [
          "$12\\text{ J}$",
          "$24\\text{ J}$",
          "$72\\text{ J}$",
          "$144\\text{ J}$"
        ],
        "answer": 2,
        "explanation": "طاقة الحركة $KE = \\frac{1}{2} m v^2 = \\frac{1}{2} \\times 4 \\times 6^2 = 2 \\times 36 = 72\\text{ J}$."
      },
      {
        "id": "wep-7",
        "topic": "تناسب طاقة الحركة",
        "question": "إذا تضاعفت سرعة سيارة (أصبحت ضعف سرعتها الأصلية) مع ثبات كتلتها، فإن طاقتها الحركية:",
        "options": [
          "تبقى ثابتة",
          "تتضاعف مرتين",
          "تزداد إلى أربعة أضعاف",
          "تقل إلى النصف"
        ],
        "answer": 2,
        "explanation": "لأن $KE \\propto v^2$، فعند مضاعفة السرعة ($2v$) تصبح الطاقة الحركية $(2)^2 = 4$ أضعاف قيمتها الأصلية."
      },
      {
        "id": "wep-8",
        "topic": "نظرية الشغل والطاقة",
        "question": "تزداد سرعة جسم كتلته $2\\text{ kg}$ من $2\\text{ m/s}$ إلى $6\\text{ m/s}$. ما مقدار الشغل الكلي المبذول على الجسم؟",
        "options": [
          "$16\\text{ J}$",
          "$32\\text{ J}$",
          "$36\\text{ J}$",
          "$40\\text{ J}$"
        ],
        "answer": 1,
        "explanation": "من نظرية الشغل والطاقة: $W = \\Delta KE = \\frac{1}{2} m (v_f^2 - v_i^2) = \\frac{1}{2}(2)(36 - 4) = 32\\text{ J}$."
      },
      {
        "id": "wep-9",
        "topic": "طاقة الوضع الجاذبية",
        "question": "رُفع جسم كتلته $5\\text{ kg}$ إلى ارتفاع $4\\text{ m}$ فوق سطح الأرض. ما مقدار طاقة وضعه الجاذبية؟ (اعتبر $g = 10\\text{ m/s}^2$)",
        "options": [
          "$20\\text{ J}$",
          "$50\\text{ J}$",
          "$200\\text{ J}$",
          "$400\\text{ J}$"
        ],
        "answer": 2,
        "explanation": "طاقة الوضع $PE = mgh = 5 \\times 10 \\times 4 = 200\\text{ J}$."
      },
      {
        "id": "wep-10",
        "topic": "حفظ الطاقة الميكانيكية",
        "question": "سقطت كرة من السكون من ارتفاع $20\\text{ m}$ فوق سطح الأرض بإهمال مقاومة الهواء. ما سرعتها لحظة وصولها إلى الأرض؟ ($g = 10\\text{ m/s}^2$)",
        "options": [
          "$10\\text{ m/s}$",
          "$20\\text{ m/s}$",
          "$40\\text{ m/s}$",
          "$200\\text{ m/s}$"
        ],
        "answer": 1,
        "explanation": "بتحول طاقة الوضع إلى حركة: $mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400} = 20\\text{ m/s}$."
      },
      {
        "id": "wep-11",
        "topic": "حفظ الطاقة على مسار أملس",
        "svg": "<svg viewBox=\"0 0 420 200\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Ground -->\n  <line x1=\"25\" y1=\"170\" x2=\"395\" y2=\"170\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Frictionless track -->\n  <path d=\"M 55 40 C 110 40, 125 165, 195 165 C 255 165, 275 105, 345 105\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"2.8\"/>\n  <!-- Ball at A -->\n  <circle cx=\"65\" cy=\"34\" r=\"9\" fill=\"#0f172a\"/>\n  <text x=\"65\" y=\"19\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">A (v = 0)</text>\n  <!-- Ball at B -->\n  <circle cx=\"335\" cy=\"98\" r=\"9\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <text x=\"335\" y=\"82\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">B</text>\n  <!-- Height h1 -->\n  <line x1=\"65\" y1=\"43\" x2=\"65\" y2=\"170\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,4\"/>\n  <text x=\"56\" y=\"110\" text-anchor=\"end\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">h₁ = 10 m</text>\n  <!-- Height h2 -->\n  <line x1=\"335\" y1=\"107\" x2=\"335\" y2=\"170\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,4\"/>\n  <text x=\"345\" y=\"142\" text-anchor=\"start\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">h₂ = 5 m</text>\n</svg>",
        "question": "في الشكل أعلاه، تنزلق كرة كتلتها $2\\text{ kg}$ من السكون عند النقطة $A$ (ارتفاع $10\\text{ m}$) على مسار أملس. ما مقدار طاقتها الحركية عند النقطة $B$ (ارتفاع $5\\text{ m}$)؟ ($g = 10\\text{ m/s}^2$)",
        "options": [
          "$50\\text{ J}$",
          "$100\\text{ J}$",
          "$150\\text{ J}$",
          "$200\\text{ J}$"
        ],
        "answer": 1,
        "explanation": "بحفظ الطاقة الميكانيكية: $KE_B = mg(h_1 - h_2) = 2 \\times 10 \\times (10 - 5) = 100\\text{ J}$."
      },
      {
        "id": "wep-12",
        "topic": "طاقة الوضع المرونية",
        "question": "نابض ثابته $k = 200\\text{ N/m}$ ضُغط مسافة $0.2\\text{ m}$ عن موضع اتزانه. ما مقدار طاقة الوضع المرونية المختزنة فيه؟",
        "options": [
          "$4\\text{ J}$",
          "$8\\text{ J}$",
          "$20\\text{ J}$",
          "$40\\text{ J}$"
        ],
        "answer": 0,
        "explanation": "$PE_s = \\frac{1}{2} k x^2 = \\frac{1}{2} \\times 200 \\times (0.2)^2 = 100 \\times 0.04 = 4\\text{ J}$."
      },
      {
        "id": "wep-13",
        "topic": "القدرة الميكانيكية",
        "question": "صعد طالب كتلته $60\\text{ kg}$ سلّماً ارتفاعه $5\\text{ m}$ خلال زمن قدره $10\\text{ s}$. ما مقدار القدرة المتوسطة التي بذلها؟ ($g = 10\\text{ m/s}^2$)",
        "options": [
          "$30\\text{ W}$",
          "$300\\text{ W}$",
          "$600\\text{ W}$",
          "$3000\\text{ W}$"
        ],
        "answer": 1,
        "explanation": "القدرة $P = \\frac{W}{t} = \\frac{mgh}{t} = \\frac{60 \\times 10 \\times 5}{10} = 300\\text{ W}$."
      },
      {
        "id": "wep-14",
        "topic": "القدرة والسرعة",
        "question": "محرك سيارة يبذل قوة دفع ثابتة مقدارها $500\\text{ N}$ للحفاظ على سرعة ثابتة مقدارها $12\\text{ m/s}$. ما مقدار قدرة المحرك؟",
        "options": [
          "$600\\text{ W}$",
          "$3\\text{ kW}$",
          "$6\\text{ kW}$",
          "$12\\text{ kW}$"
        ],
        "answer": 2,
        "explanation": "$P = F \\cdot v = 500 \\times 12 = 6000\\text{ W} = 6\\text{ kW}$."
      }
    ]
  },
  {
    "id": "torque-simple-machines",
    "order": 2,
    "title": "العزم والآلات البسيطة",
    "subtitle": "العزم، ذراع القوة، الاتزان الدوراني، محصلة العزوم، والرافعة والفائدة الميكانيكية",
    "badge": "الدرس الثاني ⚙️",
    "questions": [
      {
        "id": "trq-1",
        "topic": "علاقة العزم بذراع القوة",
        "svg": "<svg viewBox=\"0 0 420 200\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Door bar -->\n  <rect x=\"45\" y=\"95\" width=\"285\" height=\"14\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Pivot hinge on right -->\n  <circle cx=\"330\" cy=\"102\" r=\"7\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <circle cx=\"330\" cy=\"102\" r=\"2.5\" fill=\"#0f172a\"/>\n  <line x1=\"338\" y1=\"84\" x2=\"338\" y2=\"120\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <text x=\"348\" y=\"100\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">محور</text>\n  <text x=\"348\" y=\"116\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">الدوران</text>\n  <!-- Dimension L -->\n  <line x1=\"45\" y1=\"45\" x2=\"45\" y2=\"90\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"330\" y1=\"45\" x2=\"330\" y2=\"90\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"45\" y1=\"52\" x2=\"330\" y2=\"52\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"45,52 54,48 54,56\" fill=\"#0f172a\"/>\n  <polygon points=\"330,52 321,48 321,56\" fill=\"#0f172a\"/>\n  <text x=\"187\" y=\"44\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\">L</text>\n  <!-- Dimension L/2 -->\n  <line x1=\"187\" y1=\"70\" x2=\"187\" y2=\"90\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"187\" y1=\"77\" x2=\"330\" y2=\"77\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"187,77 196,73 196,81\" fill=\"#0f172a\"/>\n  <polygon points=\"330,77 321,73 321,81\" fill=\"#0f172a\"/>\n  <text x=\"258\" y=\"71\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L / 2</text>\n  <!-- Force F1 -->\n  <line x1=\"45\" y1=\"109\" x2=\"45\" y2=\"165\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"45,165 40,154 50,154\" fill=\"#0f172a\"/>\n  <text x=\"58\" y=\"152\" font-size=\"15\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₁</text>\n  <!-- Force F2 -->\n  <line x1=\"187\" y1=\"109\" x2=\"187\" y2=\"165\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"187,165 182,154 192,154\" fill=\"#0f172a\"/>\n  <text x=\"200\" y=\"152\" font-size=\"15\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₂</text>\n</svg>",
        "question": "في الشكل أعلاه، إذا أردتَ توليد نفس العزم عند دفع الباب من منتصفه ($L/2$) بدلاً من طرفه ($L$)، فكم يجب أن تكون القوة $F_2$ مقارنةً بـ $F_1$؟",
        "options": [
          "$0.5\\,F_1$",
          "$F_1$",
          "$2\\,F_1$",
          "$4\\,F_1$"
        ],
        "answer": 2,
        "explanation": "لتوليد نفس العزم ($\\tau_1 = \\tau_2$): $F_1 \\cdot L = F_2 \\cdot \\frac{L}{2} \\implies F_2 = 2F_1$. نقصان ذراع القوة إلى النصف يتطلب مضاعفة القوة."
      },
      {
        "id": "trq-2",
        "topic": "العزم لقوة عمودية",
        "svg": "<svg viewBox=\"0 0 420 200\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Bolt & wrench -->\n  <polygon points=\"75,92 88,84 101,92 101,108 88,116 75,108\" fill=\"#f8fafc\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <circle cx=\"88\" cy=\"100\" r=\"3\" fill=\"#0f172a\"/>\n  <path d=\"M 105 90 L 330 90 A 10 10 0 0 1 330 110 L 105 110 C 98 124 72 124 66 108 L 78 108 L 78 92 L 66 92 C 72 76 98 76 105 90 Z\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Pivot label -->\n  <line x1=\"88\" y1=\"118\" x2=\"120\" y2=\"150\" stroke=\"#64748b\" stroke-width=\"1.3\"/>\n  <text x=\"126\" y=\"156\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">محور الدوران</text>\n  <!-- Dimension 0.6 m -->\n  <line x1=\"88\" y1=\"45\" x2=\"88\" y2=\"95\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"322\" y1=\"45\" x2=\"322\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"88\" y1=\"53\" x2=\"322\" y2=\"53\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"88,53 97,49 97,57\" fill=\"#0f172a\"/>\n  <polygon points=\"322,53 313,49 313,57\" fill=\"#0f172a\"/>\n  <rect x=\"178\" y=\"42\" width=\"54\" height=\"20\" fill=\"#ffffff\"/>\n  <text x=\"205\" y=\"57\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">0.6 m</text>\n  <!-- Force F = 50 N downward -->\n  <line x1=\"322\" y1=\"110\" x2=\"322\" y2=\"170\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"322,170 317,159 327,159\" fill=\"#0f172a\"/>\n  <!-- Right angle symbol -->\n  <polyline points=\"310,110 310,122 322,122\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <text x=\"334\" y=\"152\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F = 50 N</text>\n</svg>",
        "question": "في الشكل أعلاه، تؤثر قوة عمودية مقدارها $50\\text{ N}$ على مفتاح ربط يبعد طرفه $0.6\\text{ m}$ عن محور الدوران. ما مقدار العزم الناتج؟",
        "options": [
          "$15\\text{ N}\\cdot\\text{m}$",
          "$30\\text{ N}\\cdot\\text{m}$",
          "$50.6\\text{ N}\\cdot\\text{m}$",
          "$83.3\\text{ N}\\cdot\\text{m}$"
        ],
        "answer": 1,
        "explanation": "بما أن القوة عمودية ($\\sin 90^\\circ = 1$): $\\tau = F \\cdot r = 50 \\times 0.6 = 30\\text{ N}\\cdot\\text{m}$."
      },
      {
        "id": "trq-3",
        "topic": "حساب ذراع القوة",
        "svg": "<svg viewBox=\"0 0 420 215\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Pivot at (70, 75) -->\n  <circle cx=\"70\" cy=\"75\" r=\"6\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <circle cx=\"70\" cy=\"75\" r=\"2\" fill=\"#0f172a\"/>\n  <text x=\"58\" y=\"60\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\">محور الدوران</text>\n  <!-- Horizontal rod from (76,75) to (290,75) -->\n  <rect x=\"76\" y=\"70\" width=\"214\" height=\"10\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Dimension L = 4 m above rod -->\n  <line x1=\"70\" y1=\"36\" x2=\"70\" y2=\"66\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"290\" y1=\"36\" x2=\"290\" y2=\"66\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"70\" y1=\"43\" x2=\"290\" y2=\"43\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"70,43 79,39 79,47\" fill=\"#0f172a\"/>\n  <polygon points=\"290,43 281,39 281,47\" fill=\"#0f172a\"/>\n  <rect x=\"148\" y=\"32\" width=\"64\" height=\"18\" fill=\"#ffffff\"/>\n  <text x=\"180\" y=\"46\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L = 4 m</text>\n  <!-- Horizontal dashed reference at right end -->\n  <line x1=\"290\" y1=\"75\" x2=\"375\" y2=\"75\" stroke=\"#64748b\" stroke-width=\"1.4\" stroke-dasharray=\"4,4\"/>\n  <!-- Force vector F pointing UP-RIGHT at 30 deg -->\n  <line x1=\"290\" y1=\"75\" x2=\"368\" y2=\"30\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"368,30 356,31 361,40\" fill=\"#0f172a\"/>\n  <text x=\"376\" y=\"34\" font-size=\"15\" font-weight=\"800\" fill=\"#0f172a\">F</text>\n  <!-- Angle 30 deg -->\n  <path d=\"M 330 75 A 40 40 0 0 0 325 55\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <text x=\"338\" y=\"68\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">30°</text>\n  <!-- Line of action dashed backward to foot (125, 170) -->\n  <line x1=\"290\" y1=\"75\" x2=\"108\" y2=\"180\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"5,4\"/>\n  <!-- Moment arm r perpendicular from pivot (70,75) to foot (125,170) -->\n  <line x1=\"70\" y1=\"75\" x2=\"125\" y2=\"170\" stroke=\"#0f172a\" stroke-width=\"2\" stroke-dasharray=\"5,3\"/>\n  <!-- Right angle symbol at foot (125,170) -->\n  <polyline points=\"119,160 129,154 135,164\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <text x=\"82\" y=\"142\" text-anchor=\"end\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">r = ?</text>\n  <text x=\"220\" y=\"154\" font-size=\"11\" font-weight=\"700\" fill=\"#64748b\">خط عمل القوة</text>\n</svg>",
        "question": "في الشكل أعلاه، تؤثر قوة $F$ عند طرف ذراع طولها $L = 4\\text{ m}$ بزاوية $30^\\circ$. ما مقدار ذراع القوة ($r$)؟",
        "options": [
          "$1\\text{ m}$",
          "$2\\text{ m}$",
          "$3.46\\text{ m}$",
          "$4\\text{ m}$"
        ],
        "answer": 1,
        "explanation": "ذراع القوة هو المسافة العمودية من محور الدوران إلى خط عمل القوة: $r = L \\sin\\theta = 4 \\times \\sin 30^\\circ = 4 \\times 0.5 = 2\\text{ m}$."
      },
      {
        "id": "trq-4",
        "topic": "العزم لقوة تصنع زاوية",
        "svg": "<svg viewBox=\"0 0 420 190\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <circle cx=\"65\" cy=\"115\" r=\"6\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <circle cx=\"65\" cy=\"115\" r=\"2\" fill=\"#0f172a\"/>\n  <text x=\"65\" y=\"140\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\">محور الدوران</text>\n  <rect x=\"71\" y=\"110\" width=\"205\" height=\"10\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Dimension L = 2 m -->\n  <line x1=\"65\" y1=\"158\" x2=\"276\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"65,158 74,154 74,162\" fill=\"#0f172a\"/>\n  <polygon points=\"276,158 267,154 267,162\" fill=\"#0f172a\"/>\n  <line x1=\"276\" y1=\"125\" x2=\"276\" y2=\"165\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <rect x=\"138\" y=\"148\" width=\"64\" height=\"18\" fill=\"#ffffff\"/>\n  <text x=\"170\" y=\"162\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L = 2 m</text>\n  <!-- Horizontal dashed reference -->\n  <line x1=\"276\" y1=\"115\" x2=\"365\" y2=\"115\" stroke=\"#64748b\" stroke-width=\"1.4\" stroke-dasharray=\"4,4\"/>\n  <!-- Force F = 60 N at 30 deg -->\n  <line x1=\"276\" y1=\"115\" x2=\"354\" y2=\"70\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"354,70 342,71 347,80\" fill=\"#0f172a\"/>\n  <text x=\"352\" y=\"58\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F = 60 N</text>\n  <path d=\"M 316 115 A 40 40 0 0 0 311 95\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <text x=\"325\" y=\"108\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\">30°</text>\n</svg>",
        "question": "في الشكل أعلاه، تؤثر قوة مقدارها $F = 60\\text{ N}$ عند طرف ذراع طولها $L = 2\\text{ m}$ من محور الدوران، وتصنع زاوية $30^\\circ$. ما مقدار العزم المبذول؟",
        "options": [
          "$30\\text{ N}\\cdot\\text{m}$",
          "$60\\text{ N}\\cdot\\text{m}$",
          "$104\\text{ N}\\cdot\\text{m}$",
          "$120\\text{ N}\\cdot\\text{m}$"
        ],
        "answer": 1,
        "explanation": "$\\tau = F L \\sin\\theta = 60 \\times 2 \\times \\sin 30^\\circ = 120 \\times 0.5 = 60\\text{ N}\\cdot\\text{m}$."
      },
      {
        "id": "trq-5",
        "topic": "إشارة العزم",
        "question": "وفق الاصطلاح الفيزيائي، إذا تسببت قوة في تدوير جسم عكس اتجاه عقارب الساعة فإن عزمها يكون:",
        "options": [
          "موجباً ($+$)",
          "سالباً ($-$)",
          "صفراً",
          "يعتمد على كتلة الجسم"
        ],
        "answer": 0,
        "explanation": "الدوران عكس عقارب الساعة يُعطي عزماً موجباً ($+$)، بينما الدوران مع عقارب الساعة يُعطي عزماً سالباً ($-$)."
      },
      {
        "id": "trq-6",
        "topic": "الاتزان الدوراني",
        "svg": "<svg viewBox=\"0 0 420 205\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Beam -->\n  <rect x=\"45\" y=\"92\" width=\"330\" height=\"10\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Fulcrum triangle -->\n  <polygon points=\"210,102 192,140 228,140\" fill=\"#f8fafc\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <text x=\"210\" y=\"160\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\">محور الدوران</text>\n  <!-- r1 = 4 m -->\n  <line x1=\"55\" y1=\"55\" x2=\"55\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"210\" y1=\"55\" x2=\"210\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"55\" y1=\"64\" x2=\"210\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"55,64 64,60 64,68\" fill=\"#0f172a\"/>\n  <polygon points=\"210,64 201,60 201,68\" fill=\"#0f172a\"/>\n  <text x=\"132\" y=\"54\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">r₁ = 4 m</text>\n  <!-- r2 = ? -->\n  <line x1=\"315\" y1=\"55\" x2=\"315\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"210\" y1=\"64\" x2=\"315\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"210,64 219,60 219,68\" fill=\"#0f172a\"/>\n  <polygon points=\"315,64 306,60 306,68\" fill=\"#0f172a\"/>\n  <text x=\"262\" y=\"54\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">r₂ = ?</text>\n  <!-- F1 = 150 N downward on left (CCW) -->\n  <line x1=\"55\" y1=\"102\" x2=\"55\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"55,158 50,147 60,147\" fill=\"#0f172a\"/>\n  <text x=\"55\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₁ = 150 N</text>\n  <!-- F2 = 300 N downward on right (CW) -->\n  <line x1=\"315\" y1=\"102\" x2=\"315\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"315,158 310,147 320,147\" fill=\"#0f172a\"/>\n  <text x=\"315\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₂ = 300 N</text>\n</svg>",
        "question": "في الشكل أعلاه، تؤثر قوة عمودية $F_1 = 150\\text{ N}$ على بُعد $r_1 = 4\\text{ m}$ من محور الدوران (عكس عقارب الساعة). على أي بُعد ($r_2$) يجب أن تؤثر قوة $F_2 = 300\\text{ N}$ (مع عقارب الساعة) ليتزن الجسم دورانياً؟",
        "options": [
          "$1\\text{ m}$",
          "$2\\text{ m}$",
          "$4\\text{ m}$",
          "$8\\text{ m}$"
        ],
        "answer": 1,
        "explanation": "للاتزان الدوراني ($\\tau_{\\text{net}} = 0$): $F_1 r_1 = F_2 r_2 \\implies 150 \\times 4 = 300 \\times r_2 \\implies r_2 = \\frac{600}{300} = 2\\text{ m}$."
      },
      {
        "id": "trq-7",
        "topic": "محصلة العزوم",
        "svg": "<svg viewBox=\"0 0 420 225\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Center pivot at (200, 118) -->\n  <circle cx=\"200\" cy=\"118\" r=\"8\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <circle cx=\"200\" cy=\"118\" r=\"2.5\" fill=\"#0f172a\"/>\n  <text x=\"200\" y=\"142\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"800\" fill=\"#0f172a\">محور الدوران</text>\n  <!-- Three arms -->\n  <!-- Left arm L1 = 3 m to (85, 118), F1 = 100 N UP (CW) -->\n  <line x1=\"85\" y1=\"118\" x2=\"192\" y2=\"118\" stroke=\"#0f172a\" stroke-width=\"3\"/>\n  <line x1=\"85\" y1=\"118\" x2=\"85\" y2=\"52\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"85,52 80,63 90,63\" fill=\"#0f172a\"/>\n  <text x=\"85\" y=\"42\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₁ = 100 N</text>\n  <text x=\"140\" y=\"110\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">L₁ = 3 m</text>\n  <!-- Right arm L2 = 4 m to (335, 118), F2 = 200 N UP-RIGHT at 30 deg (CCW) -->\n  <line x1=\"208\" y1=\"118\" x2=\"335\" y2=\"118\" stroke=\"#0f172a\" stroke-width=\"3\"/>\n  <line x1=\"335\" y1=\"118\" x2=\"390\" y2=\"118\" stroke=\"#64748b\" stroke-width=\"1.3\" stroke-dasharray=\"4,3\"/>\n  <line x1=\"335\" y1=\"118\" x2=\"395\" y2=\"83\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"395,83 383,84 388,93\" fill=\"#0f172a\"/>\n  <text x=\"360\" y=\"68\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₂ = 200 N</text>\n  <path d=\"M 368 118 A 33 33 0 0 0 364 102\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.4\"/>\n  <text x=\"374\" y=\"112\" font-size=\"11\" font-weight=\"800\" fill=\"#0f172a\">30°</text>\n  <text x=\"270\" y=\"110\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">L₂ = 4 m</text>\n  <!-- Bottom arm L3 = 2 m to (200, 195), F3 = 50 N RIGHT (CCW) -->\n  <line x1=\"200\" y1=\"126\" x2=\"200\" y2=\"195\" stroke=\"#0f172a\" stroke-width=\"3\"/>\n  <line x1=\"200\" y1=\"195\" x2=\"270\" y2=\"195\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"270,195 259,190 259,200\" fill=\"#0f172a\"/>\n  <text x=\"315\" y=\"199\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F₃ = 50 N</text>\n  <text x=\"190\" y=\"174\" text-anchor=\"end\" font-size=\"12\" font-weight=\"700\" fill=\"#0f172a\" direction=\"ltr\">L₃ = 2 m</text>\n</svg>",
        "question": "في الشكل أعلاه، تؤثر ثلاث قوى على جسم قابل للدوران حول محوره: $F_1 = 100\\text{ N}$ عمودية على بُعد $3\\text{ m}$ (مع عقارب الساعة)، و$F_2 = 200\\text{ N}$ على بُعد $4\\text{ m}$ بزاوية $30^\\circ$ (عكس عقارب الساعة)، و$F_3 = 50\\text{ N}$ عمودية على بُعد $2\\text{ m}$ (عكس عقارب الساعة). ما محصلة العزوم واتجاه الدوران؟",
        "options": [
          "$+200\\text{ N}\\cdot\\text{m}$ (عكس عقارب الساعة)",
          "$-200\\text{ N}\\cdot\\text{m}$ (مع عقارب الساعة)",
          "$+800\\text{ N}\\cdot\\text{m}$ (عكس عقارب الساعة)",
          "$0\\text{ N}\\cdot\\text{m}$ (في حالة اتزان)"
        ],
        "answer": 0,
        "explanation": "$\\tau_{\\text{net}} = -(100\\times 3) + (200\\times 4\\times \\sin 30^\\circ) + (50\\times 2) = -300 + 400 + 100 = +200\\text{ N}\\cdot\\text{m}$، وبما أن الإشارة موجبة فالدوران عكس عقارب الساعة."
      },
      {
        "id": "trq-8",
        "topic": "الرافعة وتكبير القوة",
        "svg": "<svg viewBox=\"0 0 420 205\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <rect x=\"45\" y=\"92\" width=\"330\" height=\"10\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <polygon points=\"265,102 248,140 282,140\" fill=\"#f8fafc\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <text x=\"265\" y=\"158\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\">نقطة الارتكاز</text>\n  <!-- L_in = 4 m -->\n  <line x1=\"55\" y1=\"55\" x2=\"55\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"265\" y1=\"55\" x2=\"265\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"55\" y1=\"64\" x2=\"265\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"55,64 64,60 64,68\" fill=\"#0f172a\"/>\n  <polygon points=\"265,64 256,60 256,68\" fill=\"#0f172a\"/>\n  <text x=\"160\" y=\"54\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L_in = 4 m</text>\n  <!-- L_out = 2 m -->\n  <line x1=\"365\" y1=\"55\" x2=\"365\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"265\" y1=\"64\" x2=\"365\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"265,64 274,60 274,68\" fill=\"#0f172a\"/>\n  <polygon points=\"365,64 356,60 356,68\" fill=\"#0f172a\"/>\n  <text x=\"315\" y=\"54\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L_out = 2 m</text>\n  <!-- F_in downward -->\n  <line x1=\"55\" y1=\"102\" x2=\"55\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"55,158 50,147 60,147\" fill=\"#0f172a\"/>\n  <text x=\"72\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F_in = 250 N</text>\n  <!-- F_out upward -->\n  <line x1=\"365\" y1=\"92\" x2=\"365\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"365,158 360,147 370,147\" fill=\"#0f172a\"/>\n  <text x=\"355\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F_out = ?</text>\n</svg>",
        "question": "في الرافعة المثالية الموضحة في الشكل أعلاه، إذا أثّرت بقوة مُسلّطة $F_{\\text{in}} = 250\\text{ N}$ عند مسافة $L_{\\text{in}} = 4\\text{ m}$ من نقطة الارتكاز، فكم القوة الناتجة $F_{\\text{out}}$ عند مسافة $L_{\\text{out}} = 2\\text{ m}$؟",
        "options": [
          "$125\\text{ N}$",
          "$250\\text{ N}$",
          "$500\\text{ N}$",
          "$1000\\text{ N}$"
        ],
        "answer": 2,
        "explanation": "في الرافعة المثالية يتساوى العزمان: $F_{\\text{in}} L_{\\text{in}} = F_{\\text{out}} L_{\\text{out}} \\implies 250 \\times 4 = F_{\\text{out}} \\times 2 \\implies F_{\\text{out}} = 500\\text{ N}$."
      },
      {
        "id": "trq-9",
        "topic": "الفائدة الميكانيكية المثالية",
        "question": "آلة بسيطة طول ذراع القوة المُسلّطة فيها $L_{\\text{in}} = 1.5\\text{ m}$ وطول ذراع المقاومة $L_{\\text{out}} = 0.3\\text{ m}$. ما مقدار الفائدة الميكانيكية المثالية ($IMA$) لها؟",
        "options": [
          "$0.2$",
          "$1.8$",
          "$4.5$",
          "$5$"
        ],
        "answer": 3,
        "explanation": "$IMA = \\frac{L_{\\text{in}}}{L_{\\text{out}}} = \\frac{1.5}{0.3} = 5$."
      },
      {
        "id": "trq-10",
        "topic": "تأثير موضع القوة في الرافعة",
        "svg": "<svg viewBox=\"0 0 420 205\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full max-w-md mx-auto h-auto bg-white rounded-2xl border border-slate-200 p-2\" style=\"font-family: Tajawal, IBM Plex Sans Arabic, sans-serif;\">\n  <!-- Lever bar -->\n  <rect x=\"45\" y=\"92\" width=\"330\" height=\"10\" fill=\"#ffffff\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <!-- Pivot at x=305 -->\n  <polygon points=\"305,102 290,136 320,136\" fill=\"#f8fafc\" stroke=\"#0f172a\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"155\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\">نقطة الارتكاز</text>\n  <!-- Hand at middle: x=175 (L_in = 0.6 m from pivot) -->\n  <line x1=\"175\" y1=\"55\" x2=\"175\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"305\" y1=\"55\" x2=\"305\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"175\" y1=\"64\" x2=\"305\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"175,64 184,60 184,68\" fill=\"#0f172a\"/>\n  <polygon points=\"305,64 296,60 296,68\" fill=\"#0f172a\"/>\n  <text x=\"240\" y=\"54\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">L_in = 0.6 m</text>\n  <!-- L_out = 0.2 m -->\n  <line x1=\"365\" y1=\"55\" x2=\"365\" y2=\"88\" stroke=\"#0f172a\" stroke-width=\"1.2\"/>\n  <line x1=\"305\" y1=\"64\" x2=\"365\" y2=\"64\" stroke=\"#0f172a\" stroke-width=\"1.5\"/>\n  <polygon points=\"305,64 314,60 314,68\" fill=\"#0f172a\"/>\n  <polygon points=\"365,64 356,60 356,68\" fill=\"#0f172a\"/>\n  <text x=\"335\" y=\"54\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">0.2 m</text>\n  <!-- F_in = 120 N downward at middle -->\n  <line x1=\"175\" y1=\"102\" x2=\"175\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"175,158 170,147 180,147\" fill=\"#0f172a\"/>\n  <text x=\"175\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F_in = 120 N</text>\n  <!-- F_out = ? upward at load end -->\n  <line x1=\"365\" y1=\"92\" x2=\"365\" y2=\"34\" stroke=\"none\"/>\n  <line x1=\"365\" y1=\"102\" x2=\"365\" y2=\"158\" stroke=\"#0f172a\" stroke-width=\"2.5\"/>\n  <polygon points=\"365,102 360,113 370,113\" fill=\"#0f172a\"/>\n  <text x=\"365\" y=\"178\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"800\" fill=\"#0f172a\" direction=\"ltr\">F_out = ?</text>\n</svg>",
        "question": "في الشكل أعلاه، تُستخدم مجرفة كرافعة حيث يبعد طرف مقبضها $1.2\\text{ m}$ عن نقطة الارتكاز، وتبعد الحمولة $0.2\\text{ m}$. إذا أثّرت بقوة $120\\text{ N}$ عند منتصف المقبض ($L_{\\text{in}} = 0.6\\text{ m}$)، فما مقدار القوة الناتجة $F_{\\text{out}}$؟",
        "options": [
          "$120\\text{ N}$",
          "$360\\text{ N}$",
          "$720\\text{ N}$",
          "$1440\\text{ N}$"
        ],
        "answer": 1,
        "explanation": "$F_{\\text{in}} L_{\\text{in}} = F_{\\text{out}} L_{\\text{out}} \\implies 120 \\times 0.6 = F_{\\text{out}} \\times 0.2 \\implies F_{\\text{out}} = \\frac{72}{0.2} = 360\\text{ N}$."
      }
    ]
  }
];
