// Enhanced Mock Data for Hitex Spares - Complete Feature Set
import { mockUser, mockReferrals, mockLeaderboard, mockPrizes, mockTransactions, mockPayouts, mockStores, mockMillNames, mockScratchCards, mockPassbookTransactions } from './mockData';

// ========================================
// USER ENHANCEMENTS
// ========================================

export const enhancedMockUser = {
  ...mockUser,
  daily_streak: 7,
  last_login: new Date().toISOString(),
  tier: 'silver', // bronze, silver, gold, platinum
  total_earned: 45250.75,
  referral_code: 'RAJESH2024',
  achievements: ['first_purchase', 'top_10', 'referral_master_5'],
  notifications_unread: 3,
  onboarding_completed: true,
  bank_details: {
    account_number: '1234567890',
    ifsc_code: 'SBIN0001234',
    account_holder: 'Rajesh Kumar'
  }
};

// ========================================
// ACHIEVEMENTS & BADGES
// ========================================

export const achievements = [
  {
    id: 'first_purchase',
    name: 'First Steps',
    nameHi: 'पहला कदम',
    description: 'Made your first purchase',
    descriptionHi: 'अपनी पहली खरीद की',
    icon: 'ShoppingCart',
    color: '#10B981',
    unlocked: true,
    unlocked_date: '2024-01-15'
  },
  {
    id: 'purchases_10',
    name: 'Regular Customer',
    nameHi: 'नियमित ग्राहक',
    description: 'Completed 10 purchases',
    descriptionHi: '10 खरीदारी पूरी की',
    icon: 'Package',
    color: '#3B82F6',
    unlocked: true,
    unlocked_date: '2024-02-10'
  },
  {
    id: 'top_10',
    name: 'Top Performer',
    nameHi: 'शीर्ष प्रदर्शनकर्ता',
    description: 'Reached Top 10 in leaderboard',
    descriptionHi: 'लीडरबोर्ड में शीर्ष 10 में पहुंचे',
    icon: 'Trophy',
    color: '#F59E0B',
    unlocked: true,
    unlocked_date: '2024-03-01'
  },
  {
    id: 'referral_master_5',
    name: 'Team Builder',
    nameHi: 'टीम बिल्डर',
    description: 'Referred 5 successful users',
    descriptionHi: '5 सफल उपयोगकर्ताओं को रेफर किया',
    icon: 'Users',
    color: '#8B5CF6',
    unlocked: true,
    unlocked_date: '2024-03-15'
  },
  {
    id: 'earned_50k',
    name: 'High Earner',
    nameHi: 'उच्च कमाई',
    description: 'Earned ₹50,000 total',
    descriptionHi: 'कुल ₹50,000 कमाए',
    icon: 'DollarSign',
    color: '#EF4444',
    unlocked: false,
    progress: 90.5 // percentage
  },
  {
    id: 'streak_30',
    name: 'Dedicated Member',
    nameHi: 'समर्पित सदस्य',
    description: '30 day login streak',
    descriptionHi: '30 दिन की लॉगिन स्ट्रीक',
    icon: 'Flame',
    color: '#F97316',
    unlocked: false,
    progress: 23.3
  },
  {
    id: 'purchases_50',
    name: 'Elite Customer',
    nameHi: 'कुलीन ग्राहक',
    description: 'Completed 50 purchases',
    descriptionHi: '50 खरीदारी पूरी की',
    icon: 'Award',
    color: '#06B6D4',
    unlocked: false,
    progress: 46
  }
];

// ========================================
// WITHDRAWAL HISTORY
// ========================================

