todo
----

* [ ] 다음 고양이 preload
* [ ] 

Comments
----
가독성과 정석적인 코드 보다는, 페이스북처럼 빠른 앱 반응성과 UX를 우선순위 삼아서 작업하였습니다.

평소에 회사 프로덕트에 적용하지는 못하고, 아이디어로만 가지고있던것들을 직접 구현했기 때문에, `mobx` 등을 사용한 정석적인 코드보다는 복잡할 수 있습니다. 양해 부탁드립니다.


### 로딩 없에기 - 에러 처리와 애니메이션의 결합

<img src="imgs/vote.gif" width="320px" />

CatAPI의 투표 API 호출 시, 응답이 오기까지 약 `400~500ms`의 시간이 걸립니다.<br/>
해당 시간동안 `아무것도 안하거나`, `Spinner 를 돌려서 대기하기` 보다는 즉시 다음 고양이 사진으로 넘어갈 수 있도록 하였습니다. 다만 네트워크 작업 특성 상 실패할 여지가 있기 때문에 __버튼 클릭 즉시 다음으로 넘어가면서도, 언제든지 다시 되돌아올 수 있어야 합니다__. <br/>
<br/>
이를 해결하기 위해 고의적으로 애니메이션을 넣었고, 요청 도중 결국 요청이 실패하더라도 애니메이션이 롤백되면서 이전 고양이 사진으로 돌아오게 됩니다.<br/>
이는 요청이 성공하거나, 실패할 경우 모두 자연스럽고 빠른 반응성의 UX를 제공하게 해줍니다.

### 앱의 첫 화면은 로딩이 보이지 않게

두 번째 요청부터는 `prefetch` 할 수 있지만, 첫번째 요청은 무조건 시간이 필요합니다.<br/>

CatAPI에서 제공하는 고양이 사진의 주소는 가져오는데 __1초 이상__ 걸리는 경우가 많습니다. 따라서 메인 화면이 로딩되었지만 고양이 사진은 하얀화면 상태로 나오는 경우가 많았습니다.<br/>

`react-native-splash-screen`과 직접 제작한
[InitialImageLoader](/src/component/vote/InitialImageLoader.tsx) 컴포넌트를 이용해 고양이 사진이 전부 로딩되서 완전하게 렌더링이 된 시점에 첫 화면이 보일 수 있도록 했습니다.

### 다음 사진 미리 가져오기

간단하고 많이 쓰이는 방법이지만, 현재 보이는 고양이 사진만 로드하는것이 아니라 다음에 보일 2개의 고양이 사진을 미리 백그라운드에서 로드합니다.<br/>
`FastImage.preload` 를 사용해서 간단히 처리했습니다.


### 북마크 사진 미리 가져오기

[withPrefetch](/src/data/withPrefetch.tsx) 를 작성해 북마크의 1번째 페이지는 앱 시작과 함께 미리 로드할 수 있도록 했습니다.<br/>
<br/>
실제 프로덕션 앱에서는 모든 데이터가 prefetch 되야하는게 아니기 때문에 선택적으로 prefetch될 수 있어야 하고, 이를 위해 `withPrefetch`는 AOP 혹은 React의 HOC과 비슷한 형태로 동작합니다. <br/>
<br/>
이러한 구조로 된 이유는 처음 캐싱하는 구조를 구상할 때, 아래와 같은 목표가 있었습니다.

* 캐싱이 데이터 가져오기나 UI 로직에서 완전하게 독립적이 되어야 합니다.
* 간편하게 넣거나 뺄 수 있어야 합니다.
