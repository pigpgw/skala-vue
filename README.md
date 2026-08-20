# skala-vue

Vue 3 수업에서 배운 문법을 하나의 날씨 조회 화면에 단계적으로 적용하는 과제 프로젝트입니다.

## 프로젝트 소개

- Vue 3의 Composition API와 `<script setup>`을 사용합니다.
- 배열 렌더링, 조건부 렌더링, 입력 바인딩과 이벤트 수식어를 날씨 목업에 적용합니다.
- `computed`, `watch`, `watchEffect`를 사용해 검색 결과와 전국 날씨 통계를 관리합니다.
- 과제 1의 Weather Mockup을 과제 2의 Weather Composition으로 계속 발전시키는 구조입니다.

## 과제 파일

- 과제 컴포넌트는 `src/components/tasks/`에서 관리합니다.
- 날씨 과제의 부모 컴포넌트는 `src/components/tasks/WeatherParent.vue`입니다.
- `src/App.vue`에서 `WeatherParent.vue`를 불러와 화면에 렌더링합니다.
- 날씨 더미 데이터는 `src/data/weatherData.js`에서 별도로 관리합니다.

```text
src/
├── App.vue
├── components/
│   └── tasks/
│       └── WeatherParent.vue
└── data/
    └── weatherData.js
```

## 주요 기능

- 도시별 날씨 카드 반복 출력
- 한글 도시명 검색과 검색 결과 안내
- 기온과 미세먼지 상태별 조건부 문구
- 카드 선택과 상세보기 이벤트 분리
- 전국 평균 기온, 습도와 풍속 계산
- 주요 날씨 통계와 반응형 상태 변화 감시

## 배포

