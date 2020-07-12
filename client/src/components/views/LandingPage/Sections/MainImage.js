import React from 'react';

function MainImage(props) {
    return (
        <div style={{ background: `url(${props.image})`,
                        height: '500px',
                        width: '100%',
                        backgroundSize: '100%, cover',
                        backgroundPosition: 'center, center',
                        position: 'relative'
                    }}>
            <div>
                <div>
                    <h2 style={{ color: 'white' }}>{props.title}</h2>
                    <p style={{ color: 'white', fontSize: '1rem' }}> {props.text}</p>
                </div>
            </div>

        </div>
    )
}

export default MainImage