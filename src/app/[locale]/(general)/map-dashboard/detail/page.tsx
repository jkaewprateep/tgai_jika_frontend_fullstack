import { RobotDetailPage as RobotDetail } from '../../components/RobotDetailPage';

export default function DetailPage({ params }: { params: { detailId: string } }) {
  return <RobotDetail robotId={params.detailId} />;
}