export const withdrawalHistory = [
  {
    id: 'wd-001',
    amount: 5000,
    upi_id: 'rajesh@paytm',
    status: 'completed',
    requested_at: '2024-03-20T10:30:00Z',
    processed_at: '2024-03-21T14:20:00Z',
    transaction_id: 'TXN2024032001',
    processing_steps: [
      { step: 'request_submitted', completed: true, timestamp: '2024-03-20T10:30:00Z' },
      { step: 'under_review', completed: true, timestamp: '2024-03-20T15:00:00Z' },
      { step: 'processing_payment', completed: true, timestamp: '2024-03-21T10:00:00Z' },
      { step: 'completed', completed: true, timestamp: '2024-03-21T14:20:00Z' }
    ]
  },
  {
    id: 'wd-002',
    amount: 3500,
    upi_id: 'rajesh@paytm',
    status: 'completed',
    requested_at: '2024-03-10T09:15:00Z',
    processed_at: '2024-03-11T11:30:00Z',
    transaction_id: 'TXN2024031001'
  },
  {
    id: 'wd-003',
    amount: 8000,
    upi_id: 'rajesh@paytm',
    status: 'completed',
    requested_at: '2024-02-28T14:45:00Z',
    processed_at: '2024-03-01T09:00:00Z',
    transaction_id: 'TXN2024022801'
  }
];

// ========================================
// NOTIFICATIONS
// ========================================

export const notifications = [
  {
    id: 'notif-001',
    type: 'withdrawal_approved',
    title: 'Withdrawal Approved',
    titleHi: 'निकासी स्वीकृत',
    message: 'Your withdrawal of ₹5,000 has been approved and processed.',
    messageHi: 'आपकी ₹5,000 की निकासी स्वीकृत और संसाधित की गई है।',
    read: false,
    timestamp: '2024-03-27T08:30:00Z',
    icon: 'CheckCircle',
    color: '#10B981'
  },
  {
    id: 'notif-002',
    type: 'achievement_unlocked',
    title: 'Achievement Unlocked!',
    titleHi: 'उपलब्धि अनलॉक!',
    message: 'Congratulations! You earned the "Team Builder" badge.',
    messageHi: 'बधाई हो! आपने "टीम बिल्डर" बैज अर्जित किया।',
    read: false,
    timestamp: '2024-03-26T16:20:00Z',
    icon: 'Award',
    color: '#8B5CF6'
  },
  {
    id: 'notif-003',
    type: 'referral_purchase',
    title: 'Referral Made Purchase',
    titleHi: 'रेफरल ने खरीदारी की',
    message: 'Amit Singh made a purchase. You earned ₹700 commission!',
    messageHi: 'अमित सिंह ने खरीदारी की। आपने ₹700 कमीशन कमाया!',
    read: false,
    timestamp: '2024-03-25T11:15:00Z',
    icon: 'UserPlus',
    color: '#3B82F6'
  },
  {
    id: 'notif-004',
    type: 'leaderboard_rank',
    title: "You're in Top 10!",
    titleHi: 'आप शीर्ष 10 में हैं!',
    message: 'Great job! You are now ranked #3 this month.',
    messageHi: 'बढ़िया काम! आप इस महीने #3 रैंक पर हैं।',
    read: true,
    timestamp: '2024-03-24T09:00:00Z',
    icon: 'Trophy',
    color: '#F59E0B'
  },
  {
    id: 'notif-005',
    type: 'scratch_card',
    title: 'New Scratch Card Available',
    titleHi: 'नया स्क्रैच कार्ड उपलब्ध',
    message: 'You have 2 new scratch cards waiting. Scratch now to win!',
    messageHi: 'आपके पास 2 नए स्क्रैच कार्ड इंतजार कर रहे हैं। जीतने के लिए अभी स्क्रैच करें!',
    read: true,
    timestamp: '2024-03-23T14:30:00Z',
    icon: 'Gift',
    color: '#10B981'
  }
];

// ========================================
// RECENT ACTIVITY
// ========================================

