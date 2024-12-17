const dotenv = require('dotenv').config()

const { SECRET_ACCESS_TOKEN, NODE_ENV } = process.env;
const express = require('express');
const cors = require('cors');
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const e = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');


databasePath = './capiflix.db'

const app = express();

const port = 3000;

app.use('/capas', express.static(path.join(__dirname, 'capas')));

app.use(cors({
  origin: 'http://localhost:5173', // Habilita apenas URL do frontend svelte
  credentials: true, 
}));

app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function geraConexaoDeBancoDeDados() {
  let db = new sqlite3.Database('./capiflix.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });
  return db;
}

// Configuração do multer para salvar as imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'capas/'); // Diretório para salvar as imagens
  },
  filename: function (req, file, cb) {
    // Atribuindo o título do filme no nome do arquivo (remover espaços e usar um nome único)
    const nomeDoArquivo = req.body.titulo.replace(/\s+/g, '_'); // Substitui espaços por "_"
    const extensao = path.extname(file.originalname); // Obtém a extensão do arquivo (ex: .jpg, .png)
    
    // Cria o nome do arquivo com o título do filme e o timestamp para garantir que seja único
    cb(null, nomeDoArquivo + '_' + Date.now() + extensao);
  }
});


const capa = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB para o arquivo
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Somente imagens JPEG, PNG e GIF são permitidas.'));
    }
    cb(null, true);
  }
});



function geraAcessoJWT(idUsuario) {
  let payload = {
    idUsuario: idUsuario
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '10m',
  });
};

async function login(req, res) {
  let db = geraConexaoDeBancoDeDados();

  const { email, senha } = req.body;

  // recupera a senha do usuário que está tentando fazer login
  db.get('SELECT id_usuario, senha FROM usuario WHERE email = ?', [email], async (error, result) => {
    if (error) {
      console.log(error)
    }
    else if (result) {
      let idUsuario = result.id_usuario;
      let senhaCorreta = await bcrypt.compare(senha, result.senha)
      if (!senhaCorreta) {
        return res.status(401).json({
          status: 'failed',
          message: 'Login ou senha incorretos!',
        });
      }

      let options = {
        maxAge: 10 * 60 * 1000, // minutos * segundos * milissegundos = total 20 minutos
        httpOnly: true, // restringe acesso de js ao cookie
        secure: NODE_ENV === 'production' ? true : false, // secure ativado de acordo com ambiente (desenvolvimento/produção) para uso do https
        sameSite: "Lax", // habilita compartilhamento de cookie entre páginas
      };

      console.log(`secure: ${options.secure}`);

      const token = geraAcessoJWT(idUsuario); // gera um token de sessão para o usuário

      console.log(`Usuário ${email} logado com sucesso!\nToken: ${token}`);      

      // após realizar login, vá nas ferramentas do desenvolvedor do navegador, na aba Application, em Cookies, e veja o cookie SessionID
      res.cookie("SessionID", token, options); // preenche o token na resposta para ser utilizado pelo cliente nas próximas requisições
        res.status(200).json({
            status: "success",
            message: "Autenticação realizada com sucesso!",
        });
    }

    db.close((err) => {
      if (err) {
        console.log(err.message);
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

  });
}


async function verificaTokenAdmin(req, res, next) {  
  // se o token (variável SessionID) não estiver presente no cookie o usuário não está logado
  const token = req.cookies.SessionID;
  if (!token) {
    return res.status(401).json({ 
      status: 'failed', 
      message: 'Você não é um admin!'
    });
  }

  console.log(`token: ${token}`);
  console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);
  jwt.verify(token, SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'Sessão expirada!',
      });
    } else {
      // o conteúdo decodificado do token é o id do usuário
      let { idUsuario} = decoded;
      console.log(`decoded: ${decoded}`);
      console.log(`idUsuario decoded: ${decoded.idUsuario}`);

      db = geraConexaoDeBancoDeDados();

      // recupera dados do usuário que está tentando fazer login
      db.get('SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ? AND is_admin = true', [idUsuario], async (error, result) => {
        if (error) {
          console.log(error)
        }
        else if (result) {
          const { id_usuario, nome, email } = result
          req.idUsuario = id_usuario
          req.email = email
          req.nome = nome

          db.close((err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log('Fechou a conexão com o banco de dados.')
          });

          next();
        }
      });
    }   
  });
}


