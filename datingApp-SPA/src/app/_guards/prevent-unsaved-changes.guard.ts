import { Injectable } from "@angular/core";
import { MemberEditComponent } from "../member-edit/member-edit.component";
import { CanDeactivate } from "@angular/router";

@Injectable()

export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent): boolean {
         if(component.editForm.dirty){
             return confirm('are you sure to continue?');
         }
         return true;
    }
}