export const recentActivity = [
  {
    id: 'act-001',
    type: 'purchase',
    title: 'Purchase at MG Road Store',
    titleHi: 'MG रोड स्टोर पर खरीद',
    amount: 1500,
    points: '+₹1,500',
    timestamp: '2024-03-27T10:30:00Z',
    icon: 'ShoppingCart',
    color: '#10B981'
  },
  {
    id: 'act-002',
    type: 'referral_commission',
    title: 'Referral Commission from Amit Singh',
    titleHi: 'अमित सिंह से रेफरल कमीशन',
    amount: 700,
    points: '+₹700',
    timestamp: '2024-03-26T15:20:00Z',
    icon: 'UserPlus',
    color: '#3B82F6'
  },
  {
    id: 'act-003',
    type: 'scratch_win',
    title: 'Scratch Card Win',
    titleHi: 'स्क्रैच कार्ड जीत',
    amount: 500,
    points: '+₹500',
    timestamp: '2024-03-25T12:10:00Z',
    icon: 'Gift',
    color: '#8B5CF6'
  },
  {
    id: 'act-004',
    type: 'withdrawal',
    title: 'UPI Withdrawal to rajesh@paytm',
    titleHi: 'rajesh@paytm को UPI निकासी',
    amount: -5000,
    points: '-₹5,000',
    timestamp: '2024-03-20T10:30:00Z',
    icon: 'ArrowDownCircle',
    color: '#EF4444'
  },
  {
    id: 'act-005',
    type: 'purchase',
    title: 'Purchase at Brigade Road Store',
    titleHi: 'ब्रिगेड रोड स्टोर पर खरीद',
    amount: 1260,
    points: '+₹1,260',
    timestamp: '2024-03-18T11:20:00Z',
    icon: 'ShoppingCart',
    color: '#10B981'
  }
];

// ========================================
// TESTIMONIALS
// ========================================

export const testimonials = [
  {
    id: 'test-001',
    name: 'Suresh Reddy',
    nameHi: 'सुरेश रेड्डी',
    company: 'Hyderabad Textiles Ltd',
    companyHi: 'हैदराबाद टेक्सटाइल्स लिमिटेड',
    location: 'Hyderabad',
    avatar_url: 'https://images.unsplash.com/photo-1683470156390-79fc319b7e7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd29ya2VyJTIwcG9ydHJhaXQlMjBkYXJrfGVufDB8fHx8MTc3NDU2MTY5NXww&ixlib=rb-4.1.0&q=85',
    quote: 'Hitex Spares has transformed how we purchase textiles. The rewards add up quickly and the process is seamless!',
    quoteHi: 'Hitex Spares ने हमारी टेक्सटाइल खरीद को बदल दिया है। रिवॉर्ड जल्दी जुड़ते हैं और प्रक्रिया सहज है!',
    earned: 125000,
    rating: 5
  },
  {
    id: 'test-002',
    name: 'Deepak Verma',
    nameHi: 'दीपक वर्मा',
    company: 'Mumbai Fabrics',
    companyHi: 'मुंबई फैब्रिक्स',
    location: 'Mumbai',
    avatar_url: 'https://images.unsplash.com/photo-1683470156390-79fc319b7e7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd29ya2VyJTIwcG9ydHJhaXQlMjBkYXJrfGVufDB8fHx8MTc3NDU2MTY5NXww&ixlib=rb-4.1.0&q=85',
    quote: 'The referral program is amazing! I have earned over ₹50,000 just by inviting my colleagues.',
    quoteHi: 'रेफरल प्रोग्राम अद्भुत है! मैंने अपने सहयोगियों को आमंत्रित करके ₹50,000 से अधिक कमाए हैं।',
    earned: 98500,
    rating: 5
  },
  {
    id: 'test-003',
    name: 'Anil Gupta',
    nameHi: 'अनिल गुप्ता',
    company: 'Delhi Cotton Mills',
    companyHi: 'दिल्ली कॉटन मिल्स',
    location: 'Delhi',
    avatar_url: 'https://images.unsplash.com/photo-1683470156390-79fc319b7e7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd29ya2VyJTIwcG9ydHJhaXQlMjBkYXJrfGVufDB8fHx8MTc3NDU2MTY5NXww&ixlib=rb-4.1.0&q=85',
    quote: 'Instant rewards and easy withdrawals. This is exactly what we needed in the textile industry!',
    quoteHi: 'तत्काल रिवॉर्ड और आसान निकासी। यह वही है जो हमें टेक्सटाइल उद्योग में चाहिए था!',
    earned: 82000,
    rating: 5
  }
];