// esta função é um middleware, uma chamada que vai entre duas chamadas para verificar se o usuário está logado
async function verificaToken(req, res, next) {  
  // se o token (variável SessionID) não estiver presente no cookie o usuário não está logado
  const token = req.cookies.SessionID;
  if (!token) {
    return res.status(401).json({ 
      status: 'failed', 
      message: 'Você não está logado!'
    });
  }

  console.log(`token: ${token}`);
  console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);
  jwt.verify(token, SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'Sessão expirada!',
      });
    } else {
      // o conteúdo decodificado do token é o id do usuário
      let { idUsuario} = decoded;
      console.log(`decoded: ${decoded}`);
      console.log(`idUsuario decoded: ${decoded.idUsuario}`);

      db = geraConexaoDeBancoDeDados();

      // recupera dados do usuário que está tentando fazer login
      db.get('SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ?', [idUsuario], async (error, result) => {
        if (error) {
          console.log(error)
        }
        else if (result) {
          const { id_usuario, nome, email } = result
          req.idUsuario = id_usuario
          req.email = email
          req.nome = nome

          db.close((err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log('Fechou a conexão com o banco de dados.')
          });

          next();
        }
      });
    }   
  });
}

app.put('/usuarios/me', (req, res) => {
  console.log('Requisição PUT recebida para /usuarios/me');
  // Continue com a lógica
});


app.post("/login", login);

app.post('/logout', (req, res) => {
  // Limpa o cookie "SessionID" 
  res.clearCookie("SessionID");

  // Retorna uma resposta de sucesso
  res.status(200).json({
    status: 'success',
    message: 'Logout realizado com sucesso!'
  });
});

// Endpoint para retornar todos os dados do usuário logado
app.get('/usuarios/me', verificaToken, (req, res) => {
  // recupera dados do usuário logado
  const usuarioLogado = {
    idUsuario: req.idUsuario,
    nome: req.nome,
    email: req.email
  }
  // Retorna os dados do usuário em formato JSON
  res.status(200).json({
      status: 'success',
      usuario: usuarioLogado // Retorna todos os dados do usuário
  });
});

// uso do middleware verificaToken
app.get('/usuarios', (req, res) => {
  let db = geraConexaoDeBancoDeDados();

  // Seleciona todos os usuários da tabela 'usuario'
  db.all('SELECT * FROM usuario', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retorna os dados dos usuários em formato JSON
    res.status(200).json({
      status: 'success',
      usuarios: rows
    });
  });
});


app.post('/usuarios/novo', (req, res) => {
  const { nome, email, senha, conf_senha } = req.body;
  console.log(req);
  // Aqui começa a validação dos campos do formulário
  let erro = "";
  if (nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1) {
    erro += 'Por favor, preencha todos os campos corretamente!';
  }
  if (senha != conf_senha) {
    erro += 'As senhas digitadas não são iguais!';
  }
  if (senha.length < 6 && conf_senha.length < 6){
    erro += 'por favor, preencha os campos com pelo menos 6 digitos';
  }
  if (erro) {
    res.status(500).json({
      status: 'failed',
      message: erro,
    });
  }
  else {
    // aqui começa o código para inserir o registro no banco de dados
    let db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou no banco de dados!');
    });
    db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error)
      }
      else if (result) {
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Fechou a conexão com o banco de dados.');
        });
        return res.status(500).json({
          status: 'failed',
          message: 'Este e-mail já está em uso!',
        });
      } else {
        let senha_criptografada = await bcrypt.hash(senha, 8)
        db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome,
          email, senha_criptografada], (error2) => {
            if (error2) {
              console.log(error2)
            } else {
              db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log('Fechou a conexão com o banco de dados.');
              });
              return res.status(200).json({
                status: 'success',
                message: 'Registro feito com sucesso!',
                campos: req.body
              });
            }
          });
      }
    });
  }
});

