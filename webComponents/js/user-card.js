
export class UserCard extends HTMLElement {
    constructor() {
        super();

        // cria shadow dom
        const shadow = this.attachShadow({mode: "open"});

        // cria a constante card e atribui uma div a ela
        const card = document.createElement("div");

        // cria a constante name e atribui um h2 a ela
        const name = card.appendChild(document.createElement("h2"));

        // cria um atributo "name" dentro do h2 onde recebe props exerno
        name.textContent = this.getAttribute("name");

        // cria a constante email e atribui um h3 a ela
        const email = card.appendChild(document.createElement("h3"));

        // cria um atributo "email" dentro do h3 onde recebe props exerno
        email.textContent = this.getAttribute("email");

        // cria a constante img e atribui um elemento img a ela
        const img = card.appendChild(document.createElement("img"));
        
        // verifica se a url do img foi recebida 
        img.src = this.hasAttribute("img") ? this.getAttribute("img") : "sem imagem";

        // cria a constante detail e atribui um elemento button a ela
        const detail = card.appendChild(document.createElement("button"));

        // atribui a detail um texto padrão
        detail.textContent = this.hasAttribute("detail") ? this.getAttribute("detail") : "detalhes";



        detail.addEventListener('click', () => {
            console.log("clicado");
        })

        // cria a constante style que recebe um atributo de estilo
        const style = document.createElement("style");

        // cria o estilo dos elemento || NÃO ESQUECER QUE É "textContent"!!!
        style.textContent = `

     div {
            display: flex;
            flex-direction: column;
            width: 300px; 
            border: 1px solid red;
            padding: 10px;
            box-sizing: border-box;
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            align-self: center;
            margin-bottom: 10px;
        }
        h2 {
            font-size: 24px;
            font-weight: bold;
            color: black;
            text-align: center;
            margin: 0;
        }
        h3 {
            font-size: 18px;
            color: gray;
            text-align: center;
            margin: 10px 0;
        }
        button {
            padding: 10px;
            font-size: 16px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            align-self: center;
        }
        

            
     
        `;
        
        shadow.appendChild(card);
        shadow.appendChild(style);

    }
        

   
}




        