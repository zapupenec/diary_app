import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import styles from './emoji.module.css';
import { clsx } from 'lib';

interface IEmojiProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  emoji: string;
  size: 'small' | 'big';
}

export const Emoji: FC<IEmojiProps> = ({ className, emoji, size }) => (
  <div className={clsx(className, styles.container, styles[size])}>
    <span className={styles.content}>{emoji}</span>
  </div>
);
