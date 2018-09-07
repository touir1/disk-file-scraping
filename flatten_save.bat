@echo off
set PROJECT_PATH="PROJECT_PATH_HERE"
E:
cd %PROJECT_PATH%
echo started at %date% %time% >> logs/flattenSave.log
node flattenSave.js >> logs/flattenSave.log
