class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    <style>
      #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
      }

      #modal {
        position: fixed;
        z-index: 100;
        top: 15vh;
        left: 25%;
        width: 50%;
        padding: 1rem;
        background: white;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        opacity: 0;
        pointer-events: none;
      }

      :host([opened]) #backdrop,
      :host([opened]) #modal {
        opacity: 1;
        pointer-events: all;
      }

      /* header h1{
            font-size: 1.25rem;
        } */

      ::slotted(h1) {
        font-size: 1.25rem;
      }

      #main {
        padding: 1rem;
      }

      #actions {
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
      }

      #actions button {
        margin: 0 0.25rem;
      }              
    </style>
    <div id="backdrop">

    </div>
    <div id="modal">
        <header>
            <slot name="title"></slot>
        </header>
        <section id="main">
            <slot></slot>
        </section>
        <section id="actions">
            <button id="btn-cancel">Cancel</button>
            <button id="btn-confirm">Okay</button>
        </section>
    </div>
        `;
    
    const cancelButton = this.shadowRoot.querySelector('#btn-cancel');
    const confirmButton = this.shadowRoot.querySelector('#btn-confirm');
    
    cancelButton.addEventListener('click',this._cancel.bind(this))
    confirmButton.addEventListener('click',this._confirm.bind(this))
  }

//   attributeChangedCallback(name,oldValue,newValue){

//     if (name==='opened') {
//         if(this.hasAttribute('opened')){
//             const backdrop = this.shadowRoot.querySelector('#backdrop')
//             const modal = this.shadowRoot.querySelector('#modal')
//             debugger
//             backdrop.style.opacity = 1
//             backdrop.style.pointerEvents = 'all'

            
//             modal.style.opacity = 1
//             modal.style.pointerEvents = 'all'
//         }
//     }
//   }


//   static get observedAttributes(){
//     return ['opened']
//   }




open(){
    //to open via exposing a public method
    this.setAttribute('opened')
}

hide(){
    if (this.hasAttribute('opened')) {
        this.removeAttribute('opened')
    }
}

_cancel(event){
    const cancelEvent = new Event('cancel',{
        bubbles:true,
        composed:true
    })

    event.target.dispatchEvent(cancelEvent)
    this.hide()

}
_confirm(){
    this.dispatchEvent(new Event('confirm'))
    this.hide()
}
demoSlotChange(){
    const slots = this.shadowRoot.querySelector('slot');

    slots[1].addEventListener('slotchange',(event)=>{
        console.dir(slots[1].assignedNodes())
    })
}
}







customElements.define("pd-modal", Modal);
