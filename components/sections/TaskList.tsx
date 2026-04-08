import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';

interface TaskItem {
  icon: string;
  title: string;
  description: string;
  href: string;
  status: 'complete' | 'pending';
  buttonText: string;
}

export default function TaskList({ tasks }: { tasks: TaskItem[] }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.href}
          className="bg-white rounded-2xl p-6 border border-ok-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{task.icon}</span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-ok-navy">{task.title}</h3>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-ok-gray-500 text-sm mt-1">{task.description}</p>
              </div>
            </div>
            <Link
              href={task.href}
              className="px-4 py-2 rounded-full border-2 border-ok-orange text-ok-orange font-semibold text-sm hover:bg-ok-orange hover:text-white whitespace-nowrap"
            >
              {task.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
