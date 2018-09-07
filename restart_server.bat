@echo off
set PROJECT_PATH="PROJECT_PATH_HERE"
E:
cd %PROJECT_PATH%
call kill_server.bat
sleep 3
call start_server.bat