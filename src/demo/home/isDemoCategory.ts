import type {DemoHomeSection, DemoCategory} from './model';

export const isDemoCategory = (value: DemoHomeSection): value is DemoCategory =>
  value === 'components' || value === 'layouts' || value === 'apps';
