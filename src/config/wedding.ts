// Central Single Source of Truth for Sarvesh & Keerthana Wedding Invitation

export interface CelebrationEvent {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  isConfirmed: boolean;
  dateDisplay: string;
  timeDisplay: string;
  venueName: string;
  venueAddress: string;
  description: string;
  fullStory: string;
  iconName: 'Sparkles' | 'Flower' | 'Music' | 'Flame' | 'HeartHandshake' | 'PartyPopper' | 'Crown';
  image?: string;
  badge: string;
  colorScheme: {
    accent: string;
    tagBg: string;
    border: string;
  };
}

export interface WeddingEvent {
  id: string;
  title: string;
  subtitle: string;
  type: 'reception_hosur' | 'wedding_ceremony' | 'reception_coimbatore';
  dateDisplay: string;
  timeDisplay: string;
  startIso: string;
  endIso: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  badge: string;
  description: string;
  colorScheme: {
    bg: string;
    accent: string;
    border: string;
    tagBg: string;
  };
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: 'portrait' | 'candid' | 'ceremonial' | 'editorial';
  motionType: 'breathe' | 'float' | 'parallax' | 'tilt' | 'shimmer';
}

export interface WeddingConfig {
  couple: {
    groom: string;
    bride: string;
    namesDisplay: string;
    shortNames: string;
    invitationHeading: string;
    invitationSubtitle: string;
    coreQuote: string;
    heroPhoto: string;
    embracePhoto: string;
    outdoorPhoto: string;
    closeupPhoto: string;
    candidPhoto: string;
  };
  countdown: {
    targetDateIso: string;
    targetDisplay: string;
    title: string;
    subtitle: string;
  };
  celebrationJourney: CelebrationEvent[];
  events: WeddingEvent[];
  family: {
    heading: string;
    subheading: string;
    blessingNote: string;
    compliments: {
      names: [string, string];
    }[];
    kuttiesHeading: string;
    kuttiesCallingText: string;
    kutties: string[];
  };
  gallery: GalleryPhoto[];
  venueData: {
    routeDistance: string;
    venues: {
      name: string;
      city: string;
      tag: string;
      address: string;
      mapsQuery: string;
      eventsHosted: string[];
    }[];
  };
  rsvp: {
    heading: string;
    subheading: string;
    eventsList: string[];
  };
  wishes: {
    heading: string;
    subheading: string;
  };
  footer: {
    coupleText: string;
    datesHighlight: string;
    locationText: string;
    quote: string;
    peaceMessage: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: 'Sarvesh',
    bride: 'Keerthana',
    namesDisplay: 'Sarvesh & Keerthana',
    shortNames: 'S & K',
    invitationHeading: 'TOGETHER WITH THEIR FAMILIES',
    invitationSubtitle: 'We invite you to celebrate the beginning of our forever.',
    coreQuote: 'Two hearts. One promise. A lifetime together.',
    heroPhoto: '/assets/photos/couple_traditional_kerala.jpg',
    embracePhoto: '/assets/photos/couple_embrace.jpg',
    outdoorPhoto: '/assets/photos/couple_outdoor.jpg',
    closeupPhoto: '/assets/photos/couple_closeup.jpg',
    candidPhoto: '/assets/photos/couple_studio_red.jpg',
  },

  countdown: {
    targetDateIso: '2026-09-13T04:20:00+05:30',
    targetDisplay: 'Sunday, 13 September 2026 • 4:20 AM IST',
    title: 'Counting Down to the Sacred Muhurtham',
    subtitle: 'Sunday, 13 September 2026 • 4:20 AM IST',
  },

