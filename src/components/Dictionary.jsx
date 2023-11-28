import React, { useState } from 'react';
import styled from 'styled-components';

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
                throw new Error(`Word not found. Please try again.`);
            }

            const data = await response.json();
            console.log(data);

            setWordData(data);
            clearError();
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
        <DictionaryContainer>
            <InputContainer>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        type="submit"
                        onClick={() => {
                            handleSearch();
                            clearError();
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                            search
                        </span>
                    </Button>
                </Form>
            </InputContainer>

            {error ? (
                <ErrorDiv>{error}</ErrorDiv>
            ) : (
                wordData &&
                wordData.length > 0 && (
                    <div
                        style={{
                            width: '450px',
                        }}
                    >
                        <ul style={{ padding: 0 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '32px',
                                        margin: 0,
                                    }}
                                >
                                    {wordData[0].word}
                                </h2>
                                {wordData[0].phonetics
                                    .filter((phonetic) => phonetic.text && phonetic.audio)
                                    .slice(0, 1)
                                    .map((phonetic, index) => (
                                        <li
                                            key={index}
                                            style={{ listStyle: 'none', display: 'flex' }}
                                        >
                                            <img
                                                src="/volume-icon.svg"
                                                alt="Play Icon"
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    const audio = new Audio(phonetic.audio);
                                                    audio.play();
                                                }}
                                            />
                                        </li>
                                    ))}
                            </div>
                            {wordData[0].phonetics
                                .filter((phonetic) => phonetic.text && phonetic.audio)
                                .slice(0, 1)
                                .map((phonetic, index) => (
                                    <li key={index} style={{ listStyle: 'none', display: 'flex' }}>
                                        <p style={{ fontFamily: 'Playfair Display, serif' }}>
                                            {phonetic.text}
                                        </p>
                                    </li>
                                ))}
                        </ul>

                        <div
                            className="border"
                            style={{ height: '1px', width: '100%', backgroundColor: 'black' }}
                        ></div>

                        <h3 style={{ fontFamily: 'Cormorant Garamond' }}>Meanings:</h3>
                        {wordData[0].meanings.map((meaning, index) => (
                            <div key={index}>
                                <p style={{ fontFamily: 'Cormorant Garamond' }}>
                                    {meaning.partOfSpeech}
                                </p>
                                <ul style={{ padding: 0 }}>
                                    {meaning.definitions.map((definition, index) => (
                                        <li key={index} style={{ listStyle: 'none' }}>
                                            <p style={{ fontFamily: 'Cormorant Garamond' }}>
                                                {definition.definition}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <h3 style={{ fontFamily: 'Cormorant Garamond' }}>Synonyms:</h3>
                        <div>
                            <ul style={{ padding: 0 }}>
                                {wordData[0].meanings[0].synonyms &&
                                    wordData[0].meanings[0].synonyms
                                        .slice(0, 6)
                                        .map((synonym, synonymIndex) => (
                                            <li key={synonymIndex} style={{ listStyle: 'none' }}>
                                                <p style={{ fontFamily: 'Cormorant Garamond' }}>
                                                    {synonym}
                                                </p>
                                            </li>
                                        ))}
                            </ul>
                        </div>
                    </div>
                )
            )}
        </DictionaryContainer>
    );
}

export default DictionaryExample;

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

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    background-color: #f4f3f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border: none;
    border-radius: 7px;
    box-shadow: 0px 3px 10.300000190734863px rgba(0, 0, 0, 0.25);
    width: 450px;
    height: 30px;
`;

const Input = styled.input`
    background-color: #f4f3f2;
    font-family: 'Roboto Mono';
    border: none;
    width: 100%;
    outline: none;
`;

const Button = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorDiv = styled.div`
    font-family: 'Cormorant Garamond';
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;
