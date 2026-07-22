import ChinaMap from '@/components/map/ChinaMap';

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">地图视图</h1>
      <ChinaMap />
    </div>
  );
}
