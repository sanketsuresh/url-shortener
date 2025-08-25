import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getApiUrl, getShortUrl } from '../config/api';

interface UrlData {
  _id: string;
  longUrl: string;
  shortCode: string;
  shortUrl?: string;
  clicks: number;
  createdAt: string;
}

const Admin: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get<UrlData[]>(getApiUrl('/api/urls'));
      setUrls(response.data);
    } catch (err: any) {
      setError(err.response?.data || 'Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalClicks = () => {
    return urls.reduce((total, url) => total + url.clicks, 0);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading URLs...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <Link to="/" className="nav-link">
          Back to Shortener
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <p><strong>Total URLs:</strong> {urls.length}</p>
        <p><strong>Total Clicks:</strong> {getTotalClicks()}</p>
      </div>

      {urls.length === 0 ? (
        <p>No URLs have been shortened yet.</p>
      ) : (
        <table className="urls-table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td>
                  <a 
                    href={getShortUrl(url.shortCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-link"
                  >
                    {url.shortCode}
                  </a>
                </td>
                <td>
                  <div className="long-url" title={url.longUrl}>
                    <a 
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#333', textDecoration: 'none' }}
                    >
                      {url.longUrl}
                    </a>
                  </div>
                </td>
                <td>
                  <span className="clicks-badge">{url.clicks}</span>
                </td>
                <td>{formatDate(url.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button 
        onClick={fetchUrls}
        className="btn"
        style={{ marginTop: '20px' }}
      >
        Refresh Data
      </button>
    </div>
  );
};

export default Admin;
