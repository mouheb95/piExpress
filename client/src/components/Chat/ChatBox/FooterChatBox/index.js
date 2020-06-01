import React, { useState } from "react";

export default function FooterChatBox({ onSubmit, conversation_id, owner }) {
    const [content, setContent] = useState('')
    const submit = e => {
        e.preventDefault()
        onSubmit({ content, conversation_id, owner })
    }

    return (
        <div>
            <form onSubmit={submit}>

            <div className="gx-chat-main-footer">
                <div className="gx-flex-row gx-align-items-center" style={{ maxHeight: 100 }}>
                    <div className="gx-col">
                        <div className="gx-form-group">
                            <textarea id="text-message" className="gx-border-0 ant-input gx-chat-textarea" value={content}
                    onChange={e => setContent(e.target.value)} placeholder="Tapez un message" />
                          
                        </div>
                    </div>
                    <button onClick={(e) => submit(e)}> send</button>
                    <i onClick={(e) => submit(e)}  className="gx-icon-btn icon icon-sent"  />

                </div>
            </div> 
            </form>
        </div>
    )
}