import type { Metadata } from 'next';
import GitHubActivityView from '@/components/GitHubActivityView';

export const metadata: Metadata = {
  title: 'Live Developer Activity // Sutan Arlie Johan (@Sutannn13)',
  description:
    'Live GitHub activity, 52-week contribution matrix, active repositories, and recent commits from Sutan Arlie Johan (@Sutannn13).',
};

export default function ActivityPage() {
  return <GitHubActivityView />;
}
