import React from "react";

const ThankYou = () => {
    const handelClick = () => {
        window.location.reload();
    }

    return (
        <div className={'ms-container'}>

            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "column",
                    gap: '20px',
                    height: '100vh'
                }}
            >
                <h1 className="ms-title">Kiitos tilauksestasi</h1>

                <button type={'button'} className="ms-link" onClick={handelClick}>Takaisin kotisivulle</button>
            </div>
        </div>
    )
}

export default ThankYou;