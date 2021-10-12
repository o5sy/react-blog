import React, { useRef, useState } from "react";
import "./App.css";

// 게시글 데이터 객체
function Post(title, content, date) {
  this.title = title;
  this.content = content;
  this.date = date;
  this.like = 0;
}

// 메인 컴포넌트 모듈 (index.js에서 import해서 쓰임)
function App() {
  // 더미 데이터
  let postRawData = [
    new Post(
      "가을 여행지 추천",
      "어디로든~ 떠나고 싶어~",
      new Date(2021, 9, 10)
    ),
    new Post(
      "최고당 돈가스 후기",
      "음 역시 돈가스는 옳아",
      new Date(2021, 9, 9)
    ),
    new Post(
      "반려동물 유튜브 채널 추천",
      "너를 본 순간 내 심장은 멈췄다.. 너의 이름.. 백.재.롱",
      new Date(2021, 9, 8)
    ),
    new Post(
      "프론트엔드 면접 질문 모음",
      "호이스팅이란?",
      new Date(2021, 9, 7)
    ),
    new Post(
      "리액트 마스터 로드맵",
      "1. 코딩애플의 강의를 듣는다. 2. 간절히 기도한다.",
      new Date(2021, 9, 6)
    ),
  ];

  // state
  let [posts, setPostList] = useState(postRawData);
  let [displayModal, changeModalDisplay] = useState(false);
  let [showPostIdx, changeShowPost] = useState(0);

  // 게시글 별 좋아요 수 증가
  function addLikeCount(i) {
    let data = [...posts];
    data[i].like++;
    setPostList(data);
  }

  // 클릭한 게시글 모달 띄우기
  function showPost(idx) {
    changeShowPost(idx);
    changeModalDisplay(true);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발새발 blog</div>
      </div>
      <div className="content">
        {/* 입력 */}
        <WritePostForm posts={posts} setPostList={setPostList}></WritePostForm>

        {/* 게시글 */}
        <ul>
          {posts.map((post, i) => {
            return (
              <li className="post" key={i}>
                <h4
                  className="title"
                  onClick={() => {
                    showPost(i);
                  }}
                >
                  {post.title}
                  <span
                    className="like"
                    onClick={(event) => {
                      addLikeCount(i);
                      event.stopPropagation();
                    }}
                  >
                    👍
                  </span>
                  {post.like}
                </h4>
                <p>{getDateString(post.date)}</p>
              </li>
            );
          })}
        </ul>

        {/* 게시물 모달 */}
        {displayModal ? (
          <PostModal
            onClickClose={() => {
              changeModalDisplay(false);
            }}
            onClickLike={addLikeCount}
            post={posts[showPostIdx]}
            selectPostIdx={showPostIdx}
          ></PostModal>
        ) : null}

        {/* 모달창 - 강의 */}
        {/* {displayModal ? (
          <Modal post={posts} showPostIdx={showPostIdx}></Modal>
        ) : null} */}
      </div>
    </div>
  );
}

// 글 작성 폼 컴포넌트
function WritePostForm(props) {
  let titleRef = useRef();
  let contentRef = useRef();

  function post() {
    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();

    if (!title || !content) {
      alert("내용을 채워주세요.");
      return;
    }

    let data = [...props.posts];
    data.unshift(new Post(title, content, new Date(Date.now())));
    props.setPostList(data);

    titleRef.current.value = "";
    contentRef.current.value = "";

    alert("게시물이 등록되었습니다.");
  }

  return (
    <div className="post-form">
      <h2 className="heading">글 작성</h2>
      <div className="post-form__title">
        <label htmlFor="titleInput">제목</label>
        <input
          id="titleInput"
          className="title-input"
          type="text"
          ref={titleRef}
        />
      </div>
      <div className="post-form__content">
        <label htmlFor="contentInput">내용</label>
        <textarea
          id="contentInput"
          className="content-input"
          ref={contentRef}
        ></textarea>
      </div>
      <button onClick={post}>저장</button>
    </div>
  );
}

// 게시물 보기 모달 컴포넌트
function PostModal(props) {
  const post = props.post;

  function onClickLike() {
    props.onClickLike(props.selectPostIdx);
  }

  return (
    <div className="post-modal">
      <article className="post-inner">
        <h1 className="post__title">{post.title}</h1>
        <p className="post__info">
          {getDateString(post.date)} | <span onClick={onClickLike}>👍</span>{" "}
          {post.like}
        </p>
        <section className="post__content">{post.content}</section>
        <button onClick={props.onClickClose}>닫기</button>
      </article>
    </div>
  );
}

// 모달창 컴포넌트
// function Modal(props) {
//   let post = props.post[props.showPostIdx];
//   return (
//     <div className="modal">
//       <h3 className="title">{post.title}</h3>
//       <p>{getDateString(post.date)}</p>
//       <p>내용</p>
//     </div>
//   );
// }

// 날짜 표기
function getDateString(d) {
  let month = d.getMonth() + 1;
  let date = d.getDate();
  return `${month}월 ${date}일 발행`;
}

// 클래스형 컴포넌트
class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name: "kim", age: 30 };
    // console.log(this.props);
  }

  // ! this 바인딩 안하려면 화살표 함수로 정의
  // changeName2 = () => {};
  changeName() {
    // 이 메소드의 this는 호출한 객체에 바인딩 될텐데........
    // 왜 undefined지?
    this.setState({ name: "oh" });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>프로필입니다</h3>
        <p>저는 {this.state.name} 입니다.</p>
        <p>나이는 {this.state.age}살 입니다.</p>
        <button onClick={this.changeName.bind(this)}>버튼</button>
      </div>
    );
  }
}

export default App;
