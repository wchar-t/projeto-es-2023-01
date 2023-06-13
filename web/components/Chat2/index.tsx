import { FormEvent, useState } from 'react';
import styles from './styles.module.css';

export default function Chat() {
  const [comments, setComments] = useState<string[]>([]);
  function handleSubmitComment(event: FormEvent) {
    event.preventDefault();
    // const newComment = event.target.comment.value;
    setComments((state) => [...state, 'aaaaaaaa']);
  }

  return (
    <div className={styles.chat}>
      <h1 className={styles.chat__title}>Chat</h1>

      <ul className={styles.chat__container}>
        {comments.length
          ? comments.map((comment) => (
            <li className={styles.chat__item}>
              <img
                src="https://doodleipsum.com/70x70/avatar-2?i=bf6687f12ea1b025bb325dac36a69402"
                alt=""
                className={styles.chat__item_avatar}
              />
              <time className={styles.chat__item_time}>16:25</time>
              <p>{comment}</p>
            </li>
          ))
          : <p>Seja o primero a comentar</p>}
      </ul>

      <form onSubmit={handleSubmitComment} className={styles.chat__form}>
        <input
          placeholder="Envie uma mensagem"
          type="text"
          className="rounded px-4 py-2 w-full"
        />
        <button
          title="Enviar mensagem"
          className="rounded bg-cyan-500 text-white px-4 py-2 font-semibold"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
