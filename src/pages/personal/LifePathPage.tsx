import { useTranslation } from 'react-i18next';

import SectionTitle from '@/components/SectionTitle';
import NineYearsCycle from '@/components/personal/lifePath/NineYearsCycle';

function LifePathPage() {
  const { t } = useTranslation();

  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="grid mt-8 mx-14 gap-4">
        <div>
          <SectionTitle title={t('lifePath.nineYearsCycle.title')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <NineYearsCycle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifePathPage;
