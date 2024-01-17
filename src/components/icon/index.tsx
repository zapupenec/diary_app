import { FC, SVGProps } from 'react';

import { ReactComponent as ChevronDownSVG } from './assets/chevron-down.svg';
import { ReactComponent as CrossSVG } from './assets/cross.svg';
import { ReactComponent as PenSVG } from './assets/pen.svg';
import { ReactComponent as TreesSVG } from './assets/trees.svg';
import { ReactComponent as SmileMouthOpenSVG } from './assets/smile-mouth-open.svg';

interface IIconProps extends SVGProps<SVGSVGElement> {
  name: 'chevron-down' | 'cross' | 'pen' | 'trees' | 'smile-mouth-open';
}

export const Icon: FC<IIconProps> = ({ name }) => {
  switch (name) {
    case 'chevron-down':
      return <ChevronDownSVG />;
    case 'cross':
      return <CrossSVG />;
    case 'pen':
      return <PenSVG />;
    case 'trees':
      return <TreesSVG />;
    case 'smile-mouth-open':
      return <SmileMouthOpenSVG />;
    default:
      throw new Error(`Unknown icon name: ${name}`);
  }
};
