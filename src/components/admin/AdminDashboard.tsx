import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  { id: 1, title: 'Beach Escapes', text: 'Relax on sun-soaked beaches and crystal-clear waters.', image: p1 },
  { id: 2, title: 'Mountain Adventures', text: 'Find thrills and breathtaking views in the highlands.', image: p2 },
  { id: 3, title: 'City Tours', text: 'Immerse yourself in vibrant cultures and historic landmarks.', image: p3 },
];

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>(initialItems);
  const [editedText, setEditedText] = useState<Record<number, string>>({});
  const [editedImage, setEditedImage] = useState<Record<number, string>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [showFeatured, setShowFeatured] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const toggleBookings = () => {
    setShowBookings(prev => {
      const next = !prev;
      if (next) {
        fetch('/api/bookings/get_bookings.php')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setBookings(data.bookings);
            } else {
              alert('Failed to load bookings.');
            }
          })
          .catch(err => {
            console.error('Error loading bookings:', err);
            alert('Error loading bookings.');
          });
      }
      return next;
    });
  };

  if (!isAdmin) return <p>Checking access...</p>;

  const handleTextChange = (id: number, value: string) => setEditedText(prev => ({ ...prev, [id]: value }));
  const handleImageChange = (id: number, value: string) => setEditedImage(prev => ({ ...prev, [id]: value }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const resp = await fetch('/api/admin/uploadImage.php', { method: 'POST', body: formData });
      const data = await resp.json();
      if (data.success) {
        setEditedImage(prev => ({ ...prev, [id]: data.url }));
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading image');
    }
  };

  const handleSave = (id: number) => {
    setLoadingId(id);
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, text: editedText[id] ?? cat.text, image: editedImage[id] ?? cat.image }
          : cat
      )
    );
    setEditedText(prev => { const c = { ...prev }; delete c[id]; return c; });
    setEditedImage(prev => { const c = { ...prev }; delete c[id]; return c; });
    setTimeout(() => setLoadingId(null), 500);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <button onClick={() => setShowFeatured(prev => !prev)}>
        {showFeatured ? '▲ Hide Featured Items' : '▼ Show Featured Items'}
      </button>
      {showFeatured && (
        <div className="dropdown-section">
          <h2>Edit Featured Items</h2>
          {categories.map(cat => (
            <div key={cat.id} className="category-edit-form">
              <h3>{cat.title} (ID: {cat.id})</h3>

              <label htmlFor={`text-${cat.id}`}>Text:</label>
              <textarea
                id={`text-${cat.id}`}
                rows={3}
                value={editedText[cat.id] ?? cat.text}
                onChange={e => handleTextChange(cat.id, e.target.value)}
              />

              <label htmlFor={`image-${cat.id}`}>Image URL:</label>
              <input
                type="text"
                id={`image-${cat.id}`}
                value={editedImage[cat.id] ?? cat.image}
                onChange={e => handleImageChange(cat.id, e.target.value)}
              />

              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, cat.id)} />

              <div className="image-preview">
                <p>Preview:</p>
                <img
                  src={editedImage[cat.id] ?? cat.image}
                  alt={`Preview ${cat.id}`}
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
              </div>

              <button onClick={() => handleSave(cat.id)} disabled={loadingId === cat.id}>
                {loadingId === cat.id ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={toggleBookings}>
        {showBookings ? '▲ Hide Bookings' : '▼ Show Bookings'}
      </button>
      {showBookings && (
        <div className="dropdown-section">
          <h2>Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul>
              {bookings.map((b, i) => (
                <li key={i}>
                  <strong>{b.departure_location}</strong> — {b.trip_type}, {b.departure_date}
                  {b.return_date && ` to ${b.return_date}`} | Adults: {b.number_of_adults}, Kids: {b.number_of_kids}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button onClick={() => setShowMessages(prev => !prev)}>
        {showMessages ? '▲ Hide Messages' : '▼ Show Messages'}
      </button>
      {showMessages && (
        <div className="dropdown-section">
          <h2>Messages</h2>
          <p>(We'll fill this in later)</p>
        </div>
      )}

      <button onClick={handleLogout} className="admin-logout-link">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;