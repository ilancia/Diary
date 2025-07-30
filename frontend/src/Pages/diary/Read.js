import { useEffect, useState } from 'react'
import './Read.css'
import api from '../../api/diaryApi';
import { useNavigate } from 'react-router-dom';

export const Read = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const id = window.location.pathname.split('/').pop();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await api.get(`/diary/Read/${id}`)
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        navigate('/Login');
        alert('로그인이 필요합니다.');
        localStorage.removeItem('token');
      }
    };

    fetchDiary();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !content.trim()) {
        alert('제목과 내용을 입력하세요');
      } else {
        await api.put(`/diary/Update/${id}`, { title: title, content: content });
        alert('수정 완료');
        navigate('/User');
      }
    } catch (err) {
      alert(err, '수정 실패');
    }
  }

  return (
    <div>
      <div onClick={() => { setUpdate(update ? false : true) }}> 수정하기 </div>
      {update ? (
        <form onSubmit={handleUpdate}>
          <input className='read-title' name='title' spellCheck='false' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목' />
          <textarea className='read-content' name='content' spellCheck='false' value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용' />
          <button className='read-update' type='submit'>수정</button>
        </form>
      ) : (
        <div>
          <div className='read-title'>{title}</div>
          <div className='read-content'>{content}</div>
        </div>
      )}
    </div>
  )
}