import { HeroSlide } from '../types.ts';

export const fallbackHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    order: 1,
    visible: true,
    badge: {
      en: 'MEGA-SCALE INFRASTRUCTURE',
      ar: 'مشاريع البنية التحتية العملاقة',
      hi: 'मेगा-स्तरीय बुनियादी ढांचा',
    },
    title: {
      en: 'Engineering Resilient Infrastructure for Future Generations',
      ar: 'هندسة بنية تحتية مرنة ومستدامة للأجيال القادمة',
      hi: 'भावी पीढ़ियों के लिए लचीले बुनियादी ढांचे का निर्माण',
    },
    subtitle: {
      en: 'Precision Civil Engineering & Heavy Industrial Construction',
      ar: 'الهندسة المدنية الدقيقة والإنشاءات الصناعية الثقيلة',
      hi: 'सटीक सिविल इंजीनियरिंग और भारी औद्योगिक निर्माण',
    },
    description: {
      en: 'From multi-span bridge viaducts and high-speed rail corridors to automated industrial complexes across the Middle East and South Asia.',
      ar: 'من جسور الجسور متعددة الفتحات وممرات السكك الحديدية فائقة السرعة إلى المجمعات الصناعية المتطورة في الشرق الأوسط وجنوب آسيا.',
      hi: 'मध्य पूर्व और दक्षिण एशिया में मल्टी-स्पैन ब्रिज वायाडक्ट्स और हाई-स्पीड रेल कॉरिडोर से लेकर अत्याधुनिक औद्योगिक परिसरों तक।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=2070&auto=format&fit=crop',
    primaryCtaText: {
      en: 'Explore Mega Projects',
      ar: 'استكشف المشاريع الكبرى',
      hi: 'मेगा परियोजनाएं देखें',
    },
    primaryCtaLink: '/projects',
    secondaryCtaText: {
      en: 'Request a Quotation',
      ar: 'طلب تسعير المشروع',
      hi: 'कोटेशन का अनुरोध करें',
    },
    secondaryCtaLink: '/quotation',
  },
  {
    id: 'slide-2',
    order: 2,
    visible: true,
    badge: {
      en: 'HEAVY INDUSTRIAL EPC',
      ar: 'المشاريع الصناعية المتكاملة (EPC)',
      hi: 'भारी औद्योगिक ईपीसी',
    },
    title: {
      en: 'Delivering Complex Civil Works with Uncompromising Safety',
      ar: 'تنفيذ الأعمال المدنية المعقدة بأعلى معايير السلامة والجودة',
      hi: 'अटल सुरक्षा और गुणवत्ता के साथ जटिल सिविल कार्यों का निष्पादन',
    },
    subtitle: {
      en: 'Over 42 Million Man-Hours Without Lost Time Injury',
      ar: 'أكثر من 42 مليون ساعة عمل دون أي إصابة مهدرة للوقت',
      hi: 'बिना किसी रुकावट के 42 मिलियन से अधिक सुरक्षित कार्य-घंटे',
    },
    description: {
      en: 'Specialized deep foundations, marine berths, and heavy structural engineering executed with an owned fleet of 1,850+ specialized equipment units.',
      ar: 'أساسات عميقة متخصصة، وأرصفة بحرية، وهندسة إنشائية ثقيلة تُنفذ بأسطول مملوك يضم أكثر من 1,850 وحدة معدات تخصصية.',
      hi: '1,850 से अधिक भारी उपकरणों के हमारे स्वामित्व वाले बेड़े के साथ विशिष्ट गहरे फाउंडेशन, समुद्री बर्थ और जटिल संरचनात्मक इंजीनियरिंग।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    primaryCtaText: {
      en: 'Our Capabilities',
      ar: 'قدراتنا وخبراتنا',
      hi: 'हमारी क्षमताएं',
    },
    primaryCtaLink: '/services',
    secondaryCtaText: {
      en: 'Download Corporate Profile',
      ar: 'تحميل ملف الشركة التعريفي',
      hi: 'कॉर्पोरेट प्रोफ़ाइल डाउनलोड करें',
    },
    secondaryCtaLink: '/brochures',
  },
  {
    id: 'slide-3',
    order: 3,
    visible: true,
    badge: {
      en: 'SUSTAINABLE CIVIL ENGINEERING',
      ar: 'الهندسة المدنية المستدامة والمتقدمة',
      hi: 'सतत एवं उन्नत सिविल इंजीनियरिंग',
    },
    title: {
      en: 'Decarbonized Precast Concrete & Geo-Structural Mastery',
      ar: 'خرسانة مسبقة الصنع منخفضة الكربون والريادة الجيوتقنية',
      hi: 'डीकार्बोनाइज्ड प्रीकास्ट कंक्रीट और भू-संरचनात्मक महारत',
    },
    subtitle: {
      en: 'ISO 14001 Certified Low-Carbon Mixes & High-Durability Designs',
      ar: 'خلطات معتمدة وفق ISO 14001 وتصميمات إنشائية فائقة المتانة',
      hi: 'आईएसओ 14001 प्रमाणित कम-कार्बन कंक्रीट मिश्रण और टिकाऊ डिज़ाइन',
    },
    description: {
      en: 'Proprietary 300,000 m² precast casting yards in Jubail providing rapid-span installation for the Kingdom’s most demanding transport corridors.',
      ar: 'مصانع مسبقة الصنع بمساحة 300,000 م² في الجبيل توفر تركيباً فائق السرعة لأهم ممرات النقل الاستراتيجية.',
      hi: 'जुबैल में हमारे स्वामित्व वाले 300,000 वर्ग मीटर के प्रीकास्ट यार्ड देश के सबसे महत्वपूर्ण परिवहन गलियारों के लिए तीव्र स्थापना प्रदान करते हैं।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop',
    primaryCtaText: {
      en: 'Explore Mega Projects',
      ar: 'استكشف المشاريع الكبرى',
      hi: 'मेगा परियोजनाएं देखें',
    },
    primaryCtaLink: '/projects',
    secondaryCtaText: {
      en: 'Request a Quotation',
      ar: 'طلب تسعير المشروع',
      hi: 'कोटेशन का अनुरोध करें',
    },
    secondaryCtaLink: '/quotation',
  },
];
