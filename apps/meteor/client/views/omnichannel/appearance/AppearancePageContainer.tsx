import { Callout } from '@rocket.chat/fuselage';
import { usePermission } from '@rocket.chat/ui-contexts';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page, PageHeader, PageScrollableContentWithShadow } from '../../../components/Page';
import PageSkeleton from '../../../components/PageSkeleton';
import { AsyncStatePhase } from '../../../hooks/useAsyncState';
import { useEndpointData } from '../../../hooks/useEndpointData';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';
import AppearancePage from './AppearancePage';

const AppearancePageContainer = () => {
	const { t } = useTranslation();

	const { value: data, phase: state, error } = useEndpointData('/v1/livechat/appearance');

	const canViewAppearance = usePermission('view-livechat-appearance');

	if (!canViewAppearance) {
		return <NotAuthorizedPage />;
	}

	if (state === AsyncStatePhase.LOADING) {
		return <PageSkeleton />;
	}

	if (!data?.appearance || error) {
		return (
			<Page>
				<PageHeader title={t('Edit_Custom_Field')} />
				<PageScrollableContentWithShadow>
					<Callout type='danger'>{t('Error')}</Callout>
				</PageScrollableContentWithShadow>
			</Page>
		);
	}

	return <AppearancePage settings={data.appearance} />;
};

export default AppearancePageContainer;
