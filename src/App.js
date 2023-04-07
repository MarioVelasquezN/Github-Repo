import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token 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`
        }
      });
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '30px' }}>GitHub Profile Viewer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleUsernameChange}
        style={{ padding: '10px', borderRadius: '5px', border: 'none', marginRight: '10px' }}
      />
      <button
        onClick={() => setUsername('')}
        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
      >
        Clear
      </button>
      {user && (
        <div style={{ marginTop: '30px' }}>
          <img src={user.avatar_url} alt={`${user.name}'s avatar`} style={{ width: '200px', height: '200px', borderRadius: '50%', border: '5px solid #ccc' }} />
          <h2 style={{ marginTop: '20px' }}>{user.name}</h2>
          <p style={{ marginTop: '10px', marginBottom: '10px' }}>{user.bio}</p>
          <p style={{ marginBottom: '5px' }}>Followers: {user.followers}</p>
          <p style={{ marginBottom: '20px' }}>Following: {user.following}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0366d6', fontWeight: 'bold' }}>View on GitHub</a>
        </div>
      )}
    </div>
  );
}

export default App;