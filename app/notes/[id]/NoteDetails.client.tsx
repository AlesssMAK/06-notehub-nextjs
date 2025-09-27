'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['note'],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (!data) return;

  const formattedDate = data.updatedAt
    ? `Updated at: ${data.updatedAt}`
    : `Created at: ${data.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
