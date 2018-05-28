import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [

    { path: 'perfil', component: PerfilComponent },
    { path: 'users', component: UsersComponent }

];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
