@echo off
set PROJECT_PATH="E:\dev\tools\file scrap esope"
E:
cd %PROJECT_PATH%
echo started at %date% %time% >> logs/flattenSave.log
node flattenSave.js >> logs/flattenSave.log
