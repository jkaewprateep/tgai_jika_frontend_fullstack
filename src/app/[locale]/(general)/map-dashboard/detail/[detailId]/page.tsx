// src/app/[locale]/(general)/map-dashboard/detail/[detailId]/page.tsx
import RobotDetailPage from '../../components/RobotDetailPage';

export default function Page({ params }: { params: { detailId: string } }) {
  return <RobotDetailPage robotId={params.detailId} />;
}