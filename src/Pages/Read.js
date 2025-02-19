import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Read.css"

export const Read = (props) => {
  const { id } = useParams();
  const [foundDiary, setFoundDiary] = useState(props.diaryList.find(d => (d.id) == id));
  const copiedDiary = [...props.diaryList];
  const listFindIndex = props.diaryList.findIndex((dia) => dia.id == foundDiary.id);
  
  const updateList = () => {
    copiedDiary[listFindIndex].title = foundDiary.title;
    copiedDiary[listFindIndex].content = foundDiary.content;
    props.setDiaryList(copiedDiary);
    // props.diaryList.splice(listFindIndex, 1, foundDiary)
    props.navigate("/");
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setFoundDiary({ ...foundDiary, [name]: value, });
  }
  //Update기능 구현 리스트에 저장된 
  return (
    <div>
      <div class="update-wrapper">
        <button onClick={() => { updateList() }} >수정</button>
      </div>
      <input class="title" name="title" value={foundDiary.title} onChange={onChange} placeholder='제목' />
      <textarea class="content" name="content" value={foundDiary.content} onChange={onChange} placeholder='내용' />
    </div>
  )
}
