import {Checklist} from '../../infra/models/Checklist';

export interface PropsRenderItem {
  item: Checklist;
  disableIcons?: boolean;
  list?: Checklist[];
  setList?: (list: Checklist[]) => void;
}
