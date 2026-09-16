import { Language } from '../types.ts';

export interface UiTranslations {
  // Navigation
  home: string;
  about: string;
  aboutUs: string;
  locations: string;
  leadership: string;
  services: string;
  projects: string;
  completedProjects: string;
  ongoingProjects: string;
  featuredProjects: string;
  clients: string;
  clientAppreciation: string;
  careers: string;
  brochures: string;
  contact: string;
  requestQuote: string;
  adminPortal: string;

  // Actions
  exploreProjects: string;
  viewDetails: string;
  viewDocument: string;
  downloadPdf: string;
  applyNow: string;
  submitRequest: string;
  sendMessage: string;
  filterAll: string;
  search: string;
  learnMore: string;
  backToProjects: string;
  backToServices: string;
  backToCareers: string;

  // Themes
  themeTechGreen: string;
  themeCyberBlue: string;
  themeCrimsonRed: string;
  themeStyleA?: string;
  themeStyleB?: string;

  // Common Labels
  client: string;
  location: string;
  timeline: string;
  value: string;
  status: string;
  category: string;
  scopeOfWork: string;
  keyHighlights: string;
  workingHours: string;
  contactPerson: string;
  department: string;
  experience: string;
  qualification: string;
  deadline: string;
  share: string;
  activeStatus: string;
  completedStatus: string;
  ongoingStatus: string;
  openVacancies: string;

  // Empty states
  noProjectsFound: string;
  noCareersFound: string;
  noBrochuresFound: string;
  noTestimonialsFound: string;

  // Footer & Corporate
  corporateHq: string;
  quickLinks: string;
  operatingHubs: string;
  certificationsAndLicensing: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfEngagement: string;
}

