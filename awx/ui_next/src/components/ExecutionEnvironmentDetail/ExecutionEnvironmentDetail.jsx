import React from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';

import { t } from '@lingui/macro';
import { Tooltip } from '@patternfly/react-core';
import styled from 'styled-components';

import { ExclamationTriangleIcon as PFExclamationTriangleIcon } from '@patternfly/react-icons';

import { Detail } from '../DetailList';
import { ExecutionEnvironment } from '../../types';

const ExclamationTriangleIcon = styled(PFExclamationTriangleIcon)`
  color: var(--pf-global--warning-color--100);
  margin-left: 18px;
`;

function ExecutionEnvironmentDetail({
  virtualEnvironment,
  executionEnvironment,
  isDefaultEnvironment,
}) {
  const label = isDefaultEnvironment
    ? t`Default Execution Environment`
    : t`Execution Environment`;

  if (executionEnvironment) {
    return (
      <Detail
        label={label}
        value={
          <Link
            to={`/execution_environments/${executionEnvironment.id}/details`}
          >
            {executionEnvironment.name}
          </Link>
        }
        dataCy="execution-environment-detail"
      />
    );
  }
  if (virtualEnvironment && !executionEnvironment) {
    return (
      <Detail
        label={label}
        value={
          <>
            {t`Missing resource`}
            <span>
              <Tooltip
                content={t`Custom virtual environment ${virtualEnvironment} must be replaced by an execution environment.`}
                position="right"
              >
                <ExclamationTriangleIcon />
              </Tooltip>
            </span>
          </>
        }
        dataCy="missing-execution-environment-detail"
      />
    );
  }
  return null;
}

ExecutionEnvironmentDetail.propTypes = {
  executionEnvironment: ExecutionEnvironment,
  isDefaultEnvironment: bool,
  virtualEnvironment: string,
};

ExecutionEnvironmentDetail.defaultProps = {
  isDefaultEnvironment: false,
  executionEnvironment: null,
  virtualEnvironment: '',
};

export default ExecutionEnvironmentDetail;
