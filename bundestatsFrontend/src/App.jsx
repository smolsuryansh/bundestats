import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Teams from "./components/Teams"
import TeamDetails from "./components/TeamDetails"

import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Standings from "./components/Standings";
import Matches from "./components/Matches";
import Scorers from "./components/Scorers";

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState('')
  const [filteredTeams, setFilteredTeams] = useState([])
  const [loading, setLoading] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term)

    // filter teams
    const filtered = teams.filter((team) => 
        team.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTeams(filtered);
  }

  useEffect(() => {
    const fetchTeams = async() => {
      try {
        setLoading(true);
        const response = await axios.get('https://bundestats-latest.onrender.com/teams');
        setTeams(response.data.teams);
        setFilteredTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching teams: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [])

  return (
    <Router>
      <NavBar onSearch={handleSearch} searchTerm={searchTerm} />
      <Routes>
        <Route path="/" element={<Teams filteredTeams={filteredTeams} loading={loading}/>} />
        <Route path="/team/:id" element={<TeamDetails teams={teams}/>} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/matches" element={<Matches searchTerm={searchTerm} onSearch={setSearchTerm} />} />
        <Route path="/scorers" element={<Scorers />} />
      </Routes>
    </Router>
  )
}

export default App
