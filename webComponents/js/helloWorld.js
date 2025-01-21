export class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRootinnerHTML = `
        <style>
            p {
            color: green;
            background-color: black;
            font-size: 30px;
            width: 90vh;
            border-radius: 10px;
            padding: 10px;
            }
            
        </style>
        <p>Hello, World! Eu sou um web Component</p>
        `;
    }
}

