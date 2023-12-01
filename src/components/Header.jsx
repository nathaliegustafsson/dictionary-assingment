import styled from 'styled-components';

function Header() {
    return (
        <HeaderContainer>
            <Link href="/">
                <Title>Dictionary</Title>
            </Link>
        </HeaderContainer>
    );
}

export default Header;

//---- STYLING ----//
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

const Title = styled.h1`
    font-family: 'Playfair Display, serif';
    font-size: 2.5rem;
    font-weight: 300;
`;

const Link = styled.a`
    text-decoration: none;
    color: black;
`;
