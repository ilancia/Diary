import { useState } from 'react'
import { Create } from './Create'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Read } from './Read';
import Header from '../component/Header';
import "./Home.css"

export default function Home() {
    const navigate = useNavigate();
    const goToHome = () => { navigate('/') };
    const goToCreate = () => { navigate('/Create') };
    const location = useLocation();
    const rotary = location.pathname === "/" ? goToCreate : goToHome;
    const [diaryList, setDiaryList] = useState([]);
    const isNotEmpty = location.pathname === "/" && diaryList.length > 0

    const checkbox = (e, id) => {
        const checkedList = diaryList.map(diary => {
            return diary.id === id ? { id: id, title: diary.title, content: diary.content, ischeck: e.target.checked } : diary
        });
        setDiaryList(checkedList);
    }

    const handleRemoveDiary = () => {
        const remainList = diaryList.filter((diary) => diary.ischeck !== true)
        if (remainList.length === diaryList.length) alert("삭제하고싶은 것을 선택하세요");
        else setDiaryList(remainList);
    };

    return (
        <div>
            <div className="header-wrapper">
                <div className="name">유정호</div>
                <Header rotary={rotary} location={location} />
            </div>
            {isNotEmpty ? <button className="remove-button" onClick={() => { handleRemoveDiary() }}>삭제</button> : null}
            {isNotEmpty ? diaryList.map((diary) => (<div className="home-title"> <div className="to-read" onClick={() => navigate(`/Read/${diary.id}`)}>{diary.title}</div>|
                <input className="check-box" type='checkbox' checked={diary.ischeck} onChange={(e) => checkbox(e, diary.id)} />
            </div>)) : null}
            <Routes>
                <Route path='/Create' element={<Create setDiaryList={setDiaryList} />} />
                <Route path='/Read/:id' element={<Read setDiaryList={setDiaryList} navigate={navigate} diaryList={diaryList} />} />
            </Routes>
        </div>
    )
}
