import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'pd-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true })
  title: string;

  @Prop({ reflect: true, mutable: true })
  opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  renderConditionallyExample() {
    //render
    const content = this.opened ? (
      <aside>
        <header>
          <h1>{this.title}</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    ) : (
      ''
    );
  }

  @Method()
  open() {
    this.opened = true;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 49802384032</li>
            <li>
              E-Mail:
              <a href="mailto:something@something.com">something@something.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <div class="backdrop"></div>
        <aside>
          <header>
            <h1>{this.title}</h1>
            <button onClick={this.onCloseDrawer.bind(this)}>X</button>
          </header>
          <section id="tabs">
            <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>
              Navigation
            </button>
            <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>
              Contact
            </button>
          </section>
          <main>{mainContent}</main>
        </aside>
      </div>
    );
  }
}
