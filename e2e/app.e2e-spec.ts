import { HttpServiceDemoPage } from './app.po';

describe('http-service-demo App', () => {
  let page: HttpServiceDemoPage;

  beforeEach(() => {
    page = new HttpServiceDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
