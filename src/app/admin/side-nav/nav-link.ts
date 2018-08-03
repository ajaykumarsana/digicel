export interface NavLink {
  route: string;
  cmsKey: string;
  icon?: string;
  countMethod?: () => number;
}
