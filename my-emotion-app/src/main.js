import { css } from '@emotion/css';

let todoList = [];

// Body 스타일
const bodyStyle = css`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
document.body.classList.add(bodyStyle);

// Input 스타일
const inputStyle = css`
  height: 30px;
  font-size: 20px;
  padding: 5px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

// ul 스타일
const divStyle = css`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

// 버튼 스타일
const createButtonStyle = css`
  padding: 10px 20px;
  font-size: 20px;
  background-color: #f0c040;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover { 
    background-color: #333;
    color: #fff;
  }
  transition: background-color 0.3s ease;
`;

// 삭제 버튼 스타일
const deleteButtonStyle = css`
  padding: 5px 10px;
  font-size: 16px;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin :10px;

  &:hover { 
    background-color: #333;
    color: #fff;
  }
  transition: background-color 0.3s ease;
`



// Input 태그
const input = document.querySelector('.todo-input');
input.classList.add(inputStyle);

// 생성 버튼
const createButton = document.querySelector('.createButton');
createButton.textContent = '생성';
createButton.classList.add(createButtonStyle);


// 생성 버튼 클릭시 배열에 추가하는 함수
createButton.addEventListener('click', () => {
  const inputValue = input.value.trim();
  if (inputValue) {
    todoList.push(inputValue);
    writeTodo()
    input.value = '';
  }
  else {
    alert('할 일을 입력해주세요.');
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    createButton.click();
  }
});


// 할일 추가 함수
function writeTodo() {
  const allTodoListDiv = document.querySelector('#todoList');
  allTodoListDiv.replaceChildren(); 

  todoList.forEach((todo, index) => {

    const todoListDiv = document.createElement('div');
    todoListDiv.classList.add(divStyle);

    const p = document.createElement('p');
    p.textContent = todo;

    // 삭제 버튼 생성
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add(deleteButtonStyle);

    // 삭제 버튼 이벤트 리스너 등록
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1); // 해당 인덱스의 항목 삭제
      writeTodo(); // 리스트 갱신
    });

    // 요소 추가
    todoListDiv.appendChild(p);
    todoListDiv.appendChild(deleteButton);
    allTodoListDiv.appendChild(todoListDiv);
  });
}

