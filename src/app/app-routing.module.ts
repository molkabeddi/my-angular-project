import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ArticleDetailsComponent } from '../app/article-details/article-details.component';
import { AddArticleComponent } from '../app/add-article/add-article.component';
import { ArticlesListComponent } from './article-list/article-list.component';
import { ShopComponent } from './shop/shop.component'; // Importer le composant Shop
import { DetailComponent } from './detail/detail.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ArticlesComponent } from './articles-component/articles-component.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'add', component: AddArticleComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'computers', component: ArticlesComponent },
  { path: 'accessories', component: ArticlesComponent },
  { path: 'peripherals', component: ArticlesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
