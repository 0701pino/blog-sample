import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="pt-4 sm:pt-10 lg:pt-12">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/privacy-policy" className="text-sm underline">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="text-sm underline">
            お問い合わせ
          </Link>
        </div>
        <div className="py-8 text-center text-sm ">&copy; pino All rights reserved.</div>
      </div>
    </footer>
  );
};
export default Footer;
