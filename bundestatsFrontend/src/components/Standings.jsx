import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';

const Standings = () => {
    const [standingsTable, setStandingsTable] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [season, setSeason] = useState(2024);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seasonStatus, setSeasonStatus] = useState('ONGOING');

    const seasons = [2024, 2023, 2022];

    const navigate = useNavigate();


    const fetchStandings = async () => {
        try {
            setLoading(true);

            const params = season ? { season } : {};

            const response = await axios.get('https://bundestats-latest.onrender.com/standings', { params });
            const data = response.data;
            if (data && data.standings && data.standings[0]?.table) {
                setStandingsTable(data.standings[0].table);
            } else {
                setError('Standings data not available');
            }

            setSeasonStatus(data.season.winner ? 'FINISHED' : 'ONGOING');
        } catch (error) {
            console.error('Error fetching standings:', error);
            setError('Failed to load standings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStandings();
    }, [season])

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        navigate(`/team/${team.team.id}`);
    };

    const seasonOptions = seasons.map((yr) => ({
        value: yr,
        label: `${yr}`
    }));


    return (
        <div className="w-full h-full bg-[#303333] p-6 sm:p-10 pt-[2vw]">
            <div className="overflow-x-auto md:overflow-x-hidden">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <div>
                        <label
                            htmlFor="season"
                            className="text-white font-bold text-lg lg:text-3xl mr-2"
                        >
                            Season:
                        </label>
                        <Select
                            id="season"
                            value={seasonOptions.find((option) => option.value === season)}
                            onChange={(selectedOption) => setSeason(selectedOption.value)}
                            options={seasonOptions}
                            className="rounded-xl text-white w-full max-w-xs"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderRadius: '12px',
                                    backgroundColor: '#303333',
                                    borderWidth: '2px'
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    borderRadius: '10px',
                                    backgroundColor: '#303333',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    color: 'white',
                                    backgroundColor: state.isFocused ? '#555' : '#303333',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#555',
                                    },
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: 'white',
                                })
                            }}
                        />
                    </div>
    
                    <div>
                        <h1 className='text-white lg:text-5xl md:text-4xl text-2xl border-[0.2vw] px-[0.5vw] py-[0.3vw] rounded-xl'>
                            Status: <span className={`${seasonStatus === 'FINISHED' ? 'text-[#C07171] font-semibold' : 'text-[#4758D6] font-semibold'}`}>{seasonStatus}</span>
                        </h1>
                    </div>
                </div>
    
                <div className="bg-[#333333] border border-white p-4 rounded-xl">
                    <h1 className="md:text-6xl text-3xl text-white mb-[1vw] font-semibold text-center">Bundesliga Standings</h1>
    
                    {error && <div className="text-red-500 mb-6 text-center">{error}</div>}
    
                    <div className="overflow-x-auto">
                        <table className="w-full text-white border-collapse border border-white">
                            <thead>
                                <tr className="bg-[#dd6e68]">
                                    <th className="border border-white p-2 sm:text-lg text-sm">Position</th>
                                    <th className="border border-white p-2 sm:text-lg text-sm">Team</th>
                                    <th className="border border-white p-2 sm:text-lg text-sm">Points</th>
                                    <th className="border border-white p-2 sm:text-lg text-sm">GF - GA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4">
                                            <ClipLoader color="#ffffff" size={50} />
                                            <p className='text-white text-center text-xl'>This process may take upto 2 minutes when loading for the first time.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    standingsTable.length > 0 ? (
                                        standingsTable.map((entry, index) => (
                                            <tr
                                                key={entry.team.id || index}
                                                className="hover:bg-[#a5d2d1] hover:duration-[600ms] hover:ease-in-out hover:text-black cursor-pointer"
                                                onClick={() => handleTeamClick(entry)}
                                            >
                                                <th className="border border-white p-2 sm:text-lg text-sm text-center">{entry.position}</th>
                                                <td className="border border-white p-2 flex items-center sm:text-lg text-sm font-semibold">
                                                    <img
                                                        src={entry.team.crest || '/default-crest.png'}
                                                        alt={entry.team.name}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 mr-4"
                                                    />
                                                    {entry.team.shortName}
                                                </td>
                                                <th className="border border-white p-2 sm:text-lg text-sm text-center">{entry.points}</th>
                                                <th className="border border-white p-2 sm:text-lg text-sm text-center">{entry.goalsFor} - {entry.goalsAgainst}</th>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center p-4 text-red-700">No data available</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Standings;
