import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './service/admin.guard';
import { normalGuard } from './service/normal.guard';

const routes: Routes = [
  {
    path: 'signUp',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [adminGuard],
    children: [{
      path: '',
      component: WelcomeAdminComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'categories',
      component: ViewCategoriesComponent,
    },
    {
      path: 'add-category',
      component: AddCategoryComponent,
    },
    {
      path: 'quizzes',
      component: ViewQuizzesComponent,
    },
    {
      path: 'add-quiz',
      component: AddQuizComponent,
    },
    {
      path: 'quiz/:qid',
      component: UpdateQuizComponent,
    },
    {
      path: 'view-ques/:qid/:title',
      component: ViewQuestionsComponent,
    },
    {
      path: 'add-ques/:qid/:title',
      component: AddQuestionsComponent,
    },
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [normalGuard],
    children: [
      {
        path: ':catId',
        component: LoadQuizComponent,
      }, 
      {
        path: 'instruction/:qid',
        component: InstructionsComponent,
      },
      
    ]
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [normalGuard],
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
