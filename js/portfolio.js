(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('project-modal');
  if (!cards.length) return;

  const PROJECTS = {"smart-home":{"category":{"en":"3D Visualization","ar":"التصور ثلاثي الأبعاد"},"title":{"en":"Smart Home — Exterior Visualization","ar":"منزل ذكي — تصور خارجي"},"summary":{"en":"A clean residential exterior concept exploring modern massing, lighting and material balance.","ar":"تصور خارجي سكني يدرس الكتل المعمارية الحديثة والإضاءة وتوازن الخامات."},"overview":{"en":"The concept focuses on presenting a contemporary home with a polished, presentation-ready visual language. The composition emphasises facade geometry, landscape context and realistic material response.","ar":"يركز التصور على تقديم منزل معاصر بأسلوب بصري جاهز للعرض، مع إبراز هندسة الواجهة والسياق الخارجي واستجابة الخامات بشكل واقعي."},"deliverables":{"en":["Exterior hero render","Material and lighting direction","Presentation-ready image treatment"],"ar":["تصور خارجي رئيسي","اتجاه الخامات والإضاءة","معالجة صورة جاهزة للعرض"]},"tags":{"en":["Residential","Exterior","Rendering"],"ar":["سكني","خارجي","رندر"]},"images":["images/portfolio/smart_house.jpg"]},"single-story-house":{"category":{"en":"3D Visualization","ar":"التصور ثلاثي الأبعاد"},"title":{"en":"Single Story House — Exterior Render","ar":"منزل بطابق واحد — تصور خارجي"},"summary":{"en":"Residential exterior study focused on scale, facade clarity and a realistic daytime presentation.","ar":"دراسة خارجية سكنية تركز على المقياس ووضوح الواجهة والعرض الواقعي النهاري."},"overview":{"en":"This concept demonstrates how AVELOR can translate architectural information into a clear exterior visualization suitable for design review and presentations.","ar":"يوضح هذا التصور كيفية تحويل المعلومات المعمارية إلى تصور خارجي واضح مناسب للمراجعة والعروض التقديمية."},"deliverables":{"en":["Exterior render","Facade material study","Presentation composition"],"ar":["تصور خارجي","دراسة خامات الواجهة","تكوين بصري للعرض"]},"tags":{"en":["Architecture","Residential","Exterior"],"ar":["عمارة","سكني","خارجي"]},"images":["images/portfolio/house.jpg"]},"masjid-drafting":{"category":{"en":"AutoCAD Drafting","ar":"رسومات الأوتوكاد"},"title":{"en":"Masjid — Technical Drawing Set","ar":"مسجد — مجموعة رسومات فنية"},"summary":{"en":"Technical drafting concept covering coordinated plans, elevations and section information.","ar":"تصور رسومات فنية يشمل المخططات والواجهات والقطاعات بشكل منظم."},"overview":{"en":"The drawing set demonstrates structured technical presentation and drawing coordination for an architectural concept. It is shown as capability work rather than a commissioned construction document set.","ar":"تعرض مجموعة الرسومات أسلوباً منظماً للتقديم الفني وتنسيق الرسومات لمفهوم معماري، وهي معروضة لإظهار القدرة وليست مستندات تنفيذية لمشروع مكلف."},"deliverables":{"en":["Floor plan drafting","Elevation drawings","Section drawing","Sheet composition"],"ar":["رسم المخططات","رسومات الواجهات","رسم القطاع","تنسيق اللوحات"]},"tags":{"en":["AutoCAD","Plans","Elevations"],"ar":["أوتوكاد","مخططات","واجهات"]},"images":["images/portfolio/autocad_drawing.jpg"]},"masjid-visualization":{"category":{"en":"3D Visualization","ar":"التصور ثلاثي الأبعاد"},"title":{"en":"Masjid — Architectural Visualization Series","ar":"مسجد — سلسلة تصورات معمارية"},"summary":{"en":"A multi-view visualization study covering the exterior, entrance and interior circulation spaces.","ar":"دراسة تصور متعددة المشاهد تشمل الواجهة الخارجية والمدخل والمساحات الداخلية."},"overview":{"en":"The series explores a consistent architectural presentation across exterior and interior views. It demonstrates lighting, material, perspective and scene-composition capability for a religious architecture concept.","ar":"تستكشف السلسلة أسلوب عرض معماري متناسق بين المشاهد الخارجية والداخلية، وتوضح قدرات الإضاءة والخامات والمنظور وتكوين المشهد."},"deliverables":{"en":["Full exterior render","Entrance detail view","Ground-floor interior view","First-floor interior view"],"ar":["تصور خارجي كامل","مشهد تفصيلي للمدخل","تصور داخلي للطابق الأرضي","تصور داخلي للطابق الأول"]},"tags":{"en":["Architecture","Exterior","Interior","Presentation"],"ar":["عمارة","خارجي","داخلي","عرض"]},"images":["images/portfolio/full_masjid.jpg","images/portfolio/masjid_fornt.jpg","images/portfolio/green_carpet.jpg","images/portfolio/blue_carpet.jpg"]},"cafe-interior":{"category":{"en":"3D Visualization","ar":"التصور ثلاثي الأبعاد"},"title":{"en":"Boutique Cafe — Interior Visualization Series","ar":"مقهى بوتيكي — سلسلة تصورات داخلية"},"summary":{"en":"A warm hospitality interior concept explored through product display, seating and evening lighting.","ar":"تصور داخلي دافئ للضيافة يستعرض عرض المنتجات والجلوس والإضاءة المسائية."},"overview":{"en":"This self-initiated study demonstrates how one interior direction can be presented through multiple useful views, including a display focal point, wider spatial composition and an alternate night-lighting mood.","ar":"توضح هذه الدراسة الذاتية كيفية تقديم اتجاه داخلي واحد من خلال عدة مشاهد مفيدة، تشمل نقطة عرض رئيسية وتكويناً أوسع للمساحة وأجواء إضاءة ليلية بديلة."},"deliverables":{"en":["Pastry-display visualization","Main interior render","Evening lighting variant","Material and mood direction"],"ar":["تصور منطقة عرض الحلويات","تصور داخلي رئيسي","نسخة بإضاءة مسائية","اتجاه الخامات والأجواء"]},"tags":{"en":["Hospitality","Interior","Cafe","Lighting"],"ar":["ضيافة","داخلي","مقهى","إضاءة"]},"images":["images/portfolio/cafe_3d_01.jpg","images/portfolio/cafe_3d_02.jpg","images/portfolio/cafe_3d_03.jpg"]},"lighting-catalogue":{"category":{"en":"Graphic Design","ar":"التصميم الجرافيكي"},"title":{"en":"Lighting Product Catalogue Concept","ar":"تصور كتالوج منتجات إضاءة"},"summary":{"en":"A structured editorial catalogue direction for technical product presentation.","ar":"اتجاه تحريري منظم لكتالوج يركز على العرض الفني للمنتجات."},"overview":{"en":"The concept balances product imagery, specifications and hierarchy so a catalogue can feel premium without sacrificing practical readability.","ar":"يوازن التصور بين صور المنتجات والمواصفات والتسلسل البصري ليبدو الكتالوج احترافياً دون التضحية بسهولة القراءة."},"deliverables":{"en":["Cover direction","Product-page layout","Specification hierarchy","Print-ready visual system concept"],"ar":["اتجاه الغلاف","تصميم صفحات المنتجات","تسلسل عرض المواصفات","تصور نظام بصري للطباعة"]},"tags":{"en":["Catalogue","Print","Product"],"ar":["كتالوج","طباعة","منتج"]},"images":["images/portfolio/catalogue.jpg"]},"lighting-campaign":{"category":{"en":"Graphic Design","ar":"التصميم الجرافيكي"},"title":{"en":"New Year Lighting Campaign Concept","ar":"تصور حملة رأس السنة لمنتجات الإضاءة"},"summary":{"en":"Seasonal promotional artwork built around a premium product-led composition.","ar":"تصميم ترويجي موسمي مبني حول تكوين يبرز المنتج بطابع مميز."},"overview":{"en":"The piece explores how campaign artwork can combine a seasonal message, product emphasis and premium visual treatment for digital or print use.","ar":"يستكشف التصميم كيفية الجمع بين رسالة موسمية وإبراز المنتج ومعالجة بصرية مميزة للاستخدام الرقمي أو المطبوع."},"deliverables":{"en":["Campaign poster","Product-focused composition","Seasonal visual direction"],"ar":["ملصق حملة","تكوين يركز على المنتج","اتجاه بصري موسمي"]},"tags":{"en":["Campaign","Poster","Product"],"ar":["حملة","ملصق","منتج"]},"images":["images/portfolio/poster.jpg"]},"lighting-product-site":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Lighting Products Website Concept","ar":"تصور موقع لمنتجات الإضاءة"},"summary":{"en":"Product-led web interface designed for browsing categories and discovering lighting ranges.","ar":"واجهة موقع تركز على المنتجات وتساعد على تصفح الفئات واكتشاف مجموعات الإضاءة."},"overview":{"en":"The concept demonstrates a clean catalogue-style web experience with product hierarchy, visual browsing and clear enquiry paths.","ar":"يوضح التصور تجربة موقع بأسلوب كتالوج نظيف مع تسلسل للمنتجات وتصفح بصري ومسارات واضحة للاستفسار."},"deliverables":{"en":["Homepage UI","Product hierarchy","Responsive layout direction","Enquiry CTA structure"],"ar":["واجهة الصفحة الرئيسية","تسلسل المنتجات","اتجاه تصميم متجاوب","هيكل دعوات التواصل"]},"tags":{"en":["Website","UI","Product Catalogue"],"ar":["موقع","واجهة مستخدم","كتالوج منتجات"]},"images":["images/portfolio/lordex_web.jpg"]},"lighting-company-site":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Premium Lighting Company Website","ar":"موقع شركة إضاءة احترافي"},"summary":{"en":"Corporate website direction balancing company story, product presentation and enquiries.","ar":"اتجاه لموقع شركة يوازن بين قصة الشركة وعرض المنتجات والاستفسارات."},"overview":{"en":"This website concept demonstrates a premium company-profile direction with a strong hero, structured product sections and a clear conversion path.","ar":"يوضح هذا التصور اتجاه موقع تعريفي احترافي مع واجهة رئيسية قوية وأقسام منتجات منظمة ومسار واضح للتحويل."},"deliverables":{"en":["Homepage concept","Company-profile structure","Product showcase","Responsive UI direction"],"ar":["تصور الصفحة الرئيسية","هيكل الملف التعريفي","عرض المنتجات","اتجاه واجهة متجاوبة"]},"tags":{"en":["Corporate","Website","Responsive"],"ar":["مؤسسي","موقع","متجاوب"]},"images":["images/portfolio/web_home.jpg"]},"property-landing":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Doha Property Landing Page","ar":"صفحة هبوط عقارية في الدوحة"},"summary":{"en":"A conversion-focused property page designed to move visitors from first impression to enquiry quickly.","ar":"صفحة عقارية تركز على نقل الزائر من الانطباع الأول إلى الاستفسار بسرعة ووضوح."},"overview":{"en":"The concept uses a premium property hero, concise project highlights, listing cards and clear enquiry calls to action. It is intended as a flexible direction for real estate launches in Qatar.","ar":"يستخدم التصور واجهة عقارية مميزة ونقاطاً مختصرة للمشروع وبطاقات للعقارات ودعوات واضحة للاستفسار، كاتجاه مرن لإطلاق المشاريع العقارية في قطر."},"deliverables":{"en":["Landing-page concept","Property cards","Enquiry flow","Responsive layout"],"ar":["تصور صفحة هبوط","بطاقات عقارات","مسار استفسار","تصميم متجاوب"]},"tags":{"en":["Real Estate","Landing Page","Qatar"],"ar":["عقارات","صفحة هبوط","قطر"]},"images":["images/portfolio/property-site.svg"]},"clinic-site":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Medical Clinic Website Concept","ar":"تصور موقع لعيادة طبية"},"summary":{"en":"A calm, accessible website direction for services, doctor information and appointment enquiries.","ar":"اتجاه موقع هادئ وسهل الاستخدام لعرض الخدمات ومعلومات الأطباء والاستفسار عن المواعيد."},"overview":{"en":"The concept prioritises clarity and trust with a soft visual system, simple service navigation and an appointment-focused panel. No medical claims or certifications are invented.","ar":"يركز التصور على الوضوح والثقة من خلال نظام بصري هادئ وتنقل بسيط للخدمات ولوحة تركز على المواعيد، دون اختلاق ادعاءات أو شهادات طبية."},"deliverables":{"en":["Homepage UI","Services section","Appointment CTA","Accessible colour direction"],"ar":["واجهة الصفحة الرئيسية","قسم الخدمات","دعوة لحجز موعد","اتجاه ألوان سهل الاستخدام"]},"tags":{"en":["Healthcare","Website","Accessibility"],"ar":["رعاية صحية","موقع","سهولة استخدام"]},"images":["images/portfolio/clinic-site.svg"]},"hotel-site":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Boutique Hotel Website Concept","ar":"تصور موقع لفندق بوتيكي"},"summary":{"en":"An editorial hospitality website direction built around atmosphere, rooms and booking intent.","ar":"اتجاه تحريري لموقع ضيافة يركز على الأجواء والغرف ونية الحجز."},"overview":{"en":"The design explores immersive imagery, refined typography and a clear booking path without inventing ratings, awards or property claims.","ar":"يستكشف التصميم الصور الغامرة والخطوط الراقية ومساراً واضحاً للحجز دون اختلاق تقييمات أو جوائز أو ادعاءات عن المنشأة."},"deliverables":{"en":["Hero experience","Rooms and amenities sections","Booking CTA","Responsive hospitality layout"],"ar":["تجربة واجهة رئيسية","أقسام الغرف والمرافق","دعوة للحجز","تصميم ضيافة متجاوب"]},"tags":{"en":["Hotel","Hospitality","Website"],"ar":["فندق","ضيافة","موقع"]},"images":["images/portfolio/hotel-site.svg"]},"construction-site":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"Construction Company Website","ar":"موقع شركة مقاولات"},"summary":{"en":"A bold corporate direction for presenting capabilities, sectors and project enquiries.","ar":"اتجاه مؤسسي قوي لعرض القدرات والقطاعات واستفسارات المشاريع."},"overview":{"en":"The concept uses industrial visual cues, structured capability sections and strong enquiry actions while avoiding invented project counts, certifications or client claims.","ar":"يستخدم التصور إشارات بصرية صناعية وأقساماً منظمة للقدرات ودعوات قوية للاستفسار مع تجنب اختلاق أعداد المشاريع أو الشهادات أو أسماء العملاء."},"deliverables":{"en":["Corporate homepage","Capabilities sections","Project showcase structure","Enquiry CTA"],"ar":["صفحة رئيسية مؤسسية","أقسام القدرات","هيكل عرض المشاريع","دعوة للاستفسار"]},"tags":{"en":["Construction","Corporate","Website"],"ar":["مقاولات","مؤسسي","موقع"]},"images":["images/portfolio/construction-site.svg"]},"premium-brand-system":{"category":{"en":"Branding","ar":"الهوية التجارية"},"title":{"en":"Premium Brand Identity System","ar":"نظام هوية تجارية مميز"},"summary":{"en":"A complete visual direction exploring logo construction, typography, colour and brand applications.","ar":"اتجاه بصري متكامل يستكشف بناء الشعار والخطوط والألوان وتطبيقات الهوية."},"overview":{"en":"This concept shows how a brand can be built as a consistent system rather than a logo alone, with coordinated visual rules that can extend across print and digital touchpoints.","ar":"يوضح هذا التصور كيف يمكن بناء العلامة كنظام متكامل وليس كشعار فقط، مع قواعد بصرية منسقة تمتد إلى التطبيقات المطبوعة والرقمية."},"deliverables":{"en":["Logo direction","Colour palette","Typography system","Brand application mockups"],"ar":["اتجاه الشعار","لوحة الألوان","نظام الخطوط","نماذج تطبيقات الهوية"]},"tags":{"en":["Branding","Identity","Logo"],"ar":["هوية","علامة تجارية","شعار"]},"images":["images/portfolio/brand-system.svg"]},"social-campaign":{"category":{"en":"Graphic Design","ar":"التصميم الجرافيكي"},"title":{"en":"Social Media Campaign Kit","ar":"حزمة حملة للتواصل الاجتماعي"},"summary":{"en":"A coordinated set of campaign visuals designed to feel consistent across multiple posts and formats.","ar":"مجموعة متناسقة من تصاميم الحملة لتبدو موحدة عبر عدة منشورات ومقاسات."},"overview":{"en":"The concept demonstrates campaign consistency through repeatable typography, image treatment and call-to-action patterns suitable for social media content.","ar":"يوضح التصور اتساق الحملة من خلال الخطوط المتكررة ومعالجة الصور وأنماط الدعوة للإجراء المناسبة لمحتوى التواصل الاجتماعي."},"deliverables":{"en":["Post templates","Campaign visual system","CTA treatments","Multi-format adaptation direction"],"ar":["قوالب منشورات","نظام بصري للحملة","معالجات الدعوة للإجراء","اتجاه للتكيف مع عدة مقاسات"]},"tags":{"en":["Social Media","Campaign","Digital"],"ar":["تواصل اجتماعي","حملة","رقمي"]},"images":["images/portfolio/social-campaign.svg"]},"corporate-profile":{"category":{"en":"Graphic Design","ar":"التصميم الجرافيكي"},"title":{"en":"Corporate Profile Brochure","ar":"بروشور الملف التعريفي للشركة"},"summary":{"en":"A clean editorial company-profile direction for presenting services and capabilities professionally.","ar":"اتجاه تحريري نظيف لملف شركة يعرض الخدمات والقدرات بشكل احترافي."},"overview":{"en":"The concept focuses on page hierarchy, readable content blocks and a consistent visual rhythm suitable for a company profile, capability statement or presentation document.","ar":"يركز التصور على تسلسل الصفحات ووضوح المحتوى والإيقاع البصري المتناسق المناسب للملف التعريفي أو عرض القدرات."},"deliverables":{"en":["Cover direction","Editorial page system","Services spread","Contact-page layout"],"ar":["اتجاه الغلاف","نظام صفحات تحريري","صفحات الخدمات","تصميم صفحة التواصل"]},"tags":{"en":["Brochure","Company Profile","Print"],"ar":["بروشور","ملف شركة","طباعة"]},"images":["images/portfolio/corporate-profile.svg"]},"ai-demo":{"category":{"en":"Web Design","ar":"تصميم المواقع"},"title":{"en":"AVELOR AI Demo Experience","ar":"تجربة AVELOR AI للموقع التجريبي"},"summary":{"en":"An interactive concept that helps visitors turn business information into a quick website direction.","ar":"تصور تفاعلي يساعد الزوار على تحويل معلومات النشاط التجاري إلى اتجاه سريع للموقع."},"overview":{"en":"The experience combines a guided input panel with a live preview area, template choices and AI-generated content. It is presented as an evolving AVELOR product concept rather than a completed client project.","ar":"تجمع التجربة بين لوحة إدخال موجهة ومنطقة معاينة مباشرة وخيارات القوالب ومحتوى يتم إنشاؤه بالذكاء الاصطناعي، وهي معروضة كتصور منتج يتطور لدى AVELOR وليست مشروع عميل مكتمل."},"deliverables":{"en":["Builder interface","Live preview concept","Template selection","AI content workflow"],"ar":["واجهة المنشئ","تصور المعاينة المباشرة","اختيار القوالب","مسار محتوى الذكاء الاصطناعي"]},"tags":{"en":["AI","Website Builder","Interactive"],"ar":["ذكاء اصطناعي","منشئ مواقع","تفاعلي"]},"images":["images/portfolio/ai-demo.svg"]},"restaurant-brand":{"category":{"en":"Branding","ar":"الهوية التجارية"},"title":{"en":"Restaurant Brand Identity Concept","ar":"تصور هوية تجارية لمطعم"},"summary":{"en":"A warm hospitality identity direction designed to feel memorable across menu, signage and social use.","ar":"اتجاه هوية ضيافة دافئ مصمم ليكون مميزاً عبر القائمة واللافتات ووسائل التواصل."},"overview":{"en":"The concept combines a simple wordmark, warm colour palette and flexible graphic elements to demonstrate how a restaurant identity can stay consistent across customer touchpoints.","ar":"يجمع التصور بين شعار كتابي بسيط ولوحة ألوان دافئة وعناصر رسومية مرنة ليوضح كيفية الحفاظ على اتساق هوية المطعم عبر نقاط التواصل مع العملاء."},"deliverables":{"en":["Logo direction","Colour palette","Menu application","Social-media application"],"ar":["اتجاه الشعار","لوحة الألوان","تطبيق القائمة","تطبيق التواصل الاجتماعي"]},"tags":{"en":["Restaurant","Branding","Hospitality"],"ar":["مطعم","هوية","ضيافة"]},"images":["images/portfolio/restaurant-brand.svg"]},"property-brand":{"category":{"en":"Branding","ar":"الهوية التجارية"},"title":{"en":"Luxury Property Brand Identity","ar":"هوية تجارية لعقار فاخر"},"summary":{"en":"A refined property identity concept inspired by architecture, geometry and premium presentation.","ar":"تصور هوية عقارية راقية مستوحاة من العمارة والهندسة والعرض المميز."},"overview":{"en":"The concept explores a restrained logo system, architectural geometry and a premium neutral palette suitable for a property development or real estate brand direction.","ar":"يستكشف التصور نظام شعار بسيطاً وهندسة مستوحاة من العمارة ولوحة ألوان راقية مناسبة لاتجاه علامة مشروع عقاري أو شركة عقارات."},"deliverables":{"en":["Logo mark direction","Typography and colour system","Stationery mockup","Property collateral direction"],"ar":["اتجاه رمز الشعار","نظام الخطوط والألوان","نموذج قرطاسية","اتجاه مواد عقارية"]},"tags":{"en":["Property","Branding","Luxury"],"ar":["عقار","هوية","فاخر"]},"images":["images/portfolio/property-brand.svg"]},"product-identification-system":{"category":{"en":"Web Application","ar":"تطبيق ويب"},"title":{"en":"Product Identification System & Admin Panel","ar":"نظام تعريف المنتجات ولوحة الإدارة"},"summary":{"en":"A searchable internal product identification system supported by a dedicated administration panel for large catalogue management.","ar":"نظام داخلي قابل للبحث لتعريف المنتجات ومدعوم بلوحة إدارة مخصصة لإدارة كتالوجات كبيرة."},"overview":{"en":"The system combines secure internal access, detailed product identification, advanced search and filtering, image-led catalogue browsing, pagination and stock visibility. A dedicated admin panel provides product management, quantity controls, departments, vendors, CSV import/export, delivery notes, purchase orders and picture uploads. The admin experience is designed to scale for catalogues containing 10,000+ items.","ar":"يجمع النظام بين الوصول الداخلي الآمن وتعريف المنتجات بالتفصيل والبحث والتصفية المتقدمة وتصفح الكتالوج بالصور وتقسيم الصفحات وعرض المخزون. وتوفر لوحة الإدارة المخصصة إدارة المنتجات والكميات والأقسام والموردين واستيراد وتصدير CSV ومذكرات التسليم وأوامر الشراء ورفع الصور. وقد صُممت تجربة الإدارة للتوسع مع كتالوجات تحتوي على أكثر من 10,000 منتج."},"deliverables":{"en":["Secure internal login interface","Product identification and image catalogue","Advanced search and multi-field filtering","Stock quantity and item-code visibility","Admin dashboard designed for 10,000+ items","Product, department and vendor management","CSV import and export tools","Delivery note and purchase order tools","Bulk product-picture upload workflow"],"ar":["واجهة دخول داخلية آمنة","تعريف المنتجات وكتالوج صور المنتجات","بحث متقدم وتصفية متعددة الحقول","عرض كميات المخزون وأكواد المنتجات","لوحة إدارة مصممة لأكثر من 10,000 منتج","إدارة المنتجات والأقسام والموردين","أدوات استيراد وتصدير CSV","أدوات مذكرات التسليم وأوامر الشراء","مسار رفع صور المنتجات بالجملة"]},"tags":{"en":["Product System","Admin Panel","10,000+ Items","Inventory","Internal Tool"],"ar":["نظام منتجات","لوحة إدارة","+10,000 منتج","مخزون","أداة داخلية"]},"images":["images/portfolio/product-system-login.webp","images/portfolio/product-system-catalogue.webp","images/portfolio/product-system-admin.webp"]}};

  let activeProjectId = null;
  let activeImageIndex = 0;
  let lastFocusedCard = null;

  function lang() {
    return (window.AvelorI18n && window.AvelorI18n.currentLang()) || document.documentElement.lang || 'en';
  }

  function t(obj) {
    const l = lang() === 'ar' ? 'ar' : 'en';
    return obj && (obj[l] || obj.en) || '';
  }

  function setFilterCounts() {
    buttons.forEach((btn) => {
      const filter = btn.getAttribute('data-filter');
      const count = Array.from(cards).filter((card) => filter === 'all' || card.getAttribute('data-category') === filter).length;
      const countEl = btn.querySelector('.filter-count');
      if (countEl) countEl.textContent = count;
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.hidden = !match;
        if (match) requestAnimationFrame(() => card.classList.add('is-visible'));
      });
    });
  });

  function renderGallery(project) {
    const main = document.getElementById('project-modal-image');
    const thumbs = document.getElementById('project-gallery-thumbs');
    const images = project.images || [];
    if (!images.length) return;
    activeImageIndex = Math.max(0, Math.min(activeImageIndex, images.length - 1));
    main.src = images[activeImageIndex];
    main.alt = t(project.title);
    thumbs.innerHTML = '';
    images.forEach((src, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'project-gallery-thumb' + (index === activeImageIndex ? ' is-active' : '');
      btn.setAttribute('aria-label', (lang() === 'ar' ? 'عرض الصورة ' : 'View image ') + (index + 1));
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      btn.appendChild(img);
      btn.addEventListener('click', () => { activeImageIndex = index; renderGallery(project); });
      thumbs.appendChild(btn);
    });
    const showNav = images.length > 1;
    document.querySelectorAll('.project-gallery-nav').forEach((el) => { el.hidden = !showNav; });
    thumbs.hidden = !showNav;
  }

  function renderModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project || !modal) return;
    const isAr = lang() === 'ar';
    document.getElementById('project-modal-badge').textContent = isAr ? 'مشروع تصوري' : 'Concept Project';
    document.getElementById('project-modal-category').textContent = t(project.category);
    document.getElementById('project-modal-title').textContent = t(project.title);
    document.getElementById('project-modal-summary').textContent = t(project.summary);
    document.getElementById('project-overview-heading').textContent = isAr ? 'نظرة عامة على المشروع' : 'Project Overview';
    document.getElementById('project-deliverables-heading').textContent = isAr ? 'المخرجات التصورية' : 'Concept Deliverables';
    document.getElementById('project-modal-overview').textContent = t(project.overview);
    const list = document.getElementById('project-modal-deliverables');
    list.innerHTML = '';
    (project.deliverables[isAr ? 'ar' : 'en'] || []).forEach((item) => {
      const li = document.createElement('li'); li.textContent = item; list.appendChild(li);
    });
    const tags = document.getElementById('project-modal-tags');
    tags.innerHTML = '';
    (project.tags[isAr ? 'ar' : 'en'] || []).forEach((tag) => {
      const span = document.createElement('span'); span.textContent = tag; tags.appendChild(span);
    });
    document.getElementById('project-contact-btn').textContent = isAr ? 'ابدأ مشروعاً مشابهاً' : 'Start a Similar Project';
    document.getElementById('project-whatsapp-btn').textContent = isAr ? 'ناقش المشروع عبر واتساب' : 'Discuss on WhatsApp';
    document.getElementById('project-concept-note').textContent = isAr
      ? 'هذا مشروع تصوري ذاتي من AVELOR تم إنشاؤه لعرض اتجاه التصميم والقدرات، ولا يتم تقديمه على أنه عمل منفذ بتكليف من عميل.'
      : 'This is a self-initiated AVELOR concept created to demonstrate design direction and capability. It is not presented as commissioned client work.';
    const message = isAr
      ? 'مرحباً AVELOR، أود مناقشة مشروع مشابه لـ ' + t(project.title) + '.'
      : 'Hello AVELOR, I would like to discuss a project similar to ' + t(project.title) + '.';
    document.getElementById('project-whatsapp-btn').href = 'https://wa.me/97433976563?text=' + encodeURIComponent(message);
    renderGallery(project);
  }

  function openProject(card) {
    if (!modal) return;
    activeProjectId = card.getAttribute('data-project');
    activeImageIndex = Number(card.getAttribute('data-start-image') || 0);
    lastFocusedCard = card;
    renderModal(activeProjectId);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('project-modal-open');
    const close = modal.querySelector('.project-modal-close');
    if (close) close.focus();
  }

  function closeProject() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('project-modal-open');
    activeProjectId = null;
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  cards.forEach((card) => {
    card.classList.add('is-visible');
    card.addEventListener('click', () => openProject(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(card); }
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-project-close]').forEach((el) => el.addEventListener('click', closeProject));
    modal.querySelector('.project-gallery-prev').addEventListener('click', () => {
      const p = PROJECTS[activeProjectId]; if (!p) return; activeImageIndex = (activeImageIndex - 1 + p.images.length) % p.images.length; renderGallery(p);
    });
    modal.querySelector('.project-gallery-next').addEventListener('click', () => {
      const p = PROJECTS[activeProjectId]; if (!p) return; activeImageIndex = (activeImageIndex + 1) % p.images.length; renderGallery(p);
    });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeProject();
      if (e.key === 'ArrowLeft') modal.querySelector('.project-gallery-prev').click();
      if (e.key === 'ArrowRight') modal.querySelector('.project-gallery-next').click();
    });
    document.querySelectorAll('.lang-option').forEach((opt) => {
      opt.addEventListener('click', () => setTimeout(() => { if (activeProjectId) renderModal(activeProjectId); }, 0));
    });
  }

  setFilterCounts();

  // Open a specific project when arriving from the homepage or a shared link.
  const initialProject = window.location.hash ? window.location.hash.slice(1) : '';
  if (initialProject && PROJECTS[initialProject]) {
    const matchingCard = Array.from(cards).find((card) => card.getAttribute('data-project') === initialProject);
    if (matchingCard) setTimeout(() => openProject(matchingCard), 120);
  }
})();
