import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Frontpage2Component } from './frontpage2/frontpage2.component';
import { FooterComponent } from './footer/footer.component';
import { Frontpage3Component } from './frontpage3/frontpage3.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontpageComponent,
    FooterComponent,
    Frontpage2Component,
    Frontpage3Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
