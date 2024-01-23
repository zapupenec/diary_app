import { DetailedHTMLProps, FC, HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';

import styles from './header.module.css';
import { emojis } from 'constant';
import { Button, Icon, Input, Logo, Selector } from 'components';
import { clsx } from 'lib';
import { useRouter } from 'contexts/router';

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Header: FC<IHeader> = ({ className }) => {
  const { currentPage, setCurrentPage } = useRouter();

  const handleClickLogo: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setCurrentPage('note-list');
  };

  const handleClickBtnEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentPage('add-note');
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className={clsx(className, styles.container)}>
      <Logo onClick={handleClickLogo} />
      {currentPage === 'note-list' && (
        <>
          <div className={styles.search}>
            <Input
              className={styles.search__input}
              ref={inputRef}
              type="text"
              placeholder="Поиск"
            />
            <Selector
              className={styles.search__selector}
              values={emojis}
              displayValues={emojis}
              placeholder={<Icon name="smile-mouth-open" />}
              defaultValue=""
            />
          </div>
          <Button className={styles['btn-edit']} onClick={handleClickBtnEdit}>
            <Icon name="pen" />
            <span>Добавить запись</span>
          </Button>
        </>
      )}
    </header>
  );
};
