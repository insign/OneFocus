# Made by Helio <insign@gmail.com> to One Focus
# Copy to me: powershell.exe -file D:\Dropbox\Sites\onefocus\autobuild.ps1

#$git_path = "C:\Users\Helio\AppData\Local\GitHub\PortableGit_93e8418133eb85e81a81e5e19c272776524496c6\cmd\git.exe"
$git_path = "git"
$project_folder  = "D:\Dropbox\Sites\onefocus"
$git_branch = "master"
$url_after = "https://build.phonegap.com/apps/270320/push"

################################################################################
clear

# Ask about the commit message (too slow)
#[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
#$commit_msg = [Environment]::GetEnvironmentVariable("last_commit_msg","User")
#$commit_msg = [Microsoft.VisualBasic.Interaction]::InputBox("What's the news?", "Commit message", $commit_msg)
#[Environment]::SetEnvironmentVariable("last_commit_msg", $commit_msg, "User")

$commit_msg = 'tests';

# Open the folder
cd $project_folder

# Select the branch
$(Invoke-Expression "$git_path checkout $git_branch")

# Add all new files and remove inexistents
$(Invoke-Expression "$git_path add -A -v")

# Make the commit
$(Invoke-Expression "$git_path commit -a -v -m $commit_msg")

# Sync commits
$(Invoke-Expression "$git_path push -v")

# Open URL after all
Invoke-Expression "cmd.exe /C start $url_after"

#clear
Write-Host "  .______       _______     ___       _______  ____    ____  __   "
Write-Host "  |   _  \     |   ____|   /   \     |       \ \   \  /   / |  |  "
Write-Host "  |  |_)  |    |  |__     /  ^  \    |  .--.  | \   \/   /  |  |  "
Write-Host "  |      /     |   __|   /  /_\  \   |  |  |  |  \_    _/   |  |  "
Write-Host "  |  |\  \----.|  |____ /  _____  \  |  '--'  |    |  |     |__|  "
Write-Host "  | _| `._____| |_______/__/     \__\ |_______/     |__|     (__)  "
Write-Host "  "