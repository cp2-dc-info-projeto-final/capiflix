## Casos de Uso:
### Caso de uso 1: Cadastro de usuário.
#### Atores:
- Usuário.
#### Fluxo principal:
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere as informações do formulário(insere email, cria um senha e um nome usuário).
- O sistema verifica no banco de dados se as informações estão disponíveis.
- O sistema retorna verdadeiro,
- O sistema cria a conta para o novo usuário e registra as informações no banco de dados.
- O sistema redireciona o usuário para a página inicial do site.
#### Fluxo alternativo A: Email inválido.
- O usuário insere um email.
- O sistema verifica se o email já está sendo usado por alguma conta.
- O sistema informa ao usuário que o email já está sendo usado e sugere o usuário que use outro email.

#### Fluxo alternativo B: Senha diferente dos padrões exigidos.
- O usuário insere uma senha
- O sistema verifica se a senha está dentro dos padrões exigidos (no mínimo 8 caracteres, máximo de 16)
- O sistema exibe uma mensagem de erro. 
- O sistema informa ao usuário que a senha está fora dos padrões.
-  O sistema exibe uma mensagem sugerindo que o usuário coloque a senha correta. 

### Caso de uso 2:Login.
#### Atores:
- Usuário
#### Fluxo principal:
- O sistema exibirá na página um formulário para o usuário efetuar o login. 
- O usuário insere seu email e senha e clica no botão entrar.
- O sistema busca no banco de dados as informações do usuário.
- O sistema verifica se as informações do usuário são corretas.
- O usuário é redirecionado a página inicial com acesso a conta. 
#### Fluxo alternativo A: Email inválido.
- O usuário insere um email.
- O sistema verifica se o email está cadastrado no banco de dados.
- O sistema informa ao usuário que o email não está cadastrado no banco de dados.
- O sistema sugere ao usuário verificar o email ou iniciar um cadastro.
#### Fluxo alternativo B: Senha inválida.
- O usuário insere uma senha
- O sistema verifica se a senha está correta.
- O sistema exibe uma mensagem dizendo que a senha está inválida. 
- O sistema exibe uma mensagem sugerindo que o usuário insira a senha correta. 

### Caso de uso 3: Avaliação.
#### Atores:
- Usuário
#### Fluxo principal:
- O usuário pressiona no botão de avaliação do filme. 
- O sistema exibe a avaliação de 1 até de 5 estrelas .
- O usuário avalia o filme até 5 estrelas.
- O sistema cadastra a avaliação do usuário no banco de dados
- O sistema atualiza a avaliação do filme fazendo uma porcentagem entre todas as notas correspondentes ao filme.

### Caso de uso 4: Exclusão de perfil.

#### Atores:
- Usuário
#### Fluxo principal:
- O usuário clica no botão de excluir conta.
- O sistema procura no banco de dados a conta correspondente.
- O sistema pede a senha do usuário para continuar o processo.
- O usuário insere a senha.
- O sistema verifica no banco de dados se a senha está correta.
- O sistema  apaga os dados da conta do usuário.
- O sistema exibe a janela de login ou cadastro do site.
#### Fluxo alternativo A: Senha incorreta.
- O sistema pede que o usuário insira a senha para continuar o processo de exclusão da conta.
- O usuário insera a senha.
- O sistema verifica no banco de dados se a senha está correta.
- O sistema envia uma mensagem de erro e pede ao usuário que ele insira a senha correta.
- O sistema verifica se senha  esta correta,
- O sistema faz a operação exigida e envia o usuário para a área de login e cadastro.
### Caso de uso 5: Logout:
####  Atores:
- Usuário 
- Admin.
#### Fluxo principal:
- O Usuário clica em conta.
- O sistema abre a página do usuário.
- O usuário clica em logout.
- O sistema pede a senha do usuário.
- O usuário insere a senha.
- O sistema verifica se a senha esta correta.
- O sistema tira o login do usuário.
- O sistema faz a operação exigida e envia o usuário para a área de login e cadastro.
#### Fluxo Alternativo A: erro de senha.
- O Usuário clica em conta.
- O sistema abre a página do usuário.
- O usuário clica em logout.
- O sistema pede a senha do usuário.
- O usuário insere a senha.
- O sistema verifica se a senha esta correta.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o usuário inserir a senha corretamente.
- O usuário insere a senha novamente.
- O sistema verifica se a senha esta correta.
- O sistema tira o login do usuário.
- O sistema faz a operação exigida e envia o usuário para a área de login e cadastro.

