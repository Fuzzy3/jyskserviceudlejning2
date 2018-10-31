import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Frontpage2Component } from './frontpage2/frontpage2.component';
import { FooterComponent } from './footer/footer.component';
import { Frontpage3Component } from './frontpage3/frontpage3.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OmOsComponent } from './om-os/om-os.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { LejebetingelserComponent } from './lejebetingelser/lejebetingelser.component';
import { BestillingComponent } from './bestilling/bestilling.component';
import { SamarbejdspartnereComponent } from './samarbejdspartnere/samarbejdspartnere.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BestillingslisteComponent } from './bestilling/bestillingsliste/bestillingsliste.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: FrontpageComponent
  },
  {
    path: 'bestilling',
    component: BestillingComponent
  },
  {
    path: 'om-os',
    component: OmOsComponent
  },
  {
    path: 'inspiration',
    component: InspirationComponent
  },
  {
    path: 'lejebetingelser',
    component: LejebetingelserComponent
  },
  {
    path: 'samarbejdspartnere',
    component: SamarbejdspartnereComponent
  },
  {
    path: 'kontakt',
    component: KontaktComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontpageComponent,
    FooterComponent,
    Frontpage2Component,
    Frontpage3Component,
    PageNotFoundComponent,
    OmOsComponent,
    InspirationComponent,
    LejebetingelserComponent,
    BestillingComponent,
    SamarbejdspartnereComponent,
    KontaktComponent,
    BestillingslisteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