// ========================================
// FAQS
// ========================================

export const faqs = [
  {
    id: 'faq-001',
    question: 'How do I earn rewards?',
    questionHi: 'मैं रिवॉर्ड कैसे कमाऊं?',
    answer: 'You earn 3% cashback on every purchase at partner stores. Simply show your QR code at checkout, and rewards are credited instantly to your account.',
    answerHi: 'आप पार्टनर स्टोर पर हर खरीद पर 3% कैशबैक कमाते हैं। बस चेकआउट पर अपना QR कोड दिखाएं, और रिवॉर्ड तुरंत आपके खाते में जमा हो जाते हैं।',
    category: 'earning'
  },
  {
    id: 'faq-002',
    question: 'When will my withdrawal be processed?',
    questionHi: 'मेरी निकासी कब संसाधित होगी?',
    answer: 'Withdrawals are processed within 24 hours. You will receive a notification once your withdrawal is approved and completed.',
    answerHi: 'निकासी 24 घंटों के भीतर संसाधित की जाती है। एक बार आपकी निकासी स्वीकृत और पूर्ण होने पर आपको सूचना मिलेगी।',
    category: 'withdrawal'
  },
  {
    id: 'faq-003',
    question: 'Is there a minimum withdrawal amount?',
    questionHi: 'क्या न्यूनतम निकासी राशि है?',
    answer: 'Yes, the minimum withdrawal amount is ₹500. The maximum per transaction is ₹50,000.',
    answerHi: 'हां, न्यूनतम निकासी राशि ₹500 है। प्रति लेनदेन अधिकतम ₹50,000 है।',
    category: 'withdrawal'
  },
  {
    id: 'faq-004',
    question: 'How does the referral program work?',
    questionHi: 'रेफरल प्रोग्राम कैसे काम करता है?',
    answer: 'Share your unique referral code with colleagues. When they sign up and make purchases, you earn 2% commission on their lifetime purchases.',
    answerHi: 'अपना यूनिक रेफरल कोड सहयोगियों के साथ साझा करें। जब वे साइन अप करते हैं और खरीदारी करते हैं, तो आप उनकी आजीवन खरीदारी पर 2% कमीशन कमाते हैं।',
    category: 'referral'
  },
  {
    id: 'faq-005',
    question: 'What are the membership tiers?',
    questionHi: 'सदस्यता टियर क्या हैं?',
    answer: 'We have 4 tiers based on monthly volume: Bronze (0-₹1L, 3%), Silver (₹1-3L, 3.5%), Gold (₹3-5L, 4%), Platinum (₹5L+, 4.5% cashback).',
    answerHi: 'मासिक वॉल्यूम के आधार पर हमारे पास 4 टियर हैं: ब्रॉन्ज (0-₹1L, 3%), सिल्वर (₹1-3L, 3.5%), गोल्ड (₹3-5L, 4%), प्लैटिनम (₹5L+, 4.5% कैशबैक)।',
    category: 'membership'
  },
  {
    id: 'faq-006',
    question: 'How do scratch cards work?',
    questionHi: 'स्क्रैच कार्ड कैसे काम करते हैं?',
    answer: 'You receive a scratch card for every purchase above ₹30,000. Scratch to reveal bonus rewards ranging from ₹100 to ₹5,000.',
    answerHi: '₹30,000 से ऊपर की हर खरीद के लिए आपको एक स्क्रैच कार्ड मिलता है। ₹100 से ₹5,000 तक के बोनस रिवॉर्ड प्रकट करने के लिए स्क्रैच करें।',
    category: 'rewards'
  }
];

// ========================================
// TIER BENEFITS
// ========================================

