syntax on                "highlight syntax
:set number              "show line number
:set relativenumber      "show relative line number
:set ignorecase          "ignore case during file search
:set mouse=a             "let use of mouse
:set hidden		 "BUFFER

"Installing plugins for vim through VIM_PLUG
call plug#begin()

Plug 'https://github.com/itchyny/lightline.vim'
Plug 'https://github.com/ap/vim-css-color'
Plug 'https://github.com/frazrepo/vim-rainbow'
Plug 'ptzz/lf.vim'
Plug 'voldikss/vim-floaterm'
Plug 'https://github.com/tpope/vim-surround'

call plug#end()

"Remaping the keybindings
inoremap jk <Esc>
inoremap zz <Esc>zz
""inoremap " ""<left>
""inoremap { {}<left>
""inoremap [ []<left>
""inoremap ( ()<left>
""inoremap ' ''<left>
nnoremap <esc><esc> :noh<enter><esc>
nnoremap j gj
nnoremap k gk
nnoremap <leader>s :set spell!

"lightline statusline colorscheme
let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ }

"Setting up spelling check within vim
"set spell spelllang=en_us
