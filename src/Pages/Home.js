import React, { useEffect, useState } from 'react'
import { Create } from './Create'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Read } from './Read';
import Header from '../component/Header';
import "./Home.css"
import axios from 'axios';

export default function Home() {
    const navigate = useNavigate();
    const goToHome = () => { navigate('/') };
    const goToCreate = () => { navigate('/Create') };
    const location = useLocation();
    const rotary = location.pathname === "/" ? goToCreate : goToHome;
    const [diaryList, setDiaryList] = useState([]);
    const isNotEmpty = location.pathname === "/" && diaryList.length > 0
    const [test, setTest] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/common/notice`)
            .then((response) => {
                setTest(response.data.body);
            }).catch((Error) => {
                console.log(Error);
            })
    }, [])

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
            <div class="header-wrapper">
                <div class="name">유정호</div>
                <Header rotary={rotary} location={location} />
            </div>
            <p></p>
            {location.pathname === "/" ? test.map((test) => <div class='home-title' onClick={() => navigate(`/Read/${test.id}`)} ><div class = 'to-read'>{test.title}</div></div>) :null}

            {isNotEmpty ? <button class="remove-button" onClick={() => { handleRemoveDiary() }}>삭제</button> : null}
            {isNotEmpty ? diaryList.map((diary) => (<div class="home-title"> <div class="to-read" onClick={() => navigate(`/Read/${diary.id}`)}>{diary.title}</div>|
                <input class="check-box" type='checkbox' checked={diary.ischeck} onChange={(e) => checkbox(e, diary.id)} />
            </div>)) : null}
            <Routes>
                <Route path='/Create' element={<Create setDiaryList={setDiaryList} />} />
                <Route path='/Read/:id' element={<Read setDiaryList={setDiaryList} navigate={navigate} diaryList={diaryList} test={test} />} />
            </Routes>
        </div>
    )
}
