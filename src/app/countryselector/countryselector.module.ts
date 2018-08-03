import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'pipes';
import { SharedComponentsModule, TeamComponent } from 'components';
import { CountrySelectorComponent } from './countryselector.component';
import { DigicelLoginComponent } from './digicel-login/digicel-login.component';
import { DigicelMarketsComponent } from './digicel-markets/digicel-markets.component';
import { ApiErrors } from 'services';


const countrySelectorRoutes: Routes = [
  { path: 'countryselector',
    component: CountrySelectorComponent,
    children: [
      { path: 'digicel-login', component: DigicelLoginComponent , children: [] },
      { path: 'digicel-markets', component: DigicelMarketsComponent , children: [] },
      { path: '', redirectTo: 'digicel-markets', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule.forChild(countrySelectorRoutes),
    PipesModule
  ],
  declarations: [
    CountrySelectorComponent,
    DigicelLoginComponent,
    DigicelMarketsComponent
  ],
  exports: [],
  providers: [
    ApiErrors
  ]
})
export class CountrySelectorModule { }
