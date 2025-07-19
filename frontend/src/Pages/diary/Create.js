import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Create.css"
import api from '../../api/diaryApi'

export const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 입력하세요");
      } else {
        const response = await api.post('/CRUD/Create', {
          title,
          content,
        });
        alert('작성 완료');
        navigate("/");
      }
    } catch (error) {
      alert('일기 작성에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <div>
      <form className="create-form" onSubmit={() => handleCreate()}>
        <input className="title" type="text" spellCheck="false" onChange={(e) => setTitle(e.target.value)} placeholder='제목' />
        <textarea className="content" spellCheck="false" onChange={(e) => setContent(e.target.value)} placeholder='내용' />
        <button className="save" type="submit">작성</button>
      </form>
    </div>
  )
}