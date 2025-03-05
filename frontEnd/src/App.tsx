import React, {useState, useEffect, JSX} from 'react';
import './App.css'



interface Team {
    tid: number;
    cid: number;
    did: number;
    school: string;
    name: string;  // This is probably  "mascot"
    abbrev: string;
    pop: number;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  }


function Header(): JSX.Element {
  return <h1>College Basketball teams</h1>
}

function TeamCard(props: {team: Team}): JSX.Element {
  return (
    <div className="team-card">
      <h2>{props.team.school}</h2>
      <p>Mascot: {props.team.name}</p>
      <p>Location: {props.team.city}, {props.team.state}</p>
    </div>
  )
}

function TeamList(props: {teams: Team[]}): JSX.Element {
  return (
    <div className="team-list">
      {props.teams.map((team, index) => <TeamCard key={index} team={team} />)}
    </div>
  )
}

async function fetchTeamData() {
  try {
    console.log("Starting fetch...");
    const response = await fetch('/CollegeBasketballTeams.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Data received:", data);
    
    // If data is an object with a property that contains the teams array
    // We need to figure out which property contains the teams
    if (!Array.isArray(data)) {
      // Log the first property value to see what it contains
      const firstKey = Object.keys(data)[0];
      console.log("First key:", firstKey);
      console.log("Value type:", typeof data[firstKey]);
      console.log("Is value an array?", Array.isArray(data[firstKey]));
      
      // If the first property contains an array, use that
      if (Array.isArray(data[firstKey])) {
        return data[firstKey];
      }
      
      // If the object itself has team properties, wrap it in an array
      if (data.school) {
        return [data];
      }
      
      // Try to extract an array from somewhere in the object
      for (const key in data) {
        if (Array.isArray(data[key])) {
          console.log("Found array in property:", key);
          return data[key];
        }
      }
    }
    
    // If data is already an array, just return it
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}


function App(): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    fetchTeamData().then(data => setTeams(data));
  }, []);

  return (
    <div className="App">
      <Header />
      {teams.length > 0 ? (
        <TeamList teams={teams} />
      ) : (
        <p>No teams to display. Check console for details.</p>
      )}
    </div>
  )
}



export default App
