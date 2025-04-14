import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChannelInfo } from '../../types/youtube/types';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-comparer',
  imports: [RouterModule],
  templateUrl: './comparer.component.html',
  styleUrl: './comparer.component.scss'
})
export class ComparerComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  isComparerMode = signal(false);

  queryA = signal('');
  queryB = signal('');

  selectedChannelA = signal('');
  selectedChannelB = signal('');

  channelAData: ChannelInfo | null = null;
  channelBData: ChannelInfo | null = null;

  channelAResults = resource({
    request: () => ({q: this.queryA()}),
    loader: ({request}) => this.searchService.search(request.q),
  });

  channelBResults = resource({
    request: () => ({q: this.queryB()}),
    loader: ({request}) => this.searchService.search(request.q),
  });

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}) => {
      if(!data) this.isComparerMode.set(false);
      else {
        this.isComparerMode.set(true);
        this.channelAData = data.channelA;
        this.channelBData = data.channelB;
      }
    });
  }

  compare(){
    this.router.navigate(['/comparer', this.selectedChannelA(), this.selectedChannelB()]);
  }

  private debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  updateQueryB = this.debounce((value: string) => {
    this.queryA.set(value);
  }, 300);

  updateQueryA = this.debounce((value: string) => {
    this.queryA.set(value);
  }, 300);
  
}
