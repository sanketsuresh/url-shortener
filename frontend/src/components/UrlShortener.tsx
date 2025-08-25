import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl, getShortUrl } from '../config/api';

interface UrlData {
  _id: string;
  longUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

const UrlShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [urlsLoading, setUrlsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setUrlsLoading(true);
      const response = await axios.get<UrlData[]>(getApiUrl('/api/urls'));
      setUrls(response.data);
    } catch (err: any) {
      console.log('Failed to fetch URLs:', err);
    } finally {
      setUrlsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!longUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?(([\da-z.-]+)\.([a-z.]{2,6})|localhost)([/\w .-]*)*\/?$/;
    if (!urlPattern.test(longUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      // Ensure URL has protocol
      const urlToShorten = longUrl.startsWith('http') ? longUrl : `https://${longUrl}`;
      
      const response = await axios.post<UrlData>(getApiUrl('/api/shorten'), {
        longUrl: urlToShorten,
      });

      setShortUrl(response.data.shortUrl || getShortUrl(response.data.shortCode));
      setLongUrl(''); // Clear the input
      fetchUrls(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data || 'An error occurred while shortening the URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
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

  return (
    <>
      <div className="url-shortener-container">
        <h2>Shorten Your URL</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="longUrl">Enter your long URL:</label>
            <input
              type="text"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}
        
        {loading && <div className="loading">Generating short URL...</div>}
        
        {shortUrl && (
          <div className="result">
            <h3>Your shortened URL:</h3>
            <div className="short-url">{shortUrl}</div>
            <button 
              type="button" 
              className="btn" 
              onClick={copyToClipboard}
              style={{ marginTop: '15px' }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      {/* URLs List Section */}
      <div className="admin-container">
        <div className="admin-header">
          <h2>Your Shortened URLs</h2>
          <button 
            onClick={fetchUrls}
            className="btn"
            disabled={urlsLoading}
          >
            {urlsLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

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
      </div>
    </>
  );
};

export default UrlShortener;
