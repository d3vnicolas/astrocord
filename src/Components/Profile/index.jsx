const Profile = (props) => {
    return (
        <>
            <style jsx>{`
                div{
                    background-color: #5a5a5a;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                } 
            `}</style>
            <div className='profile'
                style={{
                    display: props.visible ? 'block' : 'none'
                }}
            >
                <div className="profile__content">
                    <div
                        style={{
                            width: '128px',
                            height: '128px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                        }}
                    ></div>
                    <h2>Nome do usuário</h2>
                    <p>Seguidores: 235</p>
                    <p>Projetos: 15</p>
                </div>
                <span onClick={() => props.setVisible(false)}>X</span>
            </div>
        </>
    );
}

export default Profile;