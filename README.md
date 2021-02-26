## Introduction
동고비 소프트 지하철 프로젝트를 위한 장고, 리액트 기반의 CRUD boilerplate 코드입니다. 

## Requirements
* Python 3.8 이상 
* Pipenv
* node 14 이상
* npm 6 이상 


## Getting started
1. ```[git clone http://bitbuck.com/subway]``` 으로 프로젝트 복제 
2. ```[cd subway]``` 으로 디렉토리 이동
3. ```[sudo pip3 install pipenv]``` 으로 pipenv 설치 
4. ```[pipenv shell]``` 으로 가상환경 들어가기
5. ```[pipenv install]``` 으로 의존성 프레임워크 설치하기 (python 관련)
6. ```[cd frontend]``` 으로 frontend/ 디렉토리로 이동 
7. ```[npm install]``` 으로  프론트앤드 의존성 패키지 설치


## Run Application
1. ```[backend]``` 디렉토리로 이동해서 ```[python manage.py runserver]``` 명령어로 백앤드 서버 실행  (반드시 ```[pipenv shell]``` 명령어로 가상환경 들어가서 실행해야함)
2. ```[fronend]``` 디렉토리로 이동해서 ```[npm run start]``` 또는 ```[yarn start]``` 명령어로 프론트앤드 서버 띄우기


## front 페이지 접속방법
1. <http://localhost:3000> 에 접속한다.
2. 로그인페이지가 나오면 dig04@gmail.com, 1234 입력하여 메인 대시보드에 진입한다.
3. 좌측 메뉴에서 Users, Todos가 주요 예제임



## Built With   
* [Python](https://www.python.org/) - 파이썬
* [Django](http://djangoproject.org/) - 파이썬 기반의 웹 프레임워크
* [Django-REST](https://www.django-rest-framework.org/) - 장고 기반의 REST 프레임워크
* [Knox](http://james1345.github.io/django-rest-knox/) - 장고 REST 프레임워크에서 사용할 수 있는 인증 서비스
* [React](https://reactjs.org) - 페이스북에서 만든 자바스크립트 UI 프레임워크 
* [Redux](https://react-redux.js.org/) - 리액트에서 사용하는 전역 상태 저장소  
* [Material-UI](https://material-ui.com/) - UI 컴포넌트 모음 


## Reference
* [Django-REST-Knox](https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c) - 장고 리액트 인증 예제
* [Django-커스텀유저모델](https://medium.com/@hckcksrl/django-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9C%A0%EC%A0%80-%EB%AA%A8%EB%8D%B8-custom-user-model-b8487c0d150) - 장고 커스텀 유저 모델 생성
* [Redux-개념](https://hwan1001.tistory.com/38#:~:text=%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%8A%94%20%EB%8D%94%EC%9A%B1%20%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C,%EB%90%9C%20%ED%95%A8%EC%88%98%EB%A5%BC%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A8%EB%8B%A4.) - Redux 개념 
* [React-Hook개요](https://ko.reactjs.org/docs/hooks-intro.html) - React Hook 사용하기 
* [React 튜토리얼](https://velopert.com/reactjs-tutorials) - React 튜토리얼 


