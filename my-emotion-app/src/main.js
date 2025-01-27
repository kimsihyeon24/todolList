import { css } from '@emotion/css';

// todoList 배열을 문자열 대신 객체 형태로 관리 (예: { text: "할 일", completed: false })
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

// 할 일 목록을 감싸는 div 스타일 (기존 ul 스타일 역할)
const divStyle = css`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;  /* 수직 가운데 정렬 */
  margin-bottom: 10px;  /* 목록 간격 */
`;

// 생성 버튼 스타일
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
  margin: 0 5px;

  &:hover { 
    background-color: #333;
    color: #fff;
  }
  transition: background-color 0.3s ease;
`;

// 체크박스 스타일(버튼 형태로 보이게 하는 경우)
const checkBoxStyle = css`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

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
    // todoList 배열에 문자열이 아닌 객체 형태로 넣어 상태(완료 여부)를 관리
    todoList.push({ text: inputValue, completed: false });
    writeTodo();
    input.value = '';
  } else {
    alert('할 일을 입력해주세요.');
  }
});

// Enter 키로도 추가 가능
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    createButton.click();
  }
});

// 할일 렌더링 함수
function writeTodo() {
  // #todoList 요소를 찾고 내부를 비움
  const allTodoListDiv = document.querySelector('#todoList');
  allTodoListDiv.replaceChildren(); 

  // todoList의 각 항목을 순회하며 렌더링
  todoList.forEach((item, index) => {
    const todoListDiv = document.createElement('div');
    todoListDiv.classList.add(divStyle);

    // 체크박스 생성
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add(checkBoxStyle);
    checkBox.checked = item.completed; // 완료된 상태면 체크된 상태로 표시

    // 할 일 텍스트 (p 태그)
    const p = document.createElement('p');
    p.textContent = item.text;
    
    // 만약 completed가 true라면 스타일 변경
    if (item.completed) {
      p.style.color = 'blue';
      p.style.textDecoration = 'line-through';
    } else {
      p.style.color = 'black';
      p.style.textDecoration = 'none';
    }

    // 삭제 버튼
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add(deleteButtonStyle);

    // 체크박스 클릭 시 완료 상태 토글
    checkBox.addEventListener('change', () => {
      todoList[index].completed = !todoList[index].completed;
      writeTodo(); // 변경 후 재렌더링
    });

    // 삭제 버튼 클릭 시 해당 인덱스의 항목 삭제
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      writeTodo(); 
    });

    // 요소 조합
    todoListDiv.appendChild(checkBox);
    todoListDiv.appendChild(p);
    todoListDiv.appendChild(deleteButton);
    allTodoListDiv.appendChild(todoListDiv);
  });
}
