import { DetailedHTMLProps, FC, HTMLAttributes, MouseEventHandler } from 'react';

import styles from './modal-note.module.css';
import { Button, Emoji, Icon, ImgWithLoader } from 'components';
import { useModal } from 'contexts/modal';
import { getDisplayDate } from 'lib';
import { useResize } from 'hooks';
import { useDiary } from 'contexts/diary';
import { useRouter } from 'contexts/router';

interface IModalNoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalNote: FC<IModalNoteProps> = () => {
  const { extra, hideModal } = useModal();
  const { id, title, description, date, image, emoji } = extra.note;
  const { dateTime, dateDisplay } = getDisplayDate(date, 'long');
  const { width } = useResize();
  const { removeNote } = useDiary();
  const { navigateTo } = useRouter();

  const handleClickEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigateTo('edit-note', { noteId: id });
    hideModal();
  };

  const handleClickRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    removeNote(id);
    hideModal();
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <button className={styles['btn-close']} onClick={hideModal} aria-label="Закрыть">
          <Icon name="cross" />
        </button>
        <h2 className={styles.title} id="modal-header">
          {title}
        </h2>
        <time dateTime={dateTime} className={styles.date}>
          {dateDisplay}
        </time>
        <div className={styles.description}>{description}</div>
        <div className={styles.actions}>
          <Button className={styles.btn} onClick={handleClickEdit}>
            <Icon name="pen" />
            Изменить<span> запись</span>
          </Button>
          <Button className={styles.btn} bgColor="var(--button-grey)" onClick={handleClickRemove}>
            <Icon name="cross" />
            Удалить<span> запись</span>
          </Button>
        </div>
        <div className={styles['image-container']}>
          <div className={styles['mood-status']}>
            <Emoji emoji={emoji} size={width <= 1023 ? 'small' : 'big'} />
          </div>
          <ImgWithLoader className={styles.image} src={image.url} alt={image.description} />
        </div>
      </div>
    </div>
  );
};