- 배포 주소: [https://homework.christmas](https://homework.christmas)
- 기본 Pages 주소: [https://skala-vue.pages.dev](https://skala-vue.pages.dev)
- GitHub 저장소: [https://github.com/pigpgw/skala-vue](https://github.com/pigpgw/skala-vue)
- 배포 서비스: Cloudflare Pages
- 도메인 구매 및 관리: Spaceship, Cloudflare DNS

### 배포 과정

1. GitHub의 `main` 브랜치에 Vue 소스코드를 푸시했습니다.
2. Cloudflare Pages에 GitHub 저장소를 연결했습니다.
3. 빌드 명령은 `npm run build`, 출력 폴더는 `dist`로 설정했습니다.
4. `dist/`는 GitHub에 직접 올리지 않고 Cloudflare Pages가 소스코드를 빌드하도록 구성했습니다.
5. Spaceship에서 구매한 `homework.christmas`의 네임서버를 Cloudflare 네임서버로 변경했습니다.
6. Cloudflare Pages에 사용자 도메인을 등록하여 배포 페이지와 연결했습니다.

## 개발 일지

### 2026-08-19

과제 1과 과제 2는 현재 부모 컴포넌트인 `WeatherParent.vue`에서 단계적으로 개발했습니다.

#### 과제 1 - Weather Mockup

1. `[과제 1-1]` 날씨 배열을 `ref()`로 관리하고 `v-for`와 `:key`로 도시별 카드를 출력했습니다.
2. `[과제 1-2]` `v-if`와 `v-else`로 25도 기준의 기온 안내를 표시했습니다.
3. `[과제 1-3]` `:value`와 `@input`으로 입력한 한글 도시명을 화면에 표시했습니다.
4. `[과제 1-4]` 카드 선택 이벤트와 `@click.stop`을 적용한 상세보기 버튼을 구현했습니다.
5. `[과제 1-5]` 제주, 습도, 풍속, 미세먼지, 도시 검색과 최소 테두리를 추가해 목업을 확장했습니다.

#### 과제 2 - Weather Composition

1. `[과제 2-1]` 검색어, 선택 도시와 날씨 배열을 별도의 반응형 상태로 구성했습니다.
2. `[과제 2-2]` `computed`로 검색어와 일치하는 도시를 반환하는 `filteredWeatherList`를 만들었습니다.
3. `[과제 2-3]` `watch`와 `watchEffect`로 선택 문구와 검색어 변화를 콘솔에 기록했습니다.
4. `[과제 2-4]` 검색 결과 유무에 따라 도시 목록이나 결과 없음 문구를 표시했습니다.
5. `[과제 2-5]` 검색 결과 도시 개수를 `computed`로 계산하고 `watch`로 변화를 감시했습니다.
6. `[과제 2-5]` 전국 평균 기온, 습도와 풍속을 `computed`로 계산하고 `watch`로 변화를 감시했습니다.
7. `[과제 2-5]` 미세먼지 나쁨 도시 개수를 `computed`로 계산하고 `watch`로 변화를 감시했습니다.
8. `[과제 2-5]` 가장 덥고 춥고 습하며 풍속이 강한 도시를 `computed`와 `reduce()`로 찾았습니다.
9. `[과제 2-5]` `ref`, `v-model`, `v-show`로 전국 통계 표시 여부를 제어하고 `watch`로 변화를 감시했습니다.
10. `[과제 2-5]` 검색어와 검색 결과 개수를 `computed`로 조합해 검색 상태 문구를 만들고 `watch`로 변화를 감시했습니다.

### 2026-08-20

#### 과제 3 - Hands on: Weather Component Vue Components

- 과제 요구사항: Weather 화면의 기능을 역할별 Vue Component로 분리합니다.
- `[과제 3-1]` `WeatherParent.vue`를 부모 컴포넌트로 분리하고 모든 반응형 데이터와 계산 및 감시 로직을 유지했습니다.
- `[과제 3-2]` `BaseDashboardCard.vue`에 `<slot>`과 공통 박스 디자인을 구성하고 검색 영역과 날씨 리스트 영역에 적용했습니다.
- `[과제 3-3]` `SearchBar.vue`를 분리하고 검색어를 props로 전달받아 표시하며, 입력 시 `update-query` 이벤트로 변경된 검색어를 부모 `WeatherParent.vue`에 전달했습니다.
- `[과제 3-4]` `WeatherCard.vue`를 분리하고 도시 객체를 props로 전달받아 표시하며, 카드 선택 시 `select-card`, 상세보기 버튼 클릭 시 `click-detail` 이벤트를 부모로 전달했습니다.
- `[과제 3-5]` 각 필수 컴포넌트의 기본 디자인을 `<style scoped>`로 분리하고 바깥 여백, 공통 박스, 검색 입력창과 날씨 카드에 필요한 최소 스타일만 적용했습니다.
- `[과제 3-6]` `BaseDashboardCard`의 Slot에 `SearchBar`와 `WeatherCard`를 배치하고, `WeatherParent`에서 props와 emits를 직접 바인딩하는 기본 구조를 적용했습니다.
- `[과제 3-7 추가 컴포넌트]` 이후 날씨 카드의 반복 렌더링과 이벤트 전달을 `WeatherCardList.vue`로 추가 분리하고 기존 기능이 유지되도록 구성했습니다.
- `[과제 3-7 추가 컴포넌트]` 추가로 전국 날씨 통계 영역을 `NationalWeatherSummary.vue`로 분리하고 부모가 계산한 통계를 props로 전달받아 표시하도록 구성했습니다.
- `[과제 3-7 추가 컴포넌트]` 검색 입력과 결과 안내의 추상화 계층을 맞추기 위해 `SearchBar.vue`를 `SearchPanel.vue`로 확장했습니다. 검색어, 결과 개수와 검색 상태를 props로 전달받아 표시하고, 입력 시 `update-query` 이벤트로 변경된 검색어를 부모에 전달하도록 구성했습니다.
- `[과제 3-7 추가 리팩터링]` 전국 통계 보기 체크박스를 해당 책임을 가진 `NationalWeatherSummary.vue`로 이동했습니다. `showNationalSummary` 상태는 부모에 유지하고, 자식은 변경된 체크값을 `update-show-national-summary` 이벤트로 전달하도록 구성했습니다.
- `[과제 3-7 추가 리팩터링]` 검색 영역과 날씨 목록을 각각 `SearchPanel.vue`와 `WeatherCardList.vue`가 직접 담당하도록 변경했습니다. 각 영역의 독립적인 책임과 단순한 컴포넌트 구조가 더 적합하다고 판단해 공통 Slot 래퍼였던 `BaseDashboardCard.vue`를 제거했습니다.

## 커밋 컨벤션

커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/) 규칙을 따릅니다.

```text
type: 한글 제목

한글 본문
```

- `type`은 영어 소문자로 작성합니다.
- 제목과 본문은 한글로 작성합니다.
- 본문은 제목 다음에 한 줄을 비우고 작성합니다.

### 사용하는 타입

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 동작에 영향이 없는 형식 수정 |
| `refactor` | 기능 변경 없이 코드 구조 개선 |
| `test` | 테스트 코드 추가 또는 수정 |
| `chore` | 빌드, 설정, 패키지 등 기타 작업 |

### 예시

```text
feat: 회원가입 폼 유효성 검사를 추가

이메일과 비밀번호 입력값을 확인하고 오류 메시지를 표시하도록 수정했습니다.
```

## 실행 방법

### 의존성 설치

```sh
npm install
```

### 개발 서버 실행

```sh
npm run dev
```

### 빌드

```sh
npm run build
```

### 코드 검사

```sh
npm run lint
```
