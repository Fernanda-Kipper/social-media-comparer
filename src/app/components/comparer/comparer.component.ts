import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comparer',
  imports: [],
  templateUrl: './comparer.component.html',
  styleUrl: './comparer.component.scss'
})
export class ComparerComponent {
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.data.subscribe(({comparationData}) => {
      // do something
    });
  }
}
