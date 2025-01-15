import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';

const Matches = ({ searchTerm }) => {
  const [matches, setMatches] = useState([]);
  const [season, setSeason] = useState(2024);
  const [status, setStatus] = useState('FINISHED');
  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const matchesPerPage = 15;
  const seasons = [2024, 2023, 2022];

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const params = season === 2024 ? { status } : { season, status };

      const response = await axios.get(`https://bundestats-latest.onrender.com/matches`, { params });
      let fetchedMatches = response.data.matches || [];

      // Sort scheduled matches
      if (status === 'SCHEDULED') {
        fetchedMatches = fetchedMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
      }

      // Reverse finished matches for newest first
      setMatches(status === 'FINISHED' ? fetchedMatches.reverse() : fetchedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsToggleDisabled(season !== 2024);
    setCurrentPage(1);
    fetchMatches();
  }, [season, status]);

  const filteredMatches = matches.filter(
    (match) =>
      match.homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);
  const currentFilteredMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  const seasonOptions = seasons.map((yr) => ({
    value: yr,
    label: `${yr}`,
  }));

  return (
    <div className="w-full h-full bg-[#303333] p-4">
      <div className="flex flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-auto">
          <label htmlFor="season" className="text-white font-bold mr-2 text-xl lg:text-3xl">
            Season:
          </label>
          <Select
            id="season"
            value={seasonOptions.find((option) => option.value === season)}
            onChange={(selectedOption) => setSeason(selectedOption.value)}
            options={seasonOptions}
            className="lg:w-auto md:w-[12vw] sm:w-[15vw] w-[23vw] rounded-xl text-white"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '12px',
                backgroundColor: '#303333',
                borderWidth: '2px',
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: '10px',
                backgroundColor: '#303333',
                borderWidth: '2px',
              }),
              option: (provided, state) => ({
                ...provided,
                color: 'white',
                backgroundColor: state.isFocused ? '#555' : '#303333',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white',
              }),
            }}
          />
        </div>

        <div className="w-full lg:w-auto">
          <button
            onClick={() => setStatus(status === 'FINISHED' ? 'SCHEDULED' : 'FINISHED')}
            className={`w-full lg:w-auto px-4 py-2 rounded-xl font-bold ${isToggleDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-black'
              }`}
            disabled={isToggleDisabled}
          >
            {status === 'FINISHED' ? 'Show Scheduled Matches' : 'Show Finished Matches'}
          </button>
        </div>
      </div>

      <div className="bg-[#333333] border border-white p-4 rounded-xl">
        <h2 className="text-4xl lg:text-7xl font-bold mb-4 text-white text-center">
          Matches{' '}
          <span className={`${status === 'FINISHED' ? 'text-[#c07171]' : 'text-blue-300'}`}>
            ({status})
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center text-center h-64">
            <ClipLoader color="#ffffff" size={50} />
            <div>
              <p className='text-white text-center text-xl'>This process may take upto 2 minutes when loading for the first time.</p>
            </div>
          </div>
        ) : (
          <>
            {filteredMatches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-white text-base lg:text-2xl">
                  <thead>
                    <tr className="bg-[#c07171]">
                      <th className="border px-2 py-2">Date</th>
                      <th className="border px-2 py-2">Home Team</th>
                      <th className="border px-2 py-2 bg-[#85c1ca] text-[#333333]">Score</th>
                      <th className="border px-2 py-2">Away Team</th>
                      <th className="border px-2 py-2 bg-[#83dc73] text-[#333333]">Result</th>
                      <th className="border px-2 py-2">Referee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFilteredMatches.map((match, index) => (
                      <tr key={index}>
                        <th className="border px-2 py-2">{new Date(match.utcDate).toISOString().split('T')[0]}</th>
                        <td className="border px-2 py-2 text-center">{match.homeTeam?.name}</td>
                        <th className="border px-2 py-2 text-[#85c1ca]">
                          {match.score.fullTime.home} - {match.score.fullTime.away}
                        </th>
                        <td className="border px-2 py-2 text-center">{match.awayTeam?.name}</td>
                        <th className="border px-2 py-2 text-[#83dc73]">
                          {match.score.winner === 'HOME_TEAM'
                            ? `${match.homeTeam?.shortName} (WINNER)`
                            : match.score.winner === 'AWAY_TEAM'
                              ? `${match.awayTeam?.shortName} (WINNER)`
                              : match.score.winner === 'DRAW'
                                ? 'Draw'
                                : 'Scheduled'}
                        </th>
                        <th className="border px-2 py-2">
                          <a
                            href={match.referees && match.referees.length > 0 ? `https://www.google.com/search?q=${match.referees[0].name}` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#a0effd]"
                          >
                            {match.referees && match.referees.length > 0 ? match.referees[0].name : 'Not Available'}
                          </a>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-red-500 text-lg lg:text-3xl font-semibold">
                No matches found, make sure the spelling is correct.
              </p>
            )}
          </>
        )}

        {/* {totalPages > 1 && !loading && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`md:px-3 md:py-1 md:mx-1 px-2 py-[0.5] mx-1 rounded-lg font-bold ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )} */}

        {totalPages > 1 && !loading && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="md:px-3 md:py-1 md:mx-1 px-2 py-[0.5] mx-1 rounded-lg font-bold bg-gray-300 text-black"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const startPage = Math.max(
                Math.min(currentPage - Math.floor(5 / 2), totalPages - 5 + 1),
                1
              );
              const page = startPage + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`md:px-3 md:py-1 md:mx-1 px-2 py-[0.5] mx-1 rounded-lg font-bold ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                    }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="md:px-3 md:py-1 md:mx-1 px-2 py-[0.5] mx-1 rounded-lg font-bold bg-gray-300 text-black"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
