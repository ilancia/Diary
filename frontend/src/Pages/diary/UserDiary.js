import axios from 'axios';
import { useState, useEffect } from 'react'

export const UserDiary = () => {
    const [diaryList, setDiaryList] = useState([]);

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const response = await axios.get('/diary/Read', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setDiaryList(response.data.title);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };
        fetchDiaries();
    }, []);

    return (
        <div>
            {diaryList.length > 0 ? (
                diaryList.map((diary) => (
                    <div key={diary._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                        <div>{diary.title}</div>
                    </div>
                ))
            ) : (
                <div>(사진이 들어갈 자리)</div>
            )}
        </div>
    )
}
