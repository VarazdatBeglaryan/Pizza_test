import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./components";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: LandingComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always', preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  }