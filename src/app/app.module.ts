import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OmOsComponent } from './om-os/om-os.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { LejebetingelserComponent } from './lejebetingelser/lejebetingelser.component';
import { BestillingComponent } from './bestilling/bestilling.component';
import { SamarbejdspartnereComponent } from './samarbejdspartnere/samarbejdspartnere.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { BestillingslisteComponent } from './bestilling/bestillingsliste/bestillingsliste.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './bestilling/services/product.service';
import { FormsModule } from '@angular/forms';
import { BestillingsModalComponent } from './bestilling/bestillings-modal/bestillings-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BestillingsModalFormComponent } from './bestilling/bestillings-modal/bestillings-modal-form/bestillings-modal-form.component';
import { AfsluttetBestillingComponent } from './afsluttet-bestilling/afsluttet-bestilling.component';
import { LoadingComponent } from './loading/loading.component';


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
  {
    path: 'tak-for-din-bestilling',
    component: AfsluttetBestillingComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
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
    PageNotFoundComponent,
    OmOsComponent,
    InspirationComponent,
    LejebetingelserComponent,
    BestillingComponent,
    SamarbejdspartnereComponent,
    KontaktComponent,
    BestillingslisteComponent,
    BestillingsModalComponent,
    BestillingsModalFormComponent,
    AfsluttetBestillingComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, {scrollPositionRestoration: 'enabled'}
    ),
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
