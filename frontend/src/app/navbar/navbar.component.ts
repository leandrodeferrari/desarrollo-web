import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() links?: {ruta: string, texto: string}[];
  
  constructor(private router:Router) {}

  /**
   * 
   */
  logout() {
    try {
      setTimeout(() => {
        this.router.navigate(['/login']).catch(e => { console.log('Error:', e); });
      }, 1000);
    }
    catch(e) {
      console.log(e);
    }
  }
}