export const translations: Record<Language, UiTranslations> = {
  en: {
    home: 'Home',
    about: 'About',
    aboutUs: 'About Fenova',
    locations: 'Locations & Hubs',
    leadership: 'Leadership & Board',
    services: 'Services',
    projects: 'Projects',
    completedProjects: 'Completed Projects',
    ongoingProjects: 'Ongoing Projects',
    featuredProjects: 'Featured Projects',
    clients: 'Clients',
    clientAppreciation: 'Client Appreciation',
    careers: 'Careers',
    brochures: 'Brochures & Documents',
    contact: 'Contact',
    requestQuote: 'Request a Quote',
    adminPortal: 'Admin CMS',

    exploreProjects: 'Explore Our Projects',
    viewDetails: 'View Details',
    viewDocument: 'View Document',
    downloadPdf: 'Download Document',
    applyNow: 'Apply Now',
    submitRequest: 'Submit Quotation Request',
    sendMessage: 'Send Message',
    filterAll: 'All',
    search: 'Search...',
    learnMore: 'Learn More',
    backToProjects: 'Back to Projects',
    backToServices: 'Back to Services',
    backToCareers: 'Back to Careers',

    themeTechGreen: 'Theme: Tech Green',
    themeCyberBlue: 'Theme: Cyber Blue',
    themeCrimsonRed: 'Theme: Crimson Red',
    themeStyleA: 'Tech Green Theme',
    themeStyleB: 'Cyber Blue Theme',

    client: 'Client',
    location: 'Location',
    timeline: 'Timeline',
    value: 'Project Value',
    status: 'Status',
    category: 'Category',
    scopeOfWork: 'Scope of Work',
    keyHighlights: 'Key Technical Highlights',
    workingHours: 'Working Hours',
    contactPerson: 'Contact Person',
    department: 'Department',
    experience: 'Experience',
    qualification: 'Qualification',
    deadline: 'Deadline',
    share: 'Share',
    activeStatus: 'Active',
    completedStatus: 'Completed',
    ongoingStatus: 'Under Construction',
    openVacancies: 'Open Positions',

    noProjectsFound: 'No projects match your selected filter criteria.',
    noCareersFound: 'No current career opportunities are available. Please check again soon.',
    noBrochuresFound: 'No documents currently published in this category.',
    noTestimonialsFound: 'No client appreciation records available at this time.',

    corporateHq: 'Corporate Headquarters',
    quickLinks: 'Quick Links',
    operatingHubs: 'Strategic Operating Hubs',
    certificationsAndLicensing: 'Accreditations & Certifications',
    allRightsReserved: 'All Rights Reserved. Fenova Hi-Tech Civil Engineering Corporation.',
    privacyPolicy: 'Privacy & Data Governance',
    termsOfEngagement: 'Terms of Engagement',
  },
  ar: {
    home: 'الرئيسية',
    about: 'عن الشركة',
    aboutUs: 'عن فينوفا',
    locations: 'الفروع والمواقع',
    leadership: 'مجلس الإدارة والقيادة',
    services: 'خدماتنا',
    projects: 'مشاريعنا',
    completedProjects: 'المشاريع المنجزة',
    ongoingProjects: 'المشاريع قيد التنفيذ',
    featuredProjects: 'المشاريع المميزة',
    clients: 'عملاؤنا',
    clientAppreciation: 'شهادات التقدير والعملاء',
    careers: 'الوظائف والمهن',
    brochures: 'الكتيبات والوثائق',
    contact: 'اتصل بنا',
    requestQuote: 'طلب تسعير',
    adminPortal: 'بوابة الإدارة CMS',

    exploreProjects: 'استكشف مشاريعنا',
    viewDetails: 'عرض التفاصيل',
    viewDocument: 'معاينة الوثيقة',
    downloadPdf: 'تحميل الوثيقة',
    applyNow: 'قدّم الآن',
    submitRequest: 'إرسال طلب التسعير',
    sendMessage: 'إرسال الرسالة',
    filterAll: 'الكل',
    search: 'بحث...',
    learnMore: 'اعرف المزيد',
    backToProjects: 'العودة للمشاريع',
    backToServices: 'العودة للخدمات',
    backToCareers: 'العودة للوظائف',

    themeTechGreen: 'النمط الأخضر التقني',
    themeCyberBlue: 'النمط الأزرق السيبراني',
    themeCrimsonRed: 'النمط القرمزي التقني',
    themeStyleA: 'النمط الأخضر التقني',
    themeStyleB: 'النمط الأزرق السيبراني',

    client: 'العميل',
    location: 'الموقع',
    timeline: 'الجدول الزمني',
    value: 'قيمة المشروع',
    status: 'الحالة',
    category: 'التصنيف',
    scopeOfWork: 'نطاق العمل الهندسي',
    keyHighlights: 'أبرز الإنجازات الفنية',
    workingHours: 'ساعات العمل',
    contactPerson: 'مسؤول الاتصال',
    department: 'القسم',
    experience: 'الخبرة المطلوبة',
    qualification: 'المؤهل العلمي',
    deadline: 'آخر موعد للتقديم',
    share: 'مشاركة',
    activeStatus: 'نشط',
    completedStatus: 'مكتمل بنجاح',
    ongoingStatus: 'قيد الإنشاء',
    openVacancies: 'الوظائف المتاحة',

    noProjectsFound: 'لا توجد مشاريع مطابقة لمعايير البحث المحددة.',
    noCareersFound: 'لا توجد فرص وظيفية شاغرة حالياً. يُرجى مراجعة الصفحة لاحقاً.',
    noBrochuresFound: 'لا توجد وثائق منشورة في هذا التصنيف حالياً.',
    noTestimonialsFound: 'لا توجد شهادات تقدير متاحة حالياً.',

    corporateHq: 'المقر الرئيسي للشركة',
    quickLinks: 'روابط سريعة',
    operatingHubs: 'مراكز العمليات الاستراتيجية',
    certificationsAndLicensing: 'الاعتمادات والتراخيص المهنية',
    allRightsReserved: 'جميع الحقوق محفوظة. شركة فينوفا للهندسة المدنية والتقنية العالية.',
    privacyPolicy: 'سياسة الخصوصية وحوكمة البيانات',
    termsOfEngagement: 'شروط التعاقد والعمليات',
  },
  hi: {
    home: 'होम',
    about: 'कंपनी के बारे में',
    aboutUs: 'फ़ेनोवा के बारे में',
    locations: 'शाखाएं और केंद्र',
    leadership: 'नेतृत्व और बोर्ड',
    services: 'सेवाएं',
    projects: 'परियोजनाएं',
    completedProjects: 'पूर्ण परियोजनाएं',
    ongoingProjects: 'प्रगति पर परियोजनाएं',
    featuredProjects: 'प्रमुख परियोजनाएं',
    clients: 'हमारे ग्राहक',
    clientAppreciation: 'ग्राहक प्रशंसा एवं प्रमाण',
    careers: 'करियर',
    brochures: 'दस्तावेज़ और ब्रोशर',
    contact: 'संपर्क करें',
    requestQuote: 'कोटेशन का अनुरोध',
    adminPortal: 'व्यवस्थापक CMS',

    exploreProjects: 'हमारी परियोजनाएं देखें',
    viewDetails: 'विवरण देखें',
    viewDocument: 'दस्तावेज़ देखें',
    downloadPdf: 'दस्तावेज़ डाउनलोड करें',
    applyNow: 'आवेदन करें',
    submitRequest: 'कोटेशन अनुरोध भेजें',
    sendMessage: 'संदेश भेजें',
    filterAll: 'सभी',
    search: 'खोजें...',
    learnMore: 'अधिक जानें',
    backToProjects: 'परियोजनाओं पर वापस जाएं',
    backToServices: 'सेवाओं पर वापस जाएं',
    backToCareers: 'करियर पर वापस जाएं',

    themeTechGreen: 'टेक ग्रीन थीम',
    themeCyberBlue: 'साइबर ब्लू थीम',
    themeCrimsonRed: 'क्रिमसन रेड थीम',
    themeStyleA: 'टेक ग्रीन थीम',
    themeStyleB: 'साइबर ब्लू थीम',

    client: 'ग्राहक',
    location: 'स्थान',
    timeline: 'समय-सीमा',
    value: 'परियोजना मूल्य',
    status: 'स्थिति',
    category: 'श्रेणी',
    scopeOfWork: 'कार्य का दायरा',
    keyHighlights: 'प्रमुख तकनीकी उपलब्धियां',
    workingHours: 'कार्य के घंटे',
    contactPerson: 'संपर्क व्यक्ति',
    department: 'विभाग',
    experience: 'अनुभव',
    qualification: 'योग्यता',
    deadline: 'आवेदन की अंतिम तिथि',
    share: 'साझा करें',
    activeStatus: 'सक्रिय',
    completedStatus: 'पूर्ण',
    ongoingStatus: 'निर्माणाधीन',
    openVacancies: 'उपलब्ध पद',

    noProjectsFound: 'चयनित मानदंड से मेल खाने वाली कोई परियोजना नहीं मिली।',
    noCareersFound: 'वर्तमान में कोई पद उपलब्ध नहीं है। कृपया जल्द ही दोबारा जांचें।',
    noBrochuresFound: 'इस श्रेणी में वर्तमान में कोई दस्तावेज़ प्रकाशित नहीं है।',
    noTestimonialsFound: 'इस समय कोई प्रशंसा पत्र उपलब्ध नहीं है।',

    corporateHq: 'कॉर्पोरेट मुख्यालय',
    quickLinks: 'त्वरित लिंक',
    operatingHubs: 'रणनीतिक संचालन केंद्र',
    certificationsAndLicensing: 'मान्यता और प्रमाणन',
    allRightsReserved: 'सर्वाधिकार सुरक्षित। फ़ेनोवा हाई-टेक सिविल इंजीनियरिंग कॉर्पोरेशन।',
    privacyPolicy: 'गोपनीयता और डेटा गवर्नेंस',
    termsOfEngagement: 'नियम और अनुबंध शर्तें',
  },
};