export const tierBenefits = {
  bronze: {
    name: 'Bronze',
    nameHi: 'ब्रॉन्ज',
    color: '#CD7F32',
    minVolume: 0,
    maxVolume: 100000,
    cashback: 3,
    benefits: [
      '3% cashback on all purchases',
      'Access to scratch cards',
      'Basic support'
    ],
    benefitsHi: [
      'सभी खरीद पर 3% कैशबैक',
      'स्क्रैच कार्ड तक पहुंच',
      'बुनियादी सहायता'
    ]
  },
  silver: {
    name: 'Silver',
    nameHi: 'सिल्वर',
    color: '#C0C0C0',
    minVolume: 100000,
    maxVolume: 300000,
    cashback: 3.5,
    benefits: [
      '3.5% cashback on all purchases',
      'Priority scratch cards',
      'Priority support',
      'Monthly bonus rewards'
    ],
    benefitsHi: [
      'सभी खरीद पर 3.5% कैशबैक',
      'प्राथमिकता स्क्रैच कार्ड',
      'प्राथमिकता सहायता',
      'मासिक बोनस रिवॉर्ड'
    ]
  },
  gold: {
    name: 'Gold',
    nameHi: 'गोल्ड',
    color: '#FFD700',
    minVolume: 300000,
    maxVolume: 500000,
    cashback: 4,
    benefits: [
      '4% cashback on all purchases',
      'Premium scratch cards',
      'Dedicated support',
      'Exclusive monthly prizes',
      'Early access to new features'
    ],
    benefitsHi: [
      'सभी खरीद पर 4% कैशबैक',
      'प्रीमियम स्क्रैच कार्ड',
      'समर्पित सहायता',
      'विशेष मासिक पुरस्कार',
      'नई सुविधाओं तक प्रारंभिक पहुंच'
    ]
  },
  platinum: {
    name: 'Platinum',
    nameHi: 'प्लैटिनम',
    color: '#E5E4E2',
    minVolume: 500000,
    maxVolume: Infinity,
    cashback: 4.5,
    benefits: [
      '4.5% cashback on all purchases',
      'VIP scratch cards',
      'Personal account manager',
      'Guaranteed monthly prizes',
      'Exclusive events access',
      'Custom payment terms'
    ],
    benefitsHi: [
      'सभी खरीद पर 4.5% कैशबैक',
      'VIP स्क्रैच कार्ड',
      'व्यक्तिगत खाता प्रबंधक',
      'गारंटीड मासिक पुरस्कार',
      'विशेष कार्यक्रम पहुंच',
      'कस्टम भुगतान शर्तें'
    ]
  }
};

// ========================================
// REFERRAL MILESTONES
// ========================================

export const referralMilestones = [
  {
    id: 'ref_milestone_5',
    count: 5,
    bonus: 500,
    title: '5 Referrals',
    titleHi: '5 रेफरल',
    description: 'Earn ₹500 bonus',
    descriptionHi: '₹500 बोनस कमाएं',
    achieved: true
  },
  {
    id: 'ref_milestone_10',
    count: 10,
    bonus: 1500,
    title: '10 Referrals',
    titleHi: '10 रेफरल',
    description: 'Earn ₹1,500 bonus',
    descriptionHi: '₹1,500 बोनस कमाएं',
    achieved: false,
    progress: 30 // 3/10
  },
  {
    id: 'ref_milestone_25',
    count: 25,
    bonus: 5000,
    title: '25 Referrals',
    titleHi: '25 रेफरल',
    description: 'Earn ₹5,000 bonus',
    descriptionHi: '₹5,000 बोनस कमाएं',
    achieved: false,
    progress: 12 // 3/25
  }
];

// ========================================
// SPIN WHEEL DATA
// ========================================