// FUNÇÃO DE MUDAR NOME
app.put('/usuarios/mudar-nome/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario; // Renomeado para corresponder ao estilo de código
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      status: 'failed',
      message: 'Nome é obrigatório!'
    });
  }

  // Conectar ao banco de dados SQLite
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao conectar ao banco de dados!',
        error: err.message
      });
    }
    console.log('Conectou no banco de dados!');
  });

  // Modificar o nome do usuário pelo ID
  db.run('UPDATE usuario SET nome = ? WHERE id_usuario = ?', [nome, id_usuario], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar modificar o nome do usuário ${id_usuario}!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'Usuário não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Nome do usuário atualizado com sucesso!`
    });
  });
});

// FUNÇÃO DE MUDAR SENHA

app.put('/usuarios/mudar-senha/:id_usuario',(req, res) => {
  const id_usuario = req.params.id_usuario;
  const { senhaAtual, novaSenha } = req.body;

  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({
      status: 'failed',
      message: 'Senha atual e nova senha são obrigatórias!'
    });
  }

  // Conectar ao banco de dados SQLite
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao conectar ao banco de dados!',
        error: err.message
      });
    }
    console.log('Conectou no banco de dados!');
  });

  // Verificar se a senha atual está correta
  db.get('SELECT senha FROM usuarios WHERE id = ?', [id_usuario], (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    if (!row) {
      return res.status(404).json({
        status: 'failed',
        message: 'Usuário não encontrado!'
      });
    }

    const senhaCorreta = row.senha;

    // Comparar a senha atual com a senha armazenada (hash)
    bcrypt.compare(senhaAtual, senhaCorreta, (err, resultado) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'Erro ao verificar a senha!',
          error: err.message
        });
      }

      if (!resultado) {
        return res.status(401).json({
          status: 'failed',
          message: 'Senha atual está incorreta!'
        });
      }

      // Hash a nova senha antes de armazená-la
      bcrypt.hash(novaSenha, 10, (err, hashNovaSenha) => {
        if (err) {
          return res.status(500).json({
            status: 'failed',
            message: 'Erro ao hash a nova senha!',
            error: err.message
          });
        }

        // Atualizar a senha no banco de dados
        db.run('UPDATE usuarios SET senha = ? WHERE id = ?', [hashNovaSenha, id_usuario], function(err) {
          if (err) {
            return res.status(500).json({
              status: 'failed',
              message: 'Erro ao atualizar a senha!',
              error: err.message
            });
          }

          return res.status(200).json({
            status: 'success',
            message: 'Senha atualizada com sucesso!'
          });
        });
      });
    });
  });

  // Fechar a conexão com o banco de dados
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
    }
  });
});

// FUNÇÃO PARA PROMOVER USUÁRIO A ADMIN
app.put('/usuarios/promover-admin/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario; // Pega o id do usuário pela URL

  // Conectar ao banco de dados SQLite
  let db = geraConexaoDeBancoDeDados()

  // Atualizar o campo is_admin para 1 (verdadeiro) para promover o usuário
  db.run('UPDATE usuario SET is_admin = 1 WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar promover o usuário ${id_usuario} a admin!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada (se o usuário foi encontrado)
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'Usuário não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Usuário promovido a administrador com sucesso!`
    });
  });
});

// FUNÇÃO PARA REMOVER USUÁRIO
app.delete('/usuarios/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;

  // Conectar ao banco de dados SQLite
  let db = geraConexaoDeBancoDeDados();

  // Deletar o usuário pelo ID
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar remover o usuário ${id_usuario}!`, // Corrigido: interpolação de string com crase
        error: err.message
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Usuário com id ${id_usuario} removido com sucesso!`
    });
  });
});


app.get('/home', (req, res) => {
  if (req.session.userId) {
    res.send(`Bem-vindo, ${req.session.userId}! Você está logado.`);
  } else {
    res.status(403).send('Você não está logado.');
  }
});


