@ECHO off
SETLOCAL
FOR /f %%I IN ('dir /b /s ..\db\sets\*.json') DO (CALL :callimportf %%~nI, %%I) 
pause
Goto :eof

:callimportf 
mongoimport --db frontcamp --collection %~1 --drop --file %~2
goto:eof
