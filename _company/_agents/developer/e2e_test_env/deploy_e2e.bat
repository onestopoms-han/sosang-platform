<![CDATA[@echo off
REM BDS MFU Simulator - E2E 배포 스크립트 (Windows)
REM 버전: 1.0.0

setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%\.."
set "COMPOSE_FILE=%SCRIPT_DIR%\docker-compose.e2e.yml"
set "DEPLOY_LOG=%SCRIPT_DIR%\deploy.log"

echo [MFU Simulator] E2E 배포 스크립트 실행 시작. >> "%DEPLOY_LOG%"

REM 1. 의존성 설치 (npm/pip 등)
echo [Step 1] 프로젝트 의존성 확인...
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Node.js 가 발견됨.
) else (
    echo Node.js 가 필요합니다. 설치를 권장합니다.
    exit /b 1
)

REM 2. Docker 환경 체크
echo [Step 2] Docker 및 Docker Compose 확인...
where docker >nul 2>nul
if %errorlevel% equ 0 (
    docker --version
    echo Docker 가 설치되어 있습니다.
) else (
    echo Docker 가 설치되어 있지 않습니다.
    exit /b 1
)

REM 3. Docker Compose 환경 파일 (.env) 생성 (필요한 경우)
echo [Step 3] 환경 변수 설정 확인...
if not exist ".env" (
    type nul > .env
    echo SUCCESS_RATE=95 >> .env
    echo RETRY_RATE=80 >> .env
    echo API_BASE_URL=http://localhost:4200 >> .env
    echo 기본 .env 파일 생성됨.
) else (
    echo 기존 .env 파일을 사용 중입니다.
)

REM 4. 빌드 및 배포 실행 (Docker Compose 가 Windows 에서 작동하는지 확인 필요)
echo [Step 4] Docker 이미지 빌드 및 컨테이너 시작...
docker-compose -f "%COMPOSE_FILE%" build --no-cache || echo "빌드 오류 발생"

REM 5. 상태 확인 및 로그 수집
timeout /t 10 /nobreak >nul
docker-compose -f "%COMPOSE_FILE%" ps
echo 배포 완료. 서비스 URL: http://localhost:3001 (Simulator) >> "%DEPLOY_LOG%"

endlocal
]]>