const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement} from 'angular2/angular2';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';
import {DOM} from 'angular2/src/core/dom/dom_adapter';

import {Header} from "app/components";
import {APP_TEST_PROVIDERS} from 'app/bindings';
import {TestContext, createTestContext, signin} from 'app/testing';
import {LoginService} from 'app/services';

export function main() {
  describe('Header', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_  => ctx = _));

    function createCmp(done) {
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(Header));
        });
    }

    describe('when signed in', () => {
      let loginService:LoginService;

      beforeEach(inject([LoginService], _ => loginService = _));
      beforeEach(signin({id: 1, email: 'test@test.com'}));
      beforeEach(createCmp);

      it('can be shown', () => {
        expect(cmpDebugElement).toBeTruthy();
      });

      it('shows a nav link to home', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/home');
          expect(link.parentElement.classList).toContain('active');
          done();
        })
      });

      it('does not show a nav link to top', () => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
        expect(link).toBeNull();
      });

      it('shows a nav link to users', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/users');
          expect(link.parentElement.classList).toContain('active');
          done();
        })
      });

      it('shows a nav link to help', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/help');
          expect(link.parentElement.classList).toContain('active');
          done();
        })
      });

      it('shows a nav link to profile', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/users/1');
          done();
        })
      });

      // TODO https://github.com/angular/angular/issues/4112.
      xit('shows a nav link to settings', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/users/me/edit');
          done();
        })
      });

      it('shows a nav link to logout', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.logout>a');
        expect(link).toBeTruthy();
        spyOn(loginService, 'logout');
        link.click();
        expect(loginService.logout).toHaveBeenCalled();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/login');
          done();
        })
      });
    }); // when signed in

    describe('when not signed in', () => {
      beforeEach(createCmp);

      it('can be shown', () => {
        expect(cmpDebugElement).toBeTruthy();
      });

      it('does not show a nav link to home', () => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.home>a');
        expect(link).toBeNull();
      });

      it('shows a nav link to top', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.top>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('');
          done();
        })
      });

      it('does not show a nav link to users', () => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.users>a');
        expect(link).toBeNull();
      });

      it('shows a nav link to help', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.help>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/help');
          expect(link.parentElement.classList).toContain('active');
          done();
        })
      });

      it('does not show a nav link to profile', () => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.profile>a');
        expect(link).toBeNull();
      });

      it('does not show a nav link to settings', () => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.settings>a');
        expect(link).toBeNull();
      });

      it('shows a nav link to sign in', (done) => {
        const link = DOM.querySelector(cmpDebugElement.nativeElement, '#navbar li.login>a');
        expect(link).toBeTruthy();
        link.click();
        ctx.router.subscribe(() => {
          ctx.rootTC.detectChanges();
          expect(ctx.location.path()).toEqual('/login');
          done();
        })
      });
    }); // when not signed in

  })
}

@Component({selector: 'test-cmp'})
@View({
  template: `<app-header></app-header>`,
  directives: [Header],
})
class TestCmp {
}