@echo off
set PROJECT_PATH="PROJECT_PATH_HERE"
E:
cd %PROJECT_PATH%
echo started at %date% %time% >> logs/sync.log
node sync.js >> logs/sync.log