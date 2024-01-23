import { DetailedHTMLProps, FC, TextareaHTMLAttributes, useRef } from 'react';
import styles from './textarea.module.css';
import { clsx } from 'lib';

interface ITextareaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

export const Textarea: FC<ITextareaProps> = ({ className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = () => {
    const textareaEl = textareaRef.current;
    if (textareaEl) {
      const oldHeight = textareaEl.style.height;
      textareaEl.style.height = 'auto';
      const newHeight = textareaEl.scrollHeight + 'px';
      textareaEl.style.height = oldHeight;
      setTimeout(() => (textareaEl.style.height = newHeight), 100);
    }
  };

  return (
    <textarea
      onChange={handleChange}
      ref={textareaRef}
      className={clsx(className, styles.container)}
      {...props}
    ></textarea>
  );
};
