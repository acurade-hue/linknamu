# 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스

## 개요

Linktree처럼 여러 개의 링크를 한 페이지에 모아서 하나의 URL로 공유할 수 있는 웹 서비스입니다.

### 주요 기능

- 🎯 **프로필 표시**: 이름, 소개, 프로필 사진
- 🔗 **링크 카드**: SNS, 블로그 등 여러 링크를 카드 형태로 표시
- 🌙 **다크모드**: 밝은 화면/어두운 화면 자동 전환
- 📊 **클릭 수 집계**: 각 링크별 클릭 횟수 기록

## 기술 스택

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## 설치 및 실행

### 필수 요구사항

- Node.js v24 이상
- npm v11 이상
- MongoDB Atlas 계정

### 로컬 설정

1. 저장소 클론 및 의존성 설치:
```bash
npm install
```

2. `.env.local` 파일 생성:
```bash
cp .env.example .env.local
```

3. MongoDB 연결 문자열 설정:
`.env.local` 파일에서 `MONGODB_URI`에 MongoDB Atlas 연결 문자열을 입력합니다.

### 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 이동합니다.

### 빌드 및 운영 환경 실행

```bash
npm run build
npm start
```

## 사용 방법

### 홈페이지

`/` 에서 서비스 설명과 프로필 접근 방법을 볼 수 있습니다.

### 프로필 페이지

`/{username}` 으로 접속하여 사용자의 프로필과 링크를 확인할 수 있습니다.

예: `/demo`

### 테스트 데이터 생성

```bash
npx ts-node scripts/seed.ts
```

이 명령어로 `demo` 사용자의 샘플 프로필을 생성합니다.

## 프로젝트 구조

```
linknamu/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── clicks/              # 클릭 추적 API
│   ├── [username]/              # 동적 프로필 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   └── globals.css              # 전역 스타일
├── components/                   # React 컴포넌트
│   ├── ProfileCard.tsx          # 프로필 카드
│   ├── LinkCard.tsx             # 링크 카드
│   ├── LinkCardList.tsx         # 링크 목록
│   └── DarkModeToggle.tsx       # 다크모드 토글
├── context/                     # React Context
│   └── ThemeContext.tsx         # 다크모드 상태 관리
├── lib/                         # 유틸리티
│   └── mongodb.ts               # MongoDB 연결
├── types/                       # TypeScript 타입
│   └── index.ts                 # 공통 타입 정의
├── scripts/                     # 유틸리티 스크립트
│   └── seed.ts                  # 테스트 데이터 생성
├── .env.example                 # 환경 변수 템플릿
├── tsconfig.json                # TypeScript 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── postcss.config.mjs           # PostCSS 설정
├── next.config.ts               # Next.js 설정
└── package.json                 # 의존성 정보
```

## 환경 변수

`.env.local` 파일에 다음 변수를 설정합니다:

| 변수 | 설명 | 예시 |
|------|------|------|
| `MONGODB_URI` | MongoDB Atlas 연결 문자열 | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |

## Vercel 배포

### 1. Git 저장소 연결

Vercel 대시보드에서 GitHub 저장소를 연결합니다.

### 2. 환경 변수 설정

Vercel 프로젝트 설정에서 `MONGODB_URI` 환경 변수를 추가합니다.

### 3. 배포

```bash
git push origin main
```

Vercel이 자동으로 배포합니다.

## API 엔드포인트

### POST /api/clicks

링크 클릭을 기록합니다.

**요청:**
```json
{
  "username": "demo",
  "linkId": "1"
}
```

**응답:**
```json
{
  "success": true,
  "message": "Click recorded"
}
```

## 라이선스

MIT

## 지원

문제가 발생하면 GitHub Issues를 통해 보고해주세요.
