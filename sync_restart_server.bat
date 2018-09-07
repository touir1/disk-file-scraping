@echo off
set PROJECT_PATH="PROJECT_PATH_HERE"
E:
cd %PROJECT_PATH%
call sync_files.bat
sleep 3
call restart_server.bat