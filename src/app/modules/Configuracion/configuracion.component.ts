import { Component } from '@angular/core';
import { HubComponent } from '@shared/hub/hub.component';
import { CommonModule  } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [HubComponent, CommonModule, RouterModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {

}
