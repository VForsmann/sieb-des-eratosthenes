import { customElement, html, LitElement } from 'lit-element';
import { menuController } from '@ionic/core';
//@ts-ignore
window.menuController = menuController;

@customElement("pwa-root")
export default class PwaRoot extends LitElement {

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <ion-app>
                <ion-app> 
                    <div class="ion-page" id="main">
                        <ion-header>
                            <ion-toolbar>
                                <ion-title>Sieb des Eratosthenes</ion-title>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content class="ion-padding">
                            <sieb-des-eratosthenes></sieb-des-eratosthenes>
                        </ion-content>
                    </div>
                </ion-app>
            </ion-app>
        `
    }
}