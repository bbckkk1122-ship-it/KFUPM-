// بنك أسئلة دروس الرياضيات — منصة التحصيلي المبكر (Nabthati)
export const MATH_LESSONS = [
  {
    "id": "trig-identities-equations",
    "order": 1,
    "subject": "رياضيات",
    "title": "المتطابقات والمعادلات المثلثية",
    "subtitle": "متطابقات فيثاغورس، الزاويتان المتتامتان، التبسيط، ضعف الزاوية، وحل المعادلات المثلثية",
    "badge": "رياضيات • الدرس الأول 📐",
    "questions": [
      {
        "id": "trig-1",
        "topic": "متطابقات فيثاغورس",
        "question": "إذا كانت $\\sin\\theta = \\frac{3}{5}$ وكانت $\\theta$ في الربع الأول، فما قيمة $\\cos\\theta$؟",
        "options": [
          "$\\frac{4}{5}$",
          "$\\frac{2}{5}$",
          "$\\frac{16}{25}$",
          "$-\\frac{4}{5}$"
        ],
        "answer": 0,
        "explanation": "$\\cos^2\\theta = 1 - \\sin^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25} \\implies \\cos\\theta = \\frac{4}{5}$."
      },
      {
        "id": "trig-2",
        "topic": "متطابقات فيثاغورس (الإشارات)",
        "question": "إذا كانت $\\cos\\theta = -\\frac{5}{13}$ و $90^\\circ < \\theta < 180^\\circ$، فما قيمة $\\sin\\theta$؟",
        "options": [
          "$-\\frac{12}{13}$",
          "$\\frac{12}{13}$",
          "$\\frac{8}{13}$",
          "$-\\frac{5}{12}$"
        ],
        "answer": 1,
        "explanation": "$\\sin^2\\theta = 1 - \\frac{25}{169} = \\frac{144}{169}$، ولأن $\\theta$ في الربع الثاني تكون $\\sin\\theta$ موجبة وتساوي $\\frac{12}{13}$."
      },
      {
        "id": "trig-3",
        "topic": "متطابقات فيثاغورس",
        "question": "ما قيمة العبارة $\\sec^2\\theta - \\tan^2\\theta + 3$؟",
        "options": [
          "$1$",
          "$2$",
          "$3$",
          "$4$"
        ],
        "answer": 3,
        "explanation": "من المتطابقة $\\tan^2\\theta + 1 = \\sec^2\\theta$ نجد أن $\\sec^2\\theta - \\tan^2\\theta = 1$، وبجمع $3$ يصبح الناتج $4$."
      },
      {
        "id": "trig-4",
        "topic": "متطابقات فيثاغورس",
        "question": "إذا كانت $\\cot\\theta = 2$، فما قيمة $\\csc^2\\theta$؟",
        "options": [
          "$3$",
          "$4$",
          "$5$",
          "$\\sqrt{5}$"
        ],
        "answer": 2,
        "explanation": "$\\csc^2\\theta = \\cot^2\\theta + 1 = 2^2 + 1 = 5$."
      },
      {
        "id": "trig-5",
        "topic": "متطابقات فيثاغورس",
        "question": "أيّ العبارات التالية تكافئ $(1 - \\cos\\theta)(1 + \\cos\\theta)$؟",
        "options": [
          "$\\cos^2\\theta$",
          "$\\sin^2\\theta$",
          "$\\tan^2\\theta$",
          "$1$"
        ],
        "answer": 1,
        "explanation": "حاصل الضرب يساوي $1 - \\cos^2\\theta$، وهي تكافئ $\\sin^2\\theta$."
      },
      {
        "id": "trig-6",
        "topic": "الزاويتان المتتامتان",
        "question": "إذا كانت $\\sin(2x + 10^\\circ) = \\cos(x + 20^\\circ)$ لزاويتين حادتين، فما قيمة $x$؟",
        "options": [
          "$15^\\circ$",
          "$20^\\circ$",
          "$25^\\circ$",
          "$30^\\circ$"
        ],
        "answer": 1,
        "explanation": "مجموع الزاويتين المتتامتين $90^\\circ$: $(2x + 10) + (x + 20) = 90 \\implies 3x = 60 \\implies x = 20^\\circ$."
      },
      {
        "id": "trig-7",
        "topic": "الزاويتان المتتامتان",
        "question": "ما قيمة $\\frac{\\sin 35^\\circ}{\\cos 55^\\circ} + \\frac{\\tan 20^\\circ}{\\cot 70^\\circ}$؟",
        "options": [
          "$0$",
          "$1$",
          "$2$",
          "$\\frac{1}{2}$"
        ],
        "answer": 2,
        "explanation": "$\\sin 35^\\circ = \\cos 55^\\circ$ و $\\tan 20^\\circ = \\cot 70^\\circ$، إذن $1 + 1 = 2$."
      },
      {
        "id": "trig-8",
        "topic": "الزاويتان المتتامتان",
        "question": "ما قيمة $\\sin^2 18^\\circ + \\sin^2 72^\\circ$؟",
        "options": [
          "$0$",
          "$1$",
          "$2$",
          "$\\frac{\\sqrt{3}}{2}$"
        ],
        "answer": 1,
        "explanation": "لأن $\\sin 72^\\circ = \\cos 18^\\circ$، تصبح العبارة $\\sin^2 18^\\circ + \\cos^2 18^\\circ = 1$."
      },
      {
        "id": "trig-9",
        "topic": "الزاويتان المتتامتان",
        "question": "ما قيمة $\\cos 22.5^\\circ - \\sin 67.5^\\circ$؟",
        "options": [
          "$0$",
          "$1$",
          "$-1$",
          "$\\frac{1}{2}$"
        ],
        "answer": 0,
        "explanation": "$22.5^\\circ + 67.5^\\circ = 90^\\circ \\implies \\cos 22.5^\\circ = \\sin 67.5^\\circ$، لذا الفرق بينهما صفر."
      },
      {
        "id": "trig-10",
        "topic": "الزاويتان المتتامتان",
        "question": "ما ناتج تبسيط العبارة $\\tan\\left(\\frac{\\pi}{2} - \\theta\\right) \\cdot \\tan\\theta$؟",
        "options": [
          "$0$",
          "$1$",
          "$\\tan^2\\theta$",
          "$\\sec\\theta$"
        ],
        "answer": 1,
        "explanation": "$\\tan\\left(\\frac{\\pi}{2} - \\theta\\right) = \\cot\\theta$، وضرب $\\cot\\theta \\cdot \\tan\\theta = 1$."
      },
      {
        "id": "trig-11",
        "topic": "تبسيط المتطابقات",
        "question": "ما أبسط صورة للعبارة $\\cot\\theta \\cdot \\sin\\theta \\cdot \\sec\\theta$؟",
        "options": [
          "$\\sin\\theta$",
          "$\\cos\\theta$",
          "$\\tan\\theta$",
          "$1$"
        ],
        "answer": 3,
        "explanation": "$\\frac{\\cos\\theta}{\\sin\\theta} \\cdot \\sin\\theta \\cdot \\frac{1}{\\cos\\theta} = 1$."
      },
      {
        "id": "trig-12",
        "topic": "تبسيط المتطابقات",
        "question": "ما أبسط صورة للعبارة $\\frac{\\csc^2\\theta - 1}{\\csc^2\\theta}$؟",
        "options": [
          "$\\sin^2\\theta$",
          "$\\cos^2\\theta$",
          "$\\tan^2\\theta$",
          "$\\sec^2\\theta$"
        ],
        "answer": 1,
        "explanation": "$\\frac{\\cot^2\\theta}{\\csc^2\\theta} = \\frac{\\cos^2\\theta/\\sin^2\\theta}{1/\\sin^2\\theta} = \\cos^2\\theta$."
      },
      {
        "id": "trig-13",
        "topic": "تبسيط المتطابقات",
        "question": "ما أبسط صورة للعبارة $\\sin\\theta + \\sin\\theta\\cot^2\\theta$؟",
        "options": [
          "$\\sin\\theta$",
          "$\\sec\\theta$",
          "$\\csc\\theta$",
          "$\\cot\\theta$"
        ],
        "answer": 2,
        "explanation": "$\\sin\\theta(1 + \\cot^2\\theta) = \\sin\\theta \\cdot \\csc^2\\theta = \\sin\\theta \\cdot \\frac{1}{\\sin^2\\theta} = \\csc\\theta$."
      },
      {
        "id": "trig-14",
        "topic": "تبسيط المتطابقات",
        "question": "ما أبسط صورة للعبارة $\\frac{\\sin\\theta}{\\csc\\theta} + \\frac{\\cos\\theta}{\\sec\\theta}$؟",
        "options": [
          "$0$",
          "$1$",
          "$2$",
          "$\\tan\\theta$"
        ],
        "answer": 1,
        "explanation": "تصبح $\\sin^2\\theta + \\cos^2\\theta = 1$."
      },
      {
        "id": "trig-15",
        "topic": "تبسيط المتطابقات",
        "question": "ما أبسط صورة للعبارة $\\frac{\\cot^2\\theta\\sec^2\\theta - 1}{\\csc^2\\theta}$؟",
        "options": [
          "$\\sin^2\\theta$",
          "$\\cos^2\\theta$",
          "$\\cot^2\\theta$",
          "$1$"
        ],
        "answer": 1,
        "explanation": "$\\cot^2\\theta\\sec^2\\theta = \\frac{\\cos^2\\theta}{\\sin^2\\theta} \\cdot \\frac{1}{\\cos^2\\theta} = \\csc^2\\theta$، فيصبح الكسر $\\frac{\\csc^2\\theta - 1}{\\csc^2\\theta} = \\frac{\\cot^2\\theta}{\\csc^2\\theta} = \\cos^2\\theta$."
      },
      {
        "id": "trig-16",
        "topic": "متطابقات الضعف",
        "question": "إذا كانت $\\sin\\theta = \\frac{3}{5}$ و $\\theta$ في الربع الأول، فما قيمة $\\sin 2\\theta$؟",
        "options": [
          "$\\frac{6}{5}$",
          "$\\frac{12}{25}$",
          "$\\frac{24}{25}$",
          "$\\frac{7}{25}$"
        ],
        "answer": 2,
        "explanation": "نجد $\\cos\\theta = \\frac{4}{5}$، ثم $\\sin 2\\theta = 2\\left(\\frac{3}{5}\\right)\\left(\\frac{4}{5}\\right) = \\frac{24}{25}$."
      },
      {
        "id": "trig-17",
        "topic": "متطابقات الضعف",
        "question": "إذا كانت $\\sin\\theta = \\frac{1}{3}$، فما قيمة $\\cos 2\\theta$؟",
        "options": [
          "$\\frac{7}{9}$",
          "$\\frac{8}{9}$",
          "$-\\frac{7}{9}$",
          "$\\frac{2}{9}$"
        ],
        "answer": 0,
        "explanation": "$\\cos 2\\theta = 1 - 2\\sin^2\\theta = 1 - 2\\left(\\frac{1}{9}\\right) = \\frac{7}{9}$."
      },
      {
        "id": "trig-18",
        "topic": "متطابقات الضعف",
        "question": "إذا كانت $\\cos\\theta = -\\frac{2}{5}$، فما قيمة $\\cos 2\\theta$؟",
        "options": [
          "$\\frac{17}{25}$",
          "$-\\frac{17}{25}$",
          "$-\\frac{9}{25}$",
          "$\\frac{21}{25}$"
        ],
        "answer": 1,
        "explanation": "$\\cos 2\\theta = 2\\cos^2\\theta - 1 = 2\\left(\\frac{4}{25}\\right) - 1 = \\frac{8}{25} - 1 = -\\frac{17}{25}$."
      },
      {
        "id": "trig-19",
        "topic": "متطابقات الضعف",
        "question": "ما القيمة الدقيقة للعبارة $2\\sin 15^\\circ \\cos 15^\\circ$؟",
        "options": [
          "$\\frac{1}{2}$",
          "$\\frac{\\sqrt{3}}{2}$",
          "$\\frac{\\sqrt{2}}{2}$",
          "$1$"
        ],
        "answer": 0,
        "explanation": "تكافئ $\\sin(2 \\times 15^\\circ) = \\sin 30^\\circ = \\frac{1}{2}$."
      },
      {
        "id": "trig-20",
        "topic": "متطابقات الضعف",
        "question": "ما القيمة الدقيقة للعبارة $\\cos^2 75^\\circ - \\sin^2 75^\\circ$؟",
        "options": [
          "$\\frac{\\sqrt{3}}{2}$",
          "$-\\frac{\\sqrt{3}}{2}$",
          "$-\\frac{1}{2}$",
          "$\\frac{1}{2}$"
        ],
        "answer": 1,
        "explanation": "تكافئ $\\cos(2 \\times 75^\\circ) = \\cos 150^\\circ = -\\frac{\\sqrt{3}}{2}$."
      },
      {
        "id": "trig-21",
        "topic": "متطابقات الضعف",
        "question": "إذا كانت $\\tan\\theta = 2$، فما قيمة $\\tan 2\\theta$؟",
        "options": [
          "$\\frac{4}{3}$",
          "$-\\frac{4}{3}$",
          "$-\\frac{4}{5}$",
          "$4$"
        ],
        "answer": 1,
        "explanation": "$\\tan 2\\theta = \\frac{2\\tan\\theta}{1 - \\tan^2\\theta} = \\frac{4}{1 - 4} = -\\frac{4}{3}$."
      },
      {
        "id": "trig-22",
        "topic": "حل المعادلات المثلثية",
        "question": "ما حل المعادلة $\\cos\\theta = -\\frac{1}{2}$ حيث $0^\\circ < \\theta < 360^\\circ$؟",
        "options": [
          "$60^\\circ, 300^\\circ$",
          "$120^\\circ, 240^\\circ$",
          "$150^\\circ, 210^\\circ$",
          "$120^\\circ, 300^\\circ$"
        ],
        "answer": 1,
        "explanation": "الزاوية المرجعية $60^\\circ$، والـ $\\cos$ سالبة في الربع الثاني ($180 - 60 = 120^\\circ$) والثالث ($180 + 60 = 240^\\circ$)."
      },
      {
        "id": "trig-23",
        "topic": "حل المعادلات المثلثية",
        "question": "ما حل المعادلة $2\\sin\\theta - \\sqrt{3} = 0$ حيث $0^\\circ < \\theta < 360^\\circ$؟",
        "options": [
          "$30^\\circ, 150^\\circ$",
          "$60^\\circ, 120^\\circ$",
          "$60^\\circ, 300^\\circ$",
          "$120^\\circ, 240^\\circ$"
        ],
        "answer": 1,
        "explanation": "$\\sin\\theta = \\frac{\\sqrt{3}}{2}$، الزاوية المرجعية $60^\\circ$ وموجبة في الربع الأول ($60^\\circ$) والثاني ($120^\\circ$)."
      },
      {
        "id": "trig-24",
        "topic": "حل المعادلات المثلثية",
        "question": "ما حل المعادلة $\\tan\\theta = -1$ حيث $0^\\circ < \\theta < 360^\\circ$؟",
        "options": [
          "$45^\\circ, 225^\\circ$",
          "$135^\\circ, 225^\\circ$",
          "$135^\\circ, 315^\\circ$",
          "$225^\\circ, 315^\\circ$"
        ],
        "answer": 2,
        "explanation": "الزاوية المرجعية $45^\\circ$، والـ $\\tan$ سالبة في الربع الثاني ($135^\\circ$) والرابع ($315^\\circ$)."
      },
      {
        "id": "trig-25",
        "topic": "حل المعادلات المثلثية",
        "question": "ما حلول المعادلة $2\\cos^2\\theta - \\cos\\theta = 0$ في الفترة $0^\\circ \\le \\theta \\le 180^\\circ$؟",
        "options": [
          "$0^\\circ, 60^\\circ$",
          "$60^\\circ, 90^\\circ$",
          "$30^\\circ, 90^\\circ$",
          "$60^\\circ, 120^\\circ$"
        ],
        "answer": 1,
        "explanation": "$\\cos\\theta(2\\cos\\theta - 1) = 0 \\implies \\cos\\theta = 0$ ($\\theta = 90^\\circ$) أو $\\cos\\theta = \\frac{1}{2}$ ($\\theta = 60^\\circ$)."
      },
      {
        "id": "trig-26",
        "topic": "حل المعادلات المثلثية",
        "question": "ما حل المعادلة $\\sin\\theta = -\\frac{\\sqrt{2}}{2}$ حيث $180^\\circ < \\theta < 270^\\circ$؟",
        "options": [
          "$135^\\circ$",
          "$225^\\circ$",
          "$315^\\circ$",
          "$225^\\circ, 315^\\circ$"
        ],
        "answer": 1,
        "explanation": "الزاوية المرجعية $45^\\circ$، والفترة المحددة هي الربع الثالث فقط، لذا $\\theta = 180^\\circ + 45^\\circ = 225^\\circ$."
      }
    ]
  }
];
