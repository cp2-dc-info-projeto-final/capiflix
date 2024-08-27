## Casos de Uso:
### Caso de uso 1: Cadastro de usuário.
#### Atores:
- Usuário.
#### Fluxo principal:
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere as informações do formulário(insere email, cria um senha e um nome usuário).
- O sistema verifica no banco de dados se as informações estão disponíveis.
- O banco de dados retorna verdadeiro.
- O sistema cria a conta para o novo usuário registrando as informações no banco de dados.
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

#### Fluxo Alternativo C: Campo vazio
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere algumas das informações do formulário(insere email, cria um senha e um nome usuário).
- O usuário esquece esquece de preencher um ou algun campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao usuário  que insira os dadsos no campo vazio.
- O usuário insere todas as informações no  formulário(insere email, cria um senha e um nome usuário).
- O sistema verifica no banco de dados se as informações estão disponíveis.
- O banco de dados retorna verdadeiro.
- O sistema cria a conta para o novo usuário registrando as informações no banco de dados.
- O sistema redireciona o usuário para a página inicial do site.

### Caso de uso 2:Login.
#### Atores:
- Usuário
#### Fluxo principal:
- O sistema exibirá na página um formulário para o usuário efetuar o login. 
- O usuário insere seu email e senha e clica no botão entrar.
- O sistema busca no banco de dados as informações do usuário.
- O sistema verifica se as informações do usuário são corretas.
- O banco de dados retorna verdadeiro.
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

#### Fluxo Alternativo C: Campo vazio
- O sistema exibirá na página um formulário para o usuário efetuar o login
- - O usuário esquece esquece de preencher um ou algun campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao usuário que insira os dados no campo vazio.
- O usuário insere todas as informações no  formulário(insere email e a senha )
- O sistema verifica no banco de dados se as informações estão corretas.
- O banco de dados retorna verdadeiro.
- O sistema redireciona o usuário para a página inicial do site.

### Caso de uso 3: Avaliação.
#### Atores:
- Usuário
#### Fluxo principal:
- O usuário pressiona no botão de avaliação do filme. 
- O sistema exibe a avaliação de 1 até de 5 estrelas.
- O usuário avalia o filme até 5 estrelas.
- O sistema cadastra a avaliação do usuário no banco de dados.
- O Banco de dados retorna verdadeiro.
- O sistema atualiza a avaliação do filme fazendo uma porcentagem entre todas as notas correspondentes ao filme.

### Caso de uso 4: Exclusão de perfil.

#### Atores:
- Usuário
- Administrador 
#### Fluxo principal:
- O usuário pressiona no botão de excluir conta.
- O sistema solicita a senha do usuário para continuar o processo.
- O usuário insere a senha.
- O sistema verifica a senha no banco de dados.
- O banco de dados retorna verdadeiro
- O sistema apaga os dados da conta do usuário.
- O sistema atualiza as contas no banco de dados.
- O banco de dados retorna verdadeiro.
- o sistema exibe mensagem de sucesso.
- O sistema exibe a janela de cadastro do site.
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
- O usuário Pressiona no botão de logout.
- O sistema exibe um botão de confirmamento de logout para o usuário.
- O usuário confirma.
- O sistema remove o login do usuário.
- O sistema direciona o usuário a página inicial.

### Caso de uso 6: Pesquisa de filme por nome.
#### Atores : 
- Usuário
#### Fluxo principal:
- O usuário pressiona na barra de pesquisa.
- O sistema disponibiliza a opção de procurar um filme pelo nome.
- O usuário insere o nome de um filme.
- O sistema busca no banco de dados o filme com o nome inserido.
- O banco de dados retorna o filme buscado.
- O sistema exibe o filme correspondente. 
#### Fluxo alternativo A: Filme não encontrado.
- O usuário busca pelo filme digitado.
- O sistema busca no banco de dados.
- O banco de dados retorna falso.
- O sistema exibe uma mensagem de filme não encontrado.
### Caso de uso 7: Busca de filmes por gênero.
#### Atores : 
- Usuário
#### Fluxo principal: 
- O usuário clica no botão gêneros.
- O sistema busca no banco de dados opções de gêneros.
- O banco de dados retorna ao sistema opções de gêneros.
- O sistema exibe as opções de gêneros.
- O usuário seleciona um gênero exibido pelo sistema.
- O sistema busca no banco de dados filmes com o gênero escolhido.
- O banco de dados retorna os filmes de acordo com o gênero buscado.
- O sistema exibe os filmes correspondentes.

