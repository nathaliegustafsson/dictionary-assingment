import styled from 'styled-components';

function DictionarySearch({ searchTerm, setSearchTerm, handleSearch, clearError }) {
    return (
        <div>
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
        </div>
    );
}

export default DictionarySearch;

//---- STYLING ----//
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
    width: 480px;
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