export const spinWheelPrizes = [
  { id: 1, label: '5% Extra', labelHi: '5% अतिरिक्त', value: 5, color: '#10B981', type: 'cashback_boost' },
  { id: 2, label: '100 Points', labelHi: '100 अंक', value: 100, color: '#3B82F6', type: 'points' },
  { id: 3, label: '10% Extra', labelHi: '10% अतिरिक्त', value: 10, color: '#8B5CF6', type: 'cashback_boost' },
  { id: 4, label: 'Scratch Card', labelHi: 'स्क्रैच कार्ड', value: 1, color: '#F59E0B', type: 'scratch_card' },
  { id: 5, label: '500 Points', labelHi: '500 अंक', value: 500, color: '#EF4444', type: 'points' },
  { id: 6, label: 'Better Luck', labelHi: 'अगली बार', value: 0, color: '#6B7280', type: 'nothing' },
  { id: 7, label: '200 Points', labelHi: '200 अंक', value: 200, color: '#06B6D4', type: 'points' },
  { id: 8, label: '7% Extra', labelHi: '7% अतिरिक्त', value: 7, color: '#10B981', type: 'cashback_boost' }
];

export const userSpinData = {
  last_spin: '2024-03-20T10:00:00Z',
  can_spin_again: '2024-03-27T10:00:00Z',
  total_spins: 12,
  rewards_won: [
    { date: '2024-03-20', prize: '500 Points', value: 500 },
    { date: '2024-03-13', prize: '10% Extra Cashback', value: 10 },
    { date: '2024-03-06', prize: 'Scratch Card', value: 1 }
  ]
};

// ========================================
// TRUST INDICATORS
// ========================================

export const trustIndicators = {
  total_distributed: 5000000, // ₹50 Lakhs
  active_users: 5000,
  partner_stores: 150,
  monthly_transactions: 15000
};

// ========================================
// ONBOARDING STEPS
// ========================================

export const onboardingSteps = [
  {
    id: 'step1',
    title: 'How to Earn Points',
    titleHi: 'अंक कैसे कमाएं',
    description: 'Show your QR code at any partner store. Earn 3% cashback instantly on every purchase.',
    descriptionHi: 'किसी भी पार्टनर स्टोर पर अपना QR कोड दिखाएं। हर खरीद पर तुरंत 3% कैशबैक कमाएं।',
    icon: 'QrCode',
    image: '/onboarding1.png'
  },
  {
    id: 'step2',
    title: 'How to Use QR Code',
    titleHi: 'QR कोड का उपयोग कैसे करें',
    description: 'Access your unique QR code from the home screen. The storekeeper will scan it to credit your rewards.',
    descriptionHi: 'होम स्क्रीन से अपना यूनिक QR कोड एक्सेस करें। स्टोरकीपर आपके रिवॉर्ड को क्रेडिट करने के लिए इसे स्कैन करेगा।',
    icon: 'Scan',
    image: '/onboarding2.png'
  },
  {
    id: 'step3',
    title: 'How to Withdraw',
    titleHi: 'कैसे निकालें',
    description: 'Minimum withdrawal is ₹500. Funds are transferred to your UPI within 24 hours.',
    descriptionHi: 'न्यूनतम निकासी ₹500 है। 24 घंटे के भीतर आपकी UPI में धनराशि स्थानांतरित हो जाती है।',
    icon: 'Wallet',
    image: '/onboarding3.png'
  },
  {
    id: 'step4',
    title: 'How to Refer Friends',
    titleHi: 'दोस्तों को कैसे रेफर करें',
    description: 'Share your referral code. Earn 2% commission on all their purchases, forever!',
    descriptionHi: 'अपना रेफरल कोड साझा करें। उनकी सभी खरीदारी पर हमेशा के लिए 2% कमीशन कमाएं!',
    icon: 'Users',
    image: '/onboarding4.png'
  }
];

// Export all enhanced data
export {
  mockUser,
  mockReferrals,
  mockLeaderboard,
  mockPrizes,
  mockTransactions,
  mockPayouts,
  mockStores,
  mockMillNames,
  mockScratchCards,
  mockPassbookTransactions
};
