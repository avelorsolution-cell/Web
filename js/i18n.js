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
    "footer.startconvo": {en:"Start a Conversation", ar:"ابدأ محادثة"},
    "footer.startconvo.desc": {en:"Have a project in mind? Contact us through WhatsApp or email.", ar:"هل لديك مشروع في ذهنك؟ تواصل معنا عبر واتساب أو البريد الإلكتروني."},
    "footer.tagline": {en:"A premium digital agency crafting websites, brands and visuals for businesses that want to stand out.", ar:"وكالة رقمية متميزة نصمم من خلالها مواقع الويب والهويات التجارية والتصاميم البصرية للشركات التي تسعى للتميز."},
    "footer.rights": {en:"AVELOR Creative Solutions. All rights reserved.", ar:"افيلور للحلول الإبداعية. جميع الحقوق محفوظة."},
    "footer.privacy": {en:"Privacy Policy", ar:"سياسة الخصوصية"},
    "footer.terms": {en:"Terms and Conditions", ar:"الشروط والأحكام"},

    "home.hero.eyebrow": {en:"Digital Agency in Doha, Qatar", ar:"وكالة رقمية في الدوحة، قطر"},
    "home.hero.desc": {en:"AVELOR partners with ambitious businesses to design websites, brands and visuals that don't just look premium — they perform. From first sketch to launch day, we handle it end to end.", ar:"تتعاون افيلور مع الشركات الطموحة لتصميم مواقع وهويات وتصاميم بصرية لا تبدو فاخرة فحسب، بل تحقق نتائج فعلية. من أول فكرة وحتى يوم الإطلاق، نتولى كل التفاصيل."},
    "home.hero.cta1": {en:"Explore Services", ar:"استكشف خدماتنا"},
    "home.hero.cta2": {en:"Start Your Project", ar:"ابدأ مشروعك"},
    "home.hero.badge": {en:"Doha-Based Creative Studio", ar:"استوديو إبداعي مقره الدوحة"},
    "home.hero.whatsapp": {en:"Chat on WhatsApp", ar:"تواصل عبر واتساب"},

    "home.about.badge": {en:"Doha-Based Creative Studio", ar:"استوديو إبداعي مقره الدوحة"},
    "home.about.eyebrow": {en:"Who We Are", ar:"من نحن"},
    "home.about.title": {en:"A creative studio built for businesses that refuse to look ordinary", ar:"استوديو إبداعي بُني للشركات التي ترفض أن تبدو عادية"},
    "home.about.desc": {en:"AVELOR Creative Solutions is a full-service digital agency helping startups, corporates and local brands turn ideas into polished digital presences — websites, identities and visuals that earn trust the moment someone lands on them.", ar:"افيلور للحلول الإبداعية وكالة رقمية متكاملة الخدمات تساعد الشركات الناشئة والمؤسسات والعلامات المحلية على تحويل أفكارها إلى حضور رقمي متقن — مواقع وهويات وتصاميم بصرية تكسب الثقة من أول لحظة."},
    "home.about.fact1": {en:"6 Creative Services", ar:"6 خدمات إبداعية"},
    "home.about.fact2": {en:"Based in Doha, Qatar", ar:"مقرنا في الدوحة، قطر"},
    "home.about.fact3": {en:"English and Arabic Support", ar:"دعم باللغتين العربية والإنجليزية"},
    "home.about.fact4": {en:"Custom Project Solutions", ar:"حلول مخصصة لكل مشروع"},

    "home.svc.eyebrow": {en:"What We Do", ar:"ماذا نقدم"},
    "home.svc.title": {en:"Services built to grow your brand", ar:"خدمات صُممت لتنمية علامتك التجارية"},
    "home.svc.sub": {en:"Six disciplines, one connected process — everything you need to launch and grow, under one roof.", ar:"ستة تخصصات وعملية عمل واحدة مترابطة — كل ما تحتاجه للانطلاق والنمو تحت سقف واحد."},
    "home.svc.web.desc": {en:"Custom, responsive websites engineered to convert visitors into customers.", ar:"مواقع مخصصة ومتجاوبة مصممة لتحويل الزوار إلى عملاء."},
    "home.svc.maint.desc": {en:"Ongoing updates, monitoring and support so your site stays fast and secure.", ar:"تحديثات ومتابعة ودعم مستمر لتبقى مواقعكم سريعة وآمنة."},
    "home.svc.graphic.desc": {en:"Print and digital visuals — from social creative to brand collateral.", ar:"تصاميم مطبوعة ورقمية — من محتوى التواصل الاجتماعي إلى مواد العلامة التجارية."},
    "home.svc.3d.desc": {en:"Photorealistic renders for architecture, interiors and product concepts.", ar:"تصاميم ثلاثية الأبعاد واقعية للعمارة والديكورات الداخلية والمنتجات."},
    "home.svc.branding.desc": {en:"Logos, identity systems and brand guidelines that tell a consistent story.", ar:"شعارات وأنظمة هوية وأدلة استخدام تحكي قصة متكاملة ومتناسقة."},
    "home.svc.marketing.desc": {en:"SEO, social and paid campaigns that put your brand in front of the right people.", ar:"تحسين محركات البحث وحملات التواصل الاجتماعي والإعلانات المدفوعة لتصل علامتك للجمهور المناسب."},

    "home.why.title": {en:"Why Choose AVELOR", ar:"لماذا تختار افيلور"},
    "home.why.1.title": {en:"Premium Design", ar:"تصميم متميز"},
    "home.why.1.desc": {en:"Every project is designed to feel distinct, never templated.", ar:"كل مشروع يُصمم ليكون مميزًا وفريدًا، لا يعتمد على قوالب جاهزة."},
    "home.why.2.title": {en:"Founder-Led Communication", ar:"تواصل مباشر مع المؤسس"},
    "home.why.2.desc": {en:"You work directly with the person delivering your project — no account managers in between.", ar:"تتواصل مباشرة مع الشخص الذي ينفذ مشروعك — دون وسطاء أو مديري حسابات."},
    "home.why.3.title": {en:"Fast Delivery", ar:"تسليم سريع"},
    "home.why.3.desc": {en:"Structured sprints keep every project on schedule.", ar:"مراحل عمل منظمة تضمن تسليم كل مشروع في موعده."},
    "home.why.4.title": {en:"Transparent Pricing", ar:"أسعار شفافة"},
    "home.why.4.desc": {en:"Clear quotations with scope and costs confirmed before work begins.", ar:"عروض أسعار واضحة يتم فيها تأكيد النطاق والتكلفة قبل بدء العمل."},
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

    "home.expect.eyebrow": {en:"What You Can Expect", ar:"ماذا يمكن أن تتوقع"},
    "home.expect.title": {en:"How We Work With You", ar:"كيف نعمل معك"},
    "home.expect.1.title": {en:"Clear Communication", ar:"تواصل واضح"},
    "home.expect.1.desc": {en:"Clients receive clear project updates and next steps.", ar:"يحصل العملاء على تحديثات واضحة حول المشروع وخطواته القادمة."},
    "home.expect.2.title": {en:"Custom Creative Work", ar:"عمل إبداعي مخصص"},
    "home.expect.2.desc": {en:"Every project is tailored to the business, audience and objectives.", ar:"كل مشروع مصمم خصيصًا ليناسب النشاط التجاري والجمهور والأهداف."},
    "home.expect.3.title": {en:"Transparent Quotations", ar:"عروض أسعار شفافة"},
    "home.expect.3.desc": {en:"Scope, deliverables, timeline and revision terms are confirmed before work begins.", ar:"يتم تأكيد النطاق والمخرجات والجدول الزمني وشروط التعديلات قبل بدء العمل."},
    "home.expect.4.title": {en:"Support After Delivery", ar:"الدعم بعد التسليم"},
    "home.expect.4.desc": {en:"Technical support and future improvements are available when required.", ar:"الدعم الفني والتحسينات المستقبلية متاحة عند الحاجة."},
    "home.cta.title": {en:"Let's Build Something Amazing Together", ar:"لنبنِ شيئًا رائعًا معًا"},
    "home.cta.desc": {en:"Tell us about your project and we'll get back to you within one business day with a tailored quote.", ar:"أخبرنا عن مشروعك وسنرد عليك خلال يوم عمل واحد بعرض سعر مخصص."},

    "about.hero.title": {en:"A Founder-Led Creative Studio in Doha", ar:"استوديو إبداعي بقيادة المؤسس في الدوحة"},
    "about.hero.sub": {en:"We're a small team with a simple belief: your digital presence should feel as considered as your best work.", ar:"نحن فريق صغير نؤمن بفكرة بسيطة: حضوركم الرقمي يجب أن يعكس نفس الاهتمام الذي تضعونه في أفضل أعمالكم."},
    "about.badge": {en:"Our Story", ar:"قصتنا"},
    "about.story.eyebrow": {en:"Company Story", ar:"قصة الشركة"},
    "about.story.title": {en:"Started by people who were tired of ordinary websites", ar:"بدأت على يد أشخاص سئموا من المواقع العادية"},
    "about.story.p1": {en:"AVELOR Creative Solutions is a founder-led creative studio based in Doha, Qatar. We help businesses build professional digital experiences through web design, website maintenance, graphic design, branding, 3D visualization and digital marketing.", ar:"افيلور للحلول الإبداعية استوديو إبداعي بقيادة المؤسس، ومقره الدوحة، قطر. نساعد الشركات على بناء تجارب رقمية احترافية من خلال تصميم المواقع، وصيانتها، والتصميم الجرافيكي، والهوية التجارية، والتصور ثلاثي الأبعاد، والتسويق الرقمي."},
    "about.story.p2": {en:"Every project is managed through direct communication, a clearly defined scope and careful attention to detail — whether you're a startup, a small business or an established company in construction, real estate, hospitality or retail.", ar:"تتم إدارة كل مشروع من خلال تواصل مباشر، ونطاق عمل واضح، واهتمام دقيق بالتفاصيل — سواء كنت شركة ناشئة، أو عملاً صغيرًا، أو مؤسسة راسخة في قطاع الإنشاءات أو العقارات أو الضيافة أو التجزئة."},

    "about.why.1.title": {en:"Mission", ar:"الرسالة"},
    "about.why.1.desc": {en:"To give every client a digital presence that performs as well as it looks — built with care, delivered on time.", ar:"منح كل عميل حضورًا رقميًا يؤدي بكفاءة كما يبدو جميلاً — مبني بعناية ومُسلَّم في الوقت المحدد."},
    "about.why.2.title": {en:"Vision", ar:"الرؤية"},
    "about.why.2.desc": {en:"To become the region's most trusted creative partner for businesses that want to grow through design.", ar:"أن نصبح الشريك الإبداعي الأكثر ثقة في المنطقة للشركات التي تسعى للنمو من خلال التصميم."},
    "about.why.3.title": {en:"Core Values", ar:"القيم الأساسية"},
    "about.why.3.desc": {en:"Craft over shortcuts, honest communication, and work that earns a second project every time.", ar:"الإتقان بدلاً من الحلول السريعة، وتواصل صادق، وعمل يكسب ثقة العميل لمشروع تالٍ في كل مرة."},

    "about.diff.title": {en:"What makes working with us different", ar:"ما الذي يميز العمل معنا"},
    "about.diff.sub": {en:"We keep teams small and senior, so the people who pitch your project are the people who build it.", ar:"نحافظ على فرق عمل صغيرة وذات خبرة عالية، ليكون من يقدم عرض مشروعكم هو نفسه من ينفذه."},
    "about.diff.1.title": {en:"Direct Communication", ar:"تواصل مباشر"},
    "about.diff.1.desc": {en:"No handoffs between departments — you communicate directly with the person doing the work.", ar:"بلا تنقل بين الأقسام — تتواصل مباشرة مع الشخص الذي ينفذ العمل."},
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

    "pf.hero.title": {en:"Selected Work and Creative Projects", ar:"أعمال مختارة ومشاريع إبداعية"},
    "pf.hero.sub": {en:"A collection of concept and creative projects showing how AVELOR approaches web design, branding, 3D visualization and graphic design.", ar:"مجموعة من المشاريع التصورية والإبداعية التي تُظهر أسلوب افيلور في تصميم المواقع، والهوية التجارية، والتصور ثلاثي الأبعاد، والتصميم الجرافيكي."},
    "pf.disclaimer": {en:"These self-initiated concept projects were created to demonstrate AVELOR\u2019s design process and creative capabilities. They were not commissioned by the featured brands shown.", ar:"هذه المشاريع مبادرات تصورية ذاتية من افيلور لعرض أسلوب عملنا وقدراتنا الإبداعية، ولم يتم تكليفنا بها من قبل العلامات التجارية الظاهرة."},
    "pf.conceptbadge": {en:"Concept Project", ar:"مشروع تصوري"},
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

    "contact.hero.title": {en:"Let's Discuss Your Next Project", ar:"لنتحدث عن مشروعك القادم"},
    "contact.hero.sub": {en:"Tell us what you are planning, which services you need and your preferred timeline. We will respond with the next steps and a tailored quotation.", ar:"أخبرنا بما تخطط له، والخدمات التي تحتاجها، والجدول الزمني المفضل لديك. سنرد عليك بالخطوات التالية وعرض سعر مخصص."},
    "contact.info.email.label": {en:"Email", ar:"البريد الإلكتروني"},
    "contact.info.phone.label": {en:"Phone", ar:"الهاتف"},
    "contact.info.whatsapp.label": {en:"WhatsApp", ar:"واتساب"},
    "contact.info.location.label": {en:"Based in", ar:"مقرنا"},
    "contact.info.location.value": {en:"Based in Doha, Qatar", ar:"مقرنا في الدوحة، قطر"},
    "contact.info.location.serving": {en:"Serving businesses across Qatar and internationally", ar:"نخدم الشركات داخل قطر وخارجها"},
    "contact.info.location.appointment": {en:"Meetings available by appointment", ar:"الاجتماعات متاحة بموعد مسبق"},
    "contact.form.desc": {en:"Share a few details about your project below and we'll get back to you with next steps.", ar:"شارك بعض التفاصيل عن مشروعك أدناه وسنعاود التواصل معك بالخطوات التالية."},
    "contact.form.company.label": {en:"Company Name", ar:"اسم الشركة"},
    "contact.form.company.placeholder": {en:"Your company", ar:"اسم شركتك"},
    "contact.form.phone.label": {en:"Phone or WhatsApp", ar:"الهاتف أو واتساب"},
    "contact.form.budget.label": {en:"Estimated Budget", ar:"الميزانية التقديرية"},
    "contact.form.budget.placeholder": {en:"Optional", ar:"اختياري"},
    "contact.form.timeline.label": {en:"Preferred Timeline", ar:"الجدول الزمني المفضل"},
    "contact.form.timeline.placeholder": {en:"e.g. 4-6 weeks", ar:"مثال: 4-6 أسابيع"},
    "contact.form.language.label": {en:"Preferred Language", ar:"اللغة المفضلة"},
    "contact.form.language.en": {en:"English", ar:"الإنجليزية"},
    "contact.form.language.ar": {en:"Arabic", ar:"العربية"},
    "contact.form.language.either": {en:"Either", ar:"كلاهما"},
    "contact.form.consent.error": {en:"Please confirm you agree before sending.", ar:"يرجى تأكيد الموافقة قبل الإرسال."},
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
    "contact.form.success.title": {en:"Opening your email app\u2026", ar:"جارٍ فتح تطبيق البريد الإلكتروني…"},
    "contact.form.success.desc": {en:"Your message has been prepared. Please press send in your email app to deliver it to info@avelorsolutions.com. If it doesn't open, email us directly or use WhatsApp.", ar:"تم إعداد رسالتك. يرجى الضغط على إرسال في تطبيق البريد الإلكتروني لإرسالها إلى info@avelorsolutions.com. إذا لم يفتح التطبيق، راسلنا مباشرة أو تواصل عبر واتساب."},

    "legal.updated": {en:"Last updated: August 2026", ar:"آخر تحديث: أغسطس 2026"},
    "legal.privacy.title": {en:"Privacy Policy", ar:"سياسة الخصوصية"},
    "legal.privacy.h1": {en:"Information We Collect", ar:"المعلومات التي نجمعها"},
    "legal.privacy.p1": {en:"When you contact AVELOR Creative Solutions through our website, WhatsApp or email, we may collect the information you choose to share, such as your name, company name, email address, phone number, service of interest, budget range, timeline and project description.", ar:"عندما تتواصل مع افيلور للحلول الإبداعية عبر موقعنا أو واتساب أو البريد الإلكتروني، قد نجمع المعلومات التي تختار مشاركتها، مثل اسمك، واسم شركتك، وبريدك الإلكتروني، ورقم هاتفك، والخدمة التي تهتم بها، والميزانية التقديرية، والجدول الزمني، ووصف المشروع."},
    "legal.privacy.h2": {en:"Contact Form Information", ar:"معلومات نموذج التواصل"},
    "legal.privacy.p2": {en:"Our contact form is used to prepare an enquiry that is sent to us by email or WhatsApp at your initiation. This website does not use a backend database, so form submissions are not automatically collected or stored on a server.", ar:"يُستخدم نموذج التواصل لدينا لإعداد استفسار يتم إرساله إلينا عبر البريد الإلكتروني أو واتساب بمبادرة منك. لا يستخدم هذا الموقع قاعدة بيانات خلفية، لذا لا تُجمع أو تُخزَّن بيانات النموذج تلقائيًا على أي خادم."},
    "legal.privacy.h3": {en:"Purpose of Collecting Information", ar:"الغرض من جمع المعلومات"},
    "legal.privacy.p3": {en:"Information you provide is used only to respond to your enquiry, prepare a quotation, deliver the services you request, and communicate with you about your project. We do not sell or rent your information to third parties.", ar:"تُستخدم المعلومات التي تقدمها فقط للرد على استفسارك، وإعداد عرض السعر، وتقديم الخدمات التي تطلبها، والتواصل معك بشأن مشروعك. نحن لا نبيع أو نؤجر معلوماتك لأي طرف ثالث."},
    "legal.privacy.h4": {en:"Analytics and Cookies", ar:"التحليلات وملفات تعريف الارتباط"},
    "legal.privacy.p4": {en:"This website may use basic analytics tools to understand general visitor behaviour, such as which pages are viewed. Analytics data is aggregated and is not used to personally identify visitors. If cookies are used for this purpose, you can disable them in your browser settings at any time.", ar:"قد يستخدم هذا الموقع أدوات تحليل أساسية لفهم سلوك الزوار بشكل عام، مثل الصفحات التي تتم زيارتها. بيانات التحليلات مجمّعة ولا تُستخدم للتعرف على هوية الزوار شخصيًا. إذا استُخدمت ملفات تعريف الارتباط لهذا الغرض، يمكنك تعطيلها من إعدادات متصفحك في أي وقت."},
    "legal.privacy.h5": {en:"Third-Party Services", ar:"خدمات الأطراف الثالثة"},
    "legal.privacy.p5": {en:"We may use trusted third-party services such as WhatsApp Business, email providers and web hosting providers to operate this website and communicate with clients. These providers have their own privacy practices, which we encourage you to review where relevant.", ar:"قد نستخدم خدمات موثوقة من أطراف ثالثة مثل واتساب بيزنس، ومزودي البريد الإلكتروني، ومزودي الاستضافة لتشغيل هذا الموقع والتواصل مع العملاء. لهذه الجهات سياسات خصوصية خاصة بها، ونشجعك على الاطلاع عليها عند الحاجة."},
    "legal.privacy.h6": {en:"Data Retention", ar:"مدة الاحتفاظ بالبيانات"},
    "legal.privacy.p6": {en:"We retain enquiry and project-related information only for as long as necessary to respond to your request, deliver agreed services, and meet reasonable business and legal record-keeping needs.", ar:"نحتفظ بمعلومات الاستفسارات والمشاريع فقط للمدة اللازمة للرد على طلبك، وتقديم الخدمات المتفق عليها، والوفاء بمتطلبات حفظ السجلات التجارية والقانونية المعقولة."},
    "legal.privacy.h7": {en:"Information Security", ar:"أمن المعلومات"},
    "legal.privacy.p7": {en:"We take reasonable steps to protect information shared with us. However, no method of transmission over the internet or email is completely secure, and we cannot guarantee absolute security.", ar:"نتخذ خطوات معقولة لحماية المعلومات التي تُشارك معنا. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو البريد الإلكتروني آمنة بشكل كامل، ولا يمكننا ضمان أمان مطلق."},
    "legal.privacy.h8": {en:"Access, Correction and Deletion Requests", ar:"طلبات الوصول والتصحيح والحذف"},
    "legal.privacy.p8": {en:"You may request access to, correction of, or deletion of personal information you have shared with us at any time by contacting us using the details below.", ar:"يمكنك طلب الوصول إلى المعلومات الشخصية التي شاركتها معنا أو تصحيحها أو حذفها في أي وقت من خلال التواصل معنا عبر البيانات أدناه."},
    "legal.privacy.h9": {en:"Privacy Contact Details", ar:"بيانات التواصل بخصوص الخصوصية"},
    "legal.privacy.p9": {en:"If you have questions about this Privacy Policy or how your information is handled, please contact us:", ar:"إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية التعامل مع معلوماتك، يرجى التواصل معنا:"},

    "legal.terms.title": {en:"Terms and Conditions", ar:"الشروط والأحكام"},
    "legal.terms.h1": {en:"Quotations", ar:"عروض الأسعار"},
    "legal.terms.p1": {en:"Quotations are prepared based on the information provided during our initial discussion. Prices are valid for 14 days unless stated otherwise, and may be revised if the scope of the project changes after the quotation is issued.", ar:"يتم إعداد عروض الأسعار بناءً على المعلومات المقدمة أثناء النقاش الأولي. تظل الأسعار سارية لمدة 14 يومًا ما لم يُذكر خلاف ذلك، وقد تُعدَّل في حال تغيّر نطاق المشروع بعد إصدار العرض."},
    "legal.terms.h2": {en:"Scope of Work", ar:"نطاق العمل"},
    "legal.terms.p2": {en:"The scope, deliverables, timeline and revision terms for each project are confirmed in writing before work begins. Work outside the agreed scope may require a separate quotation.", ar:"يتم تأكيد نطاق كل مشروع ومخرجاته وجدوله الزمني وشروط التعديلات كتابيًا قبل بدء العمل. أي عمل خارج النطاق المتفق عليه قد يتطلب عرض سعر منفصل."},
    "legal.terms.h3": {en:"Deposits and Payments", ar:"العربون والمدفوعات"},
    "legal.terms.p3": {en:"Projects typically require an upfront deposit before work begins, with the balance due on delivery or according to agreed milestones. Payment terms are confirmed for each project individually.", ar:"تتطلب المشاريع عادةً دفعة مقدمة قبل بدء العمل، ويُستحق باقي المبلغ عند التسليم أو وفقًا لمراحل متفق عليها. تُحدَّد شروط الدفع لكل مشروع على حدة."},
    "legal.terms.h4": {en:"Client Responsibilities", ar:"مسؤوليات العميل"},
    "legal.terms.p4": {en:"Clients are responsible for providing accurate project information, timely feedback, and any content, images or brand materials needed to complete the work. Delays in providing these may affect the project timeline.", ar:"يتحمل العميل مسؤولية تقديم معلومات دقيقة عن المشروع، وملاحظات في الوقت المناسب، وأي محتوى أو صور أو مواد خاصة بالعلامة التجارية لازمة لإنجاز العمل. قد يؤثر التأخر في تقديم ذلك على الجدول الزمني للمشروع."},
    "legal.terms.h5": {en:"Revisions", ar:"التعديلات"},
    "legal.terms.p5": {en:"Each project includes an agreed number of revision rounds, confirmed at the quotation stage. Additional revisions beyond this may be quoted separately.", ar:"يشمل كل مشروع عددًا متفقًا عليه من جولات التعديل، يتم تأكيده في مرحلة عرض السعر. أي تعديلات إضافية بعد ذلك قد تُسعَّر بشكل منفصل."},
    "legal.terms.h6": {en:"Timelines", ar:"الجداول الزمنية"},
    "legal.terms.p6": {en:"Estimated timelines are provided at the start of each project. Timelines depend on the complexity of the work and on receiving client feedback and materials promptly.", ar:"تُقدَّم الجداول الزمنية التقديرية في بداية كل مشروع. تعتمد هذه الجداول على مدى تعقيد العمل وعلى استلام ملاحظات العميل والمواد اللازمة في الوقت المناسب."},
    "legal.terms.h7": {en:"Delays", ar:"التأخيرات"},
    "legal.terms.p7": {en:"Delays caused by late feedback, missing materials, or changes in scope may extend the agreed timeline. We will communicate any impact on delivery as early as possible.", ar:"قد تؤدي التأخيرات الناتجة عن تأخر الملاحظات أو نقص المواد أو تغيير النطاق إلى تمديد الجدول الزمني المتفق عليه. سنقوم بإبلاغك بأي تأثير على موعد التسليم في أقرب وقت ممكن."},
    "legal.terms.h8": {en:"Intellectual Property", ar:"الملكية الفكرية"},
    "legal.terms.p8": {en:"Ownership of final deliverables transfers to the client upon full payment, unless otherwise agreed. AVELOR retains the right to display completed work in its portfolio unless the client requests otherwise.", ar:"تنتقل ملكية المخرجات النهائية إلى العميل عند سداد كامل المبلغ، ما لم يُتفق على خلاف ذلك. تحتفظ افيلور بحق عرض الأعمال المنجزة ضمن معرض أعمالها ما لم يطلب العميل خلاف ذلك."},
    "legal.terms.h9": {en:"Third-Party Costs", ar:"تكاليف الأطراف الثالثة"},
    "legal.terms.p9": {en:"Costs such as domain registration, hosting, stock imagery, fonts or third-party licenses are not included in our fees unless stated in the quotation, and are billed separately or paid directly by the client.", ar:"لا تشمل رسومنا تكاليف مثل تسجيل النطاق، أو الاستضافة، أو الصور الجاهزة، أو الخطوط، أو التراخيص الخارجية، ما لم يُذكر ذلك في عرض السعر، وتُحتسب بشكل منفصل أو يدفعها العميل مباشرة."},
    "legal.terms.h10": {en:"Cancellation", ar:"الإلغاء"},
    "legal.terms.p10": {en:"If a project is cancelled after work has begun, the client is responsible for payment for work completed up to that point. Deposits already paid are non-refundable once work has started.", ar:"في حال إلغاء المشروع بعد بدء العمل، يتحمل العميل مسؤولية دفع قيمة العمل المُنجز حتى ذلك الوقت. الدفعات المقدمة غير قابلة للاسترداد بعد بدء العمل."},
    "legal.terms.h11": {en:"Maintenance", ar:"الصيانة"},
    "legal.terms.p11": {en:"AVELOR is not a subscription-based company. Website maintenance is offered as one-time support or through a custom ongoing agreement confirmed separately with the client, and is never automatically included or billed without agreement.", ar:"افيلور ليست شركة تعمل بنظام الاشتراكات. تُقدَّم صيانة المواقع كدعم لمرة واحدة أو من خلال اتفاقية مستمرة مخصصة يتم تأكيدها بشكل منفصل مع العميل، ولا تُدرج أو تُحتسب تلقائيًا دون اتفاق."},
    "legal.terms.h12": {en:"Support After Delivery", ar:"الدعم بعد التسليم"},
    "legal.terms.p12": {en:"Technical support and future improvements are available after delivery when required, either as a one-time paid engagement or under a separately agreed support arrangement.", ar:"الدعم الفني والتحسينات المستقبلية متاحة بعد التسليم عند الحاجة، إما كخدمة مدفوعة لمرة واحدة أو بموجب اتفاقية دعم منفصلة متفق عليها."},
    "legal.terms.h13": {en:"Limitation of Liability", ar:"حدود المسؤولية"},
    "legal.terms.p13": {en:"AVELOR provides services with reasonable skill and care but does not guarantee specific business outcomes such as traffic, leads, rankings or sales. Our liability for any claim is limited to the amount paid for the relevant service.", ar:"تقدم افيلور خدماتها بمهارة وعناية معقولة، لكنها لا تضمن نتائج تجارية محددة مثل الزيارات أو العملاء المحتملين أو الترتيب في محركات البحث أو المبيعات. تقتصر مسؤوليتنا عن أي مطالبة على المبلغ المدفوع مقابل الخدمة المعنية."},
    "legal.terms.h14": {en:"Contact", ar:"التواصل"},
    "legal.terms.p14": {en:"Questions about these Terms and Conditions can be sent to:", ar:"يمكن إرسال أي استفسارات حول هذه الشروط والأحكام إلى:"},

    "404.title": {en:"This page took a wrong turn", ar:"يبدو أن هذه الصفحة ضلّت الطريق"},
    "404.desc": {en:"The page you're looking for doesn't exist or may have moved. Let's get you back on track.", ar:"الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. دعنا نعيدك إلى المسار الصحيح."},
    "404.backhome": {en:"Back to Home", ar:"العودة للرئيسية"},
    "404.contactus": {en:"Contact Us", ar:"تواصل معنا"}
  };

  var htmlTranslations = {
    "home.hero.title": {
      en: "Creative Digital Solutions<br>Built to <em>Strengthen</em> Your Business",
      ar: "حلول رقمية إبداعية<br>تساعد أعمالك على <em>النمو</em>"
    },
    "contact.form.consent.label": {
      en: "I agree that my information may be used to respond to this enquiry, in line with the <a href=\"privacy.html\">Privacy Policy</a>.",
      ar: "أوافق على استخدام معلوماتي للرد على هذا الاستفسار، وفقًا لـ<a href=\"privacy.html\">سياسة الخصوصية</a>."
    }
  };

  var waMessages = {
    en: "Hello AVELOR, I would like to discuss a project. The service I am interested in is ______.",
    ar: "مرحباً أفيلور، أود مناقشة مشروع والاستفسار عن خدمة ______."
  };

  function updateWhatsAppLinks(lang) {
    var msg = waMessages[lang] || waMessages.en;
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
      var match = a.getAttribute("href").match(/wa\.me\/(\d+)/);
      if (!match) return;
      a.setAttribute("href", "https://wa.me/" + match[1] + "?text=" + encodeURIComponent(msg));
    });
  }

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

    updateWhatsAppLinks(lang);
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
