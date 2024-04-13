import { type PropsWithChildren } from 'react';
import Loader from './Loader';

interface Props extends PropsWithChildren {
  loading: boolean;
}

export default function LoaderButton(props: Props) {
  return props.loading ? <Loader /> : props.children;
}
