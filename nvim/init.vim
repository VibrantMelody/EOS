syntax on
:set number
:set relativenumber

:set ignorecase
:set smartcase

:set incsearch
:set hlsearch
:set showmatch

:set mouse=a
:set hidden

:set tabstop=4
:set shiftwidth=4
:set softtabstop=4
:set expandtab

"Remaping some of the keybindings
nnoremap <silent><leader><leader> :source ~/.config/nvim/init.vim<cr>
nnoremap <silent><esc><esc> :noh<cr>
nnoremap <silent><leader>s :set spell!<cr>
nnoremap <silent><leader>w :%s/\s\+$//<cr>:let @/=''<CR>
nnoremap <leader>ev <C-w><C-v><C-l>:e $MYVIMRC<cr>

nnoremap <tab> %
vnoremap <tab> %

inoremap jk <Esc>
nnoremap j gj
nnoremap k gk
inoremap zz <Esc>zzi<right>
inoremap <A-h> <C-h>
nnoremap j gj
nnoremap k gk
inoremap <A-w> <C-w>

nnoremap tc :tabedit 
nnoremap sp :vsplit<cr>
nnoremap T gt
nnoremap L <C-w>l
nnoremap H <C-w>h

"Installing plugins for vim through VIM_PLUG
""""""""""""""""""""""""""""""""""""""""""""
call plug#begin()

Plug 'https://github.com/itchyny/lightline.vim'
Plug 'https://github.com/ap/vim-css-color'
Plug 'https://github.com/tpope/vim-surround'

call plug#end()
""""""""""""""""""""""""""""""""""""""""""""

"lightline statusline colorscheme
let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ }
