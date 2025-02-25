import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Read.css"

export const Read = (props) => {
  const { id } = useParams();
  const [foundDiary, setFoundDiary] = useState(props.diaryList.find(d => (d.id) == id));
  const copiedDiary = [...props.diaryList];
  const listFindIndex = props.diaryList.findIndex((dia) => dia.id == foundDiary.id);

  const updateList = () => {
    if (!foundDiary.title.trim() || !foundDiary.content.trim()) {
      alert("수정내용은 공백이 될 수 없습니다.");
    } else {
      copiedDiary[listFindIndex].title = foundDiary.title;
      copiedDiary[listFindIndex].content = foundDiary.content;
      props.setDiaryList(copiedDiary);
      props.navigate("/");
    }
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setFoundDiary({ ...foundDiary, [name]: value, });
  }
  //Update기능 구현 리스트에 저장된 
  return (
    <div>
      <button class="update" onClick={() => { updateList() }} >수정</button>
      <input class="title" name="title" spellCheck="false" value={foundDiary.title} onChange={onChange} placeholder='제목' />
      <textarea class="content" name="content" spellCheck="false" value={foundDiary.content} onChange={onChange} placeholder='내용' />
    </div>
  )
}
