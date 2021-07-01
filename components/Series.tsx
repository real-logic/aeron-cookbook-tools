type Props = {
  seriesName: string;
  seriesUrl: string;
};

const Series: React.FC<Props> = ({ seriesName, seriesUrl }: Props) => {
  if (seriesName != null)
  {
    return <div className='flex flex-col font-content'>
      <div className='flex flex-col order-1'>
        <span className='uppercase font-content'>Part of the series</span>
      </div>
      <div className='flex flex-col order-2 text-left p-2 border-2 border-shaunnew-500'>
        <a href={seriesUrl} title='link to series' className='no-underline hover:underline text-lg'>
          {seriesName}
        </a>
      </div>
    </div>;
  } else {
    return <div/>;
  }
};

export default Series;
