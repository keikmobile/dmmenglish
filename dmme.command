
#!/bin/bash
# DMM英会話をスタンドアロンウィンドウで起動する
# --profile-directory は使用するChromeプロファイルに合わせて変更する
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --profile-directory="Default" \
  --app="https://eikaiwa.dmm.com/" &
