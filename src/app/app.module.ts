import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CategoriaService } from '../pages/services/models/categoria.service';
import { HttpClientModule} from '@angular/common/http';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { ProdutoService } from '../pages/services/models/produto.service';
import { CartService } from '../pages/services/models/cart.service';
import { StorageService } from '../pages/services/storage.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    CartService,
    StorageService,
    ErrorInterceptorProvider,
    ProdutoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
