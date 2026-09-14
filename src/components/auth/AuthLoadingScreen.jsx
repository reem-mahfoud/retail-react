import { Spin } from 'antd';

export default function AuthLoadingScreen({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FAFAFA] text-sm text-[#535862]">
      <Spin />
      <span>{label}</span>
    </div>
  );
}
