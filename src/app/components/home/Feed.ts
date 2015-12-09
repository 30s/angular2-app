import {Component, View, CORE_DIRECTIVES, EventEmitter} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {
  MicropostService,
  FeedService,
  ErrorHandler
} from 'app/services';
import {Micropost} from 'app/interfaces'
import {TimeAgoPipe} from 'app/pipes'
import {Gravatar} from 'app/components'

@Component({
  selector: 'feed',
  events: ['deleted'],
})
@View({
  styles: [require('./feed.scss')],
  template: require('./feed.html'),
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Gravatar],
  pipes: [TimeAgoPipe],
})
export class Feed {

  feed:Micropost[];
  deleted:EventEmitter<any> = new EventEmitter();

  constructor(private micropostService:MicropostService,
              private feedService:FeedService,
              private errorHandler:ErrorHandler) {
    this.list();

  }

  list():void {
    this.feedService.showFeed()
      .subscribe(feed => this.feed = feed,
        e => this.errorHandler.handle(e))
    ;
  }

  delete(id:number) {
    if (!window.confirm('Are you sure?')) return;
    this.micropostService.delete(id)
      .subscribe(() => {
        this.list();
        this.deleted.next({});
      }, e => this.errorHandler.handle(e))
    ;
  }

  isMyPost(post:Micropost):boolean {
    return this.micropostService.isMyPost(post);
  }

}
