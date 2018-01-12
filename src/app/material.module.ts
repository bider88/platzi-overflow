import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule
];

@NgModule({
    imports: modules,
    exports: modules
})

export class MaterialModule {}
