import { FC, FormEvent, useEffect, useRef } from 'react';

import styles from './add-note.module.css';
import { useResize } from 'hooks';
import { Button, Icon, Input, SearchImage, Selector, Textarea } from 'components';
import { emojis } from 'constant';

export const AddNote: FC = () => {
  const { width } = useResize();
  const refFieldName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { current } = refFieldName;
    if (current) {
      current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={handleSubmit} id="add-form">
          <Input ref={refFieldName} className={styles.name} placeholder="Название" id="name" />
          <Selector
            values={emojis}
            displayValues={emojis}
            placeholder={<Icon name="smile-mouth-open" />}
            defaultValue=""
          />
          <Input
            className={styles.date}
            placeholder="Дата"
            id="date"
            type="date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = e.target.value === '' ? 'text' : 'date')}
            max={new Date().toISOString().split('T')[0]}
          />
        </form>
        <Textarea
          className={styles.textarea}
          id="description"
          placeholder="Описание"
          form="add-form"
        />
        <Button className={styles['submit-btn']} type="submit" form="add-form">
          <Icon name="pen" />
          Добавить запись
        </Button>
        {width <= 1439 && (
          <div className={styles['image-placeholder']}>
            <Icon name="image-icon" />
          </div>
        )}
      </div>
      {width > 1439 && (
        <div className={styles.search}>
          <SearchImage />
        </div>
      )}
    </div>
  );
};
