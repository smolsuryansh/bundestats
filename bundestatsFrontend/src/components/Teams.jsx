import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Teams = ({ filteredTeams, loading }) => {

    const navigate = useNavigate();

    const handleTeamClick = (team) => {
        navigate(`/team/${team.id}`);
    }


    return (
        <div className='w-full h-full bg-[#303333]'>

            <div className='w-full text-white pt-[2vw] flex flex-col items-center justify-center'>
                <h1 className='lg:text-6xl sm:text-5xl text-3xl font-bold'>
                    Welcome to Bundestats!
                </h1>
                <p className='mt-[1vw] sm:text-lg text-[3vw] font-semibold'>
                    Start off by selecting a Bundesliga team to see their information.
                </p>
            </div>

            {loading ? (
                <div className='flex flex-col justify-center items-center text-center h-64'>
                    <ClipLoader color='#ffffff' size={50} />
                    <p className='text-white text-center sm:text-xl text-lg mt-4'>This process may take upto 2 minutes when loading for the first time.</p>
                </div>
            ) : (
                <div className='py-[2vw] px-[7vw] grid sm:grid-cols-3 gap-10 grid-cols-2'>
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => (
                            <div
                                key={team.id}
                                className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform bg-white hover:bg-[#c07171] hover:duration-[600ms] hover:ease-in-out rounded-3xl lg:border-[0.3vw] sm:border-[0.5vw] border-[0.8vw] border-[#c07171] py-[3vw] text-[#303333] hover:text-white'
                                onClick={() => handleTeamClick(team)}
                            >
                                <img
                                    src={team.crest}
                                    alt={team.name}
                                    className='w-40 h-40 object-contain'
                                />
                                <p className='mt-4 lg:text-2xl sm:text-lg text-sm font-semibold text-center'>{team.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>Something went wrong :(</p>
                    )}
                </div>
            )}

        </div>
    )
}

export default Teams