import React, { useState } from 'react';

function DictionaryExample() {
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (searchTerm) => {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
            );
            if (!response.ok) {
                throw new Error(`Word not found`);
            }

            const data = await response.json();
            setWordData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            fetchData(searchTerm);
        }
    };

    return (
        <div
            className="dictionary-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F4F3F2',
                padding: '3rem',
            }}
        >
            <div
                className="input-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                    marginBottom: '2rem',
                }}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        handleSearch(); // Call your search function
                    }}
                    style={{
                        backgroundColor: '#F4F3F2',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem',
                        border: 'none',
                        borderRadius: '7px',
                        boxShadow: '0px 3px 10.300000190734863px rgba(0, 0, 0, 0.25)',
                        width: '450px',
                        height: '20px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundColor: '#F4F3F2',
                            fontFamily: 'Roboto Mono, monospace',
                            border: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                    />
                    <button
                        type="submit"
                        onClick={handleSearch}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            padding: 0,
                            marginBottom: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                            search
                        </span>
                    </button>
                </form>
            </div>

            {wordData && wordData.length > 0 && (
                <div>
                    <h1>{wordData[0].word}</h1>

                    <h2>Phonetics</h2>
                    <ul>
                        {wordData[0].phonetics.map((phonetic, index) => (
                            <li key={index}>
                                <p>{phonetic.text}</p>
                                {phonetic.audio && (
                                    <audio controls>
                                        <source src={phonetic.audio} type="audio/mp3" />
                                    </audio>
                                )}
                            </li>
                        ))}
                    </ul>

                    <h2>Meanings</h2>
                    {wordData[0].meanings.map((meaning, index) => (
                        <div key={index}>
                            <p>{meaning.partOfSpeech}</p>
                            <ul>
                                {meaning.definitions.map((definition, index) => (
                                    <li key={index}>
                                        <p>{definition.definition}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DictionaryExample;
