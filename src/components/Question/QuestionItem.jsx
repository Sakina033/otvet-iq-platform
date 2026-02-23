import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestionFromFirestore, replyToQuestion } from '../../store/slices/questionsSlice';
import removeQ from '../../assets/icons/removeQ.svg';
import defaultAvatar from '../../assets/images/author.png';

const QuestionItem = ({ id, date, author, avatar, conversation }) => {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');
  
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [tempUserMsg, setTempUserMsg] = useState('');

  const currentUserString = localStorage.getItem("user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : {};

  const handleDelete = () => dispatch(deleteQuestionFromFirestore(id));

  const handleReplySubmit = (e) => {
    if (e.key === 'Enter' && replyText.trim()) {
      const textToSend = replyText.trim();
      setReplyText('');
      setTempUserMsg(textToSend);
      setIsTyping(true);
      setIsOpen(true);

      dispatch(replyToQuestion({ 
        questionId: id, 
        replyText: textToSend,
        currentUser: currentUser 
      }))
        .unwrap()
        .then(() => {
          setIsTyping(false);
          setTempUserMsg('');
        })
        .catch((err) => {
          console.error(err);
          setIsTyping(false);
          setTempUserMsg('');
        });
    }
  }

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  });

  const mainQuestion = conversation && conversation.length > 0 ? conversation[0] : null;
  const firstAiReply = conversation && conversation.length > 1 ? conversation[1] : null;
  const threadReplies = conversation && conversation.length > 2 ? conversation.slice(2) : [];

  if (!mainQuestion) return null; 

  return (
    <div className="forum-post">
      
      <div className="post-header">
          <img src={avatar || defaultAvatar} alt="avatar" className="post-avatar"/>
          <div className="post-info">
             <span className="post-author">{author}</span>
             <span className="post-date">{formattedDate}</span>
          </div>
          
          {currentUser.displayName === author && (
            <div className="remove_btn" onClick={handleDelete}>
               <img src={removeQ} alt="delete" />
            </div>
          )}
      </div>
      <div className="post-content">
        <p>{mainQuestion.text}</p>
      </div>

      {firstAiReply && (
        <div className="post-replies">
          <div className="reply-item ai-reply">
            <div className="reply-header">
               <span className="reply-author ai-badge">✨ AI-бот</span>
            </div>
            <div className="reply-content">
               <p>{firstAiReply.text}</p>
            </div>
          </div>
        </div>
      )}

      {(threadReplies.length > 0 || isTyping || tempUserMsg) && (
        <button className="toggle-replies-btn" onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? 'Скрыть продолжение ▲' : `Показать продолжение (${threadReplies.length}) ▼`}
        </button>
      )}

      {isOpen && (
        <div className="replies-wrapper">
          
          {(threadReplies.length > 0 || tempUserMsg || isTyping) && (
            <div className="post-replies">
              
              {threadReplies.map((reply, index) => (
                <div key={index} className={`reply-item ${reply.role === 'model' ? 'ai-reply' : 'user-reply'}`}>
                  <div className="reply-header">
                    {reply.role === 'model' ? (
                        <span className="reply-author ai-badge">✨ AI-бот</span>
                    ) : (
                        <div className="reply-user-info">
                            <img src={reply.authorPhoto || avatar || defaultAvatar} alt="mini-avatar" className="mini-reply-avatar" />
                            <span className="reply-author">{reply.authorName || author}</span>
                        </div>
                    )}
                  </div>
                  <div className="reply-content">
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))}

              {tempUserMsg && (
                <div className="reply-item user-reply">
                  <div className="reply-header">
                     <div className="reply-user-info">
                        <img src={currentUser.photoURL || defaultAvatar} alt="mini-avatar" className="mini-reply-avatar" />
                        <span className="reply-author">{currentUser.displayName || 'Аноним'}</span>
                     </div>
                  </div>
                  <div className="reply-content">
                    <p>{tempUserMsg}</p>
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="reply-item ai-reply">
                  <div className="reply-header">
                     <span className="reply-author ai-badge">✨ AI-бот</span>
                  </div>
                  <div className="reply-content typing-indicator">
                     <div className="typing-dots">
                        <span></span><span></span><span></span>
                     </div>
                  </div>
                </div>
              )}

            </div>
          )}

          <div className="mini-input-wrapper">
            <input 
              type="text"
              className="mini-reply-input"
              placeholder="Уточнить у ИИ..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleReplySubmit}
            />
          </div>

        </div>
      )}

    </div>
  )
}

export default QuestionItem;