import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Ajoutez 'withFetch'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticlesListComponent } from './article-list/article-list.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ShopComponent } from './shop/shop.component';
import { DetailComponent } from './detail/detail.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ArticlesComponent } from './articles-component/articles-component.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AddArticleComponent,
    ArticleDetailsComponent,
    ArticlesListComponent,
    ShopComponent,
    DetailComponent,
    ContactComponent,
    CartComponent,
    ArticlesComponent,
    HomeComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders,provideHttpClient(withFetch()),],
  bootstrap: [AppComponent]
})
export class AppModule { }