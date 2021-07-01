import React, { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

type Props = {
  title: string;
};

const ViewsCounter : React.FC<Props> = ({ title }: Props) => {
  const { data } = useSWR(`/api/views/${title}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${title}`, {
        method: 'POST'
      });

    registerView();
  }, [title]);

  if (views > 0) {
    return <span>{views.toLocaleString()} Views</span>;
  } else {
    return <span>--- Views</span>
  }
}

export default ViewsCounter;