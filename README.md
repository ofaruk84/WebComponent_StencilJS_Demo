# What are Web Components

Web Components are a set of web platform APIs that allow developers to create reusable, encapsulated custom elements.

They help organize and modularize UI components, promoting reusability and maintainability across applications

## Main Pillars of WebComponent
 - Custom Elements : Allows you to define your own HTML tags with specific behavior, using the HTMLElement class.
 - Shadow Dom : Encapsulates the internal structure of your component, preventing it from being affected by external styles or scripts.
 - HTML Templates: Enables you to define HTML markup that can be reused and instantiated when needed, improving performance by not rendering immediately.


### Shadow Dom
The Shadow DOM is a mechanism that allows components to have their own isolated DOM tree, which is hidden from the main document DOM.

##### Benefits
- Encapsulation: Styles and scripts within the Shadow DOM don't leak out, and outside styles don’t affect the content inside.

- Scoping: Enables a higher level of control over CSS and JS, making sure your component behaves consistently regardless of the surrounding environment.

# Javascript Implementation

##### customComponent.js
```javascript

class CustomComponent extends HTMLElement{
    constructor(){
        super();
        
        //Attach shadow dom
        this.attachShadow({ mode: 'open' });
        
        //populate inner html as you want
        this.shadowRoot.innerHTML = ``;
    }
}

//Register example custom element
customElements.define("ex-component", CustomComponent);

```

## Attribute setting

##### index.html

```html

<ex-component title="Example"></ex-component>

```

##### customComponent.js

```javascript
class CustomComponent extends HTMLElement{
    constructor(){
        super();
        
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = ``;
        
        //Read desired attribute by name
        this.titleFromAttribute = this.getAttribute('title');
    }
}
customElements.define("ex-component", CustomComponent);
```

## Using Slots

- You can project your content desired place by using slots.
- For styling slotted contents you can use ::slotted({{Tag Name}}) as a selector

##### index.html
```html
<ex-component title="My Custom Component">
    <h2>This is slotted content</h2>
</ex-component>
```

##### customComponent.js

```javascript
class CustomComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        // Populate innerHTML with slots
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    max-width: 300px;
                }
                ::slotted(h2) {
                    color: darkblue;
                }
                ::slotted(p) {
                    font-style: italic;
                }
            </style>
            <div class="container">
                <h2>${this.titleFromAttribute}</h2>
                <slot></slot>
            </div>
        `;

        this.titleFromAttribute = this.getAttribute('title');
    }
}

customElements.define("ex-component", CustomComponent);

```

### Handling Multiple slots

- You can give slots name to project multipile contents

##### index.html
```html
<ex-component title="My Custom Component">
    <h2 slot="content">This is slotted content</h2>
    <p slot="footer">This is the footer content</p>
</ex-component>
```

##### customComponent.js

```javascript
class CustomComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        // Populate innerHTML with slots
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    max-width: 300px;
                }
                ::slotted(h2) {
                    color: darkblue;
                }
                ::slotted(p) {
                    font-style: italic;
                }
            </style>
            <div class="container">
                <h2>${this.titleFromAttribute}</h2>
                <slot name="content"></slot>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        `;

        this.titleFromAttribute = this.getAttribute('title');
    }
}

customElements.define("ex-component", CustomComponent);

```

- You can give default value by populating between slot tags

```html
<slot>Default Content</slot>
```

### Slotchange Event

- When content is added, removed, or changed inside a slot, the slotchange event is fired.

##### customComponent.js
```javascript
class CustomComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.titleFromAttribute = this.getAttribute('title');

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    max-width: 300px;
                }
                ::slotted(h2) {
                    color: darkblue;
                }
                ::slotted(p) {
                    font-style: italic;
                }
            </style>
            <div class="container">
                <h2>${this.titleFromAttribute}</h2>
                <slot name="content"></slot>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        `;

       
        const contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
        
        contentSlot.addEventListener('slotchange', (event) => {
            
            //Handle Event
            console.log('Slot content changed!');
        });
    }

}

customElements.define("ex-component", CustomComponent);

```

#### Important Note

##### What Doesn't Trigger slotchange:

- Attribute Changes: Modifying attributes like class, id, or style of slotted elements won't trigger the event.

- Text or Property Changes: Similarly, changing the textContent or other properties (like input values) on already slotted elements won't fire the event.


##### What Does Trigger slotchange:

- Adding or removing elements from the slot, or replacing existing slotted content entirely, will trigger slotchange.


## Dispatching Custom Events

##### index.html
```html
<ex-component title="My Custom Component"></ex-component>

<script>
    // Listen for the custom event
    document.querySelector('ex-component').addEventListener('ex-event', (event) => {
        console.log(event.detail.message);  // Output: Button was clicked!
    });
</script>

```
#### Event Object Configuration

- Bubbles: If true,allows the event to bubble up the DOM tree
- Composed: If true ,allows the event to propagate outside the Shadow DOM

##### customComponent.js

```javascript

class CustomComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    max-width: 300px;
                    text-align: center;
                }
                button {
                    padding: 8px 16px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
            <div class="container">
                <h2>${this.getAttribute('title')}</h2>
                <button id="exButton">Click Me</button>
            </div>
        `;

        
        this.shadowRoot.querySelector('#exButton').addEventListener('click', () => {
            this.dispatchExEvent();
        });
    }

    dispatchExEvent() {
        const event = new CustomEvent('ex-event', {
            detail: { message: 'Button was clicked!' },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);  
    }
}

customElements.define("ex-component", CustomComponent);

```
