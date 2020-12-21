import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'material-layout',
  templateUrl: './material-layout.component.html',
  styleUrls: ['./material-layout.component.scss']
})
export class MaterialLayoutComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  public loading: boolean;
  public isAuthenticated: boolean;
  public title: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public isBypass: boolean;
  public mobile: boolean;
  public isMenuInitOpen: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private _snackBar: MatSnackBar) { }

    private sidenav: MatSidenav;

    public isMenuOpen = true;
    public contentMargin = 240;

  // *********************************************************************************************
  // * LIFE CYCLE EVENT FUNCTIONS
  // *********************************************************************************************

    ngOnInit() {
      this.isMenuOpen = true;  // Open side menu by default
      this.title = 'Material Layout Demo';
    }


  // *********************************************************************************************
  // * COMPONENT FUNCTIONS
  // *********************************************************************************************

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }

  public onSelectOption(option: any): void {
    const msg = `Chose option ${option}`;
    this.openSnackBar(msg);

    /* To route to another page from here */
    // this.router.navigate(['/home']);
  }
}
