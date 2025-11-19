import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-4 loading">Loading workouts...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="table-responsive">
        {workouts.length === 0 ? (
          <p className="text-center">No workouts found.</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Description</th>
                <th>Difficulty</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td><strong>{workout.name}</strong></td>
                  <td>{workout.description}</td>
                  <td>
                    {workout.difficulty_level === 'Beginner' && <span className="badge bg-success">{workout.difficulty_level}</span>}
                    {workout.difficulty_level === 'Intermediate' && <span className="badge bg-warning text-dark">{workout.difficulty_level}</span>}
                    {workout.difficulty_level === 'Advanced' && <span className="badge bg-danger">{workout.difficulty_level}</span>}
                    {!['Beginner', 'Intermediate', 'Advanced'].includes(workout.difficulty_level) && <span className="badge bg-secondary">{workout.difficulty_level}</span>}
                  </td>
                  <td>{workout.duration}</td>
                  <td><span className="badge bg-primary">{workout.calories_burned}</span></td>
                  <td>
                    <button className="btn btn-sm btn-success">Start Workout</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Workouts;
