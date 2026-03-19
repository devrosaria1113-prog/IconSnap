
### 1. 기능적 요구사항 (Functional Requirements)

- **이미지 업로드 (Input)**    
    - 사용자는 드래그 앤 드롭 또는 파일 선택을 통해 `1024x1024` 해상도의 이미지를 업로드할 수 있어야 함.        
    - 지원 형식: PNG, JPG, WEBP (투명도 유지를 위해 PNG 권장 알림 필요).        

- **이미지 처리 (Processing)**    
    - 업로드된 이미지를 지정된 사이즈로 리사이징.        
    - 리사이징 시 이미지 품질(Interpolation) 유지.

- **파일 압축 및 다운로드 (Output)**    
    - 생성된 모든 이미지는 png 파일
    - 하나의 `.zip` 파일로 묶어서 제공.        
    - 각 파일명은 사이즈를 식별할 수 있는 규칙 적용 (예: `icon_120x120.png`).

- **프리뷰 기능**    
    - 변환된 아이콘들이 각각 어떤 모습인지 화면에서 미리보기 제공.        

- **플랫폼 타겟팅 선택 (UI)**
	- 사용자는 체크박스 형태로 배포 대상 플랫폼을 선택할 수 있어야 함. (옵션: iPhone, iPad, Watch, Mac)
    - **Universal 모드**: iPhone과 iPad를 동시에 지원하는 표준 규격을 기본값으로 제공.	    
	- **App Store Marketing**: 모든 플랫폼 선택 시 `1024x1024` 마케팅 아이콘은 필수 항목으로 자동 포함.

- **Contents.json 자동 생성 (Logic)**
	- 선택된 플랫폼 조합에 따라 Xcode가 인식할 수 있는 표준 `Contents.json` 파일을 동적으로 생성.    
	- **중복 최적화**: 동일한 픽셀 사이즈(예: 40x40px)를 사용하는 항목은 이미지를 한 번만 생성하고, JSON 내에서 동일한 파일명을 참조하도록 로직 설계.    
	- **필수 항목 강제**: 특정 플랫폼 선택 시 시스템 구동에 필요한 최소 규격(예: iPhone 선택 시 2x, 3x 배율)이 누락되지 않도록 자동 추가.

- **Asset Catalog 패키징 (Output)**
	- 다운로드되는 `.zip` 파일 내부에 `AppIcon.appiconset` 폴더 구조를 생성.    
	- 해당 폴더 안에 생성된 모든 이미지와 `Contents.json`을 위치시켜, 사용자가 폴더째로 Xcode에 드래그 앤 드롭할 수 있도록 제공.

### 2. 기술적 세부 사양 (Technical Specifications)

- **플랫폼별 이미지 맵핑 기준** 
	1. iPhone (iOS)
		20pt: 40px (@2x), 60px (@3x) — 알림(Notification)
		29pt: 58px (@2x), 87px (@3x) — 설정(Settings)
		40pt: 80px (@2x), 120px (@3x) — 스포트라이트(Spotlight)
		60pt: 120px (@2x), 180px (@3x) — 앱 아이콘(App Icon)
	2. iPad (iPadOS)	
		20pt: 20px (@1x), 40px (@2x) — 알림(Notification)	
		29pt: 29px (@1x), 58px (@2x) — 설정(Settings)	
		40pt: 40px (@1x), 80px (@2x) — 스포트라이트(Spotlight)	
		76pt: 76px (@1x), 152px (@2x) — 앱 아이콘(App Icon)	
		83.5pt: 167px (@2x) — iPad Pro 앱 아이콘
	3. Apple Watch (watchOS)	
		24pt: 48px (@2x) — 알림 센터 (38mm)	
		27.5pt: 55px (@2x) — 알림 센터 (42mm)	
		29pt: 58px (@2x), 87px (@3x) — 컴패니언 설정	
		40pt: 80px (@2x) — 앱 런처 (38mm)	
		44pt: 88px (@2x) — 앱 런처 (40mm)	
		50pt: 100px (@2x) — 앱 런처 (44mm)	
		86pt: 172px (@2x) — 빠른 보기 (38mm)	
		98pt: 196px (@2x) — 빠른 보기 (40mm)
		108pt: 216px (@2x) — 빠른 보기 (44mm)
	4. Mac (macOS)	
		16pt: 16px (@1x), 32px (@2x)	
		32pt: 32px (@1x), 64px (@2x)	
		128pt: 128px (@1x), 256px (@2x)	
		256pt: 256px (@1x), 512px (@2x)	
		512pt: 512px (@1x), 1024px (@2x)
	5. App Store (Marketing)
		1024pt: 1024px (@1x) — iOS/watchOS 마케팅용 아이콘

- **파일명 규칙**    
    - 플랫폼 식별자와 사이즈를 결합한 명확한 네이밍 규칙 적용.        
    - 예: `ios-20x20@2x.png`, `watch-40x40@2x.png`, `mac-512x512@2x.png`

### 3. 비기능적 요구사항 (Non-functional Requirements)

- **보안 및 개인정보**: 업로드된 이미지는 서버에 저장하지 않고 처리 즉시 삭제하거나, 브라우저 내(Client-side)에서만 처리하여 보안성 강화.    
- **사용자 경험 (UX)**: 별도의 로그인 없이 바로 사용 가능한 단일 페이지 애플리케이션(SPA) 구조.    
- **성능**: 이미지 리사이징 및 압축 파일 생성 시간은 3초 이내로 완료될 것.    
- **반응형 웹**: 모바일에서도 확인 가능하지만, 실제 작업 효율을 위해 데스크톱 환경에 최적화된 UI 제공.    

---

## 🛠 추천 기술 스택

서버 비용을 아끼고 속도를 높이기 위해 **Client-side 처리** 방식을 추천합니다.

|**구분**|**기술**|**이유**|
|---|---|---|
|**Frontend**|React or Next.js|빠른 UI 개발 및 컴포넌트 관리|
|**Image Lib**|`browser-image-compression`|브라우저 내에서 간편한 리사이징|
|**Zip Lib**|`JSZip`|서버를 거치지 않고 브라우저에서 바로 압축 파일 생성|
|**Deployment**|Vercel or Netlify|빠르고 간편한 무료 호스팅 지원|