// uso do middleware verificaToken e exibir filmes
app.get('/filmes', (req, res) => {
  let db = geraConexaoDeBancoDeDados();

  // Consulta ajustada para incluir o nome do gênero
  const sql = `
    SELECT 
      f.id_filme, 
      f.titulo, 
      f.descricao, 
      f.ano, 
      f.classificacao,
      f.imagem_url, 
      g.nome AS genero 
    FROM filme f
    LEFT JOIN genero g ON f.id_genero = g.id_genero
  `;

  // Executa a consulta
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retorna os dados dos filmes em formato JSON
    res.status(200).json({
      status: 'success',
      filmes: rows
    });
  });
});

// FUNÇÃO PARA REMOVER FILME
app.delete('/filmes/:id_filme', (req, res) => {
  const { id_filme } = req.params;

  let db = geraConexaoDeBancoDeDados();

  // Deletar o usuário pelo ID
  db.run('DELETE FROM filme WHERE id_filme = ?', [id_filme], function (err) {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar remover o filme ${id_filme}!`, // Corrigido: interpolação de string com crase
        error: err.message
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `filme com id ${id_filme} removido com sucesso!`
    });
  });
});
  
// CRIAR FILME
app.post('/filmes/novo', capa.single('imagem'), (req, res) => {
  const { titulo, descricao, ano, classificacao, id_genero } = req.body;
  let erro = "";

  // Validação dos campos do formulário
  if (!titulo || !descricao || !ano || !classificacao || !id_genero) {
    erro += 'Por favor, preencha todos os campos corretamente!';
  }

  // Validando a imagem
  if (!req.file) {
    erro += 'A imagem é obrigatória!';
  }

  if (erro) {
    return res.status(400).json({
      status: 'failed',
      message: erro,
    });
  }

  // Obtendo o caminho da imagem
  const imagemUrl = '/capas/' + req.file.filename; // Caminho da imagem armazenada

  // Conectando ao banco de dados
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });

  // Verificando se o título já existe
  db.get('SELECT titulo FROM filme WHERE titulo = ?', [titulo], (error, result) => {
    if (error) {
      console.error(error);
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao verificar o título no banco de dados.',
      });
    } else if (result) {
      db.close();
      return res.status(400).json({
        status: 'failed',
        message: 'Este título já está em uso!',
      });
    } else {
      // Inserindo o filme no banco de dados
      db.run('INSERT INTO filme (titulo, descricao, ano, classificacao, id_genero, imagem_url) VALUES (?, ?, ?, ?, ?, ?)', 
        [titulo, descricao, ano, classificacao, id_genero, imagemUrl], (error2) => {
          if (error2) {
            console.error(error2);
            db.close();
            return res.status(500).json({
              status: 'failed',
              message: 'Erro ao inserir o filme.',
            });
          } else {
            db.close();
            return res.status(200).json({
              status: 'success',
              message: 'Registro feito com sucesso!',
              campos: req.body,
              imagemUrl: imagemUrl // Retorna o caminho da imagem
            });
          }
        });
    }
  });
});


// FUNÇÃO DE MUDAR TITULO
app.put('/filmes/mudar-titulo/:id_filme', (req, res) => {
  const id_filme = req.params.id_filme; // Renomeado para corresponder ao estilo de código
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({
      status: 'failed',
      message: 'titulo é obrigatório!'
    });
  }

  let db = geraConexaoDeBancoDeDados();

  // Modificar o nome do usuário pelo ID
  db.run('UPDATE filme SET titulo = ? WHERE id_filme = ?', [titulo, id_filme], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar modificar o nome do usuário ${id_filme}!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'filme não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Nome do usuário atualizado com sucesso!`
    });
  });
});

