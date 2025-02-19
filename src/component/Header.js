import React from 'react'

export default function Header(props) {
  const Home = props.location.pathname == "/" ? "글쓰기" : "홈으로";

  return (
    <div>
      <button onClick={props.rotary}>{Home}</button>
    </div>
  )
}
