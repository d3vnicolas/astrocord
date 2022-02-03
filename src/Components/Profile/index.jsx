const Profile = (props) => {
    return (
        <>
            <style jsx>{`
                div{background-color: red;} 
            `}</style>
            <div className='profile'>
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
                <span onClick={() => props.setShowProfile(false)}>X</span>
            </div>
        </>
    );
}

export default Profile;