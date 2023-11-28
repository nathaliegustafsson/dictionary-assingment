import styled from 'styled-components';

function Header() {
    return (
        <HeaderContainer>
            <Title>Dictionary</Title>
        </HeaderContainer>
    );
}

export default Header;

//---- STYLING ----//
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-family: 'Playfair Display, serif';
    font-size: 2.5rem;
    font-weight: 300;
`;
