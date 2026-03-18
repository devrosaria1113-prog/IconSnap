# IconSnap

앱 아이콘 이미지를 업로드하면 **8가지 사이즈로 즉시 리사이징**하고 ZIP으로 다운로드할 수 있는 도구입니다.
모든 처리는 브라우저 내에서 이루어져 이미지가 서버에 업로드되지 않습니다.

## 기능

- **드래그앤드롭** 또는 파일 선택으로 이미지 업로드
- 8가지 사이즈 **즉시 리사이징** (Canvas API)
- 변환된 아이콘 **미리보기** 그리드
- 모든 아이콘을 **ZIP 파일**로 일괄 다운로드
- 완전한 **클라이언트 사이드 처리** — 이미지가 서버로 전송되지 않음

## 지원 사이즈

| 사이즈 | 용도 |
|--------|------|
| 1024×1024 | Standard |
| 180×180 | iOS/Android |
| 120×120 | iOS/Android |
| 87×87 | Small Assets |
| 80×80 | Small Assets |
| 60×60 | Small Assets |
| 58×58 | Small Assets |
| 40×40 | Small Assets |

## 지원 형식

PNG, JPG, WEBP — 투명도 유지가 필요한 경우 PNG 사용 권장

## 기술 스택

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- [JSZip](https://stuk.github.io/jszip/) — 브라우저 내 ZIP 생성
- Canvas API — 이미지 리사이징

## 로컬 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인
