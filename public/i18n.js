// Simple client-side translation: every visible string on the page lives in
// TRANSLATIONS, keyed the same way across languages. Elements opt in via
// data-i18n (textContent), data-i18n-html (innerHTML, for strings that need
// markup like the hero heading), or data-i18n-placeholder (input placeholder).
// The choice persists in localStorage so it's remembered on return visits.

const TRANSLATIONS = {
  en: {
    meta: { title: "OrderVox — Never Miss Another Order", description: "OrderVox answers every call, takes the order accurately, and texts a confirmation — so your restaurant captures revenue it's losing right now." },
    nav: { features: "Features", demo: "Live Demo", how: "How it works", faq: "FAQ", cta: "Book a Demo" },
    hero: {
      eyebrow: "AI Phone Ordering for Restaurants",
      h1: 'Every call answered.<br>Every order taken.<br><span class="accent">Even at 9pm on a Friday.</span>',
      sub: "Every ring your staff can't answer is an order handed to your competitor. OrderVox picks up instantly, takes the order accurately, and texts a confirmation — so you capture revenue you're already paying for, without adding another person to the schedule.",
      cta1: "Book a Live Demo",
      cta2: "Hear a Live Demo Call",
      note: "Built on Twilio, GPT‑4o, and real-time speech — proven infrastructure, not a phone tree.",
    },
    stats: { answered: "of calls answered", pickup: "average pickup time", languages: "languages, auto-detected", always: "always on, even after close" },
    demo: {
      eyebrow: "Hear It For Yourself",
      h2: "This isn't a chatbot. It's a real phone call.",
      sub: "Press play to hear OrderVox take an order start to finish — no scripts, no button-mashing.",
      t1: "Thank you for calling Kabul Kitchen. How may I help you today?",
      t2: "Hi, can I get a Kabuli Palaw and a Doogh for pickup?",
      t3: "Of course — one Kabuli Palaw and one Doogh for pickup. Can I get a name for the order?",
      t4: "Sarah.",
      t5: "Thanks, Sarah! What's the best number to text your confirmation to?",
      t6: "510-555-0148.",
      t7: "Got it — I'll text you the moment it's ready. Your total is $24.50, ready in about 15 minutes. Sound good?",
      t8: "Perfect, thank you!",
      t9: "You're all set, Sarah — see you soon!",
      callLabel: "Or call our AI directly right now:",
      callNote: "Live demo line — try it yourself, no appointment needed.",
    },
    pain: {
      eyebrow: "The Problem",
      h2: "You already know the problem.",
      card1: "The phone rings while every hand is full plating orders. By the third ring, they've hung up — and dialed the restaurant next door.",
      card2: "A missed call isn't just a missed call. It's a missed order, a missed regular, maybe a missed catering job worth hundreds.",
      card3: "Hiring someone just to answer phones doesn't pencil out — not with today's margins.",
    },
    roi: {
      eyebrow: "See The Math",
      h2: "OrderVox pays for itself — see how.",
      sub: "Drag the sliders to match your restaurant and watch the recovered revenue update live.",
      labelCalls: "Missed calls per week",
      labelOrder: "Average order value",
      labelRate: "Estimated recovery rate",
      resultLabel: "Estimated extra revenue / month",
      disclaimer: "Illustrative estimate based on the numbers you enter — actual results vary by restaurant.",
      unitCalls: "calls",
      unitRecovered: "recovered",
      unitWeeks: "weeks/month",
    },
    features: {
      eyebrow: "Why Restaurants Choose OrderVox",
      h2: "Built to grow revenue, not just answer phones.",
      f1: { title: "Never lose a call to the rush", desc: "While your team handles the dining room, OrderVox answers every time — turning your busiest hour into your most profitable one." },
      f2: { title: "Sounds like your best host", desc: 'Customers talk normally and get understood — no menus, no "press 1." It feels human, because the conversation is.' },
      f3: { title: "Customers finish their sentence", desc: "If someone jumps in to name their order, OrderVox stops and listens instantly — just like a good server would." },
      f4: { title: "Serve every customer, in their language", desc: "English, Spanish, and Dari, detected automatically — so no customer gets lost in translation." },
      f5: { title: "Every order confirmed, instantly", desc: 'Customers get a text the second they hang up — fewer "where\'s my order?" calls, fewer no-shows.' },
      f6: { title: "See everything, without picking up the phone", desc: "Every call, transcript, and order lands on one dashboard — so your team always knows what's coming." },
    },
    dash: {
      eyebrow: "Your Command Center",
      h2: "A live look at every call and order.",
      sub: "No more wondering what happened on the phone. Every conversation, order, and customer detail lands on one clean dashboard your team can check between tables.",
      li1: "Live call transcripts, searchable anytime",
      li2: "Revenue, orders, and call volume at a glance",
      li3: "Customer history and contact info, organized",
    },
    how: {
      eyebrow: "How it works",
      h2: "Live in an afternoon. No new hardware.",
      s1: { title: "Connect your number", desc: "OrderVox routes through your existing restaurant phone number — customers dial the number they already know." },
      s2: { title: "We load your menu", desc: "Your real menu, prices, and modifiers go in once — OrderVox only ever speaks from that data, never guesses." },
      s3: { title: "Customers call and order", desc: "A natural conversation, start to finish: greeting, order, confirmation, and a warm handoff to a human if anything gets complicated." },
      s4: { title: "You get the order — and the data", desc: "The order appears on your dashboard and the customer's phone, in real time." },
    },
    why: {
      eyebrow: "The Difference",
      h2: "Without OrderVox vs. With OrderVox",
      withoutHead: "Without OrderVox",
      without1: "Missed calls during the rush",
      without2: "Staff pulled off the floor to answer phones",
      without3: "Orders lost to voicemail or busy signals",
      without4: "Inconsistent, rushed phone orders",
      without5: "Customers give up and try a competitor",
      withHead: "With OrderVox",
      with1: "Every call answered, instantly",
      with2: "Staff stays focused on the guests in front of them",
      with3: "Every order captured and confirmed by text",
      with4: "The same accurate, friendly experience every time",
      with5: "Customers keep coming back",
    },
    proof: {
      eyebrow: "Built On Trusted Technology",
      h2: "Powered by the same infrastructure the biggest AI products run on.",
      tech: "Twilio · GPT‑4o · Deepgram · ElevenLabs · Encrypted customer data",
      quote1: "\"Add your customer's review here once you're live — this is a sample layout, not a real quote.\"",
      name1: "Restaurant Name, City",
      quote2: "\"Another sample testimonial slot — swap this in for a real Google review once you have one.\"",
      name2: "Restaurant Name, City",
      sampleTag: "Sample",
      empty: "You could be our very first success story.",
      emptyLink: "Book a demo and let's find out →",
    },
    integrations: {
      eyebrow: "Roadmap",
      h2: "Fits into how you already run your restaurant.",
      sub: "Menu and order management today — POS and delivery-platform connections are next.",
      note: "🔜 Planned integrations — not yet available.",
    },
    subscribe: {
      eyebrow: "Get Started",
      h2: "Book your free demo",
      p: "Tell us a bit about your restaurant and we'll reach out to set up your live demo.",
      labelName: "Your name", placeholderName: "Jane Doe",
      labelRestaurant: "Restaurant name", placeholderRestaurant: "Kabul Kitchen",
      labelPhone: "Contact phone", placeholderPhone: "(555) 123-4567",
      labelEmail: "Email", placeholderEmail: "you@yourrestaurant.com",
      button: "Book My Demo",
      microtrust: "Free demo · No commitment · No long-term contract",
    },
    faq: {
      eyebrow: "FAQ", h2: "Good questions",
      q1: "Does it replace my staff?", a1: "No — it handles the phone so your staff can focus on the kitchen and the dining room. Anything it can't confidently handle gets warmly transferred to a real person.",
      q2: "What if it mishears an order?", a2: "Every item is read back and confirmed before the order is placed, and the customer gets a full read-back with the total before anything is submitted.",
      q3: "Can I keep my existing phone number?", a3: "Yes — OrderVox works with the number you already have. Customers dial the exact same number they always have.",
      q4: "How long does setup take?", a4: "Most restaurants are live within an afternoon — no new hardware, no rewiring your phone line.",
      q5: "Can I edit my menu?", a5: "Yes, anytime. Update items, prices, and modifiers, and OrderVox reflects the change on the very next call.",
      q6: "Can it transfer calls to a real person?", a6: "Absolutely — anything it can't confidently handle gets a warm handoff to your team.",
      q7: "Does it speak multiple languages?", a7: "Yes — English, Spanish, and Dari today, detected automatically mid-call, with more on the way.",
      q8: "Does it work after hours?", a8: "Yes — it's on 24/7, so you capture orders and questions even after the doors are closed.",
      q9: "Can I cancel anytime?", a9: "Yes — no long-term contract. Cancel whenever you like.",
    },
    finalCta: {
      h2: "Never Miss Another Customer Again",
      p: "Every unanswered call is lost revenue. Let OrderVox answer every call while your staff focuses on serving the guests already in front of them.",
      microtrust: "Free demo call · No commitment · Live in an afternoon",
    },
    status: {
      invalidEmail: "Please enter a valid email address.",
      sending: "Sending...",
      success: "Thanks! We've got your request and will reach out soon to book your demo.",
      alreadySubscribed: "Looks like you're already on the list — we'll be in touch!",
      genericError: "Something went wrong. Please try again.",
    },
  },

  es: {
    meta: { title: "OrderVox — No Pierdas Otro Pedido", description: "OrderVox contesta cada llamada, toma el pedido con precisión y envía un mensaje de confirmación — para que tu restaurante capture ingresos que está perdiendo ahora mismo." },
    nav: { features: "Funciones", demo: "Demo en vivo", how: "Cómo funciona", faq: "Preguntas frecuentes", cta: "Reservar una demo" },
    hero: {
      eyebrow: "Pedidos telefónicos con IA para restaurantes",
      h1: 'Todas las llamadas contestadas.<br>Todos los pedidos tomados.<br><span class="accent">Incluso un viernes a las 9 de la noche.</span>',
      sub: "Cada llamada que tu personal no puede contestar es un pedido que le regalas a tu competencia. OrderVox contesta al instante, toma el pedido con precisión y envía un mensaje de confirmación — para que captures ingresos que ya estás pagando, sin sumar otra persona al horario.",
      cta1: "Reservar una demo en vivo",
      cta2: "Escuchar una llamada de demo",
      note: "Creado con Twilio, GPT‑4o y reconocimiento de voz en tiempo real — infraestructura probada, no un menú telefónico automatizado.",
    },
    stats: { answered: "de las llamadas contestadas", pickup: "tiempo promedio de respuesta", languages: "idiomas, detectados automáticamente", always: "siempre activo, incluso cerrado" },
    demo: {
      eyebrow: "Escúchalo tú mismo",
      h2: "Esto no es un chatbot. Es una llamada telefónica real.",
      sub: "Presiona play para escuchar a OrderVox tomar un pedido de principio a fin — sin guiones, sin presionar botones.",
      t1: "Gracias por llamar a Kabul Kitchen. ¿En qué puedo ayudarte hoy?",
      t2: "Hola, ¿me puedes dar un Kabuli Palaw y un Doogh para recoger?",
      t3: "Claro — un Kabuli Palaw y un Doogh para recoger. ¿Me das un nombre para el pedido?",
      t4: "Sarah.",
      t5: "¡Gracias, Sarah! ¿Cuál es el mejor número para enviarte la confirmación por mensaje?",
      t6: "510-555-0148.",
      t7: "Entendido — te escribiré en cuanto esté listo. Tu total es $24.50, listo en unos 15 minutos. ¿Te parece bien?",
      t8: "¡Perfecto, gracias!",
      t9: "Listo, Sarah — ¡nos vemos pronto!",
      callLabel: "O llama a nuestra IA ahora mismo:",
      callNote: "Línea de demo en vivo — pruébala tú mismo, sin necesidad de cita.",
    },
    pain: {
      eyebrow: "El problema",
      h2: "Ya conoces el problema.",
      card1: "El teléfono suena mientras todas las manos están ocupadas sirviendo platos. Al tercer timbrazo, colgaron — y marcaron al restaurante de al lado.",
      card2: "Una llamada perdida no es solo una llamada perdida. Es un pedido perdido, un cliente frecuente perdido, tal vez un trabajo de banquetes perdido que vale cientos de dólares.",
      card3: "Contratar a alguien solo para contestar el teléfono no es rentable — no con los márgenes de hoy.",
    },
    roi: {
      eyebrow: "Mira los números",
      h2: "OrderVox se paga solo — mira cómo.",
      sub: "Mueve los controles para que coincidan con tu restaurante y observa cómo se actualizan los ingresos recuperados en vivo.",
      labelCalls: "Llamadas perdidas por semana",
      labelOrder: "Valor promedio del pedido",
      labelRate: "Tasa de recuperación estimada",
      resultLabel: "Ingresos extra estimados / mes",
      disclaimer: "Estimación ilustrativa basada en los números que ingreses — los resultados reales varían según el restaurante.",
      unitCalls: "llamadas",
      unitRecovered: "recuperado",
      unitWeeks: "semanas/mes",
    },
    features: {
      eyebrow: "Por qué los restaurantes eligen OrderVox",
      h2: "Diseñado para hacer crecer los ingresos, no solo contestar teléfonos.",
      f1: { title: "Nunca pierdas una llamada en la hora pico", desc: "Mientras tu equipo atiende el comedor, OrderVox contesta siempre — convirtiendo tu hora más ocupada en tu hora más rentable." },
      f2: { title: "Suena como tu mejor anfitrión", desc: "Los clientes hablan con naturalidad y se les entiende — sin menús, sin “presione 1”. Se siente humano, porque la conversación lo es." },
      f3: { title: "Los clientes terminan su frase", desc: "Si alguien interrumpe para decir su pedido, OrderVox se detiene y escucha al instante — igual que un buen mesero." },
      f4: { title: "Atiende a cada cliente, en su idioma", desc: "Inglés, español y darí, detectados automáticamente — para que ningún cliente se pierda en la traducción." },
      f5: { title: "Cada pedido confirmado, al instante", desc: "Los clientes reciben un mensaje de texto en cuanto cuelgan — menos llamadas de “¿dónde está mi pedido?”, menos ausencias." },
      f6: { title: "Ve todo, sin contestar el teléfono", desc: "Cada llamada, transcripción y pedido llega a un solo panel — para que tu equipo siempre sepa qué se aproxima." },
    },
    dash: {
      eyebrow: "Tu centro de control",
      h2: "Una vista en vivo de cada llamada y pedido.",
      sub: "Se acabó preguntarte qué pasó en la llamada. Cada conversación, pedido y dato del cliente llega a un panel limpio que tu equipo puede revisar entre mesas.",
      li1: "Transcripciones de llamadas en vivo, buscables en cualquier momento",
      li2: "Ingresos, pedidos y volumen de llamadas de un vistazo",
      li3: "Historial y datos de contacto del cliente, organizados",
    },
    how: {
      eyebrow: "Cómo funciona",
      h2: "Listo en una tarde. Sin equipo nuevo.",
      s1: { title: "Conecta tu número", desc: "OrderVox se conecta a través del número de teléfono que ya tiene tu restaurante — los clientes marcan el número que ya conocen." },
      s2: { title: "Cargamos tu menú", desc: "Tu menú real, precios y modificadores se ingresan una sola vez — OrderVox solo habla con esos datos, nunca adivina." },
      s3: { title: "Los clientes llaman y ordenan", desc: "Una conversación natural, de principio a fin: saludo, pedido, confirmación, y una transferencia amable a un humano si algo se complica." },
      s4: { title: "Recibes el pedido — y los datos", desc: "El pedido aparece en tu panel y en el teléfono del cliente, en tiempo real." },
    },
    why: {
      eyebrow: "La diferencia",
      h2: "Sin OrderVox vs. Con OrderVox",
      withoutHead: "Sin OrderVox",
      without1: "Llamadas perdidas durante la hora pico",
      without2: "Personal apartado del salón para contestar el teléfono",
      without3: "Pedidos perdidos por buzón de voz o línea ocupada",
      without4: "Pedidos telefónicos inconsistentes y apresurados",
      without5: "Los clientes se rinden y prueban a la competencia",
      withHead: "Con OrderVox",
      with1: "Cada llamada contestada, al instante",
      with2: "El personal se mantiene enfocado en los clientes frente a ellos",
      with3: "Cada pedido capturado y confirmado por mensaje de texto",
      with4: "La misma experiencia precisa y amable en todo momento",
      with5: "Los clientes siguen regresando",
    },
    proof: {
      eyebrow: "Construido sobre tecnología confiable",
      h2: "Impulsado por la misma infraestructura que usan los productos de IA más grandes.",
      tech: "Twilio · GPT‑4o · Deepgram · ElevenLabs · Datos del cliente encriptados",
      quote1: "“Agrega aquí la reseña de tu cliente una vez que estés en vivo — este es un diseño de ejemplo, no una cita real.”",
      name1: "Nombre del restaurante, ciudad",
      quote2: "“Otro espacio de testimonio de ejemplo — cámbialo por una reseña real de Google cuando tengas una.”",
      name2: "Nombre del restaurante, ciudad",
      sampleTag: "Ejemplo",
      empty: "Podrías ser nuestra primera historia de éxito.",
      emptyLink: "Reserva una demo y averigüémoslo →",
    },
    integrations: {
      eyebrow: "Hoja de ruta",
      h2: "Se adapta a cómo ya manejas tu restaurante.",
      sub: "Menú y gestión de pedidos hoy — las conexiones con POS y plataformas de entrega son lo próximo.",
      note: "🔜 Integraciones planificadas — aún no disponibles.",
    },
    subscribe: {
      eyebrow: "Empieza ahora",
      h2: "Reserva tu demo gratuita",
      p: "Cuéntanos un poco sobre tu restaurante y nos pondremos en contacto para configurar tu demo en vivo.",
      labelName: "Tu nombre", placeholderName: "Juana Pérez",
      labelRestaurant: "Nombre del restaurante", placeholderRestaurant: "Kabul Kitchen",
      labelPhone: "Teléfono de contacto", placeholderPhone: "(555) 123-4567",
      labelEmail: "Correo electrónico", placeholderEmail: "tu@turestaurante.com",
      button: "Reservar mi demo",
      microtrust: "Demo gratuita · Sin compromiso · Sin contrato a largo plazo",
    },
    faq: {
      eyebrow: "Preguntas frecuentes", h2: "Buenas preguntas",
      q1: "¿Reemplaza a mi personal?", a1: "No — se encarga del teléfono para que tu personal se concentre en la cocina y el comedor. Cualquier cosa que no pueda manejar con confianza se transfiere amablemente a una persona real.",
      q2: "¿Qué pasa si escucha mal un pedido?", a2: "Cada artículo se repite y se confirma antes de realizar el pedido, y el cliente recibe un resumen completo con el total antes de que se envíe algo.",
      q3: "¿Puedo conservar mi número de teléfono actual?", a3: "Sí — OrderVox funciona con el número que ya tienes. Los clientes marcan exactamente el mismo número de siempre.",
      q4: "¿Cuánto tiempo toma la configuración?", a4: "La mayoría de los restaurantes están listos en una tarde — sin equipo nuevo, sin recablear tu línea telefónica.",
      q5: "¿Puedo editar mi menú?", a5: "Sí, cuando quieras. Actualiza artículos, precios y modificadores, y OrderVox refleja el cambio desde la siguiente llamada.",
      q6: "¿Puede transferir llamadas a una persona real?", a6: "Claro que sí — cualquier cosa que no pueda manejar con confianza se transfiere amablemente a tu equipo.",
      q7: "¿Habla varios idiomas?", a7: "Sí — inglés, español y darí por ahora, detectados automáticamente durante la llamada, con más en camino.",
      q8: "¿Funciona fuera de horario?", a8: "Sí — está activo las 24 horas, para que captures pedidos y preguntas incluso con las puertas cerradas.",
      q9: "¿Puedo cancelar cuando quiera?", a9: "Sí — sin contrato a largo plazo. Cancela cuando quieras.",
    },
    finalCta: {
      h2: "No pierdas otro cliente",
      p: "Cada llamada sin contestar es un ingreso perdido. Deja que OrderVox conteste cada llamada mientras tu personal se enfoca en atender a los clientes que ya están frente a ellos.",
      microtrust: "Llamada de demo gratuita · Sin compromiso · Listo en una tarde",
    },
    status: {
      invalidEmail: "Por favor ingresa un correo electrónico válido.",
      sending: "Enviando...",
      success: "¡Gracias! Recibimos tu solicitud y nos pondremos en contacto pronto para agendar tu demo.",
      alreadySubscribed: "Parece que ya estás en la lista — ¡nos pondremos en contacto!",
      genericError: "Algo salió mal. Por favor intenta de nuevo.",
    },
  },

  prs: {
    meta: { title: "OrderVox — دیگر هیچ سفارشی را از دست ندهید", description: "OrderVox به هر تماس پاسخ می‌دهد، سفارش را به‌درستی می‌گیرد و پیام تأیید ارسال می‌کند — تا رستوران شما درآمدی را که هم‌اکنون از دست می‌دهد، به دست آورد." },
    nav: { features: "ویژگی‌ها", demo: "نمایش زنده", how: "چگونه کار می‌کند", faq: "سوالات متداول", cta: "رزرو نمایش" },
    hero: {
      eyebrow: "سفارش‌گیری تلفنی با هوش مصنوعی برای رستوران‌ها",
      h1: 'هر تماس پاسخ داده می‌شود.<br>هر سفارش گرفته می‌شود.<br><span class="accent">حتی ساعت ۹ شب جمعه.</span>',
      sub: "هر زنگی که کارکنان شما نتوانند پاسخ دهند، یک سفارش است که به رقیب شما داده می‌شود. OrderVox فوراً پاسخ می‌دهد، سفارش را به‌درستی می‌گیرد و پیام تأیید ارسال می‌کند — تا درآمدی را که هم‌اکنون برایش هزینه می‌پردازید، بدون افزودن یک نفر دیگر به برنامه کاری، به دست آورید.",
      cta1: "رزرو نمایش زنده",
      cta2: "شنیدن یک تماس نمایشی زنده",
      note: "ساخته‌شده بر پایه Twilio، GPT‑4o و تشخیص گفتار در زمان واقعی — زیرساخت اثبات‌شده، نه یک منوی تلفنی خودکار.",
    },
    stats: { answered: "از تماس‌ها پاسخ داده می‌شود", pickup: "میانگین زمان پاسخ‌گویی", languages: "زبان، به‌صورت خودکار تشخیص داده می‌شود", always: "همیشه فعال، حتی بعد از بسته شدن" },
    demo: {
      eyebrow: "خودتان بشنوید",
      h2: "این یک چت‌بات نیست. یک تماس تلفنی واقعی است.",
      sub: "دکمه پخش را بزنید تا بشنوید OrderVox چگونه یک سفارش را از ابتدا تا انتها می‌گیرد — بدون متن از پیش‌نوشته‌شده، بدون فشار دادن دکمه.",
      t1: "از تماس شما با کابل کیچن متشکریم. چطور می‌توانم کمکتان کنم؟",
      t2: "سلام، می‌توانم یک کابلی پلو و یک دوغ برای بردن سفارش بدهم؟",
      t3: "البته — یک کابلی پلو و یک دوغ برای بردن. می‌توانم نام شما را برای سفارش داشته باشم؟",
      t4: "سارا.",
      t5: "متشکرم سارا! بهترین شماره برای ارسال پیامک تأیید کدام است؟",
      t6: "۵۱۰-۵۵۵-۰۱۴۸.",
      t7: "متوجه شدم — به‌محض آماده شدن برایتان پیامک می‌فرستم. مبلغ کل ۲۴.۵۰ دالر است، تا ۱۵ دقیقه دیگر آماده می‌شود. خوب است؟",
      t8: "عالی است، متشکرم!",
      t9: "همه‌چیز آماده است، سارا — به‌زودی می‌بینمتان!",
      callLabel: "یا همین حالا مستقیماً با هوش مصنوعی ما تماس بگیرید:",
      callNote: "خط نمایش زنده — خودتان امتحان کنید، نیازی به وقت قبلی نیست.",
    },
    pain: {
      eyebrow: "مشکل",
      h2: "شما قبلاً این مشکل را می‌دانید.",
      card1: "تلفن زنگ می‌زند در حالی که همه دست‌ها مشغول چیدن سفارش‌ها هستند. تا زنگ سوم، تماس قطع می‌شود — و مشتری به رستوران کناری زنگ می‌زند.",
      card2: "یک تماس ازدست‌رفته فقط یک تماس نیست. یک سفارش ازدست‌رفته است، یک مشتری همیشگی ازدست‌رفته، شاید یک سفارش بزرگ که صدها دالر ارزش داشت.",
      card3: "استخدام کسی فقط برای پاسخ دادن به تلفن، با حاشیه سود امروز به‌صرفه نیست.",
    },
    roi: {
      eyebrow: "محاسبه را ببینید",
      h2: "OrderVox هزینه خودش را جبران می‌کند — ببینید چگونه.",
      sub: "لغزنده‌ها را مطابق رستوران خود تنظیم کنید و ببینید درآمد بازیافته چگونه به‌صورت زنده به‌روز می‌شود.",
      labelCalls: "تماس‌های از دست‌رفته در هفته",
      labelOrder: "میانگین ارزش سفارش",
      labelRate: "نرخ بازیافت تخمینی",
      resultLabel: "درآمد اضافی تخمینی / ماه",
      disclaimer: "تخمین نمایشی بر اساس اعدادی که وارد می‌کنید — نتایج واقعی بسته به رستوران متفاوت است.",
      unitCalls: "تماس",
      unitRecovered: "بازیافت‌شده",
      unitWeeks: "هفته/ماه",
    },
    features: {
      eyebrow: "چرا رستوران‌ها OrderVox را انتخاب می‌کنند",
      h2: "ساخته‌شده برای رشد درآمد، نه فقط پاسخ دادن به تلفن.",
      f1: { title: "هیچ تماسی را در زمان شلوغی از دست ندهید", desc: "در حالی که تیم شما در سالن مشغول است، OrderVox همیشه پاسخ می‌دهد — شلوغ‌ترین ساعت شما را به سودآورترین ساعت تبدیل می‌کند." },
      f2: { title: "مثل بهترین میزبان شما به نظر می‌رسد", desc: "مشتریان به‌طور طبیعی صحبت می‌کنند و فهمیده می‌شوند — بدون منو، بدون «۱ را فشار دهید». طبیعی به نظر می‌رسد، چون گفتگو واقعی است." },
      f3: { title: "مشتریان جمله خود را تمام می‌کنند", desc: "اگر کسی وسط صحبت بپرد تا سفارش خود را بگوید، OrderVox فوراً متوقف می‌شود و گوش می‌دهد — درست مثل یک گارسون خوب." },
      f4: { title: "به هر مشتری، به زبان خودش خدمت کنید", desc: "انگلیسی، اسپانیایی و دری، به‌صورت خودکار تشخیص داده می‌شود — تا هیچ مشتری در ترجمه گم نشود." },
      f5: { title: "هر سفارش فوراً تأیید می‌شود", desc: "مشتریان به‌محض قطع تماس یک پیامک دریافت می‌کنند — تماس‌های کمتر برای «سفارش من کجاست؟»، غیبت کمتر." },
      f6: { title: "همه‌چیز را ببینید، بدون جواب دادن به تلفن", desc: "هر تماس، متن گفتگو و سفارش در یک داشبورد قرار می‌گیرد — تا تیم شما همیشه بداند چه چیزی در راه است." },
    },
    dash: {
      eyebrow: "مرکز کنترل شما",
      h2: "نمایی زنده از هر تماس و سفارش.",
      sub: "دیگر لازم نیست حدس بزنید در تماس چه گذشت. هر گفتگو، سفارش و جزئیات مشتری در یک داشبورد تمیز قرار می‌گیرد که تیم شما می‌تواند بین میزها بررسی کند.",
      li1: "متن تماس‌های زنده، قابل جستجو در هر زمان",
      li2: "درآمد، سفارش‌ها و حجم تماس‌ها در یک نگاه",
      li3: "سابقه و اطلاعات تماس مشتری، سازمان‌یافته",
    },
    how: {
      eyebrow: "چگونه کار می‌کند",
      h2: "در یک بعدازظهر آماده شود. بدون تجهیزات جدید.",
      s1: { title: "شماره خود را وصل کنید", desc: "OrderVox از طریق شماره تلفن فعلی رستوران شما کار می‌کند — مشتریان همان شماره‌ای را که می‌شناسند می‌گیرند." },
      s2: { title: "منوی شما را وارد می‌کنیم", desc: "منو، قیمت‌ها و انتخاب‌های واقعی شما فقط یک‌بار وارد می‌شود — OrderVox فقط از همان اطلاعات صحبت می‌کند، هرگز حدس نمی‌زند." },
      s3: { title: "مشتریان زنگ می‌زنند و سفارش می‌دهند", desc: "یک گفتگوی طبیعی، از ابتدا تا انتها: سلام، سفارش، تأیید، و در صورت پیچیده شدن، انتقال گرم به یک انسان." },
      s4: { title: "شما سفارش را دریافت می‌کنید — و اطلاعات را", desc: "سفارش به‌صورت زنده در داشبورد شما و در تلفن مشتری ظاهر می‌شود." },
    },
    why: {
      eyebrow: "تفاوت",
      h2: "بدون OrderVox در برابر با OrderVox",
      withoutHead: "بدون OrderVox",
      without1: "تماس‌های ازدست‌رفته در زمان شلوغی",
      without2: "کارکنانی که برای جواب دادن به تلفن از سالن جدا می‌شوند",
      without3: "سفارش‌های ازدست‌رفته به دلیل پیام‌گیر یا اشغال بودن خط",
      without4: "سفارش‌های تلفنی ناهماهنگ و عجولانه",
      without5: "مشتریان دست می‌کشند و رقیب را امتحان می‌کنند",
      withHead: "با OrderVox",
      with1: "هر تماس فوراً پاسخ داده می‌شود",
      with2: "کارکنان روی مشتریان مقابل خود متمرکز می‌مانند",
      with3: "هر سفارش گرفته و با پیامک تأیید می‌شود",
      with4: "همان تجربه دقیق و گرم در هر بار",
      with5: "مشتریان دوباره برمی‌گردند",
    },
    proof: {
      eyebrow: "ساخته‌شده بر پایه فناوری قابل‌اعتماد",
      h2: "با همان زیرساختی که بزرگ‌ترین محصولات هوش مصنوعی روی آن کار می‌کنند.",
      tech: "Twilio · GPT‑4o · Deepgram · ElevenLabs · اطلاعات مشتری رمزگذاری‌شده",
      quote1: "«نظر مشتری خود را پس از راه‌اندازی اینجا اضافه کنید — این یک طرح نمونه است، نه یک نقل‌قول واقعی.»",
      name1: "نام رستوران، شهر",
      quote2: "«یک جای نمونه دیگر برای نظرات — آن را با یک نظر واقعی گوگل جایگزین کنید.»",
      name2: "نام رستوران، شهر",
      sampleTag: "نمونه",
      empty: "شما می‌توانید اولین داستان موفقیت ما باشید.",
      emptyLink: "یک نمایش رزرو کنید و ببینیم →",
    },
    integrations: {
      eyebrow: "نقشه راه",
      h2: "متناسب با نحوه اداره فعلی رستوران شما.",
      sub: "امروز مدیریت منو و سفارش — اتصال به سیستم‌های فروش و پلتفرم‌های تحویل، مرحله بعدی است.",
      note: "🔜 ادغام‌های برنامه‌ریزی‌شده — هنوز در دسترس نیست.",
    },
    subscribe: {
      eyebrow: "شروع کنید",
      h2: "نمایش رایگان خود را رزرو کنید",
      p: "کمی درباره رستوران خود به ما بگویید تا با شما تماس بگیریم و نمایش زنده شما را ترتیب دهیم.",
      labelName: "نام شما", placeholderName: "احمد کریمی",
      labelRestaurant: "نام رستوران", placeholderRestaurant: "کابل کیچن",
      labelPhone: "شماره تماس", placeholderPhone: "(555) 123-4567",
      labelEmail: "ایمیل", placeholderEmail: "you@yourrestaurant.com",
      button: "رزرو نمایش من",
      microtrust: "نمایش رایگان · بدون تعهد · بدون قرارداد بلندمدت",
    },
    faq: {
      eyebrow: "سوالات متداول", h2: "سوالات خوب",
      q1: "آیا این جای کارکنان من را می‌گیرد؟", a1: "نه — این تلفن را مدیریت می‌کند تا کارکنان شما بتوانند روی آشپزخانه و سالن تمرکز کنند. هر چیزی که نتواند با اطمینان مدیریت کند، با گرمی به یک انسان واقعی منتقل می‌شود.",
      q2: "اگر سفارش را اشتباه بشنود چه می‌شود؟", a2: "هر قلم قبل از ثبت سفارش خوانده و تأیید می‌شود، و مشتری قبل از ارسال هرچیزی، یک خلاصه کامل همراه با مبلغ کل دریافت می‌کند.",
      q3: "آیا می‌توانم شماره تلفن فعلی‌ام را نگه دارم؟", a3: "بله — OrderVox با همان شماره‌ای که هم‌اکنون دارید کار می‌کند. مشتریان دقیقاً همان شماره همیشگی را می‌گیرند.",
      q4: "راه‌اندازی چقدر طول می‌کشد؟", a4: "اکثر رستوران‌ها در یک بعدازظهر آماده می‌شوند — بدون تجهیزات جدید، بدون تغییر سیم‌کشی خط تلفن.",
      q5: "آیا می‌توانم منوی خود را ویرایش کنم؟", a5: "بله، هر زمان. اقلام، قیمت‌ها و انتخاب‌ها را به‌روزرسانی کنید، و OrderVox این تغییر را از همان تماس بعدی اعمال می‌کند.",
      q6: "آیا می‌تواند تماس‌ها را به یک انسان واقعی منتقل کند؟", a6: "قطعاً — هر چیزی که نتواند با اطمینان مدیریت کند، با گرمی به تیم شما منتقل می‌شود.",
      q7: "آیا به چند زبان صحبت می‌کند؟", a7: "بله — در حال حاضر انگلیسی، اسپانیایی و دری، به‌صورت خودکار در جریان تماس تشخیص داده می‌شود، و زبان‌های بیشتر در راه است.",
      q8: "آیا خارج از ساعات کاری هم کار می‌کند؟", a8: "بله — به‌صورت ۲۴ ساعته فعال است، تا حتی بعد از بسته شدن درها هم سفارش‌ها و سوالات را دریافت کنید.",
      q9: "آیا می‌توانم هر زمان لغو کنم؟", a9: "بله — بدون قرارداد بلندمدت. هر زمان که بخواهید لغو کنید.",
    },
    finalCta: {
      h2: "دیگر هیچ مشتری را از دست ندهید",
      p: "هر تماس بی‌پاسخ، درآمدی از دست‌رفته است. بگذارید OrderVox به هر تماس پاسخ دهد در حالی که کارکنان شما روی خدمت به مهمانان مقابل خود تمرکز می‌کنند.",
      microtrust: "تماس نمایشی رایگان · بدون تعهد · آماده در یک بعدازظهر",
    },
    status: {
      invalidEmail: "لطفاً یک ایمیل معتبر وارد کنید.",
      sending: "در حال ارسال...",
      success: "متشکریم! درخواست شما دریافت شد و به‌زودی برای رزرو نمایش با شما تماس می‌گیریم.",
      alreadySubscribed: "به نظر می‌رسد شما قبلاً در لیست هستید — با شما تماس خواهیم گرفت!",
      genericError: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
    },
  },
};

