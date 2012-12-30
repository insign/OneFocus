# Made by Helio <insign@gmail.com> to One Focus

$project_folder  = "D:\Dropbox\Sites\onefocus"
$url_after = "https://build.phonegap.com/apps/270320/push"

################################################################################

cd $project_folder
git add -A
[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
$commit_msg = [Microsoft.VisualBasic.Interaction]::InputBox("What's the news?", "Commit message", "Small changes")
$commit_msg
git commit -a -m $commit_msg
git push
Invoke-Expression "cmd.exe /C start $url_after"