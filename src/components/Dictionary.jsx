import React, { useEffect, useState } from 'react';

function DictionaryExample() {
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.dictionaryapi.dev/api/v2/entries/en/world'
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setWordData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!wordData) {
        return <div>Loading...</div>;
    }

    return (
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
                    <p>Part of Speech: {meaning.partOfSpeech}</p>
                    <ul>
                        {meaning.definitions.map((definition, index) => (
                            <li key={index}>
                                <p>Definition: {definition.definition}</p>
                                {/* You can add more details here, such as synonyms, antonyms, and examples */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DictionaryExample;
