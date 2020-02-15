import React from 'react';

function Tester(props) {

    console.log(props)
    return (
        <div>
            <h1>heeeeey {props.activeUser  ? props.activeUser.displayName : "sucker"}</h1>
        </div>
    );
}

export default Tester;