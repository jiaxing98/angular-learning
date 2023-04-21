import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params["searchTerm"])
        this.searchTerm = params["searchTerm"];
    });
  }

  search(searchTerm: string) {
    if (searchTerm)
      this.router.navigateByUrl(`/search/${searchTerm}`)
  }
}
