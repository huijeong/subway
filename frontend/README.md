## Directory Structure
* ```[src/actions]``` :  redux 용 액션 및 타입 파일을 보관하는 디렉토리 
* ```[src/components]``` : 재사용 컴포넌트를 보관하는 디렉토리 
* ```[src/containers]``` : 컴포넌트를 조합한 컨테이너를 보관하는 디렉토리, Subway에서 실제 사용자에게 보여지는 View를 저장하는 디렉토리 
* ```[src/icons]``` :  아이콘 디렉토리 
* ```[src/layouts]``` :  레이아웃을 보관하는 디렉토리, 여기서는 대시보드 레이아웃, 메인 레이아웃 두 가지만 보유 
* ```[src/mixins]``` : 외부 라이브러리 파일 보관용 디렉토리 
* ```[src/reducers]``` : redux용 리듀서를 보관하는 디렉토리 
* ```[src/theme]``` : 테마를 보관하는 디렉토리 
* ```[src/utils]``` : 유틸리티를 보관하는 디렉토리 
* ```[src/views]``` :  이 디자인 템플릿에서 제공하는 View를 저장해놓은 디렉토리 
* ```[src/App.js]``` :  이 리액트 앱의 진입지점 
* ```[src/PrivateRoute.js]``` : 토큰이 없으면 인증페이지로 이동시키기 위한 라우터 
* ```[src/routes.js]``` : 라우터를 정의하는 디렉토리 (URI - View 매핑)
* ```[src/package.json]``` : 외부 라이브러리 임포트, 개발서버 띄우기, 프록시 설정 등을 담고 있는 파일 



## REST 호출 부터 View에 데이터 뿌리는 방법

*  ```[src/actions/types.js]``` 에 타입을 추가한다.

```javascript
export const GET_TODOS='GET_TODOS';
``` 


* ```[src/actions/]```  디렉토리 내에 todos.js 파일을 생성한다. (todos는 예시, 실제로는 업무명 약어)


* ```[src/actions/todos.js]``` 내에 액션 함수를 추가한다. 

```javascript
// GET TODOS
export const getTodos = () => async (dispatch, getState) => {
    const res = await axios.get('/api/todos', tokenConfig(getState))
    dispatch({
        type: GET_TODOS,
        payload: res.data
    });
}
``` 


* ```[src/reducers/]``` 디렉토리 내에 todos.js 파일을 생성한다. (todos는 예시, 실제로는 업무명 약어)


* ```[src/reducers/todos.js]``` 내에 리듀서 부분을 추가한다.

```javascript
import _ from 'lodash';
import {  
    GET_TODOS,
} from '../actions/types';

export default (state={}, action) => {
    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        default:
            return state;
    }
}
``` 


* ```[src/reducers/index.js]``` 내에 todos 리듀서를 추가해준다.

```javascript
...
const appReducer = combineReducers({
    form: formReducer,
    users,
    messages,
    errors,
    auth,
    todos, # added todos 
});
...
```


* ```[src/containers/todos/TodoListView/index.js]``` 파일을 만들고 다음 코드를 추가한다.

```javascript
...
import { getTodos } from '../../../actions/todos' // 액션 파일에서 getTodos 함수를 가져온다. 
import { connect } from 'react-redux'; // 리덕스에서 connect 함수를 가져온다. 

const useStyles = makeStyles((theme) => ({ // 스타일은 만든다. 
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const TodoListView = (props) =>{ // TodoListView 컴포넌트 
...
    useEffect(()=>{
      props.getTodos(); // 컴포넌트가 리로드 되면 getTodos 메소드를 호출한다.  이렇게 하면 props.todos에 데이터가 담긴다.      
    }, []);
    
    const columns = [ // 데이터 그리드의 컬럼을 정의한다. 
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 300},
        { field: 'description', headerName: 'Description', width: 300 }     
      ];
...
    // 이 컴포넌트 렌더링 함수 
    return ( 
...
                    <DataGrid 
                      rows={props.users} // props.getTodos()를 실행하면 여기에 데이터가 담겨진다.. 
                      columns={columns} 
                      pageSize={20} 
                      checkboxSelection 
                      disableMultipleSelection={true} 
                      onSelectionChange={(newSelection) => {
                        setSelection(newSelection.rowIds);
                      }}
                      />
...
    )
}

const mapStateToProps = (state) => ({ // state 를 props 로 연결한다. redux 때문 
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { getTodos })(TodoListView); // TodoListView 에서 리덕스 스토어를 리슨한다.  액션에서 이벤트를 발행하면 여기서 받을 수 있도록 매핑? 한다. 
``` 


* ADD, DELETE, EDIT 의 경우에는 ```[src/containers/todos/TodoListView/Toolbar.js]```를 참조한다. 



