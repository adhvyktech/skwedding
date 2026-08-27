export interface RsvpData {
  id: string;
  name: string;
  contact: string; // phone or email
  attending: 'yes' | 'no';
  guestsCount: number;
  selectedEvents: string[];
  message?: string;
  submittedAt: string;
}

export interface WishData {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
  isUserAdded?: boolean;
}

const RSVP_KEY = 'sk_wedding_rsvp_entries';
const WISHES_KEY = 'sk_wedding_wishes_entries';

const INITIAL_WISHES: WishData[] = [
  {
    id: 'wish-kutties',
    name: 'Adhvik Guhan & Ananyaa',
    relation: 'Kutties',
    message: 'Heartiest congratulations to our dearest Chaacha & Chaachi! We love you both so much and cannot wait to celebrate and dance at the wedding!',
    date: '12 Sep 2026',
    likes: 24,
    isUserAdded: false,
  },
  {
    id: 'wish-1',
    name: 'Ramesh & Meena Uncle/Aunt',
    relation: 'Family',
    message: 'May Lord Venkateshwara shower immense grace, health, and endless happiness upon Sarvesh & Keerthana as you step into this beautiful holy union.',
    date: '12 Sep 2026',
    likes: 12,
    isUserAdded: false,
  },
  {
    id: 'wish-2',
    name: 'Anand & Divya',
    relation: 'Friends',
    message: 'Heartiest congratulations to the wonderful couple! Wishing you both a lifetime of adventure, deep understanding, laughter, and prosperity.',
    date: '13 Sep 2026',
    likes: 8,
    isUserAdded: false,
  },
  {
    id: 'wish-3',
    name: 'Venkatesh Prasad',
    relation: 'Colleague',
    message: 'Wishing you a very blessed wedding day and a lifetime of shared dreams turning into reality. Congratulations Sarvesh & Keerthana!',
    date: '14 Sep 2026',
    likes: 5,
    isUserAdded: false,
  },
];

export function getStoredRsvps(): RsvpData[] {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading RSVPs from localStorage', e);
    return [];
  }
}

export function saveRsvp(data: Omit<RsvpData, 'id' | 'submittedAt'>): RsvpData {
  const rsvps = getStoredRsvps();
  const newEntry: RsvpData = {
    ...data,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    submittedAt: new Date().toISOString(),
  };
  rsvps.unshift(newEntry);
  try {
    localStorage.setItem(RSVP_KEY, JSON.stringify(rsvps));
  } catch (e) {
    console.error('Error saving RSVP to localStorage', e);
  }
  return newEntry;
}

export function getStoredWishes(): WishData[] {
  try {
    const raw = localStorage.getItem(WISHES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading wishes from localStorage', e);
  }
  saveWishesList(INITIAL_WISHES);
  return INITIAL_WISHES;
}

export function saveWishesList(wishes: WishData[]): void {
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
  } catch (e) {
    console.error('Error writing wishes to localStorage', e);
  }
}

export function addWish(name: string, relation: string, message: string): WishData {
  const wishes = getStoredWishes();
  const newWish: WishData = {
    id: `wish_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    relation: relation.trim() || 'Well-wisher',
    message: message.trim(),
    date: 'Just now',
    likes: 1,
    isUserAdded: true,
  };
  wishes.unshift(newWish);
  saveWishesList(wishes);
  return newWish;
}

export function toggleWishLike(wishId: string): WishData[] {
  const wishes = getStoredWishes();
  const updated = wishes.map((w) => {
    if (w.id === wishId) {
      return { ...w, likes: w.likes + 1 };
    }
    return w;
  });
  saveWishesList(updated);
  return updated;
}
