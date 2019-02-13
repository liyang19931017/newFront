import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { EditorComponent } from './editor/editor.component';

const homeRoutes: Routes = [
    {path:'table',component:TableComponent},
    {path:'editor',component:EditorComponent},
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }


