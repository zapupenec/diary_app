import { ChangeEventHandler, FC, FormEventHandler, MouseEventHandler } from 'react';

import styles from './add-note.module.css';
import { useResize } from 'hooks';
import { Button, Icon, ImgWithLoader, Input, SearchImage, Selector, Textarea } from 'components';
import { emojis } from 'constant';
import { clsx } from 'lib';
import { useAddNoteForm } from 'contexts/add-note-form';
import { useDiary } from 'contexts/diary';
import { useRouter } from 'contexts/router';

export const AddNote: FC = () => {
  const { width } = useResize();
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isValidFormData()) {
      addNote(formData);
      setCurrentPage('note-list');
      resetFormData();
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentPage('note-list');
    resetFormData();
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <form className={styles.form} onSubmit={handleSubmit} id="add-form">
          <Input
            autoFocus
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
        <div className={styles.controls}>
          <Button className={styles['submit-btn']} type="submit" form="add-form">
            <Icon name="pen" />
            Добавить<span> запись</span>
          </Button>
          <Button
            className={styles['cansel-btn']}
            type="button"
            form="add-form"
            bgColor="var(--button-grey)"
            onClick={handleCancel}
          >
            <Icon name="cross" />
            Отменить<span> добавление</span>
          </Button>
        </div>
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