  celebrationJourney: [
    {
      id: 'haldi',
      number: '01',
      name: 'Haldi Ceremony',
      subtitle: 'A Golden Shower of Blessings & Turmeric',
      isConfirmed: false,
      dateDisplay: 'Pre-Wedding Celebration',
      timeDisplay: 'Auspicious Morning Hours',
      venueName: 'Family Residence',
      venueAddress: 'Hosur / Coimbatore (Details to be announced)',
      description: 'The auspicious application of fragrant turmeric, rose water, and pure herbal paste by loved ones to bless the bride and groom with radiance and joy.',
      fullStory: 'An intimate family gathering filled with joyous laughter, traditional songs, and golden yellow hues as Sarvesh and Keerthana receive heartfelt blessings.',
      iconName: 'Sparkles',
      image: '/assets/photos/couple_traditional_kerala.jpg',
      badge: 'TRADITIONAL RITUAL',
      colorScheme: {
        accent: '#D49B28',
        tagBg: '#FEF8E7',
        border: 'rgba(212, 155, 40, 0.4)',
      },
    },
    {
      id: 'mehendi',
      number: '02',
      name: 'Mehendi Ceremony',
      subtitle: 'Intricate Henna & Festive Melodies',
      isConfirmed: false,
      dateDisplay: 'Pre-Wedding Celebration',
      timeDisplay: 'Festive Evening',
      venueName: 'Family Courtyard',
      venueAddress: 'Hosur / Coimbatore (Details to be announced)',
      description: 'Adorning hands with intricate henna motifs representing love, prosperity, and the unbreakable bond between two souls.',
      fullStory: 'An evening resonant with South Indian wedding melodies, vibrant flowers, and celebratory feasts celebrating Keerthana and her loved ones.',
      iconName: 'Flower',
      image: '/assets/photos/couple_outdoor.jpg',
      badge: 'HENNA CELEBRATION',
      colorScheme: {
        accent: '#2B6B4D',
        tagBg: '#EBF5EF',
        border: 'rgba(43, 107, 77, 0.4)',
      },
    },
    {
      id: 'reception_hosur',
      number: '03',
      name: 'Reception — Hosur',
      subtitle: 'An Evening of Celebrations & Musical Dinner',
      isConfirmed: true,
      dateDisplay: 'Saturday, 12 September 2026',
      timeDisplay: '7:00 PM onwards',
      venueName: 'Saraswathi Mahal',
      venueAddress: 'Saraswathi Mahal, Hosur, Tamil Nadu',
      description: 'Join us for a grand musical evening filled with laughter, dinner, and warm celebrations as we welcome our families and friends.',
      fullStory: 'The grand opening celebration where Sarvesh & Keerthana step on stage together in celebratory wedding attire to welcome dear relatives, friends, and esteemed guests with a lavish traditional banquet.',
      iconName: 'PartyPopper',
      image: '/assets/photos/couple_embrace.jpg',
      badge: 'CONFIRMED EVENT',
      colorScheme: {
        accent: '#8C1D2F',
        tagBg: '#FAF0E6',
        border: 'rgba(140, 29, 47, 0.4)',
      },
    },
    {
      id: 'baraath',
      number: '04',
      name: 'Baraath & Groom Arrival',
      subtitle: 'Joyous Procession & Grand Welcome',
      isConfirmed: false,
      dateDisplay: 'Dawn of the Muhurtham',
      timeDisplay: 'Auspicious Procession & Welcome',
      venueName: 'Saraswathi Mahal Environs',
      venueAddress: 'Hosur, Tamil Nadu',
      description: 'A vibrant ceremonial arrival with traditional rhythms, welcoming the groom and his family with garland exchanges and traditional Aarti.',
      fullStory: 'Sarvesh arrives in regal celebration accompanied by family, greeted by Keerthanas family with auspicious coconut, nadaswaram, and rosewater rituals.',
      iconName: 'Music',
      image: '/assets/photos/couple_hero.jpg',
      badge: 'GROOM PROCESSION',
      colorScheme: {
        accent: '#B8332E',
        tagBg: '#FDF2F0',
        border: 'rgba(184, 51, 46, 0.4)',
      },
    },
    {
      id: 'wedding_ceremony',
      number: '05',
      name: 'Wedding Ceremony (Muhurtham)',
      subtitle: 'The Sacred Vedic Wedding Rituals',
      isConfirmed: true,
      dateDisplay: 'Sunday, 13 September 2026',
      timeDisplay: '4:20 AM – 6:20 AM',
      venueName: 'Saraswathi Mahal',
      venueAddress: 'Saraswathi Mahal, Hosur, Tamil Nadu',
      description: 'Witness the auspicious union of Sarvesh & Keerthana amidst Vedic chants, sacred fire, and holy mangalyam blessings during the Brahma Muhurtham.',
      fullStory: 'In the tranquil dawn hours, the holy Agni bears witness as Sarvesh and Keerthana are bound in eternal companionship surrounded by the blessings of parents and elders.',
      iconName: 'Flame',
      image: '/assets/photos/couple_muhurtham_silk.jpg',
      badge: 'CONFIRMED MUHURTHAM',
      colorScheme: {
        accent: '#561525',
        tagBg: '#FDF3E5',
        border: 'rgba(86, 21, 37, 0.4)',
      },
    },
    {
      id: 'reception_coimbatore',
      number: '06',
      name: 'Reception — Coimbatore',
      subtitle: 'A Joyous Gathering of Family & Friends',
      isConfirmed: true,
      dateDisplay: 'Tuesday, 15 September 2026',
      timeDisplay: '11:00 AM onwards',
      venueName: 'Community Hall, KG Garden City Apartments',
      venueAddress: 'Nagarajapuram, Vedapatti, Coimbatore, Tamil Nadu',
      description: 'Celebrate our new beginnings with a joyous afternoon lunch reception amidst our loving community in Coimbatore.',
      fullStory: 'A warm and hearty daytime celebration in Coimbatore with delicious South Indian wedding feast, blessings from near and dear ones, and cherished family gatherings.',
      iconName: 'HeartHandshake',
      image: '/assets/photos/couple_royal_blue.jpg',
      badge: 'CONFIRMED EVENT',
      colorScheme: {
        accent: '#163C2A',
        tagBg: '#EAF3EE',
        border: 'rgba(22, 60, 42, 0.4)',
      },
    },
  ],

