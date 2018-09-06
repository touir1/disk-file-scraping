@echo off
set PROJECT_PATH="E:\dev\tools\file scrap esope"
E:
cd %PROJECT_PATH%
set /p PID_TO_KILL=<RUNNING
kill -f %PID_TO_KILL%
