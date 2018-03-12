import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

import { NgModule } from "@angular/core";

@NgModule({
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatGridListModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatTableModule
    ]
})
export class MaterialModule { }