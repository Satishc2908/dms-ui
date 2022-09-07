import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerComponent } from './component/dealer/dealer.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { GeographiesComponent } from './component/geographies/geographies.component';
import { LoginComponent } from './component/login/login.component';
import { MaterialsClassificationComponent } from './component/materials-classification/materials-classification.component';
import { MaterialsListComponent } from './component/materials-list/materials-list.component';
import { MaterialsComponent } from './component/materials/materials.component';
import { OtherMastersComponent } from './component/other-masters/other-masters.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UsersComponent } from './component/users/users.component';
import { DashbordComponent } from './shared-component/dashbord/dashbord.component';


const routes: Routes = [
  { path: '', pathMatch: 'full',component: LoginComponent },
  { path: 'login', pathMatch: 'full',component: LoginComponent },
  { path: 'login', pathMatch: 'full',component: LoginComponent },
  { path: 'SignUpComponent', pathMatch: 'full',component: SignUpComponent },
  { path: 'ForgotPassword', pathMatch: 'full',component: ForgotPasswordComponent },
  { path: 'maindashbord', pathMatch: 'full',component: DashbordComponent  },
  { path: 'dashbord/user', pathMatch: 'full',component: UsersComponent  },
  { path: 'dashbord/materials', pathMatch: 'full',component: MaterialsComponent  },
  { path: 'dashbord/materials/materials-list', pathMatch: 'full',component:   MaterialsListComponent  },
  { path: 'dashbord/materials/materials-classification', pathMatch: 'full',component: MaterialsClassificationComponent  },
  { path: 'dashbord/other-masters', pathMatch: 'full',component: OtherMastersComponent  },
  { path: 'dashbord/dealer', pathMatch: 'full',component: DealerComponent  }
,
  { path: 'dashbord/geographies', pathMatch: 'full',component: GeographiesComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
