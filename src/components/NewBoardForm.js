import React from 'react';

function NewBoardForm(props) {

    console.log(props)

    return (
        <div className="modal-container">
            <div className="modal boardModal">
                <form>
                    <label>Name this board</label>
                    <textarea 
                        name="boardName"
                        placeholder="What would you like to brainstorm?"
                        ref={boardName => boardName && boardName.focus()}
                        onChange={props.handleChange}
                    />
                    <button 
                        type="button"
                        onClick={props.addNewBoard.bind(this, props.sessionId)}
                    >
                        Create board
                    </button>  
                </form>              
            </div>
        </div>
    );
}

export default NewBoardForm;