# Made by Helio <insign@gmail.com> to One Focus
# Copy to me: powershell.exe .\autobuild.ps1
# Copy to me (once): Set-ExecutionPolicy RemoteSigned -scope CurrentUser
# Copy to me: commonly only need things to be changed is the $project_folder and "PortableGit" folder of $git_path

$git_path = "$env:LOCALAPPDATA\GitHub\PortableGit_054f2e797ebafd44a30203088cd3d58663c627ef\cmd\git.exe"

$project_folder  = "D:\Dropbox\Sites\onefocus"
$url_after = "https://build.phonegap.com/apps/270320/push"

$author = "Helio Oliveira"
$email = "insign@gmail.com"

$git_branch = "master"

################################################################################
clear

#Short path to avoid errors
$git_path = (New-Object -ComObject Scripting.FileSystemObject).GetFile("$git_path").ShortPath

$(Invoke-Expression "$git_path config --global user.email '$email'")
$(Invoke-Expression "$git_path config --global user.name '$author'")


# Ask about the commit message (too slow when use environment variables)
#[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
#$commit_msg = [Environment]::GetEnvironmentVariable("last_commit_msg","User")
#$commit_msg = [Microsoft.VisualBasic.Interaction]::InputBox("What's the news?", "Commit message", $commit_msg)
#[Environment]::SetEnvironmentVariable("last_commit_msg", $commit_msg, "User")

$commit_msg = 'update';

# Open the folder
cd $project_folder

# Select the branch
$(Invoke-Expression "$git_path checkout $git_branch")

# Add all new files and remove inexistents
$(Invoke-Expression "$git_path add -A -v")

# Make the commit
$(Invoke-Expression "$git_path commit -a -v -m '$commit_msg'")

# Sync commits
$(Invoke-Expression "$git_path push -v")

# Open URL after all and play sound
Invoke-Expression "cmd.exe /C start $url_after"
[System.Media.SystemSounds]::Asterisk.Play()

#clear
Write-Host "  .______       _______     ___       _______  ____    ____  __   "
Write-Host "  |   _  \     |   ____|   /   \     |       \ \   \  /   / |  |  "
Write-Host "  |  |_)  |    |  |__     /  ^  \    |  .--.  | \   \/   /  |  |  "
Write-Host "  |      /     |   __|   /  /_\  \   |  |  |  |  \_    _/   |  |  "
Write-Host "  |  |\  \----.|  |____ /  _____  \  |  '--'  |    |  |     |__|  "
Write-Host "  | _| `._____| |_______/__/     \__\ |_______/     |__|     (__)  "
Write-Host "  "