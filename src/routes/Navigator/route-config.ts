import { useTranslation } from '../../i18n';
import { useSelector } from '../../common/dvaHooks';
import { gdaic } from '../../utils/factory';

export const useRouteConfig = () => {
  const { t } = useTranslation();
  const userMeta = useSelector(state => state.global.userMeta);

  return [
    ...gdaic(!!userMeta, [
      {
        path: '/self/pp-recommend',
        label: t('pp-personal-recommend-system'),
      },
      {
        path: '/self/similarity-users',
        label: t('similarity-user'),
      },
    ]),
    {
      path: '/about',
      label: t('app-about'),
    },
    {
      path: '/contact',
      label: t('contact-us-label-title'),
    },
  ];
};
