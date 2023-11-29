import styled from 'styled-components';

function DictionaryResult({ wordData, error }) {
    return (
        <div>
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
                            <div
                                style={{ display: 'flex', gap: '0.5rem', letterSpacing: '0.15rem' }}
                            >
                                {wordData[0].phonetics
                                    .filter((phonetic) => phonetic.text && phonetic.audio)
                                    .slice(0, 1)
                                    .map((phonetic, index) => (
                                        <li
                                            key={index}
                                            style={{ listStyle: 'none', display: 'flex' }}
                                        >
                                            <p style={{ fontFamily: 'Playfair Display, serif' }}>
                                                {phonetic.text}
                                            </p>
                                        </li>
                                    ))}
                                {wordData[0].meanings.slice(0, 1).map((meaning, index) => (
                                    <div key={index}>
                                        <p style={{ fontFamily: 'Playfair Display' }}>
                                            {meaning.partOfSpeech}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ul>

                        <Border />

                        {wordData[0].meanings.map((meaning, index) => (
                            <div key={index}>
                                <ul
                                    style={{
                                        padding: 0,
                                        marginBottom: '1.5rem',
                                        marginTop: '1.5rem',
                                    }}
                                >
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

                        <div>
                            {wordData[0].meanings[0].synonyms &&
                                wordData[0].meanings[0].synonyms.length > 0 && (
                                    <div>
                                        <Border />
                                        <h3 style={{ fontFamily: 'Playfair Display' }}>Synonyms</h3>
                                        <div>
                                            <ul style={{ padding: 0 }}>
                                                {wordData[0].meanings[0].synonyms
                                                    .slice(0, 6)
                                                    .map((synonym, synonymIndex) => (
                                                        <li
                                                            key={synonymIndex}
                                                            style={{
                                                                listStyle: 'none',
                                                            }}
                                                        >
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Cormorant Garamond',
                                                                }}
                                                            >
                                                                {synonym}
                                                            </p>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div>
                            {wordData[0].meanings[0].antonyms &&
                                wordData[0].meanings[0].antonyms.length > 0 && (
                                    <div>
                                        <Border />
                                        <h3 style={{ fontFamily: 'Playfair Display' }}>Antonyms</h3>
                                        <div>
                                            <ul style={{ padding: 0 }}>
                                                {wordData[0].meanings[0].antonyms
                                                    .slice(0, 6)
                                                    .map((antonym, antonymIndex) => (
                                                        <li
                                                            key={antonymIndex}
                                                            style={{
                                                                listStyle: 'none',
                                                            }}
                                                        >
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Cormorant Garamond',
                                                                }}
                                                            >
                                                                {antonym}
                                                            </p>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default DictionaryResult;

const ErrorDiv = styled.div`
    font-family: 'Cormorant Garamond';
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;

const Border = styled.div`
    height: 1px;
    width: 100%;
    background-color: black;
`;
