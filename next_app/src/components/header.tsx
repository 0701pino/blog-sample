import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/config";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <div className="flex items-center justify-center flex-grow">
        <Link href="/">
          <div className="flex items-center mr-2">
            <Image
              src={`${BASE_PATH}/images/logo.png`}
              alt=""
              width={32}
              height={32}
              className="max-w-[32px]"
            />
            <h1 className="ml-3 text-lg font-bold">Pino blog</h1>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
