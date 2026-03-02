'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  amount: number;
}

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: '金', amount: 0 },
    { id: '2', name: 'S&P500', amount: 0 },
    { id: '3', name: '日本株', amount: 0 },
  ]);

  // 合計資産額を計算
  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);

  // 資産名を更新
  const updateAssetName = (id: string, name: string) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, name } : asset
    ));
  };

  // 資産額を更新
  const updateAssetAmount = (id: string, amount: number) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, amount } : asset
    ));
  };

  // 行を追加
  const addAsset = () => {
    const newId = Math.max(...assets.map(a => parseInt(a.id)), 0) + 1;
    setAssets([...assets, { id: newId.toString(), name: '', amount: 0 }]);
  };

  // 行を削除
  const deleteAsset = (id: string) => {
    if (assets.length > 1) {
      setAssets(assets.filter(asset => asset.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー - 合計資産額表示 */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-md mx-auto px-4 py-6">
          <p className="text-sm text-gray-600 mb-2">合計資産額</p>
          <p className="text-4xl font-bold text-blue-600">
            ¥{totalAssets.toLocaleString('ja-JP')}
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* 資産入力フォーム */}
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="flex gap-3 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              {/* 資産名入力 */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  資産名
                </label>
                <input
                  type="text"
                  value={asset.name}
                  onChange={(e) => updateAssetName(asset.id, e.target.value)}
                  placeholder="例：金、株式など"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* 金額入力 */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  金額（円）
                </label>
                <input
                  type="number"
                  value={asset.amount || ''}
                  onChange={(e) => updateAssetAmount(asset.id, parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => deleteAsset(asset.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="削除"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* 行を追加するボタン */}
        <button
          onClick={addAsset}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          行を追加する
        </button>
      </main>
    </div>
  );
}