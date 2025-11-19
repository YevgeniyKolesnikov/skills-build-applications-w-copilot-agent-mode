import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-4 loading">Loading leaderboard...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>🏆 Leaderboard</h2>
      <div className="table-responsive">
        {leaderboard.length === 0 ? (
          <p className="text-center">No leaderboard entries found.</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Points</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    {index === 0 && <span className="badge bg-warning text-dark">🥇 {index + 1}</span>}
                    {index === 1 && <span className="badge bg-secondary">🥈 {index + 1}</span>}
                    {index === 2 && <span className="badge bg-danger">🥉 {index + 1}</span>}
                    {index > 2 && <span className="badge bg-primary">{index + 1}</span>}
                  </td>
                  <td><strong>{entry.user_name || entry.user}</strong></td>
                  <td><span className="badge bg-success">{entry.total_points} pts</span></td>
                  <td>{new Date(entry.last_updated).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
