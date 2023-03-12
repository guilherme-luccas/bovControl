import {StackRoute} from './stack.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRoute {}
  }
}
