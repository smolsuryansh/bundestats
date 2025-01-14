import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';

const Scorers = () => {
    const [topScorers, setTopScorers] = useState([]);
    const [season, setSeason] = useState(2024);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const scorersPerPage = 15;
    const seasons = [2024, 2023, 2022];

    const fetchScoreres = async () => {
        try {
            setLoading(true);
            const params = { season };

            const response = await axios.get(`https://bundestats-latest.onrender.com/scorers`, { params });
            const data = response.data;

            setTopScorers(data.scorers || []);
        } catch (error) {
            console.error('Error fetching scorers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchScoreres();
    }, [season]);

    const indexOfLastScorer = currentPage * scorersPerPage;
    const indexOfFirstScorer = indexOfLastScorer - scorersPerPage;
    const currentScorer = topScorers.slice(indexOfFirstScorer, indexOfLastScorer);

    const seasonOptions = seasons.map((yr) => ({
        value: yr,
        label: `${yr}`
    }));

    return (
        <div className="w-full h-full bg-[#303333] p-4">
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
            </div>

            <div className="bg-[#333333] border border-white p-4 rounded-xl">
                <h2 className="text-xl lg:text-4xl font-bold mb-4 text-white text-center">
                    Top Scorers
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader color="#ffffff" size={50} />
                    </div>
                ) : (
                    <>
                        {topScorers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[768px] lg:min-w-[1024px] table-auto border-collapse text-white text-sm lg:text-lg">
                                    <thead>
                                        <tr className="bg-[#c07171]">
                                            <th className="border px-2 lg:px-4 py-2">Position</th>
                                            <th className="border px-2 lg:px-4 py-2">Name</th>
                                            <th className="border py-2">Matches</th>
                                            <th className="border px-2 lg:px-4 py-2">Goals</th>
                                            <th className="border px-2 lg:px-4 py-2">Assists</th>
                                            <th className="border px-2 lg:px-4 py-2">Penalties</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentScorer.map((scorer, index) => (
                                            <tr key={index}>
                                                <td className="border px-2 lg:px-4 py-2 text-center">{index + 1}</td>
                                                <td className="border px-2 lg:px-4 py-2 flex items-center gap-2">
                                                    <img
                                                        src={`${scorer.team.crest}`}
                                                        alt={scorer.team.tla}
                                                        className="w-6 h-6 lg:w-8 lg:h-8"
                                                    />
                                                    <span>
                                                        {scorer.player.name} ({scorer.team.tla}){' '}
                                                        <span className="text-[#ccc575] ml-2">{scorer.player.section}</span>
                                                    </span>
                                                </td>
                                                <td className="border py-2 text-center">{scorer.playedMatches}</td>
                                                <th className="border px-2 lg:px-4 py-2 text-[#c07171] text-center">
                                                    {scorer.goals}
                                                </th>
                                                <th className="border px-2 lg:px-4 py-2 text-[#85c1ca] text-center">
                                                    {scorer.assists}
                                                </th>
                                                <td className="border px-2 lg:px-4 py-2 text-center">{scorer.penalties}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-white text-center">No scorers available for this season.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Scorers;
