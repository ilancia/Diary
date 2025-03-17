import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser'
import "./Read.css"

export const Read = (props) => {
  const { id } = useParams();
  const [foundDiary, setFoundDiary] = useState(props.diaryList.find(d => (d.id) == id));
  const copiedDiary = [...props.diaryList];
  const listFindIndex = props.diaryList.findIndex((dia) => dia.id == foundDiary.id);
  const foundTest = props.test.find(d => d.id == id);

  const updateList = () => {
    if (!foundDiary.title.trim() || !foundDiary.content.trim()) {
      alert("수정 내용은 공백이 될 수 없습니다.");
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

  const test = foundTest.body;
  console.log(foundTest.body)

  return (
    <div>
      <button class="update" onClick={() => { updateList() }} >수정</button>
      <input class="title" spellCheck="false" value={foundTest.title}/>
      {/* <input type="text" class="content" spellCheck="false" value={} /> */}
      <div class= 'uproaded-content'>{parse(test)}</div>
      {/* <textarea class="content" spellCheck="false" value={test} /> */}
      {/* <input class="title" name="title" spellCheck="false" value={foundDiary.title} onChange={onChange} placeholder='제목' />
      <textarea class="content" name="content" spellCheck="false" value={foundDiary.content} onChange={onChange} placeholder='내용' /> */}
    </div>
  )
}