  events: [
    {
      id: 'reception_hosur',
      title: 'Reception — Hosur',
      subtitle: 'An Evening of Celebrations & Blessings',
      type: 'reception_hosur',
      dateDisplay: 'Saturday, 12 September 2026',
      timeDisplay: '7:00 PM onwards',
      startIso: '2026-09-12T19:00:00+05:30',
      endIso: '2026-09-12T23:00:00+05:30',
      venueName: 'Saraswathi Mahal',
      venueAddress: 'Saraswathi Mahal, Hosur, Tamil Nadu',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saraswathi+Mahal+Hosur',
      badge: 'EVE OF THE WEDDING',
      description:
        'Join us for a grand musical evening filled with laughter, dinner, and warm celebrations as we welcome our families and friends.',
      colorScheme: {
        bg: '#FAF6EE',
        accent: '#8C1D2F',
        border: 'rgba(140, 29, 47, 0.35)',
        tagBg: '#FAF0E6',
      },
    },
    {
      id: 'wedding_ceremony',
      title: 'Wedding Ceremony',
      subtitle: 'The Sacred Muhurtham',
      type: 'wedding_ceremony',
      dateDisplay: 'Sunday, 13 September 2026',
      timeDisplay: '4:20 AM – 6:20 AM',
      startIso: '2026-09-13T04:20:00+05:30',
      endIso: '2026-09-13T06:20:00+05:30',
      venueName: 'Saraswathi Mahal',
      venueAddress: 'Saraswathi Mahal, Hosur, Tamil Nadu',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saraswathi+Mahal+Hosur',
      badge: 'MAIN MUHURTHAM',
      description:
        'Witness the auspicious union of Sarvesh & Keerthana amidst Vedic chants, sacred fire, and holy mangalyam blessings.',
      colorScheme: {
        bg: '#FAF6EE',
        accent: '#561525',
        border: 'rgba(201, 164, 92, 0.55)',
        tagBg: '#FDF3E5',
      },
    },
    {
      id: 'reception_coimbatore',
      title: 'Reception — Coimbatore',
      subtitle: 'A Joyous Gathering of Family & Friends',
      type: 'reception_coimbatore',
      dateDisplay: 'Tuesday, 15 September 2026',
      timeDisplay: '11:00 AM onwards',
      startIso: '2026-09-15T11:00:00+05:30',
      endIso: '2026-09-15T15:00:00+05:30',
      venueName: 'Community Hall, KG Garden City Apartments',
      venueAddress: 'Nagarajapuram, Vedapatti, Coimbatore, Tamil Nadu',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=KG+Garden+City+Apartments+Nagarajapuram+Vedapatti+Coimbatore',
      badge: 'COIMBATORE CELEBRATION',
      description:
        'Celebrate our new beginnings with a joyous afternoon lunch reception amidst our loving community in Coimbatore.',
      colorScheme: {
        bg: '#FAF6EE',
        accent: '#163C2A',
        border: 'rgba(22, 60, 42, 0.35)',
        tagBg: '#EAF3EE',
      },
    },
  ],

  family: {
    heading: 'TOGETHER WITH THEIR FAMILIES',
    subheading: 'WITH BEST COMPLIMENTS FROM',
    blessingNote:
      'We solicit your gracious presence and heartfelt blessings on the auspicious occasion of the wedding ceremony of our beloved children.',
    compliments: [
      {
        names: ['S. Ramprasad', 'R. Yasodha Devi'],
      },
      {
        names: ['Sekar Singh', 'Latha Bai'],
      },
      {
        names: ['R. Vithyasagar', 'K. Lakshmi'],
      },
    ],
    kuttiesHeading: 'WITH LOTS OF LOVE FROM OUR KUTTIES',
    kuttiesCallingText: 'To our dearest Chaacha & Chaachi',
    kutties: ['V. Adhvik Guhan', 'P. Ananyaa'],
  },

