import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component';
import { CommonModule  } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [HubComponent, CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent {

}
