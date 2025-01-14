import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TeamDetails = ({ teams = [] }) => {

    const [standingsTable, setStandingsTable] = useState([]);
    
    const navigate = useNavigate();

    if (!Array.isArray(teams)) {
        navigate('/'); 
        return null;
    }

    const { id } = useParams();
    const team = teams.find((team) => team.id.toString() === id);

    useEffect(() => {
        
        if (!team) {
            navigate('/');
        }
    }, [team, navigate])

    if (!team) {
        return null;
    }

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get('https://bundestats-latest.onrender.com/standings');
                const data = response.data;
                if (data && data.standings && data.standings[0]?.table) {
                    setStandingsTable(data.standings[0].table);
                } else {
                    setError('Standings data not available');
                }
            } catch (error) {
                console.error('Error fetching standings:', error);
                setError('Failed to load standings');
            }
        };
        fetchStandings();
    }, []);

    const teamStandings = standingsTable.find((entry) => entry.team.id.toString() === id)

    return (
        <div className='w-full h-full bg-[#303333] sm:p-10 p-5 text-white'>
            <div className='text-white'>

                <div className='bg-[#c07171] grid-cols-2 gap-2 border-[0.2vw] border-white px-[0.7vw] py-[0.7vw] rounded-xl flex items-center justify-between'>
                    <div>
                        <h2 className='lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold'>{team.name} ({team.tla})</h2>

                        <img src={team.crest} className='lg:size-[10vw] md:size-[14vw] size-[18vw] p-[0.1vw]' />

                        <h3 className='sm:text-lg text-base'>Founded: {team.founded}</h3>

                        <h3 className='sm:text-lg text-base pt-[0.4vw]'>Website: <a href={team.website} target='_blank' className='sm:text-lg text-base text-blue-600 underline'>{team.website}</a> </h3>

                        <h2 className='lg:text-2xl sm:text-xl text-base mt-[0.4vw]'>Venue: <span className='font-semibold hover:text-blue-500'><a href={`https://www.google.com/search?q=${team.venue}`} target='_blank'>{team.venue}</a></span></h2>

                    </div>

                    <div className='flex flex-col items-center bg-[#c07171] border-[0.2vw] border-white rounded-xl sm:p-[1.5vw] p-[0.5vw]'>
                        <h2 className='lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold mb-[1vw] text-center'>
                            Position in Bundesliga
                        </h2>
                        {teamStandings ? (
                            <div className='flex items-center justify-center bg-[#c07171] text-[#303333] rounded-xl border-2 border-white w-[8vw] h-[8vw] sm:w-[10vw] sm:h-[10vw] md:w-[15vw] md:h-[15vw] lg:w-[20vw] lg:h-[20vw]'>
                                <span className='lg:text-[8vw] md:text-[6vw] sm:text-[5vw] text-[4vw] font-bold'>
                                    {teamStandings.position}
                                </span>
                            </div>
                        ) : (
                            <p className='lg:text-2xl md:text-xl sm:text-lg text-sm text-center font-medium text-white'>
                                Position not available
                            </p>
                        )}
                    </div>

                </div>

                <div className='mt-[1vw] bg-[#c07171] border-[0.2vw] border-white rounded-xl'>
                    <h3 className='md:text-2xl text-xl font-semibold px-[0.5vw] py-[0.3vw]'>
                        Running competitions:
                    </h3>
                    <p className='flex items-center justify-between lg:px-[15vw] px-[2vw] pb-[0.5vw]'>
                        {team.runningCompetitions.map((competition, index) => (
                            <span key={index} className='text-center font-semibold text-lg'><a href={`https://www.google.com/search?q=${competition.name}`} target='_blank'>{competition.name}</a> <a href={`https://www.google.com/search?q=${competition.name}`} target='_blank'><img src={competition.emblem} className='hover:scale-110 duration-[600ms] ease-in-out' /></a> </span>
                        ))}
                    </p>
                </div>

                <div className='lg:text-7xl md:text-5xl sm:text-3xl text-2xl text-white my-[1.4vw] border-[0.15vw] border-white rounded-xl bg-[#c07171] w-fit px-[0.4vw] py-[0.6vw] font-semibold'>
                    <h1>{team.shortName}'s SQUAD:</h1>
                </div>

                <div className='bg-[#c07171] hover:bg-[#85c1ca] duration-[600ms] ease-in-out border-[0.15vw] border-white my-[1vw] rounded-xl px-[0.7vw] py-[0.7vw] w-fit mb-[1.4vw]'>
                    <h3 className='lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold'>
                        Coach: <a href={`https://google.com/search?q=${team.coach.name}`} target='_blank'>{team.coach.name}</a>
                    </h3>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-white border-collapse border border-white'>
                        <thead>
                            <tr className='bg-[#c07171]'>
                                <th className='border border-white px-4 py-2 lg:text-2xl md:text-xl sm:text-base text-sm'>Name</th>
                                <th className='border border-white px-4 py-2 lg:text-2xl md:text-xl sm:text-base text-sm'>Position</th>
                                <th className='border border-white px-4 py-2 lg:text-2xl md:text-xl sm:text-base text-sm'>Nationality</th>
                                <th className='border border-white px-4 py-2 lg:text-2xl md:text-xl sm:text-base text-sm'>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.squad && team.squad.length > 0 ? (
                                team.squad.map((player, index) => (
                                    <tr key={index} className='hover:bg-[#85c1ca] hover:duration-[600ms] hover:ease-in-out cursor-pointer'>
                                        <th className='border border-white px-4 py-2 text-center lg:text-2xl md:text-xl sm:text-base text-sm'><a href={`https://google.com/search?q=${player.name}`} target='_blank'>{player.name}</a></th>
                                        <td className='border border-white px-4 py-2 text-center lg:text-2xl md:text-xl sm:text-base text-sm'><a href={`https://google.com/search?q=${player.name}`} target='_blank'>{player.position || 'Position not available'}</a></td>
                                        <td className='border border-white px-4 py-2 text-center lg:text-2xl md:text-xl sm:text-base text-sm'><a href={`https://google.com/search?q=${player.name}`} target='_blank'>{player.nationality}</a></td>
                                        <td className='border border-white px-4 py-2 text-center lg:text-2xl md:text-xl sm:text-base text-sm'>
                                            <a href={`https://google.com/search?q=${player.name}`} target='_blank' className='text-blue-500 underline'>
                                                View Details
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className='text-center px-4 py-2'>No squad information available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default TeamDetails