import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Create.css"

export const Create = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const newDiary = { id: Date.now(), title: title, content: content, ischeck: false };

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요");
    } else {
      props.setDiaryList((prevList) => [...prevList, newDiary]);
      navigate("/");
    }
  };

  return (
    <div>
      <div class="save-wrapper">
        <button class="save" onClick={handleCreate} >저장</button>
      </div>
      <input class="title" onChange={(e) => setTitle(e.target.value)} placeholder='제목' />
      <textarea class="content" onChange={(e) => setContent(e.target.value)} placeholder='내용' />
    </div>
  )
}
