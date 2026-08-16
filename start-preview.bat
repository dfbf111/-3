@echo off
set "ROOT=%~dp0"
set "PYTHON=C:\Users\exs98\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$open = Test-NetConnection -ComputerName 127.0.0.1 -Port 8080 -InformationLevel Quiet; if (-not $open) { Start-Process -FilePath '%PYTHON%' -ArgumentList @('-m','http.server','8080','--bind','127.0.0.1') -WorkingDirectory '%ROOT%dist' -WindowStyle Hidden; Start-Sleep -Seconds 1 }"
start "" "http://127.0.0.1:8080/preview.html"
