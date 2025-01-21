export class Modal extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: "open"})

        // Estilo do modal
        const style = document.createElement("style");
        style.textContent = `
                :host {
                  display: none; /* Modal oculto por padrão */
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.5);
                  justify-content: center;
                  align-items: center;
                  z-index: 1000;
                }
          
                :host([open]) {
                  display: flex; /* Exibe o modal se o atributo 'open' estiver presente */
                }
          
                .modal {
                  background: white;
                  padding: 1.5rem;
                  border-radius: 8px;
                  width: 300px;
                  max-width: 90%;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
          
                .header, .body, .footer {
                  margin-bottom: 1rem;
                }
          
                .footer {
                  text-align: right;
                }
          
                /*é usado para aplicar estilos a elementos que são passados como slots no componente*/
                ::slotted(button) {
                  padding: 0.5rem 1rem;
                  background: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                }
          
                ::slotted(button:hover) {
                  background: #0056b3;
                }
              `;

        // Estrutura do modal
        const wrapper = document.createElement("div");
        wrapper.classList.add("modal");
        wrapper.innerHTML = `
                <div class="header">
                  <slot name="header">Cabeçalho Padrão</slot>
                </div>
                <div class="body">
                  <slot name="body">Conteúdo do Modal</slot>
                </div>
                <div class="footer">
                  <slot name="footer">
                    <button id="close-button">Fechar</button>
                  </slot>
                </div>
                
              `;

        shadow.append(style, wrapper);
    

        // Fechar o modal ao clicar no botão
        shadow.querySelector("#close-button")?.addEventListener("click", () => {
          this.close();


        });

      }

      
      // Método para abrir o modal
      open() {
          this.setAttribute("open", "");
      }
      
      
    // Método para fechar o modal
    close() {
        this.removeAttribute("open");
    }
}

