@echo off
set PROJECT_PATH="E:\dev\tools\file scrap esope"
E:
cd %PROJECT_PATH%
call sync_files.bat
sleep 3
call restart_server.bat