### Caso de uso 8: Cadastro de filmes.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica no botão de cadastrar novo filme.
- O sistema exibi uma pagina de cadastro com  formulário.
- O Administrador insere os dados (nome,sinopse,gênero,data,capa e trailer.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita senha ao administrador.
- O administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra o filme no dados no banco de dados.
- O sistema adiciona o filme no catalogo.
- O sistema envia uma mensagem de sucesso.
#### Fluxo Alternativo A: Campo vazio
- O Administrador clica na opção de cadastrar novo filmes.
- O sistema exibi uma pagina de cadastro com  formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao administrador que insira a senha correta.
#### Fluxo Alternativo B: Senha invalida.
- O Administrador clica no botão de cadastro de filmes.
- O sistema exibe o formulário de criação de filmes.
- O administrador insere os dados do filme.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
### Caso de uso 9: Remoção de filmes.
#### Atores : 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona um filme no banco de dados.
- O administrador clica no botão de remover filme.
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro
- O sistema deleta o filme do banco de dados.
- O sistema atualiza a página de filmes.
- O sistema exibe mensagem de sucesso.
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
- O sistema busca ao banco de dados o filme buscado.
- O banco de dados retorna o filme buscado.
- O sistema exibe o filme buscado.
- O administrador pressiona no botão de modificar filme.
- O sistema envia exibe opções para modificar o filme.
- O administrador seleciona o que deseja modificar.
- O administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página do filme.
- O sistema exibe uma mensagem de sucesso.
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
#### Fluxo Alternativo B:Campo vazio.
- O administrador busca o filme que deseja modificar no banco de dados.
- O sistema busca no banco de dados o filme buscado.
- O banco de dados retorna verdadeiro.
- O sistema exibe o filme buscado.
- O administrador pressiona no botão de modificar filme.
- O sistema envia exibe opções para modificar o filme.
- O administrador seleciona o que deseja modificar.
- O administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 11:Criação de gênero
#### Atores:
- Administrador
#### Fluxo principal:
- O administrador pressiona no botão de criar gênero.
- O sistema exibi uma pagina de criação de gênero.
- O Administrador insere o nome do gênero.
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita senha ao administrador.
- O administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra o gênero no banco de dados.
- O sistema adiciona o gênero no catalogo.
- O sistema envia uma mensagem de sucesso.
#### Fluxo Alternativo A: Campo vazio
- O Administrador clica na opção de cadastrar novo gênero.
- O sistema exibi uma pagina de cadastro com formulário.
- O Administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem no campo vazio e solicita que o administrador insira a senha correta.
#### Fluxo Alternativo B: Senha invalida.
- O Administrador clica no botão de cadastro de gêneros.
- O sistema exibe o formulário de criação de gêneros.
- O administrador insere os dados do filme.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida e solicita que o administrador insira a senha corretamente.
### Caso de uso 12:Alteração de gênero.
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O administrador busca o gênero que deseja modificar no banco de dados.
- O sistema busca no banco de dados o gênero buscado.
- O banco de dados retorna verdadeiro.
- O sistema exibe o gênero buscado.
- O administrador pressiona no botão de modificar gênero.
- O sistema envia exibe opções para modificar o gênro.
- O administrador seleciona o que deseja modificar.
- O administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página do filme.
- O sistema exibe uma mensagem de sucesso.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona um gênero no banco de dados.
- O sistema exibe o gênero buscado.
- O administrador clica no botão de alterar gênero.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida e solicita que o administrador insira a senha correta.
#### Fluxo Alternativo B:Campo vazio.
- O administrador busca o gênero que deseja modificar no banco de dados.
- O sistema busca no banco de dados o gênero buscado.
- O banco de dados retorna verdadeiro.
- O sistema exibe o gênero buscado.
- O administrador pressiona no botão de modificar gênero.
- O sistema envia exibe opções para modificar o gênro.
- O administrador seleciona o que deseja modificar.
- O administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 13:Remoção de gênero
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O Administrador busca um gênero no banco de dados.
- O sistema busca no banco de dados o gênero buscado.
- O banco de dados retorna o gênero buscado.
- O sistema exibe o gênero buscado.
- O administrador usa o botão de remoção de gênero.
- O sistema solicita a senha ao administrador
- O administrador insere a senha.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema apaga o gênero no banco de dados.
- O sistema atualiza a página de gênero.
- O sistema envia uma mensagem de sucesso.
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
#### Fluxo Alternativo B: Gênero não encontrado
- O administrador busca um gênero no banco de dados.
- O sistema envia ao banco de dados o gênero buscado.
- O banco de dados não encontra o gênero buscado.
- O sistema exibe uma mensagem de "sistema não encontrado"


