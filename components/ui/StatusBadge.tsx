export default function StatusBadge({ status }: { status: 'complete' | 'pending' }) {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${
        status === 'complete'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-ok-gray-500'
      }`}
    >
      {status === 'complete' ? '완료' : '미완료'}
    </span>
  );
}