### Caso de uso 6: Pesquisa de filme por nome.
#### Atores : 
- Usuário
#### Fluxo principal:
- O usuário clica na barra de pesquisa.
- O sistema disponibiliza a opção de procurar um filme pelo nome.
- O usuário digita o nome de um filme.
- O sistema procura no banco de dados o filme com o nome inserido.
- O sistema exibe o filme correspondente. 

### Caso de uso 7: Busca de filmes por gênero.
#### Atores : 
- Usuário
#### Fluxo principal: 
- O usuário clica em gêneros.
- O sistema mostra opções de gêneros.
- O usuário escolhe um gênero exibido pelo sistema.
- O sistema exibe os filmes correspondentes.

### Caso de uso 8: Cadastro de filmes.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica na opção de cadastrar novo filmes.
- O sistema exibi uma pagina de cadastro com  formulário.
- O Administrador insere os dados (nome,  sinopse, gênero , capa  e trailer.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema adiciona os filme no catalogo.
#### Fluxo Alternativo A: Campo vazio
 - O Administrador clica na opção de cadastrar novo filmes.
- O sistema exibi uma pagina de cadastro com  formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio.
- O sistema  pede ao Administrador para inserir os dados nos campos vazios de forma corretamente.
- O Administrador insere todos os dados.
- O sistema verifica se estão corretos e insere o filme no banco de dados.
- O sistema atualiza a pagina e adiciona o filme ao catalogo.

### Caso de uso 9: Remoção de filmes.
#### Atores : 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona um filme no banco de dados.
- O sistema exibe o filme buscado.
- O administrador  clica a opção de remover  filme.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema apaga o filme do banco de dados.
- O sistema atualiza a página de filmes.

#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona um filme no banco de dados.
- O sistema exibe o filme buscado.
- O administrador  clica a opção de remover  filme.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
- O Administrador insere a senha novamente.
- O sistema verifica se a senha esta correta.
- O sistema apaga o filme do banco de dados.
- O sistema remove o filme da página e atualiza a lista de filmes.

### Caso de uso 10: Alteração de filme.
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O administrador busca o filme que deseja modificar.
- O sistema exibe o filme buscado.
- O administrador seleciona o que deseja modificar.
- O administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema atualiza as modificações do administrador no banco de dados.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona um filme no banco de dados.
- O sistema exibe o filme buscado.
- O administrador clica na opção de alterar filme.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
- O Administrador insere a senha novamente.
- O sistema verifica se a senha esta correta.
- O sistema altera o filme do banco de dados.
- O sistema altera o filme da pagina e atualiza a lista de filmes.
### Caso de uso 11:Remoção de gênero
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O Administrador seleciona um gênero no banco de dados.
- O sistema exibe o gênero buscado.
- O administrador usa a opção de remoção de gênero.
- O sistema pede a senha ao administrador
- O administrador insere a senha.
- O sistema apaga o gênero no banco de dados.
- O sistema atualiza a página de gênero.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona um filme no banco de dados.
- O sistema exibe o filme buscado.
- O administrador clica na opção de remover gênero.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
- O Administrador insere a senha novamente.
- O sistema verifica se a senha esta correta.
- O sistema altera o filme do banco de dados.
- O sistema altera o filme da pagina e atualiza a lista de filmes.
### Caso de uso 12:Exclusão de perfil por Admin.
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O Administrador clica no botão de excluir perfil.
- O sistema pede a senha ao administrador.
- O administrador insere a senha corretamente.
- O sistema procura no banco de dados a conta correspondente.
- O sistema  apaga os dados da conta do usuário.
- O sistema exibe uma notificação de que a conta foi excluida com sucesso.

#### Fluxo alternativo A: Senha invalida.
- O Administrador seleciona uma conta no banco de dados.
- O sistema exibe a conta buscada.
- O administrador clica na opção de remover conta.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
- O Administrador insere a senha novamente.
- O sistema verifica se a senha esta correta.
- O sistema remove a conta do banco de dados.
- O sistema exibe uma notificação de que a conta foi excluida com sucesso.
### Caso de uso 13: Assistir trailer:
#### Atores : 
- Usuário
- Administrador 
#### Fluxo principal: 
- O usuário seleciona um filme.
- O sistema exibe a página do filme.
- O usuário seleciona a opção de assistir trailer.
- O sistema exibe o trailer do filme.

