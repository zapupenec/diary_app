import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';

import styles from './header.module.css';
import { emojis } from 'constant';
import { Button, Icon, Input, Logo, Selector } from 'components';
import { clsx } from 'lib';
import { useRouter } from 'contexts/router';
import { useAddNoteForm } from 'contexts/add-note-form';
import { useDiary } from 'contexts/diary';

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Header: FC<IHeader> = ({ className }) => {
  const { currentPage, setCurrentPage } = useRouter();
  const { resetFormData } = useAddNoteForm();
  const { filterValues, updateFilterValues, resetFilterValues } = useDiary();

  const handleClickLogo: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setCurrentPage('note-list');
    resetFormData();
    resetFilterValues();
  };

  const handleClickBtnAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentPage('add-note');
    resetFilterValues();
  };
  
  const handleChangeText: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilterValues({
      title: e.target.value,
    });
  };
  
  const handleChangeSelect = (value: string) => {
    updateFilterValues({
      emoji: value,
    });
  };

  const handleClickBtnClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    resetFilterValues();
  };

  return (
    <header className={clsx(className, styles.container)}>
      <Logo onClick={handleClickLogo} />
      {currentPage === 'note-list' && (
        <>
          <div className={styles.search}>
            <Input
              className={styles.search__input}
              autoFocus
              type="search"
              placeholder="Поиск"
              onChange={handleChangeText}
              value={filterValues.title}
            />
            <Selector
              className={styles.search__selector}
              values={emojis}
              displayValues={emojis}
              placeholder={<Icon name="smile-mouth-open" />}
              defaultValue=""
              value={filterValues.emoji}
              onChangeValue={handleChangeSelect}
              aria-label="Выбор эмодзи"
            />
            <Button
              className={styles['btn-clear']}
              onClick={handleClickBtnClear}
              aria-label="очистить фильтр"
            >
              <Icon name="cross" />
            </Button>
          </div>
          <Button className={styles['btn-add']} onClick={handleClickBtnAdd}>
            <Icon name="pen" />
            <span>Добавить запись</span>
          </Button>
        </>
      )}
    </header>
  );
};
