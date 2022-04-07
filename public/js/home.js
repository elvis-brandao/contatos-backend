const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const formLogin = document.querySelector('#login-container > form');
const emailLogin = document.getElementById('email');
const senhaLogin = document.getElementById('senha');

const main = document.querySelector('main');
const modal = document.getElementById("modal");
const link = document.getElementById("linkAbrirModal");
const edits = document.querySelectorAll("section > a");
const search = document.getElementById('search');

const mostrarModal = () => {
    modal.style.display = "flex";
    modal.style.opacity = 1;
};

const esconderModal = (evt) => {
    evt.bubbles = false;
    modal.style.display = "none"
    modal.style.opacity = 0;
};

const loadContatos = async () =>{
    let token = sessionStorage.getItem('token');

    try{
        let resposta = await fetch('/contatos', 
            {
                method: 'GET',
                headers: {
                    authorization: `bearer ${token}`
                }   
            });
        let contatos = await resposta.json();
        showContatos(contatos);
    }catch (error){
        console.log(error);
    };
};

const showContatos = contatos =>{
    main.innerHTML = '';
    contatos.forEach(c =>{
        let section = document.createElement('section');
        
        let htmlEmails = '';
        c.emails.forEach(e => {
            htmlEmails += `<a href="mailto:${e}">${e}</a>`;
        });

        let htmlTels = '';
        c.telefones.forEach(t => {
            htmlTels += `<li><a href="tel:${t}">${t}</a></li>`;
        });

        let html = `
            <h3>${c.nome}</h3>
            <div>
                ${htmlEmails}
            </div>
            <ul>
                ${htmlTels}
            </ul>
            <a href="#">Editar</a>
        `;

        section.innerHTML = html;
        
        main.appendChild(section);
    });
};

const buscaContatos = trecho => {
    let contatosFiltrados = contatos.filter(
        c => c.nome.toUpperCase().includes(trecho.toUpperCase())
    );

    showContatos(contatosFiltrados);
};

const login = async (email, senha) => {
    let response = await fetch('/login', 
    {
        method: 'POST',
        body: `{"email": "${email}", "senha": "${senha}"}`,
        headers: {'content-type': 'application/json'}
    });

    if(response.status === 403){
        alert('Login Inválido');
        return;
    }else if(response.status === 200){
        //Acessar o conteúdo da response
        let dados = await response.json();
        
        //Salvar o token
        sessionStorage.setItem('token', dados.token);

        //Mostrar o app container e esconder o login;
        loginContainer.style.display = 'none';
        appContainer.style.display = 'block';

        //Carregar os contatos
        loadContatos();
    }else{
        alert(`Erro inesperado. Entre em contato com o suporte. \n${response.statusText}`);
    };
};

link.addEventListener('click', mostrarModal);

edits.forEach(
    e => e.addEventListener('click', mostrarModal)
);

modal.addEventListener('click',esconderModal);

search.addEventListener('keyup', e => buscaContatos(e.target.value));

formLogin.addEventListener('submit', e => {
    e.preventDefault();

    login(emailLogin.value, senhaLogin.value);
});