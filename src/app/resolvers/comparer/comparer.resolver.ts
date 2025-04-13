import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ComparerInfo } from '../../types/youtube/types';


export const comparerResolver:  ResolveFn<ComparerInfo>= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return null;
};
