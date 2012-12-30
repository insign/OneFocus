git add -A
[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
$commit_msg = [Microsoft.VisualBasic.Interaction]::InputBox("What's the news?", "Commit message", "Small changes")
$commit_msg
git commit -a -m $commit_msg
git push
#Invoke-Expression "cmd.exe /C start https://build.phonegap.com/apps/270320/builds"
Invoke-Expression "cmd.exe /C start https://github.com/insign/OneFocus"