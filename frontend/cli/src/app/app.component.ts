import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal">Partes Docentes</h5>
      <nav class="my-2 my-md-0 mr-md-3">
	  	<body>
	  	<div id="header">
	  		<ul class="nav">
	  			<li><a routerLink="/" > Home </a></li>
				<li><a href="">Personas</a>
					<ul>
						<a routerLink="/personas" > Listar </a>
						<a routerLink="/personas/new" >Nueva </a>
					</ul>
				
			</ul>
		</div>
		</body>
		<style type="text/css">
			
			.nav li a {
				background-color:white;
				color:black;
				text-decoration:none;
				padding:5px 5px;
				display:block;
			}
			
			.nav li a:hover {
				background-color:#DCDCDC;
			}
			
			.nav li ul {
				display:none;
				position:absolute;
				min-width:140px;
			}
			
			.nav li:hover > ul {
				display:block;
			}

			.nav li ul li ul {
				right:-140px;
				top:0px;
			}
		</style>
      </nav>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],

  
})
export class AppComponent {
  title = "cli";
}

// <li><a href="" > Divisiones < /a>
// 	< ul >
// 	<a routerLink="/divisiones" > Listar < /a>
// 		< a routerLink = "/divisiones/new" > Nueva < /a>
// 			< /ul>
// 			< /li>