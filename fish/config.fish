set -U fish_user_paths $fish_user_pathss $HOME/.local/bin
set TERM "alacritty"
set -gx EDITOR nvim

#User created alias
alias la="exa -la --group-directories-first"
alias l="exa -l"
alias u="sudo updatedb"
alias f="lfcd"
alias yt="ytfzf"
alias pw="poweroff"
alias rb="reboot"
alias mount="sudo mount /dev/nvme0n1p4 /run/mount/"
alias umount="sudo umount /dev/nvme0n1p4"

#Terminal movement
alias gh="cd ~"
alias gH="cd /"
alias gd="cd ~/Downloads"
alias gD="cd ~/Documents"
alias gc="cd ~/.config"
alias gm="cd /run/mount/"

#Functions needed for !! and !$
#Will only work in defaultmode (Emacs only)

function __history_previous_command
  switch (commandline -t)
  case "!"
    commandline -t $history[1]; commandline -f repaint
  case "*"
    commandline -i !
  end
end

function __history_previous_command_arguments
  switch (commandline -t)
  case "!"
    commandline -t ""
    commandline -f history-token-search-backward
  case "*"
    commandline -i '$'
  end
end

#keybindings for !! and !$
bind ! __history_previous_command
bind '$' __history_previous_command_arguments


#Start with fish
neofetch
