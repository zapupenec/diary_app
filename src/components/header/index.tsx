import { FC } from 'react';

import styles from './header.module.css';
import { emojis } from 'constant';
import { Button, Icon, Input, Logo, Selector } from 'components';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <Logo />
      <div className={styles.search}>
        <Input className={styles.search__input} type="text" placeholder="Поиск" />
        <Selector
          className={styles.search__selector}
          values={emojis}
          displayValues={emojis}
          placeholder={<Icon name="smile-mouth-open" />}
          defaultValue=""
        />
      </div>
      <Button className={styles['btn-edit']}>
        <Icon name="pen" />
        <span>Добавить запись</span>
      </Button>
    </header>
  );
};
