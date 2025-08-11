// GA4 Event Tracking Utilities
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Event categories
export const GA_CATEGORIES = {
  VOICE_CHAT: 'voice_chat',
  ENGAGEMENT: 'engagement',
  CTA: 'cta_interaction',
  FAQ: 'faq',
  CONVERSION: 'conversion',
  ERROR: 'error'
} as const;

// Event names
export const GA_EVENTS = {
  // Voice chat events
  VOICE_CHAT_START: 'voice_chat_start',
  VOICE_CHAT_CONNECTED: 'voice_chat_connected',
  VOICE_CHAT_ENDED: 'voice_chat_ended',
  VOICE_CHAT_ERROR: 'voice_chat_error',
  
  // Engagement events
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  SECTION_VIEW: 'section_view',
  PAGE_EXIT: 'page_exit',
  
  // CTA events
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  
  // FAQ events
  FAQ_EXPAND: 'faq_expand',
  FAQ_COLLAPSE: 'faq_collapse',
  
  // Conversion funnel
  VOICE_CHAT_VIEWED: 'voice_chat_viewed',
  FORM_VIEWED: 'form_viewed',
  FORM_SUBMITTED: 'form_submitted',
  
  // Page navigation
  HOW_IT_WORKS_VIEW: 'how_it_works_view'
} as const;

// Track event helper
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 GA4 Event:', eventName, parameters);
    }
    
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_location: window.location.href,
      page_title: document.title
    });
  }
}

// Track voice chat events
export function trackVoiceChatStart() {
  trackEvent(GA_EVENTS.VOICE_CHAT_START, {
    event_category: GA_CATEGORIES.VOICE_CHAT,
    event_label: 'hero_section'
  });
}

export function trackVoiceChatConnected() {
  trackEvent(GA_EVENTS.VOICE_CHAT_CONNECTED, {
    event_category: GA_CATEGORIES.VOICE_CHAT
  });
}

export function trackVoiceChatEnded(duration?: number) {
  trackEvent(GA_EVENTS.VOICE_CHAT_ENDED, {
    event_category: GA_CATEGORIES.VOICE_CHAT,
    value: duration,
    event_label: duration ? `${Math.round(duration)}s` : 'unknown'
  });
}

export function trackVoiceChatError(error: string) {
  trackEvent(GA_EVENTS.VOICE_CHAT_ERROR, {
    event_category: GA_CATEGORIES.ERROR,
    event_label: error
  });
}

// Track button clicks
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent(GA_EVENTS.BUTTON_CLICK, {
    event_category: GA_CATEGORIES.CTA,
    event_label: buttonName,
    button_location: location
  });
}

// Track FAQ interactions
export function trackFAQInteraction(question: string, action: 'expand' | 'collapse') {
  trackEvent(
    action === 'expand' ? GA_EVENTS.FAQ_EXPAND : GA_EVENTS.FAQ_COLLAPSE,
    {
      event_category: GA_CATEGORIES.FAQ,
      event_label: question
    }
  );
}

// Track scroll depth
let scrollDepthTracked = new Set<number>();
export function trackScrollDepth(percentage: number) {
  const milestone = Math.floor(percentage / 25) * 25;
  
  if (milestone > 0 && !scrollDepthTracked.has(milestone)) {
    scrollDepthTracked.add(milestone);
    trackEvent(GA_EVENTS.SCROLL_DEPTH, {
      event_category: GA_CATEGORIES.ENGAGEMENT,
      event_label: `${milestone}%`,
      value: milestone
    });
  }
}

// Track time on page before action
export function trackTimeOnPage(seconds: number, action: string) {
  trackEvent(GA_EVENTS.TIME_ON_PAGE, {
    event_category: GA_CATEGORIES.ENGAGEMENT,
    event_label: action,
    value: seconds
  });
}

// Track conversion funnel
export function trackConversionStep(step: 'viewed' | 'started' | 'form_viewed' | 'form_submitted') {
  const eventMap = {
    'viewed': GA_EVENTS.VOICE_CHAT_VIEWED,
    'started': GA_EVENTS.VOICE_CHAT_START,
    'form_viewed': GA_EVENTS.FORM_VIEWED,
    'form_submitted': GA_EVENTS.FORM_SUBMITTED
  };
  
  trackEvent(eventMap[step], {
    event_category: GA_CATEGORIES.CONVERSION,
    event_label: step
  });
}

// Track section visibility
export function trackSectionView(sectionName: string) {
  trackEvent(GA_EVENTS.SECTION_VIEW, {
    event_category: GA_CATEGORIES.ENGAGEMENT,
    event_label: sectionName
  });
}

// Reset scroll tracking for new page
export function resetScrollTracking() {
  scrollDepthTracked.clear();
}