const RTL_LANGS = new Set(["prs"]);
const STORAGE_KEY = "ordervox_lang";

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] ? lang : "en";
  const t = TRANSLATIONS[dict];

  document.documentElement.lang = dict === "prs" ? "prs" : dict;
  document.documentElement.dir = RTL_LANGS.has(dict) ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n"));
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n-html"));
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n-placeholder"));
    if (value !== undefined) el.setAttribute("placeholder", value);
  });

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.meta && t.meta.description) metaDesc.setAttribute("content", t.meta.description);

  const select = document.getElementById("lang-select");
  if (select) select.value = dict;

  try {
    localStorage.setItem(STORAGE_KEY, dict);
  } catch {
    // Ignore — e.g. private browsing modes that block storage. Language
    // switching itself still works for the current page view.
  }
}

function currentLanguage() {
  return document.documentElement.lang || "en";
}

function t(path) {
  const dict = TRANSLATIONS[currentLanguage()] || TRANSLATIONS.en;
  const value = getPath(dict, path);
  return value !== undefined ? value : getPath(TRANSLATIONS.en, path);
}

document.addEventListener("DOMContentLoaded", () => {
  let saved = "en";
  try {
    saved = localStorage.getItem(STORAGE_KEY) || "en";
  } catch {
    // ignore
  }
  applyLanguage(TRANSLATIONS[saved] ? saved : "en");

  const select = document.getElementById("lang-select");
  if (select) {
    select.addEventListener("change", (e) => applyLanguage(e.target.value));
  }
});
