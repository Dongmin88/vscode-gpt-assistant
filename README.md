# VS Code GPT Assistant

VS Code GPT Assistant는 OpenAI의 GPT-4를 활용하여 코드 분석, 자동완성, 개선을 도와주는 Visual Studio Code 확장 프로그램입니다.

## 기능

- **코드 분석 (Ask GPT)**: 선택한 코드에 대한 상세한 설명과 분석을 제공합니다.
- **코드 자동완성 (Complete Code)**: 작성 중인 코드의 다음 부분을 지능적으로 제안합니다.
- **코드 개선 (Improve Code)**: 선택한 코드의 개선사항을 제안하고 더 나은 구현 방법을 제시합니다.

## 설치 요구사항

- Visual Studio Code 1.80.0 이상
- Node.js 14.0.0 이상
- OpenAI API 키

## 설치 방법

1. VS Code의 확장 마켓플레이스에서 "GPT Assistant" 검색
2. 설치 버튼 클릭
3. VS Code 재시작

## 설정

1. VS Code 설정(Settings)에서 "gptAssistant.apiKey" 검색
2. OpenAI API 키 입력
3. 설정 저장

## 사용 방법

1. 코드 에디터에서 분석/완성/개선하고 싶은 코드 선택
2. 명령 팔레트 열기 (Ctrl+Shift+P 또는 Cmd+Shift+P)
3. 다음 명령어 중 하나 실행:
   - "Ask GPT": 코드 분석
   - "GPT: Complete Code": 코드 자동완성
   - "GPT: Improve Code": 코드 개선

## 개발

### 환경 설정

```bash
git clone https://github.com/yourusername/vscode-gpt-assistant.git
cd vscode-gpt-assistant
npm install
```

### 프로젝트 구조

```
vscode-gpt-assistant/
├── src/
│   ├── extension.ts    # 메인 확장 프로그램 코드
│   └── test/          # 테스트 파일
├── .vscode/           # VS Code 설정
├── .eslintrc.json     # ESLint 설정
└── package.json       # 프로젝트 설정
```

### 빌드 및 실행

```bash
npm run compile
npm run test
```

디버그 모드로 실행하려면 VS Code에서 F5를 누르세요.

## 문제 해결

- **API 키 오류**: OpenAI API 키가 올바르게 설정되어 있는지 확인하세요.
- **명령어가 보이지 않음**: VS Code를 재시작하거나 확장을 비활성화했다가 다시 활성화해보세요.
- **응답 오류**: 네트워크 연결을 확인하고, OpenAI API 할당량을 확인해보세요.

## 주요 파일 설명

### package.json
프로젝트의 메타데이터와 의존성을 정의합니다.

### src/extension.ts
확장 프로그램의 주요 로직이 구현되어 있습니다.

### .eslintrc.json
코드 스타일과 품질을 관리하는 ESLint 설정입니다.

### tsconfig.json
TypeScript 컴파일러 설정을 정의합니다.

## 기여

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다.

## 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다.

## 크레딧

- OpenAI GPT-4 API
- Visual Studio Code Extension API