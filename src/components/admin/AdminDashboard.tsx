import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './admin.css';

interface Category {
  id: number;
  title: string;
  text: string;
  image: string;
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [editedText, setEditedText] = useState<Record<number, string>>({});
  const [editedImage, setEditedImage] = useState<Record<number, string>>({});
  const [savingAll, setSavingAll] = useState(false);

  const [showFeatured, setShowFeatured] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Check authentication status after initial load
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  // ✅ Load featured data if authenticated
  useEffect(() => {
    if (!isAdmin) return;

    fetch('/api/admin/get_featured.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.items);
        }
      })
      .catch(err => {
        console.error('Error loading featured items:', err);
      })
      .finally(() => setLoading(false));
  }, [isAdmin]);

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

  const toggleMessages = () => {
    setShowMessages(prev => {
      const next = !prev;
      if (next) {
        fetch('/api/contact/get_messages.php')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setMessages(data.messages);
            }
          })
          .catch(err => {
            console.error('Error loading messages:', err);
            alert('Error loading messages.');
          });
      }
      return next;
    });
  };

  const handleTextChange = (id: number, value: string) =>
    setEditedText(prev => ({ ...prev, [id]: value }));

  const handleImageChange = (id: number, value: string) =>
    setEditedImage(prev => ({ ...prev, [id]: value }));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const resp = await fetch('/api/admin/uploadImage.php', {
        method: 'POST',
        body: formData,
      });
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

  const handleSaveAll = async () => {
    setSavingAll(true);
    const updated = categories.map(cat => ({
      ...cat,
      text: editedText[cat.id] ?? cat.text,
      image: editedImage[cat.id] ?? cat.image,
    }));

    setCategories(updated);
    setEditedText({});
    setEditedImage({});

    try {
      const resp = await fetch('/api/admin/update_featured.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updated }),
      });
      const data = await resp.json();
      if (!data.success) alert('Failed to save changes.');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving data.');
    }

    setSavingAll(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) return <p>Loading dashboard...</p>;

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
              <label>Text:</label>
              <textarea
                rows={3}
                value={editedText[cat.id] ?? cat.text}
                onChange={e => handleTextChange(cat.id, e.target.value)}
              />
              <label>Image URL:</label>
              <input
                type="text"
                value={editedImage[cat.id] ?? cat.image}
                onChange={e => handleImageChange(cat.id, e.target.value)}
              />
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, cat.id)} />
              <div className="image-preview">
                <p>Preview:</p>
                <img
                  src={
                    (editedImage[cat.id] ?? cat.image).startsWith('http') ||
                    (editedImage[cat.id] ?? cat.image).startsWith('/uploads/')
                      ? editedImage[cat.id] ?? cat.image
                      : `/uploads/${editedImage[cat.id] ?? cat.image}`
                  }
                  alt={`Preview ${cat.id}`}
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
              </div>
            </div>
          ))}
          <button onClick={handleSaveAll} disabled={savingAll} className="save-all-button">
            {savingAll ? 'Saving All...' : 'Save All Changes'}
          </button>
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
            <ul className="bookings-list">
  {bookings.map((b, i) => (
    <li key={i}>
      <strong>Passenger:</strong> {b.first_name} {b.last_name}<br />
      <strong>Email:</strong> {b.email} <br />
      <strong>Phone:</strong> {b.phone} <br />
      <strong>From:</strong> {b.from_location} → <strong>To:</strong> {b.to_location}<br />
      <strong>Trip:</strong> {b.trip_type}, <strong>Departure:</strong> {b.departure_date}
      {b.return_date && <> <strong> to:</strong> {b.return_date}</>}<br />
      <strong>Adults:</strong> {b.number_of_adults}, <strong>Kids:</strong> {b.number_of_kids}<br />
      <strong>Travel mode:</strong> {b.travel_mode}, <strong>Hotel:</strong> {b.hotel || 'N/A'}<br />
      {b.kids_ages && (
        <>
          <strong>Kids' Ages:</strong>{" "}
          {Array.isArray(b.kids_ages)
            ? b.kids_ages.join(", ")
            : JSON.parse(b.kids_ages).join(", ")}
        </>
      )}
    </li>
  ))}
</ul>

          )}
        </div>
      )}

      <button onClick={toggleMessages}>
        {showMessages ? '▲ Hide Messages' : '▼ Show Messages'}
      </button>
      {showMessages && (
        <div className="dropdown-section">
          <h2>Messages</h2>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>
                  <strong>From:</strong> {msg.name} ({msg.email})<br />
                  <strong>Message:</strong> {msg.message}<br />
                  <strong>Date:</strong> {msg.created_at}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <button onClick={handleLogout} className="admin-logout-link">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
