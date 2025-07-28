import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/diaryApi';

export const User = () => {
    const [title, setTitle] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const res = await api.get(`/diary/Read/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                setTitle(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDiary();
    }, []);
    const handleDelete = async (id) => {
        try {
            await api.delete(`/diary/Delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            alert('삭제 완료');
            setTitle(title.filter(note => note._id !== id));
        } catch (error) {
            console.error(error);
            alert('삭제 실패', error);
        }
    };

    return (
        <div>
            {title.length > 0 ? (
                title.map((i) => (
                    <div key={i._id} className='uproaded-content'>
                        <div onClick={() => { navigate(`/diary/${i._id}`) }}>{i.title}</div>
                        <div className='delete' onClick={() => handleDelete(i._id)}>삭제</div>
                    </div>
                ))
            ) : (
                <div>(사진이 들어갈 자리)</div>
            )}
        </div>
    )
}
