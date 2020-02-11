import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolvers/member-detail.resolver';
import { MembersResolver } from './_resolvers/members.resolver';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: '',runGuardsAndResolvers:'always',
    children:[
        { path: 'members', component: MemberListComponent,resolve:{users:MembersResolver} },
        { path: 'members/:id', component: MemberDetailComponent,resolve:{user:MemberDetailsResolver} },
        // tslint:disable-next-line: max-line-length
        { path: 'member/edit', component: MemberEditComponent ,resolve:{user:MemberEditResolver},canDeactivate:[PreventUnsavedChangesGuard]},
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListsComponent }]
            ,canActivate:[AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
 