# skala-vue

This template should help get you started developing with Vue 3 in Vite.

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

과제 1과 과제 2는 `WeatherApp.vue` 하나에서 단계적으로 개발했습니다.

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

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