  gallery: [
    {
      id: 'hero-portrait',
      src: '/assets/photos/couple_hero.jpg',
      alt: 'Sarvesh & Keerthana under gentle rain and warm lanterns',
      title: 'Moments Under the Lantern Light',
      subtitle: 'A quiet evening of warmth and laughter',
      category: 'portrait',
      motionType: 'breathe',
    },
    {
      id: 'muhurtham-silk-portrait',
      src: '/assets/photos/couple_muhurtham_silk.jpg',
      alt: 'Sarvesh & Keerthana in traditional silk wedding attire',
      title: 'Sacred Silk & Muhurtham Elegance',
      subtitle: 'Draped in timeless South Indian royalty',
      category: 'ceremonial',
      motionType: 'float',
    },
    {
      id: 'beach-waves-portrait',
      src: '/assets/photos/couple_beach_waves.jpg',
      alt: 'Sarvesh & Keerthana dancing on rocks amidst ocean waves',
      title: 'Ocean Symphony & Dancing Waves',
      subtitle: 'Surrounded by the rhythm of the sea',
      category: 'editorial',
      motionType: 'parallax',
    },
    {
      id: 'traditional-kerala-portrait',
      src: '/assets/photos/couple_traditional_kerala.jpg',
      alt: 'Sarvesh & Keerthana in traditional Kasavu and turmeric attire with mural backdrop',
      title: 'Timeless Traditional Grace',
      subtitle: 'Warm smiles amidst sacred murals',
      category: 'ceremonial',
      motionType: 'tilt',
    },
    {
      id: 'studio-red-portrait',
      src: '/assets/photos/couple_studio_red.jpg',
      alt: 'Sarvesh & Keerthana smiling warmly in studio portrait',
      title: 'A Celebration of Warmth & Smiles',
      subtitle: 'Joy that radiates from within',
      category: 'portrait',
      motionType: 'shimmer',
    },
    {
      id: 'royal-blue-portrait',
      src: '/assets/photos/couple_royal_blue.jpg',
      alt: 'Sarvesh & Keerthana fine art portrait in royal attire',
      title: 'Royal Heritage & Devotion',
      subtitle: 'Standing together in eternal harmony',
      category: 'editorial',
      motionType: 'breathe',
    },
    {
      id: 'embrace-portrait',
      src: '/assets/photos/couple_embrace.jpg',
      alt: 'Sarvesh & Keerthana smiling together in embrace',
      title: 'Smiles That Light Up the World',
      subtitle: 'Pure joy, effortless comfort',
      category: 'candid',
      motionType: 'float',
    },
    {
      id: 'outdoor-portrait',
      src: '/assets/photos/couple_outdoor.jpg',
      alt: 'Sarvesh & Keerthana outdoors in natural light',
      title: 'Hand in Hand Along the Path',
      subtitle: 'Step by step toward forever',
      category: 'editorial',
      motionType: 'parallax',
    },
    {
      id: 'closeup-portrait',
      src: '/assets/photos/couple_closeup.jpg',
      alt: 'Sarvesh & Keerthana close-up eye to eye portrait',
      title: 'A Gaze Full of Forever',
      subtitle: 'When eyes speak a thousand promises',
      category: 'portrait',
      motionType: 'tilt',
    },
  ],

  venueData: {
    routeDistance: 'Hosur ➔ Coimbatore (approx. 330 km / 6 hrs)',
    venues: [
      {
        name: 'Saraswathi Mahal',
        city: 'Hosur',
        tag: 'PRIMARY WEDDING VENUE',
        address: 'Saraswathi Mahal, Hosur, Tamil Nadu',
        mapsQuery: 'https://www.google.com/maps/search/?api=1&query=Saraswathi+Mahal+Hosur',
        eventsHosted: ['Reception — Hosur (12 Sep, 7:00 PM)', 'Wedding Ceremony (13 Sep, 4:20 AM)'],
      },
      {
        name: 'Community Hall, KG Garden City Apartments',
        city: 'Coimbatore',
        tag: 'COIMBATORE RECEPTION VENUE',
        address: 'Nagarajapuram, Vedapatti, Coimbatore, Tamil Nadu',
        mapsQuery:
          'https://www.google.com/maps/search/?api=1&query=KG+Garden+City+Apartments+Nagarajapuram+Vedapatti+Coimbatore',
        eventsHosted: ['Reception — Coimbatore (15 Sep, 11:00 AM)'],
      },
    ],
  },

  rsvp: {
    heading: 'Will You Grace Us With Your Presence?',
    subheading: 'Kindly confirm your attendance by 15 August 2026 to help us make comfortable arrangements.',
    eventsList: [
      'Reception — Hosur (12 Sep, 7:00 PM)',
      'Wedding Ceremony — Hosur (13 Sep, 4:20 AM)',
      'Reception — Coimbatore (15 Sep, 11:00 AM)',
    ],
  },

  wishes: {
    heading: 'Blessings & Guestbook',
    subheading: 'Leave your prayers, heartfelt wishes, and love for the newlyweds.',
  },

  footer: {
    coupleText: 'SARVESH & KEERTHANA',
    datesHighlight: '12 • 13 • 15 SEPTEMBER 2026',
    locationText: 'HOSUR & COIMBATORE',
    quote: 'Two hearts. One promise. A lifetime together.',
    peaceMessage: 'May our union be blessed with love, peace, and eternal togetherness.',
  },
};
