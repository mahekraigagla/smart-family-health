
export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    family: 'Family',
    medicines: 'Medicines',
    appointments: 'Appointments',
    documents: 'Documents',
    expenses: 'Expenses',
    healthRecords: 'Health Records',
    analytics: 'Analytics',
    aiAssistant: 'AI Assistant',
    
    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    name: 'Name',
    age: 'Age',
    relation: 'Relation',
    date: 'Date',
    time: 'Time',
    amount: 'Amount',
    description: 'Description',
    
    // AI Assistant
    aiGreeting: 'Hello! I\'m your family health assistant. How can I help you today?',
    askQuestion: 'Ask a health question...',
    send: 'Send',
    
    // Health Records
    medicalHistory: 'Medical History',
    vaccinations: 'Vaccinations',
    growthCharts: 'Growth Charts',
    labResults: 'Lab Results',
    
    // Analytics
    medicineAdherence: 'Medicine Adherence',
    expenseAnalysis: 'Expense Analysis',
    healthOverview: 'Health Overview',
    
    // Notifications
    medicineReminder: 'Medicine Reminder',
    appointmentReminder: 'Appointment Reminder',
    checkupReminder: 'Health Checkup Reminder',
    vaccinationReminder: 'Vaccination Reminder'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    family: 'परिवार',
    medicines: 'दवाएं',
    appointments: 'अपॉइंटमेंट',
    documents: 'दस्तावेज़',
    expenses: 'खर्च',
    healthRecords: 'स्वास्थ्य रिकॉर्ड',
    analytics: 'विश्लेषण',
    aiAssistant: 'AI सहायक',
    
    // Common
    add: 'जोड़ें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    name: 'नाम',
    age: 'उम्र',
    relation: 'रिश्ता',
    date: 'तारीख',
    time: 'समय',
    amount: 'राशि',
    description: 'विवरण',
    
    // AI Assistant
    aiGreeting: 'नमस्ते! मैं आपका पारिवारिक स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    askQuestion: 'स्वास्थ्य संबंधी प्रश्न पूछें...',
    send: 'भेजें',
    
    // Health Records
    medicalHistory: 'चिकित्सा इतिहास',
    vaccinations: 'टीकाकरण',
    growthCharts: 'विकास चार्ट',
    labResults: 'लैब परिणाम',
    
    // Analytics
    medicineAdherence: 'दवा पालन',
    expenseAnalysis: 'खर्च विश्लेषण',
    healthOverview: 'स्वास्थ्य सिंहावलोकन',
    
    // Notifications
    medicineReminder: 'दवा की याद',
    appointmentReminder: 'अपॉइंटमेंट की याद',
    checkupReminder: 'स्वास्थ्य जांच की याद',
    vaccinationReminder: 'टीकाकरण की याद'
  }
};

let currentLanguage: Language = 'en';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
};

export const getLanguage = (): Language => {
  return (localStorage.getItem('language') as Language) || 'en';
};

export const t = (key: keyof typeof translations.en): string => {
  return translations[currentLanguage][key] || translations.en[key] || key;
};

// Initialize language
currentLanguage = getLanguage();
