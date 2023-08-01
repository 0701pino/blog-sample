import Image from "next/image";
const Home: React.FC = () => {
  return (
    <div>
      <Image
        src="/images/top.png"
        alt="banner"
        width={720}
        height={378}
        className="max-w-[720px] w-[80vw] m-5"
      />
      top page content
    </div>
  );
};

export default Home;
