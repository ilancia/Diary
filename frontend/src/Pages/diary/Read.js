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
        const res = await api.get(`/diary/Read/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error(error);
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
        await api.put(`/diary/Update/${id}`, { title: title, content: content }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        alert('수정 완료');
        navigate('/User');
      }
    } catch (err) {
      alert('통신환경이 불안정합니다. 다시 시도해주세요.');
      console.log(err);
    }
  }

  // const { id } = useParams();
  // const [foundDiary, setFoundDiary] = useState(props.diaryList.find(d => (d.id) == id));
  // const copiedDiary = [...props.diaryList];
  // const listFindIndex = props.diaryList.findIndex((dia) => dia.id == foundDiary.id);


  // const updateList = () => {
  //   if (!foundDiary.title.trim() || !foundDiary.content.trim()) {
  //     alert('수정 내용은 공백이 될 수 없습니다.');
  //   } else {
  //     copiedDiary[listFindIndex].title = foundDiary.title;
  //     copiedDiary[listFindIndex].content = foundDiary.content;
  //     props.setDiaryList(copiedDiary);
  //     props.navigate('/');
  //   }
  // };

  // const onChange = (event) => {
  //   const { value, name } = event.target;
  //   setFoundDiary({ ...foundDiary, [name]: value, });
  // }

  return (
    <div>
      <div onClick={() => { setUpdate(update ? false : true) }}> 수정하기 </div>
      {update ? (
        <form onSubmit={handleUpdate}>
          <input className='title' name='title' spellCheck='false' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목' />
          <textarea className='content' name='content' spellCheck='false' value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용' />
          <button className='update' type='submit'>수정</button>
        </form>
      ) : (
        <div>
          <div className='title'>{title}</div>
          <div className='content'>{content}</div>
        </div>
      )}
    </div>
  )
}