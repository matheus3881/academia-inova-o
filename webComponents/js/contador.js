export class Contador extends HTMLElement {
    constructor() {
        super();
        // cria um shadow Dom
        const shadow = this.attachShadow({ mode: 'open' });

        // cria um número
        const numero = document.createElement('p');
        numero.textContent = this.innerHTML = '0';

        // cria um botão de incremento
        const incremento = document.createElement('button1');
        incremento.textContent = '+';
        incremento.addEventListener('click', () => {
            numero.textContent = parseInt(numero.textContent) + 1;
        })

        const decremento = document.createElement('button2');
        decremento.textContent = '-';
        decremento.addEventListener('click', () => {
            numero.textContent = parseInt(numero.textContent) - 1;
        })

        const style = document.createElement('style');
        style.textContent = `
        p {
        font-size: 50px;
        font-weight: bold;
        padding: 10px;
        }
    
        button1{
            background: green;
            font-size: 30px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 10px;
            margin-right: 10px;
            cursor: pointer;
            
        }
            button2{
            background: red;
            font-size: 30px;
            font-weight: bold;
            padding: 10px 25px;
            border-radius: 10px;
            margin-left: 10px;
             cursor: pointer;            
        }
    }
`;



        shadow.appendChild(numero);
        shadow.appendChild(style);
        shadow.appendChild(incremento);
        shadow.appendChild(decremento);

    }
}