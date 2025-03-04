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
    const response = await fetch('/CollegeBasketballTeams.json');
    return await response.json();
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
