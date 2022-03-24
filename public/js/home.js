const main = document.querySelector('main');
const modal = document.getElementById("modal");
let link = document.getElementById("linkAbrirModal");
let edits = document.querySelectorAll("section > a");
let search = document.getElementById('search');

let mostrarModal = () => {
    modal.style.display = "flex";
    modal.style.opacity = 1;
};

let esconderModal = (evt) => {
    evt.bubbles = false;
    modal.style.display = "none"
    modal.style.opacity = 0;
};

// Simulando os contatos em uma variável
let contatos = [
    {
        "id":1,
        "nome":"Kakashi Hatake",
        "emails":["kakashi@anbu.com"],
        "telefones":["99999-1111","98888-1234"]
    },
    {
        "id":2,
        "nome":"Sakura Haruno",
        "emails":["sakura@konoha.com"],
        "telefones":["99999-2222","98888-3333"]
    },
    {
        "id":3,
        "nome":"Hinata Hyuga",
        "emails":["Hinata@hyugas.com"],
        "telefones":["99999-3333","98888-4444"]
    },
    {
        "id":4,
        "nome":"Vovó Tsunade",
        "emails":["tsunade@hokages.com"],
        "telefones":["99999-4444","98888-5555"]
    },
    {
        "id":5,
        "nome":"Shikamaru Nara",
        "emails":["shikamaru@konoha.com"],
        "telefones":["99999-5555","98888-6666"]
    },
    {
        "id":6,
        "nome":"Ino",
        "emails":["ino@yamanakas.com"],
        "telefones":["99999-6666","98888-7777"]
    },
    {
        "id":7,
        "nome":"Choji Akimichi",
        "emails":["choji@akimichis.com"],
        "telefones":["99999-7777","98888-8888"]
    }
];

let showContatos = contatos =>{
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

let buscaContatos = trecho => {
    let contatosFiltrados = contatos.filter(
        c => c.nome.toUpperCase().includes(trecho.toUpperCase())
    );

    showContatos(contatosFiltrados);
};

link.addEventListener('click', mostrarModal);

edits.forEach(
    e => e.addEventListener('click', mostrarModal)
);

modal.addEventListener('click',esconderModal);

search.addEventListener('keyup', e => buscaContatos(e.target.value));

showContatos(contatos);