import { FC } from 'react';

import styles from './styles.module.css';
import { emojis } from 'constant';
import { Button, Container, Icon, Input, Logo, Selector } from 'components';

export const Header: FC = () => {
  return (
    <Container>
      <header className={styles.header}>
        <Logo />
        <div className={styles.header__search}>
          <Input className={styles.search__input} type="text" placeholder="Поиск" />
          <Selector
            className={styles.search__selector}
            values={emojis}
            displayValues={emojis}
            placeholder={<Icon name="smile-mouth-open" />}
            defaultValue=""
          />
        </div>
        <Button>
          <Icon name="pen" />
          Добавить запись
        </Button>
      </header>
    </Container>
  );
};
