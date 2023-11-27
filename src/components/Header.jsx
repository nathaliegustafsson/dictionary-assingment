function Header() {
    return (
        <div
            className="header-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                marginBottom: '2rem',
            }}
        >
            <h1
                style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.5rem',
                    fontWeight: '300',
                }}
            >
                Dictionary
            </h1>
        </div>
    );
}

export default Header;
