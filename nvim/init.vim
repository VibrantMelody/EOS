syntax on
:set number
:set relativenumber

:set ignorecase
:set smartcase

:set incsearch
:set hlsearch
:set showmatch

:set mouse=a

:set tabstop=4
:set shiftwidth=4
:set softtabstop=4
:set expandtab
:set noswapfile

"Remaping some of the keybindings
nnoremap <silent><leader><leader> :source ~/.config/nvim/init.vim<cr>
nnoremap <silent><esc><esc> :noh<cr>
nnoremap <silent><leader>s :set spell!<cr>
nnoremap <silent><leader>w :%s/\s\+$//<cr>:let @/=''<CR>
nnoremap <leader>ev <C-w><C-v><C-l>:e $MYVIMRC<cr>
nnoremap S :source 

nnoremap <tab> %
vnoremap <tab> %

inoremap jk <Esc>
nnoremap j gj
vnoremap j gj
nnoremap k gk
vnoremap k gk
inoremap zz <Esc>zzi<right>
inoremap <A-h> <C-h>

nnoremap <silent>ta :tabedit<cr>
nnoremap <silent>sp :vsplit<cr><C-w>l
nnoremap <S-L> <C-w>l
nnoremap <S-H> <C-w>h
nnoremap <A-l> gt
nnoremap <A-h> gT
nnoremap F <Plug>LfEdit

"Installing plugins for vim through VIM_PLUG
""""""""""""""""""""""""""""""""""""""""""""
call plug#begin()

Plug 'https://github.com/itchyny/lightline.vim'
Plug 'https://github.com/ap/vim-css-color'
Plug 'https://github.com/tpope/vim-surround'
Plug 'https://github.com/thezeroalpha/vim-lf.git'
Plug 'https://github.com/moll/vim-bbye'

call plug#end()
""""""""""""""""""""""""""""""""""""""""""""

"lightline statusline colorscheme
let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ }
