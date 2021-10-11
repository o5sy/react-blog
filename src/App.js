import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// 메인 컴포넌트 모듈 (index.js에서 import해서 쓰임)
function App() {
  // 더미 데이터
  let posts = [
    new Post("가을 여행지 추천", new Date(2021, 10, 10)),
    new Post("최고당 돈가스 후기", new Date(2021, 10, 9)),
    new Post("강아지 카페 추천", new Date(2021, 10, 8)),
    new Post("프론트엔드 면접 질문 모음", new Date(2021, 10, 7)),
    new Post("리액트 마스터 로드맵", new Date(2021, 10, 6)),
  ];

  // state
  let [postData, changePost] = useState(posts);
  let [displayModal, changeModalDisplay] = useState(false);
  let [showPostIdx, changeShowPost] = useState(0);
  let [inputData, setInputData] = useState("");

  // 게시글 제목 변경
  function changeTitle() {
    let data = [...postData];
    data[0].title = "여자 코트 추천";
    changePost(data);
  }

  // 게시글 별 좋아요 수 증가
  //+ 게시글 갯수랑 같은 배열로 state 만들어서 index 참조해서 써도 될듯
  function changeLike(e, idx) {
    let data = [...postData];
    let target = { ...e };
    target.like++;

    data[idx] = target;
    changePost(data);
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
        <div className="input-form">
          <input
            type="text"
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />
          <button
            onClick={() => {
              let data = [...postData];
              data.unshift(new Post(inputData, new Date(Date.now())));
              changePost(data);
            }}
          >
            저장
          </button>
        </div>

        {/* 공부용 버튼 */}
        {/* <button onClick={changeTitle}>제목 바꾸기</button>
        <button
          onClick={() => {
            changeModalDisplay(!displayModal);
          }}
        >
          모달 토글
        </button> */}

        {/* 게시글 */}
        <ul>
          {postData.map((e, i) => {
            return (
              <li className="post" key={i}>
                <h4
                  className="title"
                  onClick={() => {
                    showPost(i);
                  }}
                >
                  {e.title}
                  <span
                    onClick={(evt) => {
                      changeLike(e, i);
                      evt.stopPropagation();
                    }}
                  >
                    👍
                  </span>
                  {e.like}
                </h4>
                <p>{getDateString(e.date)}</p>
              </li>
            );
          })}
        </ul>

        {/* 모달창 */}
        {displayModal ? (
          <Modal post={postData} showPostIdx={showPostIdx}></Modal>
        ) : null}
      </div>
    </div>
  );
}

// 모달창 컴포넌트
function Modal(props) {
  let post = props.post[props.showPostIdx];
  console.log(post);
  return (
    <div className="modal">
      <h3 className="title">{post.title}</h3>
      <p>{getDateString(post.date)}</p>
      <p>내용</p>
    </div>
  );
}

// 게시글 데이터 객체
function Post(title, date) {
  this.title = title;
  this.date = date;
  this.like = 0;
}

// 날짜 표기
function getDateString(d) {
  let month = d.getMonth() === 0 ? 12 : d.getMonth();
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
