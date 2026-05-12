// ===== Google Books API Service =====

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Fetch books by search query
export async function searchBooks(query, maxResults = 20) {
  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  const data = await res.json();
  return (data.items || []).map(formatBook);
}

// Fetch a single book by ID
export async function getBookById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book details');
  const data = await res.json();
  return formatBook(data);
}

// Fetch books by category/genre
export async function getBooksByCategory(category, maxResults = 10) {
  const res = await fetch(`${BASE_URL}?q=subject:${encodeURIComponent(category)}&maxResults=${maxResults}&orderBy=relevance`);
  if (!res.ok) throw new Error('Failed to fetch books');
  const data = await res.json();
  return (data.items || []).map(formatBook);
}

// Format raw API data into a clean book object
function formatBook(item) {
  const v = item.volumeInfo || {};
  return {
    id: item.id,
    title: v.title || 'Untitled',
    authors: v.authors || ['Unknown Author'],
    description: v.description || 'Description Not Available',
    categories: v.categories || ['General'],
    rating: v.averageRating || null,
    ratingsCount: v.ratingsCount || 0,
    image: v.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    publishedDate: v.publishedDate || 'Unknown',
    pageCount: v.pageCount || 0,
    publisher: v.publisher || 'Unknown Publisher',
    price: generateIndianPrice(v.title),
    previewLink: v.previewLink || '#',
  };
}

// Generate a consistent Indian price (₹) from book title
function generateIndianPrice(title) {
  if (!title) return 299;
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 800) + 199; // Range: ₹199 to ₹999
}

// ===== Static Indian Featured Books =====
// These are hardcoded Indian books with Open Library cover images
export const INDIAN_FEATURED_BOOKS = [
  {
    id: 'indian-1',
    title: 'Wings of Fire',
    authors: ['Dr. A.P.J. Abdul Kalam'],
    description: 'An autobiography of A.P.J. Abdul Kalam, covering his early life, effort, hardship, fortitude, luck and chance that led him to lead Indian space research and become the 11th President of India.',
    categories: ['Biography'],
    rating: 4.5,
    ratingsCount: 12000,
    image: 'https://covers.openlibrary.org/b/isbn/9788173711466-L.jpg',
    publishedDate: '1999',
    pageCount: 180,
    publisher: 'Universities Press',
    price: 399,
    previewLink: '#',
  },
  {
    id: 'indian-2',
    title: 'The Immortals of Meluha',
    authors: ['Amish Tripathi'],
    description: 'The first book of the Shiva Trilogy. A reimagining of the Hindu god Shiva as a Tibetan immigrant who arrives in the Indus Valley civilization and discovers his destiny.',
    categories: ['Indian Mythology'],
    rating: 4.3,
    ratingsCount: 8500,
    image: 'https://covers.openlibrary.org/b/isbn/9789380658742-L.jpg',
    publishedDate: '2010',
    pageCount: 408,
    publisher: 'Westland Press',
    price: 499,
    previewLink: '#',
  },
  {
    id: 'indian-3',
    title: 'The Alchemist',
    authors: ['Paulo Coelho'],
    description: 'A magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. One of the most-read books in India across all age groups.',
    categories: ['Fiction'],
    rating: 4.4,
    ratingsCount: 15000,
    image: 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
    publishedDate: '1988',
    pageCount: 197,
    publisher: 'HarperOne',
    price: 299,
    previewLink: '#',
  },
  {
    id: 'indian-4',
    title: 'Atomic Habits',
    authors: ['James Clear'],
    description: 'A proven framework for improving every day. James Clear reveals practical strategies that will teach you how to form good habits, break bad ones, and master tiny behaviors that lead to remarkable results.',
    categories: ['Self-Help'],
    rating: 4.7,
    ratingsCount: 20000,
    image: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    publishedDate: '2018',
    pageCount: 320,
    publisher: 'Penguin Random House',
    price: 499,
    previewLink: '#',
  },
  {
    id: 'indian-5',
    title: 'India After Gandhi',
    authors: ['Ramachandra Guha'],
    description: 'A comprehensive and authoritative account of the history of the world\'s largest democracy — India — from independence in 1947 to the present day.',
    categories: ['Indian History'],
    rating: 4.6,
    ratingsCount: 6700,
    image: 'https://covers.openlibrary.org/b/isbn/9780330396110-L.jpg',
    publishedDate: '2007',
    pageCount: 900,
    publisher: 'Pan Macmillan',
    price: 799,
    previewLink: '#',
  },
  {
    id: 'indian-6',
    title: 'Rich Dad Poor Dad',
    authors: ['Robert T. Kiyosaki'],
    description: 'What the rich teach their kids about money — that the poor and middle class do not! One of the top-selling personal finance books in India.',
    categories: ['Business'],
    rating: 4.3,
    ratingsCount: 18000,
    image: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
    publishedDate: '1997',
    pageCount: 336,
    publisher: 'Plata Publishing',
    price: 399,
    previewLink: '#',
  },
  {
    id: 'indian-7',
    title: 'Ikigai',
    authors: ['Héctor García', 'Francesc Miralles'],
    description: 'The Japanese secret to a long and happy life. Discover the concept of ikigai — your reason for being — and learn how to apply it for a fulfilling life.',
    categories: ['Self-Help'],
    rating: 4.2,
    ratingsCount: 12000,
    image: 'https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg',
    publishedDate: '2017',
    pageCount: 208,
    publisher: 'Penguin Life',
    price: 349,
    previewLink: '#',
  },
  {
    id: 'indian-8',
    title: 'Think Like a Monk',
    authors: ['Jay Shetty'],
    description: 'Drawing from his experience as a monk, Jay Shetty shares timeless wisdom on overcoming negativity, finding purpose, and living a meaningful life.',
    categories: ['Self-Help'],
    rating: 4.3,
    ratingsCount: 7800,
    image: 'https://covers.openlibrary.org/b/isbn/9781982134488-L.jpg',
    publishedDate: '2020',
    pageCount: 352,
    publisher: 'Simon & Schuster',
    price: 499,
    previewLink: '#',
  },
];

// Genre categories for browsing
export const CATEGORIES = [
  'Fiction',
  'Science',
  'Technology',
  'History',
  'Romance',
  'Fantasy',
  'Mystery',
  'Biography',
  'Self-Help',
  'Business',
];
