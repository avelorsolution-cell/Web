(function () {
  'use strict';

  var WORKER_ENDPOINT = 'https://avelor-ai-agent.avelorsolution.workers.dev/generate-demo';
  var WHATSAPP_NUMBER = '97433976563';
  var requestController = null;
  var selectedTemplate = 'construction';

  var uiText = {
    en: {
      navDemo: 'Try AI Demo',
      eyebrow: 'Try Your Demo Website with AVELOR AI',
      heroTitle: 'Create a Demo Website for Your Business',
      heroText: 'Choose from 21 industry templates, add your business details, and AVELOR AI will generate a personalised website concept for desktop and mobile.',
      trust1: '21 Industry Templates', trust2: 'English & Arabic', trust3: 'Desktop & Mobile Preview',
      formTitle: 'Build Your Website Concept', formText: 'Choose a template and complete the details below.',
      templateLabel: 'Choose a Website Template', templateHelp: 'Select one of 21 industry-specific designs. You can customise the colours and content.',
      businessName: 'Business Name', location: 'Location', services: 'Main Services', servicesHelp: 'Separate services with commas.',
      style: 'Website Style', styleModern: 'Modern', styleCorporate: 'Corporate', styleLuxury: 'Luxury', styleMinimal: 'Minimal', styleIndustrial: 'Industrial',
      language: 'Content Language', languageEnglish: 'English', languageArabic: 'Arabic',
      primaryColor: 'Primary Colour', accentColor: 'Accent Colour', description: 'Short Business Description',
      phone: 'Phone / WhatsApp', email: 'Business Email', generate: 'Create My Demo Website', generating: 'Generating your website concept…',
      formNote: 'This tool creates a concept preview only. Final design, development, features and pricing are confirmed by AVELOR Creative Solutions.',
      previewTitle: 'Live Website Preview', desktop: 'Desktop', mobile: 'Mobile', regenerate: 'Regenerate Concept', requestWebsite: 'Request This Website',
      conceptWatermark: 'AI-GENERATED CONCEPT',
      disclaimer: 'This is an AI-generated concept for demonstration purposes. Final design, content, functionality and pricing will be confirmed by AVELOR Creative Solutions.',
      requiredName: 'Please enter the business name.', requiredServices: 'Please enter at least one service.',
      success: 'Your website concept is ready.',
      fallback: 'Preview mode is active because the AI endpoint is unavailable. A sample concept has been created from your details.',
      error: 'The concept could not be generated. A local sample preview is displayed instead.'
    },
    ar: {
      navDemo: 'جرّب الموقع بالذكاء الاصطناعي',
      eyebrow: 'جرّب موقعك التجريبي مع AVELOR AI',
      heroTitle: 'أنشئ موقعاً تجريبياً لنشاطك',
      heroText: 'اختر من بين 21 قالباً لقطاعات مختلفة، وأدخل بيانات نشاطك، وسيقوم AVELOR AI بإنشاء تصور مخصص للكمبيوتر والجوال.',
      trust1: '21 قالباً لقطاعات مختلفة', trust2: 'العربية والإنجليزية', trust3: 'معاينة سطح المكتب والجوال',
      formTitle: 'أنشئ تصور موقعك', formText: 'اختر القالب وأكمل البيانات أدناه.',
      templateLabel: 'اختر قالب الموقع', templateHelp: 'اختر أحد 21 تصميماً مخصصاً للقطاعات. يمكنك تعديل الألوان والمحتوى.',
      businessName: 'اسم الشركة', location: 'الموقع', services: 'الخدمات الرئيسية', servicesHelp: 'افصل بين الخدمات بفواصل.',
      style: 'أسلوب الموقع', styleModern: 'حديث', styleCorporate: 'مؤسسي', styleLuxury: 'فاخر', styleMinimal: 'بسيط', styleIndustrial: 'صناعي',
      language: 'لغة المحتوى', languageEnglish: 'الإنجليزية', languageArabic: 'العربية',
      primaryColor: 'اللون الرئيسي', accentColor: 'اللون المميز', description: 'وصف مختصر للنشاط',
      phone: 'الهاتف / واتساب', email: 'البريد الإلكتروني', generate: 'إنشاء موقعي التجريبي', generating: 'جارٍ إنشاء تصور موقعك…',
      formNote: 'تنشئ هذه الأداة تصوراً تجريبياً فقط. يتم تأكيد التصميم النهائي والتطوير والخصائص والأسعار من AVELOR Creative Solutions.',
      previewTitle: 'معاينة الموقع', desktop: 'سطح المكتب', mobile: 'الجوال', regenerate: 'إعادة إنشاء التصور', requestWebsite: 'اطلب هذا الموقع',
      conceptWatermark: 'تصور مولّد بالذكاء الاصطناعي',
      disclaimer: 'هذا تصور لموقع مولّد بالذكاء الاصطناعي لأغراض العرض. يتم تأكيد التصميم النهائي والمحتوى والوظائف والأسعار من AVELOR Creative Solutions.',
      requiredName: 'يرجى إدخال اسم الشركة.', requiredServices: 'يرجى إدخال خدمة واحدة على الأقل.',
      success: 'تم إنشاء تصور موقعك.',
      fallback: 'تم تفعيل وضع المعاينة لأن خدمة الذكاء الاصطناعي غير متاحة. تم إنشاء تصور تجريبي من بياناتك.',
      error: 'تعذر إنشاء التصور. تم عرض نموذج محلي بديل.'
    }
  };

  var previewText = {
    en: {
      home: 'Home', about: 'About', services: 'Services', projects: 'Showcase', contact: 'Contact Us',
      startProject: 'Get Started', ourServices: 'Explore Services', builtIntoEveryProject: 'Designed around your business',
      qualityWorkmanship: 'Professional Quality', qualityWorkmanshipText: 'A polished experience built around your audience.',
      clearCommunication: 'Clear Communication', clearCommunicationText: 'Simple information and direct ways to make contact.',
      reliableDelivery: 'Practical Experience', reliableDeliveryText: 'Responsive layouts designed for modern devices.',
      selectedProjects: 'Featured Highlights', requestQuote: 'Request a Quote'
    },
    ar: {
      home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', projects: 'أبرز الأعمال', contact: 'تواصل معنا',
      startProject: 'ابدأ الآن', ourServices: 'استكشف الخدمات', builtIntoEveryProject: 'مصمم ليناسب نشاطك',
      qualityWorkmanship: 'جودة احترافية', qualityWorkmanshipText: 'تجربة مصقولة ومصممة لجمهورك.',
      clearCommunication: 'تواصل واضح', clearCommunicationText: 'معلومات بسيطة وطرق مباشرة للتواصل.',
      reliableDelivery: 'تجربة عملية', reliableDeliveryText: 'تصميم متجاوب للأجهزة الحديثة.',
      selectedProjects: 'أبرز الخدمات', requestQuote: 'اطلب عرض سعر'
    }
  };

  var templates = {
    construction: {
      icon: 'CN', en: 'Construction', ar: 'مقاولات', subtitleEn: 'Bold & industrial', subtitleAr: 'قوي وصناعي',
      industry: 'Construction Company', style: 'Industrial', primary: '#112c46', accent: '#d4af37',
      business: 'Apex Construction', email: 'info@apexconstruction.qa',
      servicesEn: 'Building construction, renovation, fit-out and property maintenance',
      servicesAr: 'الإنشاءات، التجديد، التجهيز الداخلي وصيانة العقارات',
      descriptionEn: 'A professional construction company serving residential and commercial clients with a focus on quality, safety and reliable delivery.',
      descriptionAr: 'شركة مقاولات محترفة تخدم المشاريع السكنية والتجارية مع التركيز على الجودة والسلامة والتسليم الموثوق.',
      fallback: {
        en: { kicker: 'Construction Excellence in Qatar', hero: 'Building with Quality, Precision and Purpose', about: 'delivers dependable construction solutions with clear planning and attention to every project stage.', servicesTitle: 'Construction Services', cta: 'Planning a Construction Project?', ctaText: 'Discuss your requirements with our team and take the next step.' },
        ar: { kicker: 'تميز في المقاولات في قطر', hero: 'نبني بالجودة والدقة والهدف', about: 'تقدم حلول مقاولات موثوقة مع تخطيط واضح واهتمام بكل مرحلة من مراحل المشروع.', servicesTitle: 'خدمات المقاولات', cta: 'هل تخطط لمشروع إنشائي؟', ctaText: 'ناقش متطلباتك مع فريقنا واتخذ الخطوة التالية.' }
      },
      projectsEn: [['Residential', 'Modern Villa'], ['Commercial', 'Office Development'], ['Fit-Out', 'Retail Interior']],
      projectsAr: [['سكني', 'فيلا حديثة'], ['تجاري', 'مشروع مكاتب'], ['تجهيز داخلي', 'متجر تجزئة']]
    },
    realestate: {
      icon: 'RE', en: 'Real Estate', ar: 'عقارات', subtitleEn: 'Luxury property', subtitleAr: 'عقاري فاخر',
      industry: 'Real Estate Company', style: 'Luxury', primary: '#1d2a26', accent: '#c6a86a',
      business: 'Horizon Properties', email: 'hello@horizonproperties.qa',
      servicesEn: 'Property sales, leasing, investment advisory and property management',
      servicesAr: 'بيع العقارات، التأجير، الاستشارات الاستثمارية وإدارة العقارات',
      descriptionEn: 'A Doha real estate company helping clients discover residential and commercial opportunities with clear guidance.',
      descriptionAr: 'شركة عقارية في الدوحة تساعد العملاء على اكتشاف الفرص السكنية والتجارية بإرشاد واضح.',
      fallback: {
        en: { kicker: 'Premium Property in Doha', hero: 'Find a Place That Feels Like Yours', about: 'connects clients with carefully selected residential and commercial properties across Qatar.', servicesTitle: 'Property Services', cta: 'Ready to Find Your Next Property?', ctaText: 'Speak with our team about your preferred location, budget and property type.' },
        ar: { kicker: 'عقارات مميزة في الدوحة', hero: 'اكتشف المكان الذي يناسبك', about: 'تربط العملاء بعقارات سكنية وتجارية مختارة بعناية في قطر.', servicesTitle: 'الخدمات العقارية', cta: 'هل أنت مستعد لاختيار عقارك القادم؟', ctaText: 'تحدث مع فريقنا عن الموقع والميزانية ونوع العقار المناسب.' }
      },
      projectsEn: [['Residence', 'Waterfront Apartment'], ['Villa', 'Family Community'], ['Commercial', 'Business District']],
      projectsAr: [['سكني', 'شقة على الواجهة'], ['فيلا', 'مجتمع عائلي'], ['تجاري', 'منطقة أعمال']]
    },
    restaurant: {
      icon: 'RC', en: 'Restaurant & Café', ar: 'مطعم ومقهى', subtitleEn: 'Warm & inviting', subtitleAr: 'دافئ وجذاب',
      industry: 'Restaurant and Cafe', style: 'Modern', primary: '#4a2318', accent: '#e8a85a',
      business: 'Saffron Table', email: 'hello@saffrontable.qa',
      servicesEn: 'Breakfast, lunch, dinner, catering and private dining',
      servicesAr: 'الإفطار، الغداء، العشاء، خدمات الضيافة والمناسبات الخاصة',
      descriptionEn: 'A contemporary dining destination serving carefully prepared dishes in a warm and welcoming setting.',
      descriptionAr: 'وجهة طعام عصرية تقدم أطباقاً مُعدة بعناية في أجواء دافئة ومرحبة.',
      fallback: {
        en: { kicker: 'Fresh Flavours in Doha', hero: 'Good Food. Beautiful Moments.', about: 'brings people together through thoughtfully prepared food, welcoming service and a memorable atmosphere.', servicesTitle: 'Dining Experiences', cta: 'Planning Your Next Meal or Event?', ctaText: 'Reserve a table or contact us about catering and private dining.' },
        ar: { kicker: 'نكهات طازجة في الدوحة', hero: 'طعام رائع ولحظات جميلة', about: 'تجمع الناس من خلال طعام مُعد بعناية وخدمة مرحبة وأجواء لا تُنسى.', servicesTitle: 'تجارب الطعام', cta: 'هل تخطط لوجبتك أو مناسبتك القادمة؟', ctaText: 'احجز طاولتك أو تواصل معنا بشأن الضيافة والمناسبات الخاصة.' }
      },
      projectsEn: [['Signature', 'Chef Selection'], ['Gatherings', 'Private Dining'], ['Catering', 'Event Menus']],
      projectsAr: [['مميز', 'اختيارات الشيف'], ['مناسبات', 'طعام خاص'], ['ضيافة', 'قوائم المناسبات']]
    },
    clinic: {
      icon: 'MC', en: 'Medical Clinic', ar: 'عيادة طبية', subtitleEn: 'Clean & reassuring', subtitleAr: 'نظيف ومطمئن',
      industry: 'Medical Clinic', style: 'Minimal', primary: '#0c6070', accent: '#42b9b1',
      business: 'WellCare Clinic', email: 'appointments@wellcare.qa',
      servicesEn: 'General consultation, preventive care, health screening and follow-up care',
      servicesAr: 'الاستشارات العامة، الرعاية الوقائية، الفحوصات الصحية والمتابعة',
      descriptionEn: 'A patient-focused clinic offering accessible medical care in a calm and professional environment.',
      descriptionAr: 'عيادة تركز على المريض وتقدم رعاية طبية سهلة الوصول في بيئة هادئة واحترافية.',
      fallback: {
        en: { kicker: 'Patient-Focused Care', hero: 'Professional Care with a Human Touch', about: 'supports patients with clear information, attentive consultations and practical follow-up care.', servicesTitle: 'Our Medical Services', cta: 'Need to Book an Appointment?', ctaText: 'Contact the clinic to ask a question or arrange your visit.' },
        ar: { kicker: 'رعاية تركز على المريض', hero: 'رعاية مهنية بلمسة إنسانية', about: 'تدعم المرضى بمعلومات واضحة واستشارات دقيقة ومتابعة عملية.', servicesTitle: 'خدماتنا الطبية', cta: 'هل ترغب في حجز موعد؟', ctaText: 'تواصل مع العيادة للاستفسار أو ترتيب زيارتك.' }
      },
      projectsEn: [['Consultation', 'General Care'], ['Screening', 'Preventive Health'], ['Follow-Up', 'Ongoing Support']],
      projectsAr: [['استشارة', 'رعاية عامة'], ['فحوصات', 'صحة وقائية'], ['متابعة', 'دعم مستمر']]
    },
    interior: {
      icon: 'ID', en: 'Interior Design', ar: 'تصميم داخلي', subtitleEn: 'Editorial & minimal', subtitleAr: 'تحريري وبسيط',
      industry: 'Interior Design Studio', style: 'Luxury', primary: '#2a2925', accent: '#b68d55',
      business: 'Form & Space Studio', email: 'studio@formandspace.qa',
      servicesEn: 'Interior design, space planning, material selection and 3D visualization',
      servicesAr: 'التصميم الداخلي، تخطيط المساحات، اختيار المواد والتصور ثلاثي الأبعاد',
      descriptionEn: 'A Doha interior design studio creating thoughtful residential and commercial spaces.',
      descriptionAr: 'استوديو تصميم داخلي في الدوحة يصمم مساحات سكنية وتجارية مدروسة.',
      fallback: {
        en: { kicker: 'Interiors with Intention', hero: 'Spaces Shaped Around the Way You Live', about: 'creates balanced interiors through thoughtful planning, refined materials and a clear visual direction.', servicesTitle: 'Design Services', cta: 'Ready to Reimagine Your Space?', ctaText: 'Share your space, requirements and preferred design direction.' },
        ar: { kicker: 'تصاميم داخلية هادفة', hero: 'مساحات مصممة حول أسلوب حياتك', about: 'تصمم مساحات متوازنة من خلال التخطيط المدروس والمواد الراقية والاتجاه البصري الواضح.', servicesTitle: 'خدمات التصميم', cta: 'هل أنت مستعد لإعادة تصور مساحتك؟', ctaText: 'شاركنا تفاصيل المساحة والمتطلبات والأسلوب المفضل.' }
      },
      projectsEn: [['Residential', 'Calm Living'], ['Hospitality', 'Boutique Café'], ['Workplace', 'Modern Office']],
      projectsAr: [['سكني', 'معيشة هادئة'], ['ضيافة', 'مقهى بوتيك'], ['عمل', 'مكتب حديث']]
    },
    fitness: {
      icon: 'FT', en: 'Fitness & Gym', ar: 'لياقة ونادٍ رياضي', subtitleEn: 'Energetic & bold', subtitleAr: 'حيوي وقوي',
      industry: 'Fitness and Gym', style: 'Industrial', primary: '#101010', accent: '#d9ff3f',
      business: 'Pulse Fitness', email: 'join@pulsefitness.qa',
      servicesEn: 'Gym membership, personal training, group classes and fitness assessments',
      servicesAr: 'عضوية النادي، التدريب الشخصي، الحصص الجماعية وتقييم اللياقة',
      descriptionEn: 'A modern fitness destination helping members train with structure, energy and professional guidance.',
      descriptionAr: 'وجهة لياقة حديثة تساعد الأعضاء على التدريب بنظام وطاقة وإرشاد احترافي.',
      fallback: {
        en: { kicker: 'Train Stronger in Doha', hero: 'Build Strength. Move Better. Feel Strong.', about: 'helps members make consistent progress through structured training, expert support and an energetic community.', servicesTitle: 'Training Options', cta: 'Ready to Start Training?', ctaText: 'Choose your training goal and speak with our team about the right membership.' },
        ar: { kicker: 'تدرب بقوة في الدوحة', hero: 'ابنِ قوتك وتحرك بشكل أفضل', about: 'تساعد الأعضاء على تحقيق تقدم مستمر من خلال تدريب منظم ودعم متخصص ومجتمع حيوي.', servicesTitle: 'خيارات التدريب', cta: 'هل أنت مستعد لبدء التدريب؟', ctaText: 'حدد هدفك وتحدث مع فريقنا عن العضوية المناسبة.' }
      },
      projectsEn: [['Strength', 'Personal Training'], ['Energy', 'Group Classes'], ['Progress', 'Fitness Assessment']],
      projectsAr: [['قوة', 'تدريب شخصي'], ['طاقة', 'حصص جماعية'], ['تقدم', 'تقييم اللياقة']]
    },
    cleaning: {
      icon: 'CL', en: 'Cleaning Services', ar: 'خدمات تنظيف', subtitleEn: 'Fresh & friendly', subtitleAr: 'منعش وودود',
      industry: 'Cleaning and Maintenance Company', style: 'Modern', primary: '#146b7a', accent: '#63d5cf',
      business: 'BrightCare Services', email: 'bookings@brightcare.qa',
      servicesEn: 'Home cleaning, office cleaning, deep cleaning and scheduled maintenance',
      servicesAr: 'تنظيف المنازل، تنظيف المكاتب، التنظيف العميق والصيانة المجدولة',
      descriptionEn: 'A dependable cleaning service for homes, offices and commercial properties across Doha.',
      descriptionAr: 'خدمة تنظيف موثوقة للمنازل والمكاتب والعقارات التجارية في الدوحة.',
      fallback: {
        en: { kicker: 'A Cleaner Space, Made Simple', hero: 'Reliable Cleaning for Homes and Workplaces', about: 'makes property care simpler through organised service, clear booking and attention to detail.', servicesTitle: 'Cleaning Services', cta: 'Need a Cleaning Service?', ctaText: 'Tell us about your property and preferred schedule.' },
        ar: { kicker: 'مساحة أنظف بسهولة', hero: 'تنظيف موثوق للمنازل وأماكن العمل', about: 'تجعل العناية بالعقار أسهل من خلال خدمة منظمة وحجز واضح واهتمام بالتفاصيل.', servicesTitle: 'خدمات التنظيف', cta: 'هل تحتاج إلى خدمة تنظيف؟', ctaText: 'أخبرنا عن العقار والموعد المفضل.' }
      },
      projectsEn: [['Home', 'Deep Cleaning'], ['Office', 'Scheduled Care'], ['Commercial', 'Facility Support']],
      projectsAr: [['منزل', 'تنظيف عميق'], ['مكتب', 'عناية مجدولة'], ['تجاري', 'دعم المرافق']]
    },
    automotive: {
      icon: 'AU', en: 'Automotive', ar: 'خدمات سيارات', subtitleEn: 'Dark & performance', subtitleAr: 'داكن وأداء قوي',
      industry: 'Automotive Service Centre', style: 'Industrial', primary: '#17191c', accent: '#e33732',
      business: 'Torque Auto Care', email: 'service@torqueauto.qa',
      servicesEn: 'Vehicle servicing, diagnostics, detailing and repair support',
      servicesAr: 'صيانة السيارات، التشخيص، العناية والتلميع ودعم الإصلاح',
      descriptionEn: 'A professional automotive service centre focused on dependable maintenance and clear customer support.',
      descriptionAr: 'مركز خدمات سيارات احترافي يركز على الصيانة الموثوقة ودعم العملاء الواضح.',
      fallback: {
        en: { kicker: 'Performance You Can Depend On', hero: 'Professional Care for Every Drive', about: 'supports vehicle owners with practical diagnostics, organised servicing and attention to performance.', servicesTitle: 'Automotive Services', cta: 'Is Your Vehicle Due for Service?', ctaText: 'Contact our team with your vehicle details and required service.' },
        ar: { kicker: 'أداء يمكنك الاعتماد عليه', hero: 'عناية احترافية لكل رحلة', about: 'يدعم أصحاب السيارات بتشخيص عملي وصيانة منظمة واهتمام بالأداء.', servicesTitle: 'خدمات السيارات', cta: 'هل حان موعد صيانة سيارتك؟', ctaText: 'تواصل معنا بتفاصيل السيارة والخدمة المطلوبة.' }
      },
      projectsEn: [['Service', 'Routine Maintenance'], ['Diagnostics', 'System Checks'], ['Detailing', 'Exterior Care']],
      projectsAr: [['صيانة', 'صيانة دورية'], ['تشخيص', 'فحص الأنظمة'], ['عناية', 'تلميع خارجي']]
    },
    beauty: {
      icon: 'BS', en: 'Beauty & Spa', ar: 'تجميل وسبا', subtitleEn: 'Soft & luxurious', subtitleAr: 'ناعم وفاخر',
      industry: 'Beauty Salon and Spa', style: 'Luxury', primary: '#5d454b', accent: '#d7b7a5',
      business: 'Maison Glow', email: 'book@maisonglow.qa',
      servicesEn: 'Hair styling, beauty treatments, skincare and spa services',
      servicesAr: 'تصفيف الشعر، علاجات التجميل، العناية بالبشرة وخدمات السبا',
      descriptionEn: 'A refined beauty and wellness destination offering thoughtful treatments in a calm setting.',
      descriptionAr: 'وجهة راقية للجمال والعافية تقدم علاجات مدروسة في أجواء هادئة.',
      fallback: {
        en: { kicker: 'Beauty, Care and Calm', hero: 'Make Time for the Way You Want to Feel', about: 'creates a calm beauty experience through considered treatments, attentive service and refined surroundings.', servicesTitle: 'Beauty & Wellness', cta: 'Ready to Book Your Visit?', ctaText: 'Choose your preferred treatment and contact us to arrange an appointment.' },
        ar: { kicker: 'جمال وعناية وهدوء', hero: 'خصصي وقتاً للشعور الذي تستحقينه', about: 'تقدم تجربة جمال هادئة من خلال علاجات مدروسة وخدمة دقيقة وأجواء راقية.', servicesTitle: 'الجمال والعافية', cta: 'هل أنت مستعدة لحجز موعدك؟', ctaText: 'اختاري العلاج المفضل وتواصلي معنا لترتيب الموعد.' }
      },
      projectsEn: [['Hair', 'Signature Styling'], ['Skin', 'Glow Treatments'], ['Wellness', 'Spa Rituals']],
      projectsAr: [['شعر', 'تصفيف مميز'], ['بشرة', 'علاجات النضارة'], ['عافية', 'جلسات سبا']]
    },
    consulting: {
      icon: 'PC', en: 'Professional Consulting', ar: 'استشارات مهنية', subtitleEn: 'Corporate & credible', subtitleAr: 'مؤسسي وموثوق',
      industry: 'Professional Consultancy', style: 'Corporate', primary: '#172a49', accent: '#4ea3c8',
      business: 'Northgate Advisory', email: 'advisory@northgate.qa',
      servicesEn: 'Business advisory, strategy, project support and operational improvement',
      servicesAr: 'الاستشارات التجارية، الاستراتيجية، دعم المشاريع وتحسين العمليات',
      descriptionEn: 'A professional consultancy helping organisations clarify priorities and move projects forward.',
      descriptionAr: 'شركة استشارات مهنية تساعد المؤسسات على تحديد الأولويات ودفع المشاريع إلى الأمام.',
      fallback: {
        en: { kicker: 'Clear Thinking for Complex Decisions', hero: 'Practical Advice That Moves Business Forward', about: 'helps organisations make informed decisions through structured analysis, clear communication and practical support.', servicesTitle: 'Advisory Services', cta: 'Need Clarity on Your Next Step?', ctaText: 'Share your business challenge and arrange an initial discussion.' },
        ar: { kicker: 'تفكير واضح للقرارات المعقدة', hero: 'استشارات عملية تدفع الأعمال إلى الأمام', about: 'تساعد المؤسسات على اتخاذ قرارات مدروسة من خلال التحليل المنظم والتواصل الواضح والدعم العملي.', servicesTitle: 'الخدمات الاستشارية', cta: 'هل تحتاج إلى وضوح في خطوتك القادمة؟', ctaText: 'شاركنا التحدي الذي تواجهه ورتب مناقشة أولية.' }
      },
      projectsEn: [['Strategy', 'Growth Planning'], ['Operations', 'Process Review'], ['Projects', 'Delivery Support']],
      projectsAr: [['استراتيجية', 'تخطيط النمو'], ['عمليات', 'مراجعة الإجراءات'], ['مشاريع', 'دعم التنفيذ']]
    },
    ecommerce: {
      icon: 'EC', en: 'E-commerce & Retail', ar: 'متجر إلكتروني وتجزئة', subtitleEn: 'Product-led & modern', subtitleAr: 'حديث ويركز على المنتجات',
      industry: 'E-commerce and Retail Brand', style: 'Modern', primary: '#22232a', accent: '#ffb347',
      business: 'Nexa Market', email: 'shop@nexamarket.qa',
      servicesEn: 'Online shopping, product delivery, customer support and curated collections',
      servicesAr: 'التسوق الإلكتروني، توصيل المنتجات، دعم العملاء والمجموعات المختارة',
      descriptionEn: 'A modern retail brand making carefully selected products easy to discover and order online.',
      descriptionAr: 'علامة تجارية حديثة تسهّل اكتشاف المنتجات المختارة وطلبها عبر الإنترنت.',
      fallback: {
        en: { kicker: 'Curated Products, Easy Shopping', hero: 'Discover Better Products for Everyday Life', about: 'brings together useful products, clear information and a simple online shopping experience.', servicesTitle: 'Shop by Experience', cta: 'Ready to Discover Something New?', ctaText: 'Browse the collection or contact our team for product support.' },
        ar: { kicker: 'منتجات مختارة وتسوق أسهل', hero: 'اكتشف منتجات أفضل لحياتك اليومية', about: 'تجمع منتجات مفيدة ومعلومات واضحة وتجربة تسوق إلكترونية بسيطة.', servicesTitle: 'تجربة التسوق', cta: 'هل أنت مستعد لاكتشاف شيء جديد؟', ctaText: 'تصفح المجموعة أو تواصل مع فريقنا لدعم المنتجات.' }
      },
      projectsEn: [['New', 'Featured Collection'], ['Popular', 'Everyday Essentials'], ['Support', 'Easy Delivery']],
      projectsAr: [['جديد', 'مجموعة مميزة'], ['شائع', 'أساسيات يومية'], ['دعم', 'توصيل سهل']]
    },
    education: {
      icon: 'ED', en: 'Education & Academy', ar: 'تعليم وأكاديمية', subtitleEn: 'Bright & inspiring', subtitleAr: 'مشرق وملهم',
      industry: 'Education and Training Academy', style: 'Modern', primary: '#153b66', accent: '#f3b61f',
      business: 'BrightPath Academy', email: 'admissions@brightpath.qa',
      servicesEn: 'School programmes, tutoring, professional courses and student activities',
      servicesAr: 'البرامج التعليمية، الدروس الخصوصية، الدورات المهنية والأنشطة الطلابية',
      descriptionEn: 'A modern learning centre helping students and professionals build knowledge, confidence and practical skills.',
      descriptionAr: 'مركز تعليمي حديث يساعد الطلاب والمهنيين على بناء المعرفة والثقة والمهارات العملية.',
      fallback: {
        en: { kicker: 'Learning That Opens Possibilities', hero: 'Grow Skills. Build Confidence. Move Forward.', about: 'creates supportive learning experiences through clear programmes, dedicated guidance and practical development.', servicesTitle: 'Learning Programmes', cta: 'Ready to Start Learning?', ctaText: 'Explore the right programme and speak with our admissions team.' },
        ar: { kicker: 'تعليم يفتح آفاقاً جديدة', hero: 'طوّر مهاراتك وابنِ ثقتك وتقدم', about: 'تقدم تجارب تعليمية داعمة من خلال برامج واضحة وإرشاد مخصص وتطوير عملي.', servicesTitle: 'البرامج التعليمية', cta: 'هل أنت مستعد لبدء التعلم؟', ctaText: 'اكتشف البرنامج المناسب وتحدث مع فريق القبول.' }
      },
      projectsEn: [['Students', 'Academic Support'], ['Courses', 'Professional Learning'], ['Community', 'Student Activities']],
      projectsAr: [['طلاب', 'دعم أكاديمي'], ['دورات', 'تعلم مهني'], ['مجتمع', 'أنشطة طلابية']]
    },
    law: {
      icon: 'LF', en: 'Law Firm', ar: 'مكتب محاماة', subtitleEn: 'Formal & trusted', subtitleAr: 'رسمي وموثوق',
      industry: 'Law Firm and Legal Consultancy', style: 'Corporate', primary: '#111f35', accent: '#c4a261',
      business: 'Aligned Legal', email: 'contact@alignedlegal.qa',
      servicesEn: 'Corporate law, contracts, legal consultation and dispute support',
      servicesAr: 'قانون الشركات، العقود، الاستشارات القانونية ودعم النزاعات',
      descriptionEn: 'A professional legal practice providing clear, confidential and considered guidance for businesses and individuals.',
      descriptionAr: 'مكتب قانوني مهني يقدم إرشاداً واضحاً وسرياً ومدروساً للشركات والأفراد.',
      fallback: {
        en: { kicker: 'Clear Counsel. Considered Strategy.', hero: 'Legal Guidance Built Around Your Priorities', about: 'supports clients with careful analysis, clear communication and practical legal direction.', servicesTitle: 'Legal Services', cta: 'Need a Confidential Legal Discussion?', ctaText: 'Share the nature of your matter and arrange an initial consultation.' },
        ar: { kicker: 'استشارة واضحة واستراتيجية مدروسة', hero: 'إرشاد قانوني مبني على أولوياتك', about: 'يدعم العملاء من خلال التحليل الدقيق والتواصل الواضح والتوجيه القانوني العملي.', servicesTitle: 'الخدمات القانونية', cta: 'هل تحتاج إلى مناقشة قانونية سرية؟', ctaText: 'شارك طبيعة موضوعك ورتب استشارة أولية.' }
      },
      projectsEn: [['Corporate', 'Business Advisory'], ['Contracts', 'Agreement Review'], ['Disputes', 'Case Support']],
      projectsAr: [['شركات', 'استشارات أعمال'], ['عقود', 'مراجعة الاتفاقيات'], ['نزاعات', 'دعم القضايا']]
    },
    hotel: {
      icon: 'HT', en: 'Hotel & Hospitality', ar: 'فندق وضيافة', subtitleEn: 'Elegant & welcoming', subtitleAr: 'أنيق ومرحّب',
      industry: 'Hotel and Hospitality Business', style: 'Luxury', primary: '#24433a', accent: '#d5b46f',
      business: 'Pearl Bay Hotel', email: 'stay@pearlbay.qa',
      servicesEn: 'Rooms and suites, dining, events and guest services',
      servicesAr: 'الغرف والأجنحة، المطاعم، الفعاليات وخدمات الضيوف',
      descriptionEn: 'A refined hospitality destination offering comfortable stays, thoughtful service and memorable experiences.',
      descriptionAr: 'وجهة ضيافة راقية تقدم إقامة مريحة وخدمة مدروسة وتجارب لا تُنسى.',
      fallback: {
        en: { kicker: 'A Refined Stay in Doha', hero: 'Comfort, Calm and Thoughtful Hospitality', about: 'welcomes guests with elegant spaces, attentive service and experiences designed around every stay.', servicesTitle: 'Hospitality Experiences', cta: 'Planning Your Stay or Event?', ctaText: 'Contact our reservations team to discuss rooms, dining or private events.' },
        ar: { kicker: 'إقامة راقية في الدوحة', hero: 'راحة وهدوء وضيافة مدروسة', about: 'ترحب بالضيوف بمساحات أنيقة وخدمة دقيقة وتجارب مصممة لكل إقامة.', servicesTitle: 'تجارب الضيافة', cta: 'هل تخطط لإقامتك أو فعاليتك؟', ctaText: 'تواصل مع فريق الحجوزات لمناقشة الغرف أو المطاعم أو الفعاليات الخاصة.' }
      },
      projectsEn: [['Stay', 'Signature Suites'], ['Dining', 'Restaurant Experience'], ['Events', 'Private Celebrations']],
      projectsAr: [['إقامة', 'أجنحة مميزة'], ['مطاعم', 'تجربة طعام'], ['فعاليات', 'مناسبات خاصة']]
    },
    travel: {
      icon: 'TR', en: 'Travel & Tourism', ar: 'سفر وسياحة', subtitleEn: 'Fresh & adventurous', subtitleAr: 'منعش ومغامر',
      industry: 'Travel and Tourism Company', style: 'Modern', primary: '#116b87', accent: '#ff765d',
      business: 'Roam Qatar', email: 'hello@roamqatar.qa',
      servicesEn: 'Holiday packages, local tours, visa support and corporate travel',
      servicesAr: 'باقات العطلات، الجولات المحلية، دعم التأشيرات وسفر الشركات',
      descriptionEn: 'A travel company creating simple, enjoyable journeys for leisure, business and local discovery.',
      descriptionAr: 'شركة سفر تنظم رحلات سهلة وممتعة للترفيه والأعمال واكتشاف الوجهات المحلية.',
      fallback: {
        en: { kicker: 'Journeys Made Easier', hero: 'Discover More with Travel Planned Around You', about: 'helps travellers explore with clear options, practical support and experiences suited to their plans.', servicesTitle: 'Travel Experiences', cta: 'Where Would You Like to Go Next?', ctaText: 'Share your destination, dates and travel style with our team.' },
        ar: { kicker: 'رحلات أسهل وأكثر متعة', hero: 'اكتشف المزيد مع سفر مصمم لك', about: 'تساعد المسافرين على الاستكشاف من خلال خيارات واضحة ودعم عملي وتجارب تناسب خططهم.', servicesTitle: 'تجارب السفر', cta: 'إلى أين ترغب في السفر؟', ctaText: 'شاركنا الوجهة والتواريخ وأسلوب السفر المناسب لك.' }
      },
      projectsEn: [['Escape', 'Weekend Getaways'], ['Explore', 'Qatar Experiences'], ['Business', 'Corporate Travel']],
      projectsAr: [['عطلة', 'رحلات نهاية الأسبوع'], ['استكشاف', 'تجارب قطر'], ['أعمال', 'سفر الشركات']]
    },
    technology: {
      icon: 'TC', en: 'Technology Company', ar: 'شركة تقنية', subtitleEn: 'Digital & futuristic', subtitleAr: 'رقمي ومستقبلي',
      industry: 'Technology and Software Company', style: 'Modern', primary: '#0c1425', accent: '#35d5e8',
      business: 'Vertex Digital', email: 'hello@vertexdigital.qa',
      servicesEn: 'Software development, cloud solutions, automation and IT support',
      servicesAr: 'تطوير البرمجيات، الحلول السحابية، الأتمتة ودعم تقنية المعلومات',
      descriptionEn: 'A technology company building practical digital solutions for modern organisations and growing teams.',
      descriptionAr: 'شركة تقنية تبني حلولاً رقمية عملية للمؤسسات الحديثة والفرق النامية.',
      fallback: {
        en: { kicker: 'Technology Built for Progress', hero: 'Turn Better Ideas into Useful Digital Products', about: 'combines product thinking, reliable technology and practical delivery to help organisations work smarter.', servicesTitle: 'Technology Solutions', cta: 'Have a Digital Product in Mind?', ctaText: 'Describe the challenge and start a practical technology discussion.' },
        ar: { kicker: 'تقنية مصممة للتقدم', hero: 'حوّل الأفكار الأفضل إلى منتجات رقمية مفيدة', about: 'تجمع بين التفكير في المنتجات والتقنية الموثوقة والتنفيذ العملي لمساعدة المؤسسات على العمل بذكاء.', servicesTitle: 'الحلول التقنية', cta: 'هل لديك فكرة لمنتج رقمي؟', ctaText: 'اشرح التحدي وابدأ مناقشة تقنية عملية.' }
      },
      projectsEn: [['Software', 'Custom Platforms'], ['Cloud', 'Connected Systems'], ['Automation', 'Smarter Workflows']],
      projectsAr: [['برمجيات', 'منصات مخصصة'], ['سحابة', 'أنظمة مترابطة'], ['أتمتة', 'سير عمل أذكى']]
    },
    events: {
      icon: 'EV', en: 'Events & Weddings', ar: 'فعاليات وأعراس', subtitleEn: 'Vibrant & memorable', subtitleAr: 'حيوي ولا يُنسى',
      industry: 'Events and Wedding Planning Company', style: 'Luxury', primary: '#5a285f', accent: '#f3a8c8',
      business: 'Luma Events', email: 'plan@lumaevents.qa',
      servicesEn: 'Wedding planning, corporate events, event production and venue styling',
      servicesAr: 'تنظيم الأعراس، فعاليات الشركات، إنتاج الفعاليات وتنسيق المواقع',
      descriptionEn: 'A creative event studio planning polished celebrations and professional experiences from concept to delivery.',
      descriptionAr: 'استوديو فعاليات إبداعي ينظم احتفالات راقية وتجارب مهنية من الفكرة حتى التنفيذ.',
      fallback: {
        en: { kicker: 'Moments Designed to Be Remembered', hero: 'Beautiful Events, Thoughtfully Brought to Life', about: 'turns ideas into organised, expressive and memorable occasions through careful planning and creative direction.', servicesTitle: 'Event Experiences', cta: 'Planning a Special Occasion?', ctaText: 'Share your date, guest count and vision with our planning team.' },
        ar: { kicker: 'لحظات مصممة لتبقى في الذاكرة', hero: 'فعاليات جميلة تنبض بالحياة بعناية', about: 'تحول الأفكار إلى مناسبات منظمة ومعبرة ولا تُنسى من خلال التخطيط الدقيق والتوجيه الإبداعي.', servicesTitle: 'تجارب الفعاليات', cta: 'هل تخطط لمناسبة خاصة؟', ctaText: 'شاركنا التاريخ وعدد الضيوف ورؤيتك للمناسبة.' }
      },
      projectsEn: [['Wedding', 'Signature Celebration'], ['Corporate', 'Brand Experience'], ['Private', 'Intimate Gathering']],
      projectsAr: [['زفاف', 'احتفال مميز'], ['شركات', 'تجربة علامة تجارية'], ['خاص', 'مناسبة حميمة']]
    },
    photography: {
      icon: 'PH', en: 'Photography Studio', ar: 'استوديو تصوير', subtitleEn: 'Editorial & minimal', subtitleAr: 'تحريري وبسيط',
      industry: 'Photography and Creative Studio', style: 'Minimal', primary: '#151515', accent: '#d6a66f',
      business: 'Frame Studio', email: 'studio@framestudio.qa',
      servicesEn: 'Commercial photography, portraits, event coverage and retouching',
      servicesAr: 'التصوير التجاري، الصور الشخصية، تغطية الفعاليات ومعالجة الصور',
      descriptionEn: 'A visual studio creating refined photography for brands, people and memorable occasions.',
      descriptionAr: 'استوديو بصري يقدم تصويراً راقياً للعلامات التجارية والأفراد والمناسبات المميزة.',
      fallback: {
        en: { kicker: 'Stories Framed with Intention', hero: 'Photography That Feels Clear, Human and Distinct', about: 'creates thoughtful visual work through careful direction, strong composition and a refined editing process.', servicesTitle: 'Photography Services', cta: 'Have a Story to Capture?', ctaText: 'Tell us about the subject, location and style you have in mind.' },
        ar: { kicker: 'قصص مؤطرة بقصد', hero: 'تصوير واضح وإنساني ومميز', about: 'تقدم عملاً بصرياً مدروساً من خلال التوجيه الدقيق والتكوين القوي ومعالجة الصور الراقية.', servicesTitle: 'خدمات التصوير', cta: 'هل لديك قصة ترغب في تصويرها؟', ctaText: 'أخبرنا عن الموضوع والموقع والأسلوب الذي تفضله.' }
      },
      projectsEn: [['Brand', 'Campaign Photography'], ['Portrait', 'Personal Stories'], ['Events', 'Live Moments']],
      projectsAr: [['علامة', 'تصوير الحملات'], ['بورتريه', 'قصص شخصية'], ['فعاليات', 'لحظات حية']]
    },
    architecture: {
      icon: 'AR', en: 'Architecture Studio', ar: 'استوديو معماري', subtitleEn: 'Structured & refined', subtitleAr: 'منظم وراقٍ',
      industry: 'Architecture and Design Studio', style: 'Minimal', primary: '#2d302e', accent: '#c47748',
      business: 'Formline Architects', email: 'studio@formline.qa',
      servicesEn: 'Architecture, master planning, interior architecture and design supervision',
      servicesAr: 'التصميم المعماري، التخطيط العام، العمارة الداخلية والإشراف على التصميم',
      descriptionEn: 'An architecture studio shaping thoughtful spaces through context, proportion and practical design decisions.',
      descriptionAr: 'استوديو معماري يصمم مساحات مدروسة من خلال فهم السياق والتناسب والقرارات العملية.',
      fallback: {
        en: { kicker: 'Spaces Shaped by Purpose', hero: 'Architecture with Clarity, Context and Character', about: 'develops considered places through disciplined design, collaborative thinking and attention to how spaces are used.', servicesTitle: 'Design Practice', cta: 'Planning a New Space?', ctaText: 'Share the project type, location and design ambitions with our studio.' },
        ar: { kicker: 'مساحات يصنعها الهدف', hero: 'عمارة بوضوح وسياق وشخصية', about: 'تطور أماكن مدروسة من خلال التصميم المنضبط والتفكير التعاوني والاهتمام بكيفية استخدام المساحات.', servicesTitle: 'ممارسات التصميم', cta: 'هل تخطط لمساحة جديدة؟', ctaText: 'شارك نوع المشروع والموقع والطموحات التصميمية مع الاستوديو.' }
      },
      projectsEn: [['Residential', 'Courtyard House'], ['Cultural', 'Community Space'], ['Commercial', 'Workplace Design']],
      projectsAr: [['سكني', 'منزل بفناء'], ['ثقافي', 'مساحة مجتمعية'], ['تجاري', 'تصميم مكان عمل']]
    },
    logistics: {
      icon: 'LG', en: 'Logistics & Freight', ar: 'لوجستيات وشحن', subtitleEn: 'Fast & dependable', subtitleAr: 'سريع وموثوق',
      industry: 'Logistics and Freight Company', style: 'Industrial', primary: '#102a43', accent: '#f28c28',
      business: 'Axis Logistics', email: 'operations@axislogistics.qa',
      servicesEn: 'Freight forwarding, warehousing, distribution and customs support',
      servicesAr: 'الشحن، التخزين، التوزيع ودعم التخليص الجمركي',
      descriptionEn: 'A logistics provider coordinating reliable movement, storage and delivery for businesses across Qatar.',
      descriptionAr: 'مزود خدمات لوجستية ينسق حركة وتخزين وتسليم البضائع بشكل موثوق للشركات في قطر.',
      fallback: {
        en: { kicker: 'Movement Managed with Precision', hero: 'Reliable Logistics from Origin to Destination', about: 'supports supply chains through coordinated transport, organised storage and clear operational communication.', servicesTitle: 'Logistics Services', cta: 'Need a Reliable Logistics Partner?', ctaText: 'Share the shipment type, route and required timeline with our operations team.' },
        ar: { kicker: 'حركة تُدار بدقة', hero: 'خدمات لوجستية موثوقة من المصدر إلى الوجهة', about: 'تدعم سلاسل الإمداد من خلال النقل المنسق والتخزين المنظم والتواصل التشغيلي الواضح.', servicesTitle: 'الخدمات اللوجستية', cta: 'هل تحتاج إلى شريك لوجستي موثوق؟', ctaText: 'شارك نوع الشحنة والمسار والجدول المطلوب مع فريق العمليات.' }
      },
      projectsEn: [['Freight', 'Regional Transport'], ['Storage', 'Warehouse Solutions'], ['Delivery', 'Last-Mile Support']],
      projectsAr: [['شحن', 'نقل إقليمي'], ['تخزين', 'حلول المستودعات'], ['توصيل', 'دعم الميل الأخير']]
    },
    petcare: {
      icon: 'PT', en: 'Pet Care & Veterinary', ar: 'رعاية وحيوانات أليفة', subtitleEn: 'Friendly & caring', subtitleAr: 'ودود ومهتم',
      industry: 'Pet Care and Veterinary Clinic', style: 'Modern', primary: '#276b67', accent: '#ff8b73',
      business: 'Paw & Care', email: 'hello@pawandcare.qa',
      servicesEn: 'Veterinary consultations, grooming, boarding and pet supplies',
      servicesAr: 'الاستشارات البيطرية، العناية والتنظيف، الإقامة ومستلزمات الحيوانات',
      descriptionEn: 'A friendly pet care centre supporting healthier, happier pets through professional and compassionate service.',
      descriptionAr: 'مركز رعاية ودود يدعم صحة وسعادة الحيوانات الأليفة من خلال خدمة مهنية ورحيمة.',
      fallback: {
        en: { kicker: 'Care for Every Paw and Personality', hero: 'Professional Pet Care with a Gentle Approach', about: 'helps pet owners feel confident through attentive care, clear guidance and services designed around animal wellbeing.', servicesTitle: 'Pet Care Services', cta: 'How Can We Help Your Pet?', ctaText: 'Tell us about your pet and the care or appointment you need.' },
        ar: { kicker: 'عناية لكل حيوان وشخصية', hero: 'رعاية مهنية للحيوانات بأسلوب لطيف', about: 'تساعد أصحاب الحيوانات على الشعور بالثقة من خلال العناية الدقيقة والإرشاد الواضح والخدمات المصممة لصحة الحيوان.', servicesTitle: 'خدمات رعاية الحيوانات', cta: 'كيف يمكننا مساعدة حيوانك؟', ctaText: 'أخبرنا عن حيوانك والرعاية أو الموعد المطلوب.' }
      },
      projectsEn: [['Health', 'Veterinary Care'], ['Grooming', 'Fresh & Comfortable'], ['Stay', 'Boarding Support']],
      projectsAr: [['صحة', 'رعاية بيطرية'], ['عناية', 'نظافة وراحة'], ['إقامة', 'دعم الإيواء']]
    }
  };

  var form = document.getElementById('demo-generator-form');
  if (!form) return;

  var preview = document.getElementById('website-preview');
  var stage = document.getElementById('demo-device-stage');
  var generateButton = document.getElementById('generate-demo-btn');
  var regenerateButton = document.getElementById('regenerate-btn');
  var requestButton = document.getElementById('request-website-btn');
  var statusBox = document.getElementById('demo-status');
  var primaryColor = document.getElementById('primary-color');
  var accentColor = document.getElementById('accent-color');
  var languageSelect = document.getElementById('language');
  var templateGrid = document.getElementById('demo-template-grid');

  function currentInterfaceLanguage() {
    return (window.AvelorI18n && window.AvelorI18n.currentLang()) || localStorage.getItem('avelor-lang') || 'en';
  }

  function renderTemplateCards(lang) {
    templateGrid.textContent = '';
    Object.keys(templates).forEach(function (key) {
      var template = templates[key];
      var label = document.createElement('label');
      label.className = 'demo-template-card demo-template-card--' + key + (key === selectedTemplate ? ' is-selected' : '');
      label.setAttribute('data-template', key);

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'template';
      input.value = key;
      input.checked = key === selectedTemplate;
      input.setAttribute('aria-label', lang === 'ar' ? template.ar : template.en);

      var visual = document.createElement('span');
      visual.className = 'demo-template-visual';
      visual.setAttribute('aria-hidden', 'true');
      ['nav', 'title', 'line', 'card-one', 'card-two'].forEach(function (part) {
        var element = document.createElement('i');
        element.className = 'demo-mini-' + part;
        visual.appendChild(element);
      });

      var copy = document.createElement('span');
      copy.className = 'demo-template-copy';
      var strong = document.createElement('strong');
      strong.textContent = lang === 'ar' ? template.ar : template.en;
      var small = document.createElement('small');
      small.textContent = lang === 'ar' ? template.subtitleAr : template.subtitleEn;
      copy.append(strong, small);

      var selected = document.createElement('span');
      selected.className = 'demo-template-selected';
      selected.setAttribute('aria-hidden', 'true');
      selected.textContent = '✓';

      label.append(input, visual, copy, selected);
      templateGrid.appendChild(label);
    });
  }

  function applyDemoLanguage(lang) {
    var dictionary = uiText[lang] || uiText.en;
    document.querySelectorAll('[data-demo-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-demo-i18n');
      if (dictionary[key]) element.textContent = dictionary[key];
    });
    document.querySelectorAll('.lang-toggle .lang-option').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-lang') === lang);
    });
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    renderTemplateCards(lang);
  }

  function applyPreviewLanguage(lang) {
    var isArabic = lang === 'Arabic' || lang === 'ar';
    var dictionary = isArabic ? previewText.ar : previewText.en;
    preview.classList.toggle('is-arabic', isArabic);
    preview.setAttribute('lang', isArabic ? 'ar' : 'en');
    preview.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-preview-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-preview-i18n');
      if (dictionary[key]) element.textContent = dictionary[key];
    });
  }

  function setStatus(message, type) {
    statusBox.textContent = message || '';
    statusBox.className = 'demo-status';
    if (message) {
      statusBox.classList.add('is-visible');
      if (type) statusBox.classList.add('is-' + type);
    }
  }

  function setLoading(isLoading) {
    var lang = currentInterfaceLanguage();
    generateButton.disabled = isLoading;
    generateButton.classList.toggle('is-loading', isLoading);
    generateButton.querySelector('.demo-btn-label').textContent = isLoading ? uiText[lang].generating : uiText[lang].generate;
  }

  function updateColours() {
    var primary = primaryColor.value;
    var accent = accentColor.value;
    preview.style.setProperty('--demo-primary', primary);
    preview.style.setProperty('--demo-accent', accent);
    document.getElementById('primary-color-value').textContent = primary.toUpperCase();
    document.getElementById('accent-color-value').textContent = accent.toUpperCase();
  }

  function cleanText(value, fallback) {
    if (typeof value !== 'string') return fallback || '';
    var result = value.replace(/<[^>]*>/g, '').trim();
    return result || fallback || '';
  }

  function initials(name) {
    var words = name.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return 'CO';
    return words.slice(0, 2).map(function (word) { return word.charAt(0); }).join('').toUpperCase();
  }

  function websiteAddress(name, templateKey) {
    var slug = String(name || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 22);
    if (!slug) slug = String(templateKey || 'yourcompany').replace(/[^a-z0-9]+/gi, '').toLowerCase();
    return (slug || 'yourcompany') + '.qa';
  }


  function titleCase(value) {
    return value.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  }

  function splitServices(value, template, arabic) {
    var items = value.split(/[,\n;،]+/).map(function (item) { return item.trim(); }).filter(Boolean);
    var defaults = (arabic ? template.servicesAr : template.servicesEn).split(/[,،]+/).map(function (item) { return item.trim(); });
    defaults.forEach(function (item) { if (items.length < 3) items.push(item); });
    while (items.length < 3) items.push(arabic ? 'خدمة احترافية' : 'Professional Service');
    return items.slice(0, 3);
  }

  function createLocalConcept(data) {
    var template = templates[data.template] || templates.construction;
    var arabic = data.language === 'Arabic';
    var fallback = arabic ? template.fallback.ar : template.fallback.en;
    var services = splitServices(data.services, template, arabic);
    var serviceDescriptionsEn = ['A clear and professional solution tailored to your requirements.', 'Practical support delivered with attention to detail.', 'A reliable service designed around customer needs.'];
    var serviceDescriptionsAr = ['حل احترافي وواضح مصمم وفق متطلباتك.', 'دعم عملي يقدم باهتمام بالتفاصيل.', 'خدمة موثوقة مصممة حول احتياجات العملاء.'];
    return {
      businessName: data.businessName,
      kicker: fallback.kicker,
      heroTitle: fallback.hero,
      heroDescription: data.description || (arabic ? template.descriptionAr : template.descriptionEn),
      aboutTitle: (arabic ? 'عن ' : 'About ') + data.businessName,
      aboutText: data.businessName + ' ' + fallback.about,
      servicesTitle: fallback.servicesTitle,
      services: services.map(function (service, index) {
        return { title: arabic ? service : titleCase(service), description: (arabic ? serviceDescriptionsAr : serviceDescriptionsEn)[index] };
      }),
      whyChooseTitle: arabic ? 'لماذا تختارنا' : 'Why Choose Us',
      whyChooseItems: arabic ? ['خدمة احترافية', 'تواصل واضح', 'حلول عملية'] : ['Professional service', 'Clear communication', 'Practical solutions'],
      projectsTitle: arabic ? 'أبرز الخدمات' : 'Featured Highlights',
      projectItems: (arabic ? template.projectsAr : template.projectsEn).map(function (item) { return { category: item[0], title: item[1] }; }),
      ctaTitle: fallback.cta,
      ctaText: fallback.ctaText
    };
  }

  function normalizeApiConcept(payload, data) {
    var source = payload && (payload.demo || payload.content || payload.website || payload.data || payload);
    if (source && typeof source.reply === 'string') {
      try { source = JSON.parse(source.reply); } catch (ignore) {}
    }
    if (!source || typeof source !== 'object') return null;

    var local = createLocalConcept(data);
    var serviceSource = Array.isArray(source.services) ? source.services : local.services;
    var projectSource = Array.isArray(source.projectItems) ? source.projectItems : local.projectItems;
    var whySource = Array.isArray(source.whyChooseItems) ? source.whyChooseItems : local.whyChooseItems;

    return {
      businessName: cleanText(source.businessName, local.businessName),
      kicker: cleanText(source.kicker || source.heroKicker, local.kicker),
      heroTitle: cleanText(source.heroTitle, local.heroTitle),
      heroDescription: cleanText(source.heroDescription, local.heroDescription),
      aboutTitle: cleanText(source.aboutTitle, local.aboutTitle),
      aboutText: cleanText(source.aboutText, local.aboutText),
      servicesTitle: cleanText(source.servicesTitle, local.servicesTitle),
      services: serviceSource.slice(0, 3).map(function (item, index) {
        if (typeof item === 'string') return { title: cleanText(item), description: local.services[index].description };
        return { title: cleanText(item && item.title, local.services[index].title), description: cleanText(item && item.description, local.services[index].description) };
      }),
      whyChooseTitle: cleanText(source.whyChooseTitle, local.whyChooseTitle),
      whyChooseItems: whySource.slice(0, 3).map(function (item, index) { return cleanText(item, local.whyChooseItems[index]); }),
      projectsTitle: cleanText(source.projectsTitle, local.projectsTitle),
      projectItems: projectSource.slice(0, 3).map(function (item, index) {
        if (typeof item === 'string') return { category: local.projectItems[index].category, title: cleanText(item, local.projectItems[index].title) };
        return { category: cleanText(item && item.category, local.projectItems[index].category), title: cleanText(item && item.title, local.projectItems[index].title) };
      }),
      ctaTitle: cleanText(source.ctaTitle, local.ctaTitle),
      ctaText: cleanText(source.ctaText, local.ctaText)
    };
  }

  function applyTemplateVisual(templateKey) {
    preview.classList.add('is-switching');
    Object.keys(templates).forEach(function (key) { preview.classList.remove('template-' + key); });
    preview.classList.add('template-' + templateKey);
    window.setTimeout(function () { preview.classList.remove('is-switching'); }, 120);
  }

  function applyConcept(concept, data) {
    document.getElementById('preview-business-name').textContent = concept.businessName;
    document.getElementById('preview-footer-business').textContent = concept.businessName;
    document.getElementById('preview-brand-mark').textContent = initials(concept.businessName);
    document.getElementById('preview-kicker').textContent = concept.kicker;
    document.getElementById('preview-hero-title').textContent = concept.heroTitle;
    document.getElementById('preview-hero-description').textContent = concept.heroDescription;
    document.getElementById('preview-about-title').textContent = concept.aboutTitle;
    document.getElementById('preview-about-text').textContent = concept.aboutText;
    document.getElementById('preview-services-title').textContent = concept.servicesTitle;
    document.getElementById('preview-cta-title').textContent = concept.ctaTitle;
    document.getElementById('preview-cta-text').textContent = concept.ctaText;
    document.getElementById('preview-footer-location').textContent = data.location || 'Doha, Qatar';
    document.getElementById('preview-footer-contact').textContent = [data.phone, data.email].filter(Boolean).join(' · ');
    var addressBar = document.querySelector('.demo-browser-address');
    if (addressBar) addressBar.textContent = websiteAddress(concept.businessName, data.template);

    var valueItems = document.querySelectorAll('#preview-values > div');
    concept.whyChooseItems.slice(0, 3).forEach(function (item, index) {
      if (valueItems[index]) {
        valueItems[index].querySelector('strong').textContent = item;
        valueItems[index].querySelector('span').textContent = data.language === 'Arabic' ? 'ميزة عملية تدعم تجربة العميل.' : 'A practical benefit supporting the customer experience.';
      }
    });

    var projectHeading = document.querySelector('.construction-projects .construction-section-heading h3');
    if (projectHeading) projectHeading.textContent = concept.projectsTitle;
    var projectCards = document.querySelectorAll('.construction-project-grid .construction-project');
    concept.projectItems.slice(0, 3).forEach(function (item, index) {
      if (projectCards[index]) {
        projectCards[index].querySelector('span').textContent = item.category;
        projectCards[index].querySelector('strong').textContent = item.title;
      }
    });

    var serviceGrid = document.getElementById('preview-service-grid');
    serviceGrid.textContent = '';
    concept.services.slice(0, 3).forEach(function (service, index) {
      var article = document.createElement('article');
      var number = document.createElement('span');
      var title = document.createElement('h4');
      var description = document.createElement('p');
      number.textContent = String(index + 1).padStart(2, '0');
      title.textContent = service.title;
      description.textContent = service.description;
      article.append(number, title, description);
      serviceGrid.appendChild(article);
    });

    applyTemplateVisual(data.template);
    applyPreviewLanguage(data.language);
    updateColours();
    updateWhatsAppLink(data, concept);
  }

  function updateWhatsAppLink(data, concept) {
    var arabic = data.language === 'Arabic';
    var message = arabic ? [
      'مرحباً AVELOR،', '', 'أنشأت تصوراً لموقع شركتي وأرغب في مناقشة تنفيذ هذا الموقع.', '',
      'اسم الشركة: ' + data.businessName, 'القطاع: ' + data.industry, 'القالب: ' + (templates[data.template] ? templates[data.template].ar : data.template),
      'الأسلوب: ' + data.style, 'الألوان: ' + data.primaryColor + ' / ' + data.accentColor, 'الخدمات: ' + data.services, 'عنوان التصور: ' + concept.heroTitle
    ].join('\n') : [
      'Hello AVELOR,', '', 'I created an AI website concept and would like to discuss building this website.', '',
      'Business name: ' + data.businessName, 'Industry: ' + data.industry, 'Template: ' + (templates[data.template] ? templates[data.template].en : data.template),
      'Style: ' + data.style, 'Colours: ' + data.primaryColor + ' / ' + data.accentColor, 'Services: ' + data.services, 'Concept headline: ' + concept.heroTitle
    ].join('\n');
    requestButton.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function getFormData() {
    var data = Object.fromEntries(new FormData(form).entries());
    var template = templates[selectedTemplate] || templates.construction;
    data.template = selectedTemplate;
    data.industry = template.industry;
    data.primaryColor = primaryColor.value;
    data.accentColor = accentColor.value;
    data.colors = data.primaryColor + ' and ' + data.accentColor;
    return data;
  }

  function validate(data) {
    var valid = true;
    var nameInput = document.getElementById('business-name');
    var servicesInput = document.getElementById('services');
    var interfaceLang = currentInterfaceLanguage();
    document.querySelectorAll('.demo-field-error').forEach(function (item) { item.textContent = ''; });
    [nameInput, servicesInput].forEach(function (item) { item.removeAttribute('aria-invalid'); });
    if (!data.businessName.trim()) {
      document.querySelector('[data-error-for="businessName"]').textContent = uiText[interfaceLang].requiredName;
      nameInput.setAttribute('aria-invalid', 'true'); valid = false;
    }
    if (!data.services.trim()) {
      document.querySelector('[data-error-for="services"]').textContent = uiText[interfaceLang].requiredServices;
      servicesInput.setAttribute('aria-invalid', 'true'); valid = false;
    }
    return valid;
  }

  async function requestAiConcept(data) {
    if (requestController) requestController.abort();
    requestController = new AbortController();
    var timeout = setTimeout(function () { requestController.abort(); }, 35000);
    try {
      var response = await fetch(WORKER_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: requestController.signal
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var payload = await response.json();
      if (payload.success === false) throw new Error(payload.error || 'Generation failed');
      var concept = normalizeApiConcept(payload, data);
      if (!concept) throw new Error('Invalid concept response');
      return concept;
    } finally { clearTimeout(timeout); }
  }

  async function generateConcept() {
    var data = getFormData();
    var interfaceLang = currentInterfaceLanguage();
    if (!validate(data)) return;
    setLoading(true);
    setStatus(uiText[interfaceLang].generating, 'warning');
    try {
      var concept = await requestAiConcept(data);
      applyConcept(concept, data);
      setStatus(uiText[interfaceLang].success, 'success');
    } catch (error) {
      applyConcept(createLocalConcept(data), data);
      var unavailable = error && (/404|405|Failed to fetch|abort|network/i.test(String(error.message || error)));
      setStatus(unavailable ? uiText[interfaceLang].fallback : uiText[interfaceLang].error, 'warning');
      console.warn('AVELOR demo generator fallback:', error);
    } finally { setLoading(false); }
  }

  function applyTemplateDefaults(templateKey) {
    var template = templates[templateKey] || templates.construction;
    var arabic = languageSelect.value === 'Arabic';
    selectedTemplate = templateKey;
    document.getElementById('industry').value = template.industry;
    document.getElementById('business-name').value = template.business;
    document.getElementById('services').value = arabic ? template.servicesAr : template.servicesEn;
    document.getElementById('description').value = arabic ? template.descriptionAr : template.descriptionEn;
    document.getElementById('style').value = template.style;
    document.getElementById('location').value = 'Doha, Qatar';
    document.getElementById('phone').value = '+974 5555 5555';
    document.getElementById('email').value = template.email;
    primaryColor.value = template.primary;
    accentColor.value = template.accent;
    renderTemplateCards(currentInterfaceLanguage());
    var data = getFormData();
    applyConcept(createLocalConcept(data), data);
    setStatus('', '');
  }

  form.addEventListener('submit', function (event) { event.preventDefault(); generateConcept(); });
  regenerateButton.addEventListener('click', generateConcept);

  templateGrid.addEventListener('change', function (event) {
    if (event.target && event.target.name === 'template') applyTemplateDefaults(event.target.value);
  });

  languageSelect.addEventListener('change', function () { applyTemplateDefaults(selectedTemplate); });

  document.querySelectorAll('[data-preview-size]').forEach(function (button) {
    button.addEventListener('click', function () {
      var mobile = button.getAttribute('data-preview-size') === 'mobile';
      stage.classList.toggle('is-mobile', mobile);
      document.querySelectorAll('[data-preview-size]').forEach(function (item) {
        var active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });

  [primaryColor, accentColor].forEach(function (input) { input.addEventListener('input', updateColours); });

  document.querySelectorAll('.lang-toggle .lang-option').forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.getAttribute('data-lang') || 'en';
      localStorage.setItem('avelor-lang', lang);
      window.setTimeout(function () { applyDemoLanguage(lang); }, 0);
    });
  });

  applyDemoLanguage(currentInterfaceLanguage());
  applyTemplateDefaults(selectedTemplate);
  updateColours();
})();
