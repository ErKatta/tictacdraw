import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  exports: [MatIconModule, MatToolbarModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  declarations: [AppComponent, GridComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
