import { browser, by, element } from 'protractor';

export class AngularWebSocketClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
