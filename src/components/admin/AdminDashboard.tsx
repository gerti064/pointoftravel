// src/components/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './admin.css';

import p1 from '../../assets/p1.jpeg';
import p2 from '../../assets/p2.jpg';
import p3 from '../../assets/p3.jpg';

interface Category {
  id: number;
  title: string;
  text: string;
  image: string;
}

const initialItems: Category[] = [
  { id: 1, title: 'Beach Escapes',       text: 'Relax on sun-soaked beaches and crystal-clear waters.', image: p1 },
  { id: 2, title: 'Mountain Adventures', text: 'Find thrills and breathtaking views in the highlands.',     image: p2 },
  { id: 3, title: 'City Tours',          text: 'Immerse yourself in vibrant cultures and historic landmarks.', image: p3 },
];

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>(initialItems);
  const [editedText, setEditedText] = useState<Record<number, string>>({});
  const [editedImage, setEditedImage] = useState<Record<number, string>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  if (!isAdmin) return null;

  const handleTextChange = (id: number, value: string) => {
    setEditedText(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (id: number, value: string) => {
    setEditedImage(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = (id: number) => {
    setLoadingId(id);
    setCategories(prev => prev.map(cat =>
      cat.id === id
        ? {
            ...cat,
            text: editedText[id] ?? cat.text,
            image: editedImage[id] ?? cat.image
          }
        : cat
    ));
    setEditedText(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
    setEditedImage(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
    setTimeout(() => setLoadingId(null), 500);
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Edit Featured Items</h1>
      {categories.map(cat => (
        <div key={cat.id} className="category-edit-form">
          <h2>{cat.title} (ID: {cat.id})</h2>

          <label htmlFor={`text-${cat.id}`}>Text:</label>
          <textarea
            id={`text-${cat.id}`}
            rows={3}
            value={editedText[cat.id] ?? cat.text}
            onChange={e => handleTextChange(cat.id, e.target.value)}
          />

          <label htmlFor={`image-${cat.id}`}>Image:</label>
          <input
            type="text"
            id={`image-${cat.id}`}
            value={editedImage[cat.id] ?? cat.image}
            onChange={e => handleImageChange(cat.id, e.target.value)}
          />

          <div className="image-preview">
            <p>Preview:</p>
            <img
              src={editedImage[cat.id] ?? cat.image}
              alt={`Preview ${cat.id}`}
              style={{ maxWidth: '200px', maxHeight: '100px' }}
            />
          </div>

          <button
            onClick={() => handleSave(cat.id)}
            disabled={loadingId === cat.id}
          >
            {loadingId === cat.id ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
