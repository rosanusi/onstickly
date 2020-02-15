import React from 'react';

function NewSessionForm(props) {

    console.log(props)

    return (
        <div className="modal-container">
            <div className="modal boardModal">
                <form>
                    <label>Name this session</label>
                    <input 
                        type="text"
                        name="sessionName"
                        ref={sessionName => sessionName && sessionName.focus()}
                        placeholder="Session name..."
                        onChange={props.handleChange}
                    />
                    <button 
                        type="button"
                        onClick={props.addNewSession}
                    >
                        Create
                    </button>  
                </form>              
            </div>
        </div>
    );
}

export default NewSessionForm;