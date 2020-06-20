import React, { useState, useEffect } from "react";

export default function FooterChatBox({ onSubmit, conversation_id, owner }) {
    const [content, setContent] = useState('')
    const submit = e => {
        e.preventDefault()
        onSubmit({ content, conversation_id, owner })
    }

    const keyPressed = (event) => {
        if (event.key === "Enter") {
            submit(event)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>

                <div className="gx-chat-main-footer">
                    <div className="gx-flex-row gx-align-items-center" style={{ maxHeight: 100 }}>
                        <div className="gx-col">
                            <div className="gx-form-group">
                                <textarea id="text-message" className="gx-border-0 ant-input gx-chat-textarea" value={content}
                                    onChange={e => setContent(e.target.value)} placeholder="Tapez un message"
                                    onKeyPress={e => keyPressed(e)}
                                />

                            </div>
                        </div>

                        <i onSubmit={(e) => submit(e)} className="gx-icon-btn icon icon-sent" />

                    </div>
                </div>
            </form>
        </div>
    )
}