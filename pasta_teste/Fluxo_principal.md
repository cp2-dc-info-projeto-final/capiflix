## Casos de Uso:
### Caso de uso 1: Cadastro de usuário
#### Atores:
- Usuário.
#### Fluxo principal:
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para  a página de cadastro. 
- O usuário  coloca um email,  cria um senha e um nome usuário.
- O sistema registra  as informações no banco de dados, cria a conta para o novo usuário.

#### Fluxo alternativo A: Email inválido
- O usuário insere um email.
- O sistema verifica se o email já está sendo usado por  alguma conta.
- O sistema informa ao usuário que o email já está sendo usado e sugere o usuário que use outro email.

### Login:
- O sistema exibirá na página um formulário para o usuário efetuar o login. 
- O usuário coloca seu email e senha e clica no botão entrar.
- O sistema procura no banco de dados as informações do usuário.
- O sistema verifica se as informações do usuário são corretas.
- O usuário é redirecionado a página inicial com acesso a conta. 

### Avaliação:
- O usuário clica no botão de avaliação do filme. 
- O sistema mostra a avaliação de 5  estrelas .
- O usuário avalia o filme até 5 estrelas.
- O sistema cadastra a avaliação do usuário no banco de dados
- O sistema atualiza a avaliação do filme fazendo uma porcentagem entre todas as notas correspondentes ao filme.

### Exclusão de perfil:
- O usuário clica no botão de sair.
- O sistema procura no banco de dados a conta correspondente.
- O sistema  apaga os dados da conta do usuário.
- O sistema exibe a janela de login ou cadastro do site.

### Logout:
- O Usuário clica em conta.
- O sistema abre a página do usuário.
- O usuário clica em logout.
- O sistema tira o login do usuário.

### Pesquisa de filme por nome:
- O usuário clica na barra de pesquisa.
- O sistema disponibiliza a opção de procurar um filme pelo nome.
- O usuário digita o nome de um filme.
- O sistema procura no banco de dados o filme com o nome inserido.
- O sistema exibe o filme correspondente. 

### Busca de filmes por gênero:
- O usuário clica em gêneros.
- O sistema mostra opções de gêneros.
- O usuário escolhe um gênero exibido pelo sistema.
- O sistema exibe os filmes correspondentes.

### Cadastro de filmes:
- O Administrador clica na opção de cadastrar novo filmes.
- O sistema exibi uma pagina de cadastro com  formulário.
- O Administrador insere os dados (nome,  sinopse, gênero , capa  e trailer.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema adiciona os filme no catalogo.  

### Remoção de filmes;
- O Administrador seleciona um filme no banco de dados.
- O sistema exibe o filme buscado.
- O administrador usa a opção de remover o filme.
- O sistema apaga o filme do banco de dados.
- O sistema atualiza a página de filmes.

### Alteração de filme:
- O administrador busca o filme que deseja modificar.
- O sistema exibe o filme buscado.
- O administrador escolhe o que deseja modificar.
- O administrador modifica o que selecionou para modificar.
- O sistema atualiza as modificações do administrador no banco de dados.

### Remoção de gênero:
- O Administrador seleciona um gênero no banco de dados.
- O sistema exibe o gênero buscado.
- O administrador usa a opção de remoção de gênero.
- O sistema apaga o gênero no banco de dados.
- O sistema atualiza a página de gênero.
- 
### Exclusão de perfil por Admin:
- O Administrador clica no botão de excluir perfil.
- O sistema procura no banco de dados a conta correspondente.
- O sistema  apaga os dados da conta do usuário.
- O sistema exibe uma janela de que a conta foi excluida com sucesso.
 
###  Assistir trailer:
- O usuário seleciona um filme.
- O sistema exibe a página do filme.
- O usuário seleciona a opção de assistir trailer.
- O sistema exibe o trailer do filme.

# Fluxo alternativo
###  email invalido:
- O usuário insere o email.
- O usuário envia o email. 
- O sistema verifica se o email corresponde.
- O sistema exibe uma mensagem de erro. 
- O sistema dá uma opção de restauração de email.

###  Erro  de  senha:
- O usuário insere a senha.
- O usuário envia a senha. 
- O sistema verifica se a senha corresponde.
- O sistema exibe uma mensagem de erro. 
- O sistema dá uma opção de restauração de senha.

### Erro  de  :
- O usuário insere o nome  .
- O usuário envia o email. 
- O sistema verifica se o email corresponde.
- O sistema exibe uma mensagem de erro. 
- O sistema dá uma opção de restauração de email.
