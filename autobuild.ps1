# Made by Helio <insign@gmail.com> to One Focus
# Copy to me: powershell.exe -file D:\Dropbox\Sites\onefocus\autobuild.ps1


$project_folder  = "D:\Dropbox\Sites\onefocus"
$url_after = "https://build.phonegap.com/apps/270320/push"

################################################################################
clear

# Open the folder
cd $project_folder

# Add all new files and remove inexistents
git add -A


# Ask about the commit message
[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
$commit_msg = [Environment]::GetEnvironmentVariable("last_commit_msg","User")
$commit_msg = [Microsoft.VisualBasic.Interaction]::InputBox("What's the news?", "Commit message", $commit_msg)
[Environment]::SetEnvironmentVariable("last_commit_msg", $commit_msg, "User")

# Make the commit
git commit -a -m $commit_msg

# Sync commits
git push

# Open URL after all
Invoke-Expression "cmd.exe /C start $url_after"

clear
Write-Host "  .______       _______     ___       _______  ____    ____  __   "
Write-Host "  |   _  \     |   ____|   /   \     |       \ \   \  /   / |  |  "
Write-Host "  |  |_)  |    |  |__     /  ^  \    |  .--.  | \   \/   /  |  |  "
Write-Host "  |      /     |   __|   /  /_\  \   |  |  |  |  \_    _/   |  |  "
Write-Host "  |  |\  \----.|  |____ /  _____  \  |  '--'  |    |  |     |__|  "
Write-Host "  | _| `._____| |_______/__/     \__\ |_______/     |__|     (__)  "
Write-Host "  "