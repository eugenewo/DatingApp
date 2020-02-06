import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolvers/member-detail.resolver';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: '',runGuardsAndResolvers:'always',
    children:[
        { path: 'members', component: MemberListComponent },
        { path: 'members/:id', component: MemberDetailComponent,resolve:{user:MemberDetailsResolver} },
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListsComponent }]
            ,canActivate:[AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
 