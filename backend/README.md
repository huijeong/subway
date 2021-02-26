## Directory(App) Structure
1. ```[accounts]``` : 사용자 정보 CRUD를 위한 앱 
2. ```[accounts/api]``` : 로그인, 등록, 인증을 위한 앱
3. ```[backend]``` : 이 프로젝트 전체 구성정보를 저장하는 앱 
4. ```[requests]``` : VSCode에서 REST api 호출을 테스트할 수 있는 파일이 api.http 가 담긴 파일 
5. ```[todo]``` : todo 샘플 앱 
6. ```[db.sqlite3]``` : 기본 sqlite3 데이터 베이스
7. ```[manage.py]``` : 장고 관리용 파일


## How to create directory for django
1. ```[python manage.py startapp app_name]```

2. ```[backend/settings.py]``` 

    ```python 
    # Application definition

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'app_name', ## added 
    ]
    ```


3. 장고에서 startapp으로 만들면 기본적으로 아래의 파일이 자동 생성된다.

    * ```[admin.py]``` : 어드민에서 ```[models.py]``` 에 정의된 데이터중 CRUD하고 싶은 필드 선택한다. 
    * ```[apps.py]``` :  앱 설정을 위한 파일
    * ```[models.py]``` : 앱에서 사용할 모델들 정보를 저장한다.  
    * ```[serializers.py]``` : 모델에서 정의된 데이터를 json 포멧으로 변환해주기 위한 시리얼라이져?  
    * ```[tests.py]```  : 테스트 파일 - 걍 무시
    * ```[views.py]```  : 모델을 REST 서비스하기 위해 설정하는 파일, REST의  viewset을 사용하면 GET/POST/PUT/DELETE URL을 자동으로 만들어 준다.


4. 3에서 나열된 파일을 수정완료하였으면 다음의 구문으로 마이그레이션?을 해준다.

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
