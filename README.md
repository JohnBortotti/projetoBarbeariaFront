# barbearia-front

## Sobre
O proteto barbearia é um sistema para controle de servicos e clientes de uma barbearia, esse repositório é o front-end do projeto, desenvolvido utilizando:
* [Vue](https://vuejs.org/) na sua versão 2.6.11
* [Vue-Router](https://router.vuejs.org/) na sua versão 3.3.1
* [Bootstrap](https://getbootstrap.com/) na sua versão 4.5.0
* [Bootstrap-Vue](https://bootstrap-vue.org/) na sua versão 2.15.0
* [Barbearia-API](https://github.com/JohnBortotti/projetoBarbeariaAPI) desenvolvida para este projeto

## Instalação e configurações 
#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```
## Telas e Funcionamento
* ### Login
Na tela de login, as credenciais do usuário são enviadas para a API, se coincidirem com registros do banco de dados o usuário é redirecionado a tela Home

<img src='./src/img/login.PNG' width="400"></a>

<img src='./src/img/loginerror.PNG' width="400"></a>

* ### Home - Serviços
Nesta tela, já são listados diretamente todos os serviços registrados no banco em uma tabela, podendo ser filtrado por qualquer um dos filtros indicados, contendo 2 controles, o primeiro "Concluido", altera o status do serviço para 'realizado', já o segundo, como o nome sugere, deleta o resgistro daquele serviço.

<img src='./src/img/home.PNG' width="400"></a>

<img src='./src/img/homefilters.png' width="400"></a>

 O botão "novo serviço" redireciona o usuário para um formulário para inserção de um novo serviço

<img src='./src/img/novoservicoform.PNG' width="400"></a>

* ### Clientes
Nesta tela são listados todos os clientes em uma tabela, contendo 1 controle, com a funcionalidade de deletar aquele cliente

<img src='./src/img/clientes.PNG' width="400"></a>

O botão "Novo Cliente" redireciona o usuário para um formulário para inserção de um novo cliente

<img src='./src/img/clientesnovo.PNG' width="400"></a>

já o botão "Atualizar Cliente" redireciona o usuário para um formulário para atualizar as informações de um cliente

<img src='./src/img/clientesatualizar.PNG' width="400"></a>
