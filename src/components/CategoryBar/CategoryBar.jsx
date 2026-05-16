import { CATEGORIES } from '../../utils/mockData';
import './CategoryBar.css';

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar" id="category-bar">
      <button
        className={`cat-chip ${active === '' ? 'active' : ''}`}
        onClick={() => onSelect('')}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`cat-chip ${active === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
