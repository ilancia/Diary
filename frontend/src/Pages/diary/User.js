import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/diaryApi';
import './User.css'
import dayjs from 'dayjs';

export const User = () => {
    const [title, setTitle] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const res = await api.get(`/diary/Read`)
                setTitle(res.data);
            } catch (error) {
                alert('로그인이 필요합니다.');
                localStorage.removeItem('token');
                navigate('/Login');
            }
        };
        fetchDiary();
    }, [navigate]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/diary/Delete/${id}`);
            setTitle(title.filter(i => i._id !== id));
            alert('삭제 완료');
        } catch (error) {
            alert('삭제 실패', error);
        }
    };

    return (
        <div>
            {title.length > 0 ? (
                title.map((i) => (
                    <div key={i._id} className='uploaded-wrapper'>
                        <div className='uploaded-left'>
                            <div className='uploaded-date'>{dayjs(i.createdAt).format('YYYY-MM-DD')}</div>
                            <div>|</div>
                            <div className='uploaded-title' onClick={() => { navigate(`/Read/${i._id}`) }}>{i.title}</div>
                        </div>
                        <button className='uploaded-delete' onClick={() => handleDelete(i._id)}>삭제</button>
                    </div>
                ))
            ) : (
                <div>(사진이 들어갈 자리)</div>
            )}
        </div>
    )
}
