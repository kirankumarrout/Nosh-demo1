export const restaurant = {
  name: 'Nosh',
  tagline: 'Where every bite feels like home.',
  phone: '+91 77510 54666',
  phoneLink: 'tel:+917751054666',
  address: 'K8/906, House of Lords, Kalinga Nagar, Shampur, Bhubaneswar, Odisha 751029',
  instagram: 'https://www.instagram.com/n_o_s_h_25/',
  directions:
    'https://www.google.com/maps/search/?api=1&query=Nosh%20K8%2F906%20House%20of%20Lords%20Kalinga%20Nagar%20Bhubaneswar%20751029',
  // Only populate this with original restaurant footage. Do not use the reference screen recordings.
  kitchenVideo: '' as string,
};

export type Category = 'All dishes' | 'Fish' | 'Mutton' | 'Rice & sides' | 'Dessert';
export const categories: Category[] = ['All dishes', 'Fish', 'Mutton', 'Rice & sides', 'Dessert'];
export type MenuItem = {
  name: string;
  price: number;
  category: Exclude<Category, 'All dishes'>;
  note: string;
};

// Faithful transcription of the uploaded Chhadakhai promotion, not a current everyday menu.
export const menuItems: MenuItem[] = [
  {
    name: 'Khainga Tandoor Poda',
    price: 499,
    category: 'Fish',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Khainga Tawa Masala',
    price: 499,
    category: 'Fish',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Khainga Tawa Fry',
    price: 499,
    category: 'Fish',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Mudi Ghanto / Chencheda',
    price: 249,
    category: 'Fish',
    note: 'From the Chhadakhai special menu',
  },
  { name: 'Macha Besara', price: 279, category: 'Fish', note: 'From the Chhadakhai special menu' },
  {
    name: 'Ghee Arna Khasi Maansha',
    price: 429,
    category: 'Mutton',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Khasi Maansha Kassa',
    price: 349,
    category: 'Mutton',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Mutton Yakhni Pulao',
    price: 379,
    category: 'Mutton',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Basanti Pulao',
    price: 199,
    category: 'Rice & sides',
    note: 'From the Chhadakhai special menu',
  },
  {
    name: 'Ghee Arna',
    price: 129,
    category: 'Rice & sides',
    note: 'From the Chhadakhai special menu',
  },
  { name: 'Chhena Poda', price: 79, category: 'Dessert', note: 'From the Chhadakhai special menu' },
];

export const guestFavourites = [
  'Kasturi Fish',
  'Banjara Chicken Tikka',
  'Kung Pao Chicken',
  'Masala Kulcha',
  'Apricot Delight',
];

export const gallery = [
  {
    src: 'interior',
    alt: 'Nosh dining room with orange arches, palm murals and cream armchairs',
    caption: 'A seat for every story.',
    kind: 'THE SPACE',
  },
  {
    src: 'platters',
    alt: 'Two Nosh platters with golden bites, sauce and garnish',
    caption: 'Better when shared.',
    kind: 'THE FOOD',
  },
  {
    src: 'arch-detail',
    alt: 'An orange arch and palm artwork beside a Nosh dining table',
    caption: 'The little details.',
    kind: 'THE FEELING',
  },
  {
    src: 'sandwich',
    alt: 'Grilled sandwich triangles on a grey ceramic platter',
    caption: 'Make a little time.',
    kind: 'THE MOMENT',
  },
];

export const reviews = [
  {
    quote:
      'Really loved the quality of the food.. Freshness of the food.. Friendliness of the staff..',
    author: 'Aryan Padhy',
    detail: 'Google review excerpt',
  },
  {
    quote: 'Like the food. Service was good. Good ambiance.',
    author: 'ronali priyadarshini',
    detail: 'Google review excerpt',
  },
  {
    quote:
      'The ambience is cozy, chill, and very aesthetically pleasing- perfect for a relaxed outing.',
    author: 'Aleeva Rath',
    detail: 'Google review excerpt',
  },
];