// FUNÇÃO DE MUDAR DESCRIÇAO
app.put('/filmes/mudar-descricao/:id_filme', (req, res) => {
  const id_filme = req.params.id_filme; // Renomeado para corresponder ao estilo de código
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({
      status: 'failed',
      message: 'descrição é obrigatório!'
    });
  }

  let db = geraConexaoDeBancoDeDados();

  // Modificar o nome do usuário pelo ID
  db.run('UPDATE filme SET descricao = ? WHERE id_filme = ?', [descricao, id_filme], function (err) {
    if (err) {
      db.close();
      return res.status(400).json({
        status: 'failed',
        message: `Erro ao tentar modificar a descricao do filme ${id_filme}!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'filme não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `descriçao atualizada com sucesso!`
    });
  });
});

// FUNÇÃO DE MUDAR ANO
app.put('/filmes/mudar-ano/:id_filme', (req, res) => {
  const id_filme = req.params.id_filme; // Renomeado para corresponder ao estilo de código
  const { ano } = req.body;

  if (!titulo) {
    return res.status(400).json({
      status: 'failed',
      message: 'ano é obrigatório!'
    });
  }

  let db = geraConexaoDeBancoDeDados();

  // Modificar o nome do usuário pelo ID
  db.run('UPDATE filme SET ano = ? WHERE id_filme = ?', [ano, id_filme], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar modificar o ano do filme ${id_filme}!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'filme não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Nome do usuário atualizado com sucesso!`
    });
  });
});

// FUNÇÃO DE MUDAR CLASSIFICAÇÃO
app.put('/filmes/mudar-classificacao/:id_filme', (req, res) => {
  const id_filme = req.params.id_filme; // Renomeado para corresponder ao estilo de código
  const { classificacao } = req.body;

  if (!titulo) {
    return res.status(400).json({
      status: 'failed',
      message: 'classificação é obrigatório!'
    });
  }

  let db = geraConexaoDeBancoDeDados();

  // Modificar o nome do usuário pelo ID
  db.run('UPDATE filme SET classificacao = ? WHERE id_filme = ?', [classificacao, id_filme], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar modificar a classificacao do filme ${id_filme}!`,
        error: err.message
      });
    }

    // Verifica se alguma linha foi afetada
    if (this.changes === 0) {
      db.close();
      return res.status(404).json({
        status: 'failed',
        message: 'filme não encontrado!'
      });
    }

    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Nome do usuário atualizado com sucesso!`
    });
  });
});

app.get('/filmes/busca', (req, res) => {
  const titulo = req.query.titulo;

  let db = geraConexaoDeBancoDeDados();

  db.all('SELECT imagem_url, titulo FROM filme WHERE titulo LIKE ?', [`%${titulo}%`], (error, rows) => {
    if (error) {
      console.error(error);
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao verificar o título no banco de dados.',
      });
    }

    if (rows.length === 0) {
      db.close();
      return res.status(400).json({
        status: 'failed',
        message: 'Este título não foi encontrado!',
      });
    } else {
      db.close();
      return res.status(200).json({
        status: 'success',
        filmes: rows, // agora retorna a lista com as URLs das imagens
      });
    }
  });
});

app.get('/generos', (req, res) => {
  let db = geraConexaoDeBancoDeDados();

  // Seleciona todos os usuários da tabela 'usuario'
  db.all('SELECT * FROM genero', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retorna os dados dos usuários em formato JSON
    res.status(200).json({
      status: 'success',
      generos: rows
    });
  });
});

// CRIAR GÊNERO

app.post('/generos/novo', (req, res) => {
  const { nome } = req.body;
  console.log(req);
  // Aqui começa a validação dos campos do formulário
  let erro = "";
  if (nome.length < 1 ) {
    erro += 'Por favor, preencha todos os campos corretamente!';
  }
  if (erro) {
    res.status(500).json({
      status: 'failed',
      message: erro,
    });
  }
  else {
    // aqui começa o código para inserir o registro no banco de dados
    let db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou no banco de dados!');
    });
    db.get('SELECT nome FROM genero WHERE nome = ?', [nome], async (error, result) => {
      if (error) {
        console.log(error)
      }
      else if (result) {
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Fechou a conexão com o banco de dados.');
        });
        return res.status(500).json({
          status: 'failed',
          message: 'Este nome já está em uso!',
        });
      } else {
        db.run('INSERT INTO genero(nome) VALUES (?)', [nome,
          ], (error2) => {
            if (error2) {
              console.log(error2)
            } else {
              db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log('Fechou a conexão com o banco de dados.');
              });
              return res.status(200).json({
                status: 'success',
                message: 'Registro feito com sucesso!',
                campos: req.body
              });
            }
          });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
