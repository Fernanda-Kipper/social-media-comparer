import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ComparerInfo } from '../../types/youtube/types';
import { ChannelService } from '../../services/channel.service';
import { inject } from '@angular/core';
import { combineLatest, lastValueFrom, map, Observable } from 'rxjs';


export const comparerResolver:  ResolveFn<ComparerInfo | null> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const comparerService = inject(ChannelService);
  const channelA = route.params['channelA'];
  const channelB = route.params['channelB'];
  try {
    const channelA$ = comparerService.getChannel(channelA);
    const channelB$ = comparerService.getChannel(channelB);

    const comparerInfo$ = combineLatest([
      channelA$,
      channelB$,
    ]).pipe(
      map(([channelA, channelB]) => {
        const comparerInfo: ComparerInfo = {
          channelA,
          channelB,
        };
        return comparerInfo;
      })
    );

    return await lastValueFrom(comparerInfo$);
  } catch (error) {
    console.error('Error fetching comparer info:', error);
    return null;
  }
}; 
