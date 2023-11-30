import React, { useState } from 'react';
import styled from 'styled-components';
import DictionaryResult from './DictionaryResult';
import DictionarySearch from './DictionarySearch';

function Dictionary() {
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (searchTerm) => {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
            );
            if (!response.ok) {
                throw new Error(`Word not found. Please try again.`);
            }

            const data = await response.json();
            console.log(data);

            setWordData(data);
            clearError();
            setSearchTerm('');
        } catch (error) {
            setError(error.message);
            setWordData(null);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            fetchData(searchTerm);
            clearError();
        } else {
            setError('Please enter a word to search.');
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <div>
            <DictionaryContainer>
                <DictionarySearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    clearError={clearError}
                />
                <DictionaryResult wordData={wordData} error={error} />
            </DictionaryContainer>
        </div>
    );
}

export default Dictionary;

//---- STYLING ----//
const DictionaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f4f3f2;
    padding: 3rem;
    width: 35rem;
    margin-bottom: 4rem;
`;
