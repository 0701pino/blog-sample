import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-auto">
      <div>ページが見つかりません</div>
      <div className="m-5">
        <Link href="/">Topに戻る</Link>
      </div>
    </div>
  );
}
