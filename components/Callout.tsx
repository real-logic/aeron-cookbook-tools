type Props = {
  content: string;
};

const Callout: React.FC<Props> = ({ content }: Props) => {
  return (
    <div className="flex flex-grow border-t-2 border-b-2 text-center border-shaunnew-500 mt-10 justify-center items-center">
      <span className="pt-4 pb-4 font-display text-2xl text-shaunnew-500 text-center">{content}</span>
    </div>
  );
};

export default Callout;
