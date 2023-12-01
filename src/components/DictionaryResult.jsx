import styled from 'styled-components';

// Function to get the first object containing both text and audio and
// if audio do not exist, just show the text
function getPhoneticWithTextAndAudio(phonetics) {
    const withTextAndAudio = phonetics?.find((phonetic) => phonetic.text && phonetic.audio);

    // If there's an object containing both text and audio, use that
    if (withTextAndAudio) {
        return [withTextAndAudio];
    }

    // Otherwise, use the first object with just text (if it exists)
    const withText = phonetics?.find((phonetic) => phonetic.text);
    return withText ? [withText] : [];
}

function DictionaryResult({ wordData, error }) {
    const selectedPhonetics = getPhoneticWithTextAndAudio(wordData?.[0]?.phonetics);

    return (
        <div>
            {error ? (
                <ErrorDiv>{error}</ErrorDiv>
            ) : (
                wordData &&
                wordData.length > 0 && (
                    <div
                        style={{
                            width: '480px',
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
                                {selectedPhonetics?.map((phonetic, index) => (
                                    <li key={index} style={{ listStyle: 'none', display: 'flex' }}>
                                        {phonetic.audio && (
                                            <VolumeImage
                                                src="/volume-icon.svg"
                                                alt="Play Icon"
                                                onClick={() => {
                                                    const audio = new Audio(phonetic.audio);
                                                    audio.play();
                                                }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </div>
                            <div
                                style={{ display: 'flex', gap: '0.5rem', letterSpacing: '0.15rem' }}
                            >
                                {selectedPhonetics?.map((phonetic, index) => (
                                    <li key={index} style={{ listStyle: 'none', display: 'flex' }}>
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
                        {/* I've chosen to show a maximum of 5 definitions per partOfSpeech, 
                        so that it doesn't take up too much space */}
                        {wordData[0].meanings[0].definitions
                            .slice(0, 5)
                            .map((definition, index) => (
                                <div key={index}>
                                    <ul
                                        style={{
                                            padding: 0,
                                            marginBottom: '1.5rem',
                                            marginTop: '1.5rem',
                                        }}
                                    >
                                        <List key={index}>
                                            <p style={{ fontFamily: 'Cormorant Garamond' }}>
                                                {definition.definition}
                                            </p>
                                        </List>
                                    </ul>
                                </div>
                            ))}

                        {/* Here I've chosen to show the other partOfSpeech and their definitions, as
                        the first partOfSpeech is already shown. As before I'v cosen to show 5 definitions
                        per partOfSpeech, so that they don't take up too much space */}
                        {wordData[0].meanings.slice(1).map((meaning, index) => (
                            <div key={index}>
                                <p style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>
                                    {meaning.partOfSpeech.charAt(0).toUpperCase() +
                                        meaning.partOfSpeech.slice(1)}
                                </p>
                                <ul style={{ padding: 0 }}>
                                    {meaning.definitions
                                        .slice(0, 5)
                                        .map((definition, definitionIndex) => (
                                            <List key={definitionIndex}>
                                                <p style={{ fontFamily: 'Cormorant Garamond' }}>
                                                    {definition.definition}
                                                </p>
                                            </List>
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
                                                {/* I've chosen to show a maximum of 6 synonyms, 
                                                    so that it doesn't take up too much space */}
                                                {wordData[0].meanings[0].synonyms
                                                    .slice(0, 6)
                                                    .map((synonym, synonymIndex) => (
                                                        <List key={synonymIndex}>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Cormorant Garamond',
                                                                }}
                                                            >
                                                                {synonym}
                                                            </p>
                                                        </List>
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
                                                {/* I've chosen to show a maximum of 6 antonyms, 
                                                    so that it doesn't take up too much space */}
                                                {wordData[0].meanings[0].antonyms
                                                    .slice(0, 6)
                                                    .map((antonym, antonymIndex) => (
                                                        <List key={antonymIndex}>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Cormorant Garamond',
                                                                }}
                                                            >
                                                                {antonym}
                                                            </p>
                                                        </List>
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

//---- STYLING ----//
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

const VolumeImage = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const List = styled.li`
    list-style: none;
`;
