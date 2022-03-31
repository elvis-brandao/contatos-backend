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
    try {
        let resposta = await fetch('/contatos');
        let contatos = await resposta.json();
        showContatos(contatos);
    } catch (error) {
        console.log(error);
    };
};
loadContatos();

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

link.addEventListener('click', mostrarModal);

edits.forEach(
    e => e.addEventListener('click', mostrarModal)
);

modal.addEventListener('click',esconderModal);

search.addEventListener('keyup', e => buscaContatos(e.target.value));