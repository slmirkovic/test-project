import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  public title: string = 'Home';
  private subscription: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router, private route: ActivatedRoute) {

    this.router.events.pipe(takeUntil(this.subscription)).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.route.root.firstChild.snapshot.data['pageTitle'];
      }
    });

  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
