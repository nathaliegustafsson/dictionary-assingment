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
                            <h1 style={{ fontFamily: 'Playfair Display, serif' }}>
                                {wordData[0].word}
                            </h1>
                            {wordData[0].phonetics.map((phonetic, index) => (
                                <li key={index} style={{ listStyle: 'none', display: 'flex' }}>
                                    <p style={{ fontFamily: 'Playfair Display, serif' }}>
                                        {phonetic.text}
                                    </p>
                                    {phonetic.audio && (
                                        <audio controls>
                                            <source src={phonetic.audio} type="audio/mp3" />
                                        </audio>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div
                            className="border"
                            style={{ height: '1px', width: '100%', backgroundColor: 'black' }}
                        ></div>

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
