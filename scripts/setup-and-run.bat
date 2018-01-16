start /b .\create-db-folder.cmd
timeout /t 1
start /b .\import-db.cmd 
timeout /t 1
start /b .\run-db-server.cmd
timeout /t 5
start cmd /c .\run-db-client.cmd