start /b .\scripts\create-db-folder.cmd
timeout /t 1
start /b .\scripts\import-db.cmd 
timeout /t 1
start /b .\scripts\run-db-server.cmd
timeout /t 5
start cmd /c .\scripts\run-db-client.cmd