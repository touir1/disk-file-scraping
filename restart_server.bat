@echo off
set PROJECT_PATH="E:\dev\tools\file scrap esope"
E:
cd %PROJECT_PATH%
call kill_server.bat
sleep 3
call start_server.bat