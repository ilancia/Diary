import React from 'react';
import './Home.css'

export default function Home() {

    return (
        <div className='home-wrapper'>
            {/* {isNotEmpty ? <button className='remove-button' onClick={() => { handleRemoveDiary() }}>삭제</button> : null}
            {isNotEmpty ? diaryList.map((diary) => (<div className='home-title'> <div className='to-read' onClick={() => navigate(`/Read/${diary.id}`)}>{diary.title}</div>|
                <input className='check-box' type='checkbox' checked={diary.ischeck} onChange={(e) => checkbox(e, diary.id)} />
            </div>)) : null} */}
        </div>
    )
}
