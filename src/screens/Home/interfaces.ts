import {Checklist} from '../../infra/interfaces/interfaces';

export interface PropsRenderItem {
  item: Checklist;
  disableIcons?: boolean;
  list?: Checklist[];
  setList?: (list: Checklist[]) => void;
}
