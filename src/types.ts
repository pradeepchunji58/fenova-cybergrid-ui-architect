export type Language = 'en' | 'ar' | 'hi';

export type VisualTheme = 'tech-green' | 'cyber-blue' | 'crimson-red';

export interface MultilingualText {
  en: string;
  ar: string;
  hi: string;
}

export interface HeroSlide {
  id: string;
  title: MultilingualText;
  subtitle: MultilingualText;
  description: MultilingualText;
  imageUrl: string;
  videoUrl?: string;
  primaryCtaText: MultilingualText;
  primaryCtaLink: string;
  secondaryCtaText?: MultilingualText;
  secondaryCtaLink?: string;
  order: number;
  visible: boolean;
  badge?: MultilingualText;
}

export interface Project {
  id: string;
  slug: string;
  name: MultilingualText;
  client: string;
  location: MultilingualText;
  category: 'civil' | 'infrastructure' | 'construction' | 'industrial' | 'transportation' | string;
  status: 'completed' | 'ongoing';
  featured: boolean;
  startDate: string;
  completionDate: string;
  description: MultilingualText;
  detailedDescription?: MultilingualText;
  scopeOfWork: MultilingualText[];
  challenges?: MultilingualText;
  solutions?: MultilingualText;
  projectValue?: string;
  mainImage: string;
  gallery: string[];
  documents?: { name: string; url: string; size: string }[];
  highlights: MultilingualText[];
  relatedServiceId?: string;
  order: number;
  visible: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: MultilingualText;
  shortDescription: MultilingualText;
  detailedDescription: MultilingualText;
  mainImage: string;
  gallery: string[];
  features: MultilingualText[];
  benefits: MultilingualText[];
  relatedProjectIds: string[];
  category: string;
  iconName: string;
  order: number;
  visible: boolean;
}

export interface BranchLocation {
  id: string;
  name: MultilingualText;
  country: MultilingualText;
  address: MultilingualText;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  coordinates: { lat: number; lng: number };
  description: MultilingualText;
  locationImage: string;
  officeImage: string;
  contactPerson: string;
  workingHours: MultilingualText;
  status: 'active' | 'hidden';
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: MultilingualText;
  shortDescription: MultilingualText;
  websiteUrl?: string;
  featured: boolean;
  order: number;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: MultilingualText;
  testimonial: MultilingualText;
  clientLogo?: string;
  clientPhoto?: string;
  projectReference?: string;
  date: string;
  rating: number;
  letterDocumentUrl?: string;
  visible: boolean;
  order: number;
}

export interface Leader {
  id: string;
  name: string;
  designation: MultilingualText;
  roleType: 'ceo' | 'board' | 'team';
  photo: string;
  biography: MultilingualText;
  message?: MultilingualText; // For CEO
  linkedin?: string;
  email?: string;
  department?: MultilingualText;
  order: number;
  visible: boolean;
}

export interface CareerVacancy {
  id: string;
  slug: string;
  title: MultilingualText;
  department: MultilingualText;
  location: MultilingualText;
  employmentType: 'Full-time' | 'Contract' | 'Project-based';
  experience: string;
  qualification: MultilingualText;
  skills: string[];
  description: MultilingualText;
  responsibilities: MultilingualText[];
  requirements: MultilingualText[];
  applicationDeadline: string;
  durationMonths?: number;
  expiryDate?: string;
  isExpired?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  linkedInUrl?: string;
  status: 'open' | 'closed' | 'hidden' | 'active' | 'expired';
  order: number;
}

export interface CareerApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: number;
  qualification: string;
  coverLetter: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'interviewed';
  createdAt: string;
}

export interface BrochureDocument {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  category: 'corporate' | 'infrastructure' | 'safety' | 'projects' | 'sustainability';
  pagesCount: number;
  fileSize: string;
  thumbnail: string;
  documentUrl: string;
  downloadAllowed: boolean;
  visible: boolean;
  order: number;
  uploadDate: string;
}

export interface QuotationRequest {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  projectType: string;
  serviceRequired: string;
  projectDescription: string;
  estimatedProjectSize: string;
  budgetRange?: string;
  preferredContactMethod: 'email' | 'phone' | 'teams_meeting';
  attachmentFileName?: string;
  status: 'new' | 'reviewing' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  createdAt: string;
  notes?: string;
}

export interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  branchLocationId?: string;
  subject: string;
  message: string;
  attachmentFileName?: string;
  status: 'new' | 'responded' | 'archived';
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  title: string;
  altText: string;
  category: 'hero' | 'projects' | 'services' | 'team' | 'clients' | 'locations' | 'brochures' | 'general';
  visibility: boolean;
  uploadDate: string;
  caption?: string;
  fileSize?: string;
}

export interface InquiryRoutingRule {
  id: string;
  category: string;
  primaryReceiverEmail: string;
  parallelDeliveryEnabled: boolean;
  parallelReceiverEmail: string;
  description?: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  defaultMessage: string;
  quickTags: string[];
}

export interface RegionalAddress {
  id: string;
  region: string;
  address: string;
  phone: string;
  email: string;
}

export interface SiteSettings {
  companyName: MultilingualText;
  tagline: MultilingualText;
  theme: VisualTheme;
  primaryTheme?: string;
  defaultLanguage: Language;
  phonePrimary: string;
  phoneSecondary: string;
  emailContact: string;
  emailCareers: string;
  emailQuotes: string;
  officialMailPath?: string;
  logoUrl?: string;
  logoSize?: number;
  logoZoom?: number;
  rfqButtonEnabled?: boolean;
  rfqButtonColor?: string;
  rfqEnabled?: boolean;
  headquartersAddress: MultilingualText;
  regionalAddresses?: RegionalAddress[];
  socials: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
  advertising?: {
    enabled: boolean;
    bannerText: string;
    bannerLink?: string;
  };
  inquiryRouting?: InquiryRoutingRule[];
  whatsAppSettings?: WhatsAppSettings;
  stats: {
    yearsOfExcellence: number;
    completedMegaProjects: number;
    workforceStrength: string;
    equipmentFleetCount: string;
    safetyHoursWithoutLTI: string;
    aggregateProjectValue: string;
  };
  certifications: string[];
}

export type AdminRole = 'super_admin' | 'content_manager' | 'hr_manager' | 'marketing_manager' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
}

export type ServiceItem = Service;
export type LocationItem = BranchLocation;
export type LeaderItem = Leader;
export type ClientItem = Client;
export type TestimonialItem = Testimonial;
export type DocumentItem = BrochureDocument;
export type JobApplication = CareerApplication;

