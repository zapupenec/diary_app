import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  FormEventHandler,
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

import styles from './note-form.module.css';
import { useResize } from 'hooks';
import {
  Button,
  Checkbox,
  Icon,
  ImgWithLoader,
  Input,
  SearchImage,
  Selector,
  Textarea,
} from 'components';
import { emojis } from 'constant';
import { clsx } from 'lib';
import { useNoteForm } from 'contexts/note-form';
import { useDiary } from 'contexts/diary';
import { useRouter } from 'contexts/router';
import { useModal } from 'contexts/modal';
import { useSearchImage } from 'contexts/search-image';
import { TImage, TNote } from 'types';

interface INoteForm extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  type: 'add' | 'edit';
}

export const NoteForm: FC<INoteForm> = ({ type = 'add' }) => {
  const { width } = useResize();
  const { addNote, editNote, getNoteById } = useDiary();
  const { formData, isValid, updateFormData, resetFormData, isValidFormData } = useNoteForm();
  const { extra, navigateTo } = useRouter();
  const { showModal } = useModal();
  const { fetchImages } = useSearchImage();
  const [prevImage, setPrevImage] = useState<TNote['image']>(null);

  useEffect(() => {
    if (type === 'edit' && extra) {
      const note = getNoteById(extra.noteId);
      if (note) {
        updateFormData(note);
        setPrevImage(note.image);
      }
    }
    fetchImages();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      updateFormData({
        image: e.target.checked ? prevImage : null,
      });
      return;
    }

    updateFormData({
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    updateFormData({
      emoji: value,
    });
  };

  const handleClickImage = (image: TImage | null) => {
    updateFormData({ image });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isValidFormData()) {
      if (type === 'add') {
        addNote(formData);
      }

      if (type === 'edit' && extra) {
        editNote(extra.noteId, formData);
      }

      navigateTo('note-list');
      resetFormData();
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigateTo('note-list');
    resetFormData();
  };

  const handleClickImagePlaceholder: MouseEventHandler<HTMLDivElement> = (e) => {
    showModal('search-image', { handleClickImage });
  };

  return (
    <div className={styles.container}>
      <div className={clsx(styles['form-wrapper'], type === 'edit' ? styles['type-edit'] : '')}>
        <form className={styles.form} onSubmit={handleSubmit} id="add-form">
          <Input
            autoFocus
            className={styles.title}
            placeholder="Название"
            id="title"
            onChange={handleChange}
            isValid={isValid.title}
            value={formData.title}
          />
          <Selector
            values={emojis}
            displayValues={emojis}
            placeholder={<Icon name="smile-mouth-open" />}
            value={formData.emoji}
            defaultValue=""
            isValid={isValid.emoji}
            onChangeValue={handleChangeSelect}
            aria-label="Выбор эмодзи"
          />
          <Input
            className={styles.date}
            placeholder="Дата"
            id="date"
            type="date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = e.target.value === '' ? 'text' : 'date')}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            value={formData.date}
            isValid={isValid.date}
          />
        </form>
        <Textarea
          className={styles.textarea}
          id="description"
          placeholder="Описание"
          form="add-form"
          onChange={handleChange}
          isValid={isValid.description}
          value={formData.description}
        />
        {type === 'edit' && (
          <Checkbox
            className={styles.checkbox}
            id="description"
            form="add-form"
            checked={prevImage?.url === formData.image?.url}
            onChange={handleChange}
            isValid={isValid.image}
          >
            Оставить прошлое изображение?
          </Checkbox>
        )}
        <div className={styles.controls}>
          <Button className={styles.btn} type="submit" form="add-form">
            <Icon name="pen" />
            {type === 'edit' ? 'Изменить' : 'Добавить'}
            <span> запись</span>
          </Button>
          <Button
            className={styles.btn}
            type="button"
            form="add-form"
            bgColor="var(--button-grey)"
            onClick={handleCancel}
          >
            <Icon name="cross" />
            Отменить<span> {type === 'edit' ? 'изменение' : 'добавление'}</span>
          </Button>
        </div>
        {width <= 1439 && (
          <div
            className={clsx(styles['image-placeholder'], isValid.image ? '' : styles.invalid)}
            tabIndex={0}
            role="button"
            onClick={handleClickImagePlaceholder}
            aria-label="Открыть поиск изображений"
          >
            {formData.image ? (
              <ImgWithLoader src={formData.image.url} alt={formData.image.description} />
            ) : (
              <Icon name="image-icon" />
            )}
          </div>
        )}
      </div>
      {width > 1439 && (
        <div className={clsx(styles.search, isValid.image ? '' : styles.invalid)}>
          <SearchImage onClickImage={handleClickImage} selectedImg={formData.image?.url} />
        </div>
      )}
    </div>
  );
};
