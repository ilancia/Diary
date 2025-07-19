import axios from 'axios';
import React, { useState, useEffect } from 'react'

export const UserDiary = () => {
    const [diaryList, setDiaryList] = useState([]);

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const response = await axios.get('/CRUD/diaries');
                const data = await response.json();
                setDiaryList(data);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };
        fetchDiaries();
    }, []);

    return (
        <div>
            {diaries.length > 0 ? (
                diaries.map((diary) => (
                    <div key={diary._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                        <h3>{diary.title}</h3>
                        <p>{diary.content}</p>
                    </div>
                ))
            ) : (
                <p>작성된 다이어리가 없습니다.</p>
            )}
        </div>
    )
}
