(function () {
  var translations = {
    "nav.home": {en:"Home", ar:"الرئيسية"},
    "nav.about": {en:"About", ar:"من نحن"},
    "nav.services": {en:"Services", ar:"خدماتنا"},
    "nav.portfolio": {en:"Portfolio", ar:"أعمالنا"},
    "nav.contact": {en:"Contact", ar:"تواصل معنا"},
    "common.getquote": {en:"Get Quote", ar:"اطلب عرض سعر"},
    "common.whatsappus": {en:"WhatsApp Us", ar:"راسلنا واتساب"},
    "common.requestquote": {en:"Request a Quote", ar:"اطلب عرض سعر"},
    "common.learnmore": {en:"Learn More", ar:"اعرف المزيد"},
    "common.viewproject": {en:"View Project", ar:"عرض المشروع"},
    "common.viewfullportfolio": {en:"View Full Portfolio", ar:"عرض جميع الأعمال"},
    "common.whyavelor.eyebrow": {en:"Why AVELOR", ar:"لماذا افيلور"},

    "svc.web": {en:"Web Design", ar:"تصميم المواقع"},
    "svc.maint": {en:"Website Maintenance", ar:"صيانة المواقع"},
    "svc.graphic": {en:"Graphic Design", ar:"التصميم الجرافيكي"},
    "svc.3d": {en:"3D Visualization", ar:"التصور ثلاثي الأبعاد"},
    "svc.branding": {en:"Branding", ar:"الهوية التجارية"},
    "svc.marketing": {en:"Digital Marketing", ar:"التسويق الرقمي"},
    "svc.autocad": {en:"AutoCAD Drafting", ar:"رسومات الأوتوكاد"},

    "footer.quicklinks": {en:"Quick Links", ar:"روابط سريعة"},
    "footer.stayupdated": {en:"Stay Updated", ar:"ابق على اطلاع"},
    "footer.newsletter.desc": {en:"Subscribe for occasional updates on new work and openings.", ar:"اشترك لتصلك آخر الأعمال والفرص من حين لآخر."},
    "footer.newsletter.placeholder": {en:"Your email", ar:"بريدك الإلكتروني"},
    "footer.tagline": {en:"A premium digital agency crafting websites, brands and visuals for businesses that want to stand out.", ar:"وكالة رقمية متميزة نصمم من خلالها مواقع الويب والهويات التجارية والتصاميم البصرية للشركات التي تسعى للتميز."},
    "footer.rights": {en:"AVELOR Creative Solutions. All rights reserved.", ar:"افيلور للحلول الإبداعية. جميع الحقوق محفوظة."},
    "footer.privacy": {en:"Privacy Policy", ar:"سياسة الخصوصية"},
    "footer.terms": {en:"Terms of Service", ar:"شروط الخدمة"},

    "home.hero.eyebrow": {en:"Digital Agency", ar:"وكالة رقمية"},
    "home.hero.desc": {en:"AVELOR partners with ambitious businesses to design websites, brands and visuals that don't just look premium — they perform. From first sketch to launch day, we handle it end to end.", ar:"تتعاون افيلور مع الشركات الطموحة لتصميم مواقع وهويات وتصاميم بصرية لا تبدو فاخرة فحسب، بل تحقق نتائج فعلية. من أول فكرة وحتى يوم الإطلاق، نتولى كل التفاصيل."},
    "home.hero.cta1": {en:"Explore Services", ar:"استكشف خدماتنا"},
    "home.hero.cta2": {en:"Start Your Project", ar:"ابدأ مشروعك"},
    "home.hero.badge": {en:"Projects Delivered", ar:"مشروع تم تسليمه"},

    "home.about.badge": {en:"Est. Agency", ar:"وكالة معتمدة"},
    "home.about.eyebrow": {en:"Who We Are", ar:"من نحن"},
    "home.about.title": {en:"A creative studio built for businesses that refuse to look ordinary", ar:"استوديو إبداعي بُني للشركات التي ترفض أن تبدو عادية"},
    "home.about.desc": {en:"AVELOR Creative Solutions is a full-service digital agency helping startups, corporates and local brands turn ideas into polished digital presences — websites, identities and visuals that earn trust the moment someone lands on them.", ar:"افيلور للحلول الإبداعية وكالة رقمية متكاملة الخدمات تساعد الشركات الناشئة والمؤسسات والعلامات المحلية على تحويل أفكارها إلى حضور رقمي متقن — مواقع وهويات وتصاميم بصرية تكسب الثقة من أول لحظة."},
    "home.about.stat1": {en:"Projects Completed", ar:"مشروع مكتمل"},
    "home.about.stat2": {en:"Happy Clients", ar:"عميل سعيد"},
    "home.about.stat3": {en:"Years Experience", ar:"سنوات خبرة"},

    "home.svc.eyebrow": {en:"What We Do", ar:"ماذا نقدم"},
    "home.svc.title": {en:"Services built to grow your brand", ar:"خدمات صُممت لتنمية علامتك التجارية"},
    "home.svc.sub": {en:"Six disciplines, one connected process — everything you need to launch and grow, under one roof.", ar:"ستة تخصصات وعملية عمل واحدة مترابطة — كل ما تحتاجه للانطلاق والنمو تحت سقف واحد."},
    "home.svc.web.desc": {en:"Custom, responsive websites engineered to convert visitors into customers.", ar:"مواقع مخصصة ومتجاوبة مصممة لتحويل الزوار إلى عملاء."},
    "home.svc.maint.desc": {en:"Ongoing updates, monitoring and support so your site stays fast and secure.", ar:"تحديثات ومتابعة ودعم مستمر لتبقى مواقعكم سريعة وآمنة."},
    "home.svc.graphic.desc": {en:"Print and digital visuals — from social creative to brand collateral.", ar:"تصاميم مطبوعة ورقمية — من محتوى التواصل الاجتماعي إلى مواد العلامة التجارية."},
    "home.svc.3d.desc": {en:"Photorealistic renders for architecture, interiors and product concepts.", ar:"تصاميم ثلاثية الأبعاد واقعية للعمارة والديكورات الداخلية والمنتجات."},
    "home.svc.branding.desc": {en:"Logos, identity systems and brand guidelines that tell a consistent story.", ar:"شعارات وأنظمة هوية وأدلة استخدام تحكي قصة متكاملة ومتناسقة."},
    "home.svc.marketing.desc": {en:"SEO, social and paid campaigns that put your brand in front of the right people.", ar:"تحسين محركات البحث وحملات التواصل الاجتماعي والإعلانات المدفوعة لتصل علامتك للجمهور المناسب."},

    "home.why.title": {en:"Six reasons clients stay with us", ar:"ستة أسباب تجعل عملاءنا يستمرون معنا"},
    "home.why.1.title": {en:"Premium Design", ar:"تصميم متميز"},
    "home.why.1.desc": {en:"Every project is designed to feel distinct, never templated.", ar:"كل مشروع يُصمم ليكون مميزًا وفريدًا، لا يعتمد على قوالب جاهزة."},
    "home.why.2.title": {en:"Creative Team", ar:"فريق إبداعي"},
    "home.why.2.desc": {en:"Designers, developers and strategists working as one unit.", ar:"مصممون ومطورون واستراتيجيون يعملون كفريق واحد متكامل."},
    "home.why.3.title": {en:"Fast Delivery", ar:"تسليم سريع"},
    "home.why.3.desc": {en:"Structured sprints keep every project on schedule.", ar:"مراحل عمل منظمة تضمن تسليم كل مشروع في موعده."},
    "home.why.4.title": {en:"Affordable Pricing", ar:"أسعار مناسبة"},
    "home.why.4.desc": {en:"Transparent quotes with no hidden costs, ever.", ar:"عروض أسعار شفافة بلا أي تكاليف خفية على الإطلاق."},
    "home.why.5.title": {en:"Latest Technology", ar:"أحدث التقنيات"},
    "home.why.5.desc": {en:"Modern frameworks and tools built for performance.", ar:"أدوات وتقنيات حديثة مبنية لتحقيق أفضل أداء."},
    "home.why.6.title": {en:"Dedicated Support", ar:"دعم مخصص"},
    "home.why.6.desc": {en:"A single point of contact from kickoff through launch and beyond.", ar:"نقطة تواصل واحدة من بداية المشروع وحتى الإطلاق وما بعده."},

    "home.portfolio.eyebrow": {en:"Recent Work", ar:"أحدث الأعمال"},
    "home.portfolio.title": {en:"A few projects we're proud of", ar:"بعض المشاريع التي نفخر بها"},
    "home.portfolio.card1.title": {en:"The Royal Light", ar:"ذا رويال لايت"},
    "home.portfolio.card1.desc": {en:"Company profile website design and build.", ar:"تصميم وتطوير موقع الملف التعريفي للشركة."},
    "home.portfolio.card2.title": {en:"Masjid — Exterior Render", ar:"مسجد — تصور خارجي ثلاثي الأبعاد"},
    "home.portfolio.card2.desc": {en:"Full exterior visualization for a masjid project.", ar:"تصور خارجي متكامل لمشروع مسجد."},
    "home.portfolio.card3.title": {en:"Cafe Interior — Integrated Group Doha", ar:"تصميم داخلي لمقهى — إنتغريتد جروب الدوحة"},
    "home.portfolio.card3.desc": {en:"Full interior visualization for a boutique cafe fit-out.", ar:"تصور داخلي متكامل لتجهيز مقهى بوتيكي."},
    "home.portfolio.card4.title": {en:"Lordex Lighting — Catalog", ar:"لورديكس لايتنج — الكتالوج"},
    "home.portfolio.card4.desc": {en:"Full product catalog layout and design for a lighting brand.", ar:"تصميم كامل لكتالوج منتجات علامة إضاءة."},

    "home.process.eyebrow": {en:"How We Work", ar:"كيف نعمل"},
    "home.process.title": {en:"Our process, start to finish", ar:"خطوات عملنا من البداية للنهاية"},
    "home.process.1.title": {en:"Discovery", ar:"الاكتشاف"},
    "home.process.1.desc": {en:"Understanding your goals, audience and market.", ar:"فهم أهدافكم وجمهوركم والسوق المستهدف."},
    "home.process.2.title": {en:"Planning", ar:"التخطيط"},
    "home.process.2.desc": {en:"Mapping structure, content and technical scope.", ar:"تحديد الهيكلة والمحتوى والنطاق التقني."},
    "home.process.3.title": {en:"Design", ar:"التصميم"},
    "home.process.3.desc": {en:"Crafting the visual identity and page layouts.", ar:"بناء الهوية البصرية وتصميم الصفحات."},
    "home.process.4.title": {en:"Development", ar:"التطوير"},
    "home.process.4.desc": {en:"Building a fast, responsive, production-ready site.", ar:"بناء موقع سريع ومتجاوب وجاهز للانطلاق."},
    "home.process.5.title": {en:"Testing", ar:"الاختبار"},
    "home.process.5.desc": {en:"Checking every device, browser and interaction.", ar:"اختبار الموقع على جميع الأجهزة والمتصفحات والتفاعلات."},
    "home.process.6.title": {en:"Launch", ar:"الإطلاق"},
    "home.process.6.desc": {en:"Going live with domain, hosting and analytics set up.", ar:"إطلاق الموقع مع إعداد النطاق والاستضافة والتحليلات."},
    "home.process.7.title": {en:"Support", ar:"الدعم"},
    "home.process.7.desc": {en:"Ongoing maintenance and improvements post-launch.", ar:"صيانة وتحسينات مستمرة بعد الإطلاق."},

    "home.testi.eyebrow": {en:"Client Reviews", ar:"آراء العملاء"},
    "home.testi.title": {en:"What our clients say", ar:"ماذا يقول عملاؤنا"},
    "home.testi.1.quote": {en:"AVELOR redesigned our entire website in three weeks and inquiries doubled the following month. Communication was clear from day one.", ar:"أعادت افيلور تصميم موقعنا بالكامل خلال ثلاثة أسابيع، وتضاعفت الاستفسارات في الشهر التالي. كان التواصل واضحًا منذ اليوم الأول."},
    "home.testi.1.role": {en:"Founder, Levant Table", ar:"المؤسسة، ليفانت تيبل"},
    "home.testi.2.quote": {en:"The 3D renders they produced for our launch were indistinguishable from real photography. Buyers were sold before the building was finished.", ar:"التصاميم ثلاثية الأبعاد التي أنتجوها لإطلاقنا كانت أشبه بصور حقيقية تمامًا. اقتنع المشترون قبل حتى اكتمال المبنى."},
    "home.testi.2.role": {en:"Director, Solace Residences", ar:"المدير، سولاس ريزيدنسز"},
    "home.testi.3.quote": {en:"Professional, fast, and genuinely creative. Our new brand identity feels like us — finally.", ar:"احترافية وسرعة وإبداع حقيقي. هويتنا التجارية الجديدة أصبحت تعبر عنا أخيرًا."},
    "home.testi.3.role": {en:"CEO, Ferro & Co.", ar:"الرئيسة التنفيذية، فيرو آند كو"},

    "home.cta.title": {en:"Let's Build Something Amazing Together", ar:"لنبنِ شيئًا رائعًا معًا"},
    "home.cta.desc": {en:"Tell us about your project and we'll get back to you within one business day with a tailored quote.", ar:"أخبرنا عن مشروعك وسنرد عليك خلال يوم عمل واحد بعرض سعر مخصص."},

    "about.hero.title": {en:"The studio behind AVELOR", ar:"الاستوديو وراء افيلور"},
    "about.hero.sub": {en:"We're a small team with a simple belief: your digital presence should feel as considered as your best work.", ar:"نحن فريق صغير نؤمن بفكرة بسيطة: حضوركم الرقمي يجب أن يعكس نفس الاهتمام الذي تضعونه في أفضل أعمالكم."},
    "about.badge": {en:"Our Story", ar:"قصتنا"},
    "about.story.eyebrow": {en:"Company Story", ar:"قصة الشركة"},
    "about.story.title": {en:"Started by people who were tired of ordinary websites", ar:"بدأت على يد أشخاص سئموا من المواقع العادية"},
    "about.story.p1": {en:"AVELOR Creative Solutions began with a straightforward frustration: too many businesses were settling for template websites that didn't reflect the quality of their work. We set out to build a studio that treats every site, brand and render as its own creative problem — never a copy-paste job.", ar:"بدأت افيلور للحلول الإبداعية من إحباط بسيط: الكثير من الشركات كانت تكتفي بمواقع جاهزة لا تعكس جودة عملها. قررنا بناء استوديو يتعامل مع كل موقع وهوية وتصور ثلاثي الأبعاد كمشروع إبداعي مستقل — وليس كنسخة مكررة."},
    "about.story.p2": {en:"Today we work with small businesses, startups, and established companies across construction, real estate, hospitality and retail, delivering projects that are as functional as they are distinctive.", ar:"اليوم نعمل مع شركات صغيرة وناشئة ومؤسسات راسخة في قطاعات الإنشاءات والعقارات والضيافة والتجزئة، ونقدم مشاريع عملية ومميزة في آنٍ واحد."},

    "about.why.1.title": {en:"Mission", ar:"الرسالة"},
    "about.why.1.desc": {en:"To give every client a digital presence that performs as well as it looks — built with care, delivered on time.", ar:"منح كل عميل حضورًا رقميًا يؤدي بكفاءة كما يبدو جميلاً — مبني بعناية ومُسلَّم في الوقت المحدد."},
    "about.why.2.title": {en:"Vision", ar:"الرؤية"},
    "about.why.2.desc": {en:"To become the region's most trusted creative partner for businesses that want to grow through design.", ar:"أن نصبح الشريك الإبداعي الأكثر ثقة في المنطقة للشركات التي تسعى للنمو من خلال التصميم."},
    "about.why.3.title": {en:"Core Values", ar:"القيم الأساسية"},
    "about.why.3.desc": {en:"Craft over shortcuts, honest communication, and work that earns a second project every time.", ar:"الإتقان بدلاً من الحلول السريعة، وتواصل صادق، وعمل يكسب ثقة العميل لمشروع تالٍ في كل مرة."},

    "about.diff.title": {en:"What makes working with us different", ar:"ما الذي يميز العمل معنا"},
    "about.diff.sub": {en:"We keep teams small and senior, so the people who pitch your project are the people who build it.", ar:"نحافظ على فرق عمل صغيرة وذات خبرة عالية، ليكون من يقدم عرض مشروعكم هو نفسه من ينفذه."},
    "about.diff.1.title": {en:"One point of contact", ar:"نقطة تواصل واحدة"},
    "about.diff.1.desc": {en:"No handoffs between departments — your project manager knows every detail from day one.", ar:"بلا تنقل بين الأقسام — مدير مشروعكم يعرف كل التفاصيل منذ اليوم الأول."},
    "about.diff.2.title": {en:"Transparent process", ar:"عملية شفافة"},
    "about.diff.2.desc": {en:"You'll always know what phase we're in and what's coming next.", ar:"ستعرفون دائمًا في أي مرحلة نحن وما الذي سيأتي بعدها."},
    "about.diff.3.title": {en:"Built to last", ar:"مبني ليدوم"},
    "about.diff.3.desc": {en:"Clean code and scalable design systems, not throwaway templates.", ar:"أكواد نظيفة وأنظمة تصميم قابلة للتوسع، وليست قوالب مؤقتة."},

    "about.cta.title": {en:"Ready to work with us?", ar:"هل أنت مستعد للعمل معنا؟"},
    "about.cta.desc": {en:"Let's talk about what you're building and how we can help bring it to life.", ar:"لنتحدث عمّا تبنونه وكيف يمكننا المساعدة في تحقيقه."},

    "svcpage.hero.title": {en:"Services built for growth", ar:"خدمات صُممت للنمو"},
    "svcpage.hero.sub": {en:"Six disciplines that cover everything a modern brand needs — mix and match, or let us run the full engagement.", ar:"ستة تخصصات تغطي كل ما تحتاجه علامة تجارية حديثة — اختر ما يناسبك أو دعنا نتولى المشروع بالكامل."},

    "svcpage.web.desc": {en:"We design and build responsive, high-performing websites tailored to your brand and audience — from single-page brochures to full corporate platforms.", ar:"نصمم ونطور مواقع متجاوبة وعالية الأداء مصممة خصيصًا لعلامتكم وجمهوركم — من صفحات تعريفية بسيطة إلى منصات شركات متكاملة."},
    "svcpage.web.li1": {en:"Custom UI/UX design, not templates", ar:"تصميم واجهات وتجربة مستخدم مخصص، وليس قوالب جاهزة"},
    "svcpage.web.li2": {en:"Mobile-first, fully responsive builds", ar:"تصميم يبدأ من الجوال ومتجاوب بالكامل"},
    "svcpage.web.li3": {en:"SEO-friendly structure from day one", ar:"هيكلة صديقة لمحركات البحث منذ اليوم الأول"},
    "svcpage.web.li4": {en:"Content management handover", ar:"تسليم نظام إدارة محتوى سهل الاستخدام"},

    "svcpage.maint.desc": {en:"Keep your site fast, secure and up to date with ongoing monitoring, backups and content updates handled by our team.", ar:"حافظ على موقعك سريعًا وآمنًا ومحدثًا مع متابعة مستمرة ونسخ احتياطي وتحديثات محتوى يتولاها فريقنا."},
    "svcpage.maint.li1": {en:"Uptime monitoring and backups", ar:"مراقبة تشغيل الموقع والنسخ الاحتياطي"},
    "svcpage.maint.li2": {en:"Security patches and updates", ar:"تحديثات وتصحيحات أمنية"},
    "svcpage.maint.li3": {en:"Monthly content changes included", ar:"تعديلات محتوى شهرية ضمن الخدمة"},

    "svcpage.graphic.desc": {en:"Print and digital design that keeps your brand consistent — social creative, brochures, packaging and presentation decks.", ar:"تصاميم مطبوعة ورقمية تحافظ على اتساق علامتكم التجارية — محتوى تواصل اجتماعي وبروشورات وتغليف وعروض تقديمية."},
    "svcpage.graphic.li1": {en:"Social media templates and campaigns", ar:"قوالب وحملات لمنصات التواصل الاجتماعي"},
    "svcpage.graphic.li2": {en:"Print-ready brochures and business collateral", ar:"بروشورات جاهزة للطباعة ومواد تعريفية للأعمال"},

    "svcpage.3d.desc": {en:"Photorealistic 3D renders and walkthroughs for architecture, interiors and product concepts — ideal for pre-launch marketing.", ar:"تصاميم وتصورات ثلاثية الأبعاد واقعية للعمارة والديكورات الداخلية والمنتجات — مثالية للتسويق قبل الإطلاق."},
    "svcpage.3d.li1": {en:"Exterior and interior architectural renders", ar:"تصورات معمارية خارجية وداخلية"},
    "svcpage.3d.li2": {en:"Walkthrough animations", ar:"مقاطع فيديو تفاعلية (والك ثرو)"},

    "svcpage.branding.desc": {en:"Logo design, identity systems and brand guidelines that give your business a consistent, recognizable presence everywhere it shows up.", ar:"تصميم شعارات وأنظمة هوية وأدلة استخدام تمنح علامتكم حضورًا متسقًا ومميزًا أينما ظهرت."},
    "svcpage.branding.li1": {en:"Logo and visual identity design", ar:"تصميم الشعار والهوية البصرية"},
    "svcpage.branding.li2": {en:"Full brand guideline documentation", ar:"دليل استخدام هوية متكامل"},

    "svcpage.marketing.desc": {en:"SEO, social media management and paid campaigns designed to put your brand in front of the right audience.", ar:"تحسين محركات البحث وإدارة منصات التواصل الاجتماعي والحملات المدفوعة المصممة لإيصال علامتكم للجمهور المناسب."},
    "svcpage.marketing.li1": {en:"Search engine optimization", ar:"تحسين محركات البحث"},
    "svcpage.marketing.li2": {en:"Paid social and search campaigns", ar:"حملات مدفوعة على منصات التواصل ومحركات البحث"},

    "svcpage.faq.title": {en:"Frequently Asked Questions", ar:"الأسئلة الشائعة"},
    "svcpage.faq.1q": {en:"How long does a typical website take?", ar:"كم تستغرق مدة تصميم الموقع عادة؟"},
    "svcpage.faq.1a": {en:"Most brochure-style sites take 3–5 weeks from kickoff to launch, depending on content readiness and revision rounds.", ar:"تستغرق معظم المواقع التعريفية من 3 إلى 5 أسابيع من البداية وحتى الإطلاق، حسب جاهزية المحتوى وعدد جولات المراجعة."},
    "svcpage.faq.2q": {en:"Do you offer ongoing support after launch?", ar:"هل تقدمون دعمًا مستمرًا بعد الإطلاق؟"},
    "svcpage.faq.2a": {en:"Yes — our maintenance plans cover updates, monitoring and monthly content changes so your site stays current.", ar:"نعم، تشمل باقات الصيانة لدينا التحديثات والمتابعة وتعديلات المحتوى الشهرية لإبقاء موقعكم محدثًا."},
    "svcpage.faq.3q": {en:"Can I request just one service, like branding?", ar:"هل يمكنني طلب خدمة واحدة فقط، مثل الهوية التجارية؟"},
    "svcpage.faq.3a": {en:"Absolutely. Every service can be booked individually or bundled as part of a larger project.", ar:"بالتأكيد. يمكن طلب كل خدمة بشكل منفصل أو ضمن مشروع أكبر."},
    "svcpage.faq.4q": {en:"How do I get a quote?", ar:"كيف أحصل على عرض سعر؟"},
    "svcpage.faq.4a": {en:"Fill out the contact form or message us on WhatsApp with a short brief, and we'll respond within one business day.", ar:"املأ نموذج التواصل أو راسلنا عبر واتساب بنبذة مختصرة، وسنرد عليك خلال يوم عمل واحد."},

    "svcpage.sidebar.allservices": {en:"All Services", ar:"جميع الخدمات"},
    "svcpage.sidebar.cta.title": {en:"Need a custom quote?", ar:"هل تحتاج عرض سعر مخصص؟"},
    "svcpage.sidebar.cta.desc": {en:"Tell us about your project and we'll respond within one business day.", ar:"أخبرنا عن مشروعك وسنرد عليك خلال يوم عمل واحد."},

    "svcpage.cta.title": {en:"Not sure which service you need?", ar:"لست متأكدًا من الخدمة التي تحتاجها؟"},
    "svcpage.cta.desc": {en:"Message us on WhatsApp and we'll help you figure out the right starting point.", ar:"راسلنا عبر واتساب وسنساعدك في تحديد نقطة البداية المناسبة."},
    "svcpage.cta.contactform": {en:"Contact Form", ar:"نموذج التواصل"},

    "pf.hero.title": {en:"Selected work", ar:"أعمال مختارة"},
    "pf.hero.sub": {en:"Websites, brand identities, visuals and campaigns delivered for clients across industries.", ar:"مواقع وهويات تجارية وتصاميم بصرية وحملات نفذناها لعملاء من قطاعات مختلفة."},
    "pf.filter.all": {en:"All", ar:"الكل"},

    "pf.card1.title": {en:"Smart Home — Exterior Render", ar:"منزل ذكي — تصور خارجي"},
    "pf.card1.desc": {en:"Photorealistic exterior visualization for a smart residential concept.", ar:"تصور خارجي واقعي لمفهوم سكني ذكي."},
    "pf.card2.title": {en:"Single Story House — Exterior Render", ar:"منزل بطابق واحد — تصور خارجي"},
    "pf.card2.desc": {en:"Exterior render for a single-story residential build.", ar:"تصور خارجي لمبنى سكني بطابق واحد."},
    "pf.card3.title": {en:"Masjid — Floor Plans, Elevations & Section", ar:"مسجد — مخططات ومساقط وقطاعات"},
    "pf.card3.desc": {en:"Technical floor plans, elevations and section drawings.", ar:"رسومات فنية للمخططات والواجهات والقطاعات."},
    "pf.card4.title": {en:"Masjid — Full Exterior Render", ar:"مسجد — تصور خارجي كامل"},
    "pf.card4.desc": {en:"Complete exterior visualization for a masjid project.", ar:"تصور خارجي متكامل لمشروع مسجد."},
    "pf.card5.title": {en:"Masjid — Front Entrance", ar:"مسجد — المدخل الرئيسي"},
    "pf.card5.desc": {en:"Detailed render of the main entrance facade.", ar:"تصور تفصيلي لواجهة المدخل الرئيسي."},
    "pf.card6.title": {en:"Masjid — Ground Floor Corridor", ar:"مسجد — ممر الطابق الأرضي"},
    "pf.card6.desc": {en:"Interior visualization of the ground floor prayer corridor.", ar:"تصور داخلي لممر الصلاة في الطابق الأرضي."},
    "pf.card7.title": {en:"Masjid — First Floor Corridor", ar:"مسجد — ممر الطابق الأول"},
    "pf.card7.desc": {en:"Interior visualization of the first floor prayer corridor.", ar:"تصور داخلي لممر الصلاة في الطابق الأول."},
    "pf.card8.title": {en:"Pastry Area — Cafe Interior", ar:"منطقة الحلويات — تصميم داخلي لمقهى"},
    "pf.card8.desc": {en:"Interior render for the pastry display area, Integrated Group Doha.", ar:"تصور داخلي لمنطقة عرض الحلويات، إنتغريتد جروب الدوحة."},
    "pf.card9.title": {en:"Cafe Interior — Integrated Group Doha", ar:"تصميم داخلي لمقهى — إنتغريتد جروب الدوحة"},
    "pf.card9.desc": {en:"Full interior visualization for a boutique cafe fit-out.", ar:"تصور داخلي متكامل لتجهيز مقهى بوتيكي."},
    "pf.card10.title": {en:"Night Mode — Cafe Interior", ar:"وضع ليلي — تصميم داخلي لمقهى"},
    "pf.card10.desc": {en:"Evening lighting variant of the cafe interior render.", ar:"نسخة إضاءة مسائية لتصور المقهى الداخلي."},
    "pf.card11.title": {en:"Lordex Lighting — Product Catalog", ar:"لورديكس لايتنج — كتالوج المنتجات"},
    "pf.card11.desc": {en:"Full product catalog layout and design for a lighting brand.", ar:"تصميم كامل لكتالوج منتجات علامة إضاءة."},
    "pf.card12.title": {en:"The Royal Light — New Year 2026 Poster", ar:"ذا رويال لايت — ملصق رأس السنة 2026"},
    "pf.card12.desc": {en:"Festive product launch poster design.", ar:"تصميم ملصق احتفالي لإطلاق منتج."},
    "pf.card13.title": {en:"Lordex Lighting — Website", ar:"لورديكس لايتنج — الموقع الإلكتروني"},
    "pf.card13.desc": {en:"Website UI design for a lighting products brand.", ar:"تصميم واجهة موقع لعلامة منتجات إضاءة."},
    "pf.card14.title": {en:"The Royal Light — Website", ar:"ذا رويال لايت — الموقع الإلكتروني"},
    "pf.card14.desc": {en:"Company profile website design and build.", ar:"تصميم وتطوير موقع الملف التعريفي للشركة."},

    "pf.cta.title": {en:"Like what you see?", ar:"أعجبك ما رأيت؟"},
    "pf.cta.desc": {en:"Let's talk about a project that fits your brand just as well.", ar:"لنتحدث عن مشروع يناسب علامتكم التجارية تمامًا."},

    "contact.hero.title": {en:"Let's talk about your project", ar:"لنتحدث عن مشروعك"},
    "contact.hero.sub": {en:"Fill out the form, message us on WhatsApp, or drop by the office — whatever's easiest for you.", ar:"املأ النموذج، راسلنا عبر واتساب، أو تفضل بزيارة مكتبنا — أيًا كان الأسهل بالنسبة لك."},
    "contact.info.email.label": {en:"Email", ar:"البريد الإلكتروني"},
    "contact.info.phone.label": {en:"Phone", ar:"الهاتف"},
    "contact.info.whatsapp.label": {en:"WhatsApp", ar:"واتساب"},
    "contact.info.location.label": {en:"located In", ar:"الموقع"},
    "contact.info.location.value": {en:"Doha, Qatar", ar:"الدوحة، قطر"},
    "contact.form.desc": {en:"Tell us a bit about your project and we'll respond within one business day.", ar:"أخبرنا قليلاً عن مشروعك وسنرد عليك خلال يوم عمل واحد."},
    "contact.form.name.label": {en:"Full Name", ar:"الاسم الكامل"},
    "contact.form.name.placeholder": {en:"Your name", ar:"اسمك"},
    "contact.form.name.error": {en:"Please enter your name.", ar:"يرجى إدخال اسمك."},
    "contact.form.email.error": {en:"Please enter a valid email.", ar:"يرجى إدخال بريد إلكتروني صحيح."},
    "contact.form.service.label": {en:"Service", ar:"الخدمة"},
    "contact.form.service.placeholder": {en:"Select a service", ar:"اختر خدمة"},
    "contact.form.message.label": {en:"Message", ar:"الرسالة"},
    "contact.form.message.placeholder": {en:"Tell us about your project...", ar:"أخبرنا عن مشروعك..."},
    "contact.form.message.error": {en:"Tell us a little about your project.", ar:"أخبرنا قليلاً عن مشروعك."},
    "contact.form.submit": {en:"Send Message", ar:"إرسال الرسالة"},
    "contact.form.success.title": {en:"Message sent", ar:"تم إرسال الرسالة"},
    "contact.form.success.desc": {en:"Thanks for reaching out — we'll be in touch within one business day.", ar:"شكرًا لتواصلك — سنتواصل معك خلال يوم عمل واحد."},

    "404.title": {en:"This page took a wrong turn", ar:"يبدو أن هذه الصفحة ضلّت الطريق"},
    "404.desc": {en:"The page you're looking for doesn't exist or may have moved. Let's get you back on track.", ar:"الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. دعنا نعيدك إلى المسار الصحيح."},
    "404.backhome": {en:"Back to Home", ar:"العودة للرئيسية"},
    "404.contactus": {en:"Contact Us", ar:"تواصل معنا"}
  };

  var htmlTranslations = {
    "home.hero.title": {
      en: "We Build Digital Experiences<br>That Drive <em>Results</em>",
      ar: "نصمم تجارب رقمية<br>تحقق <em>نتائج</em>"
    }
  };

  function currentLang() {
    return localStorage.getItem("avelor-lang") || "en";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = translations[key];
      if (entry && typeof entry[lang] === "string") {
        el.textContent = entry[lang];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var entry = htmlTranslations[key];
      if (entry && typeof entry[lang] === "string") {
        el.innerHTML = entry[lang];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var entry = translations[key];
      if (entry && typeof entry[lang] === "string") {
        el.setAttribute("placeholder", entry[lang]);
      }
    });

    document.querySelectorAll(".lang-toggle .lang-option").forEach(function (opt) {
      opt.classList.toggle("is-active", opt.getAttribute("data-lang") === lang);
    });
  }

  function setLang(lang) {
    localStorage.setItem("avelor-lang", lang);
    applyLang(lang);
  }

  function init() {
    applyLang(currentLang());
    document.querySelectorAll(".lang-toggle").forEach(function (toggle) {
      toggle.addEventListener("click", function (e) {
        var opt = e.target.closest(".lang-option");
        if (!opt) return;
        setLang(opt.getAttribute("data-lang"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.AvelorI18n = { setLang: setLang, applyLang: applyLang, currentLang: currentLang };
})();
