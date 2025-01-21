export class CustomButton extends HTMLElement {
    constructor() {
        super();
        // cria um shadow Dom
        const shadow = this.attachShadow({ mode: 'open' });

        // cria um botão
        const button = document.createElement('button');
        button.textContent = this.getAttribute('label') || 'Click me!';

        // adiciona o botão ao shadow Dom
        const style = document.createElement('style');
        style.textContent = `
            button {
                background-color: #007bff;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        `;
        
        button.addEventListener('click', () => {
            console.log('Botão clicado!');
        });

        shadow.appendChild(style);
        shadow.appendChild(button);
        
        
    }
}