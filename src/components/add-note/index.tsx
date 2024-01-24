import { ChangeEventHandler, FC, FormEvent, useEffect, useRef } from 'react';

import styles from './add-note.module.css';
import { useResize } from 'hooks';
import { Button, Icon, ImgWithLoader, Input, SearchImage, Selector, Textarea } from 'components';
import { emojis } from 'constant';
import { useAddNoteForm } from 'contexts/add-note-form';
import { useDiary } from 'contexts/diary';
import { clsx } from 'lib';
import { useRouter } from 'contexts/router';

export const AddNote: FC = () => {
  const { width } = useResize();
  const refFieldTitle = useRef<HTMLInputElement>(null);
  const { addNote } = useDiary();
  const { formData, isValid, updateFormData, resetFormData, isValidFormData } = useAddNoteForm();
  const { setCurrentPage } = useRouter();

  const handleChangeText: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    updateFormData({
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    updateFormData({
      emoji: value,
    });
  };

  const handleChangeImage = (value: string) => {
    updateFormData({
      imageUrl: value,
    });
  };

  useEffect(() => {
    const { current } = refFieldTitle;
    if (current) {
      current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidFormData()) {
      addNote(formData);
      setCurrentPage('note-list');
      resetFormData();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={handleSubmit} id="add-form">
          <Input
            ref={refFieldTitle}
            className={styles.title}
            placeholder="Название"
            id="title"
            onChange={handleChangeText}
            isValid={isValid.title}
          />
          <Selector
            values={emojis}
            displayValues={emojis}
            placeholder={<Icon name="smile-mouth-open" />}
            defaultValue=""
            isValid={isValid.emoji}
            onChangeValue={handleChangeSelect}
          />
          <Input
            className={styles.date}
            placeholder="Дата"
            id="date"
            type="date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = e.target.value === '' ? 'text' : 'date')}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleChangeText}
            isValid={isValid.date}
          />
        </form>
        <Textarea
          className={styles.textarea}
          id="description"
          placeholder="Описание"
          form="add-form"
          onChange={handleChangeText}
          isValid={isValid.description}
        />
        <Button className={styles['submit-btn']} type="submit" form="add-form">
          <Icon name="pen" />
          Добавить запись
        </Button>
        {width <= 1439 && (
          <div
            className={clsx(styles['image-placeholder'], isValid.imageUrl ? '' : styles.invalid)}
            tabIndex={0}
            role="button"
          >
            {formData.imageUrl === '' ? (
              <Icon name="image-icon" />
            ) : (
              <ImgWithLoader src={formData.imageUrl} alt="Фото" />
            )}
          </div>
        )}
      </div>
      {width > 1439 && (
        <div className={clsx(styles.search, isValid.imageUrl ? '' : styles.invalid)}>
          <SearchImage onChangeImage={handleChangeImage} selectedImg={formData.imageUrl} />
        </div>
      )}
    </div>
  );
};
