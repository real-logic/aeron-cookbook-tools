import React from 'react';

type Props = {
  topicArea: string;
};

const TopicArea: React.FC<Props> = ({ topicArea }: Props) => {
    return (
      <div className="visible ">
        <span className="align-bottom h-full font-display text-shaunnew-100 text-lg">{topicArea}</span>
      </div>
    );
};

export default TopicArea;