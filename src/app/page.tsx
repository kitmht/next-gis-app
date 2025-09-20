import dynamic from "next/dynamic";

const OlMap = dynamic(() => import("@/components/OlMap"), { ssr: false });

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-16 px-6 py-12">
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Next.js × OpenLayers
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">
          リアルタイム地図ビューア
        </h1>
        <p className="text-lg text-slate-300">
          OpenLayers を npm パッケージから読み込み、東京周辺のベースマップを
          表示するサンプルアプリです。React コンポーネントとして再利用できる
          ようにカプセル化しています。
        </p>
      </header>
      <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <OlMap />
        </div>
        <aside className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-2xl font-semibold">特徴</h2>
          <ul className="list-inside list-disc space-y-2 text-slate-300">
            <li>npm で管理された OpenLayers をクライアントのみで初期化。</li>
            <li>
              React のライフサイクルに合わせた初期化とクリーンアップを実装。
            </li>
            <li>OpenStreetMap タイルを利用した軽量なベースレイヤー。</li>
          </ul>
          <div className="rounded-lg border border-white/5 bg-slate-800/80 p-4 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">ヒント</p>
            <p className="mt-2">
              自分のデータを重ねたい場合は{" "}
              <code className="rounded bg-black/40 px-1 py-0.5">
                VectorLayer
              </code>{" "}
              などのレイヤーを追加できます。
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
