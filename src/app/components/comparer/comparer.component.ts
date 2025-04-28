import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChannelInfo } from '../../types/youtube/types';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';

type SocialNetwork = 'youtube' | 'instagram';

@Component({
  selector: 'app-comparer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './comparer.component.html',
  styleUrl: './comparer.component.scss'
})
export class ComparerComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  isComparerMode = signal(false);
  selectedNetwork = signal<SocialNetwork>('youtube');

  queryA = signal('');
  queryB = signal('');

  selectedChannelA = signal('');
  selectedChannelB = signal('');

  showResultsA = signal(false);
  showResultsB = signal(false);

  channelAData = signal<ChannelInfo| null >(null);
  channelBData = signal<ChannelInfo| null >(null);

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
      if(!data) {
        this.isComparerMode.set(false);
      } else {
        this.isComparerMode.set(true);
        this.channelAData.set(data.channelA);
        this.channelBData.set(data.channelB);
      }
    });
  }

  compare() {
    this.router.navigate(['/comparer', this.selectedChannelA(), this.selectedChannelB()]);
  }

  private debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  updateQueryB = this.debounce((value: string) => {
    this.queryB.set(value);
    this.showResultsB.set(true);
  }, 300);

  updateQueryA = this.debounce((value: string) => {
    this.queryA.set(value);
    this.showResultsA.set(true);
  }, 300);

  setNetwork(network: SocialNetwork) {
    if (network === 'youtube') {
      this.selectedNetwork.set(network);
    }
  }

  isNetworkSelectable(network: SocialNetwork): boolean {
    return network === 'youtube';
  }

  selectChannelA(channel: any) {
    this.selectedChannelA.set(channel.id.channelId);
    this.queryA.set(channel.snippet.channelTitle);
    this.showResultsA.set(false);
  }

  selectChannelB(channel: any) {
    this.selectedChannelB.set(channel.id.channelId);
    this.queryB.set(channel.snippet.channelTitle);
    this.showResultsB.set(false);
  }

  formatNumber(value: string | undefined): string {
    if(!value) return "0"
    const num = parseInt(value, 10);
    if (isNaN(num)) return '0';
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}
