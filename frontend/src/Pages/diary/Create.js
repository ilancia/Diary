import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Create.css'
import api from '../../api/diaryApi';

export const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const auth = async () => {
      try {
        await api.get('/private/');
      } catch (error) {
        alert('로그인이 필요합니다.');
        localStorage.removeItem('token');
        navigate('/Login');
      }
    }
    auth();
  }, [navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        alert('제목과 내용을 입력하세요');
      } else {
        await api.post('/diary/Create', { title: title, content: content });
        alert('작성 완료');
        navigate('/User');
      }
    } catch (err) {
      alert('로그인이 필요한 서비스입니다.');
      localStorage.removeItem('token');
      navigate('/Login');
    }
  }

  return (
    <div>
      <form className='create-form' onSubmit={handleCreate}>
        <input className='create-title' type='text' spellCheck='false' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목' />
        <textarea className='create-content' spellCheck='false' value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용' />
        <button className='create-save' type='submit'>작성</button>
      </form>
    </div>
  )
}