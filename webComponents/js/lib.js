import { Contador } from "./contador.js";
import { CustomButton } from "./custom-button.js";
import { DataTable } from "./data-table.js";
import { HelloWorld } from "./helloWorld.js";
import { Modal } from "./modal.js";
import { UserCard } from "./user-card.js";

customElements.define('hello-world', HelloWorld);
customElements.define('custom-buttom', CustomButton);
customElements.define('custom-counter', Contador);
customElements.define('user-card', UserCard);
customElements.define('custom-modal', Modal);
customElements.define("data-table", DataTable);