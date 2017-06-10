import { AngularWebSocketClientPage } from './app.po';

describe('angular-web-socket-client App', () => {
  let page: AngularWebSocketClientPage;

  beforeEach(() => {
    page = new AngularWebSocketClientPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
