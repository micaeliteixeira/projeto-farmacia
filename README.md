# 🚧 Projeto Farmácia ! 🚧

Para esse projeto, é um portal para acessar os dados a API da BlueStorm Software. O portal irá ser composto de basicamente três páginas:

- **Página de login:** Onde o usuário entrará com suass credenciais, para poder acessar as páginas e informações da API.
- **Página de listagem de medicamentos:** Onde o usuário poderá listar os medicamentos e buscar medicamento por nome.
- **Formulário de criação de medicamento:** Onde o usuário poderá entrar com informações para o cadastro de um novo medicamento.

## ⛏ Ferramentas utilizadas

- Vite + React;
- Sass
- Redux Toolkit
- Axios
- Node.Js (v18.16.0)

## Processo de instalação e build

### 🏗 Instalação

1.  Baixe o repositório em sua máquina com o comando:
 ```bash
    git clone git@github.com:micaeliteixeira/projeto-farmacia.git
 ```

2.  É necessário ter o Node instalado na máquina.

- **Para quem não tem o node**:
  - Esse artigo deve te ajudar a instalar: [como instalar o node.js](https://site.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?utm_term=&utm_campaign=%5BSearch%5D%20%5BPerformance%5D%20-%20Dynamic%20Search%20Ads%20-%20Artigos%20e%20Conte%C3%BAdos&utm_source=adwords&utm_medium=ppc&hsa_acc=7964138385&hsa_cam=11384329873&hsa_grp=111087461203&hsa_ad=662261334153&hsa_src=g&hsa_tgt=aud-539280194844:dsa-843358956400&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQjwi7GnBhDXARIsAFLvH4lQ3zKcbGq13Vu9WXgut2isLI-V14Ghgi0J1d72TiD_4gVv3OkM7qsaAvrKEALw_wcB)
  - Depois é so seguir os passos no tópico abaixo (Para quem já tem o node.js)
  -
- **Para quem já tem o node**:  
  No terminal confira se a versão usada em sua máquina é maior que >=18

```bash
// verificando a versão
node --version

// caso não seja a versão 18, verifique se tem a versão já instalada na máquina
nvm ls

//caso exista a versão basta abrir o repositório clonado e no terminal mudar a versão do node

cd
nvm use v18.16.0

// caso não exista a versão 18 em sua máquina basta instalar e depois fazer o passo de abrir o projeto
nvm install
cd
```

3.  Agora é necessário instalar as dependências necessárias para o projeto rodar, basta digitar no terminal:

```bash
npm install
```

### 🚀 Rodando o projeto

1.  Para rodar o projeto digite no terminal

```bash
npm run dev
```

2. Clique no link gerado no informando o localhost que o projeto está rodando.![Captura de tela de 2023-08-28 17-21-07](https://github.com/micaeliteixeira/projeto-farmacia/assets/67610045/7511f241-cc59-4ede-a8e4-1b7a763d46ee)
      
3. Login se senha do projeto
```bash
username: bluestorm-api
password: apipassword123
```
   


